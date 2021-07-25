import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {
  withTheme,
  Caption,
  Divider,
  Paragraph,
  Button,
  Text,
} from 'react-native-paper';
import {getShadow} from 'utils';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import Spinner from 'react-native-loading-spinner-overlay';
import {theme} from 'styles/theme';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {PRIORITY_COLORS, STRUCTURE_TYPE_LABELS} from 'utils/constant';
import {TabView} from 'react-native-tab-view';
import Layout from 'utils/Layout';
import MaterialTabBar from 'components/Atoms/MaterialTabBar';
import CustomBadge from 'components/Atoms/CustomBadge';
import NoResult from 'components/Atoms/NoResult';
import AddResponseDialog from './AddResponseDialog';

function RenderVisitorDetails(props) {
  const {
    visitor,
    pipelines,
    occupationOptions,
    sourceTypeOptions,
    onEdit,
  } = props;

  const {
    first_name,
    last_name,
    phone,
    budget_from,
    budget_to,
    follow_up_date,
    priority,
    inquiry_for,
    current_locality,
    bhk,
    email,
    inquiry_status_id,
  } = visitor;

  const occupation = occupationOptions.find(
    i => i.value === visitor.occupation,
  );
  const source = sourceTypeOptions.find(v => v.value === visitor.source_type);

  const inquiryStatus = pipelines.find(i => i.id === inquiry_status_id);

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailRow}>
        <Paragraph>Name</Paragraph>
        <Caption style={styles.value}>
          {first_name} {last_name}
        </Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Email</Paragraph>
        <Caption style={styles.value}>{email}</Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Phone no.</Paragraph>
        <Caption style={styles.value}>+91 {phone}</Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Occupation</Paragraph>
        <Caption style={styles.value}>{occupation?.label}</Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Date</Paragraph>
        <Caption style={styles.value}>
          {dayjs(follow_up_date).format('DD MMM YYYY')}
        </Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Inquiry for</Paragraph>
        <Caption style={styles.value}>
          {STRUCTURE_TYPE_LABELS[inquiry_for]}
          {bhk ? ` - ${bhk} BHK` : null}
        </Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Budget Range</Paragraph>
        <Caption style={styles.value}>
          {/*TODO: Add amount formatting */}
          Rs. {budget_from} - Rs.{budget_to}
        </Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Current Locality</Paragraph>
        <Caption style={styles.value}>{current_locality}</Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Source type</Paragraph>
        <Caption style={styles.value}>{source?.label || 'NA'}</Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Priority</Paragraph>
        <Caption style={styles.value}>
          <CustomBadge
            color={PRIORITY_COLORS[priority]}
            label={priority}
            style={styles.badge}
          />
        </Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Status</Paragraph>
        <Caption>
          <CustomBadge
            style={{paddingHorizontal: 10, paddingVertical: 2}}
            color="rgba(72,114,244,0.15)"
            label={inquiryStatus?.title}
            labelStyles={{color: theme.colors.primary}}
          />
        </Caption>
      </View>
      <Button
        style={{flex: 1, position: 'absolute', right: 10, bottom: 0}}
        mode="contained"
        contentStyle={{paddingHorizontal: 20, paddingVertical: 2}}
        theme={{roundness: 15}}
        onPress={onEdit}>
        Edit
      </Button>
    </View>
  );
}

function RenderFollowupCard(props) {
  const {followup, toggleResponseDialog} = props;
  const {
    id: followUpId,
    created,
    assign_to,
    remarks,
    followup_date,
    followup_time,
    inquiry_status,
    today_discussion,
  } = followup;

  const {commonData} = useSelector(s => s.project);

  const assignedUser = useMemo(() => {
    return commonData.all_users_belongs_to_projects.find(
      i => i.id === assign_to,
    );
  }, [assign_to, commonData.all_users_belongs_to_projects]);

  return (
    <View style={styles.followupContainer}>
      <Text>Followup request</Text>
      <View style={styles.followupRow}>
        <View>
          <Caption>Created on</Caption>
          <Caption style={styles.followupValue}>
            {dayjs(created).format('DD MMMM YYYY, hh:mm A')}
          </Caption>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Caption>Assign To</Caption>
          <Caption style={[{textAlign: 'right'}, styles.followupValue]}>
            {assignedUser?.first_name} {assignedUser?.last_name}
          </Caption>
        </View>
      </View>

      <Caption>Notes:</Caption>
      <Caption style={styles.followupValue}>{remarks}</Caption>

      <Divider
        style={{
          marginVertical: 10,
          borderWidth: 0.3,
          borderColor: 'rgba(0,0,0,0.2)',
        }}
      />

      <Text>Followup responses</Text>

      <View style={styles.rowBetween}>
        <View style={{marginVertical: 15}}>
          <Caption>Follow up on:</Caption>
          <Caption style={styles.followupValue}>
            {dayjs(`${followup_date} ${followup_time}`).format(
              'DD MMMM YYYY, hh:mm A',
            )}
          </Caption>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Caption>Status</Caption>
          <CustomBadge
            style={{paddingHorizontal: 10, paddingVertical: 2}}
            color="rgba(72,114,244,0.15)"
            label={inquiry_status}
            labelStyles={{color: theme.colors.primary}}
          />
        </View>
      </View>

      {today_discussion ? (
        <>
          <Caption>Customer Response: :</Caption>
          <Caption style={[styles.followupValue, {marginBottom: 15}]}>
            {today_discussion}
          </Caption>
        </>
      ) : (
        <Button
          mode="contained"
          uppercase={false}
          compact
          onPress={() => toggleResponseDialog(followUpId)}
          style={{width: '70%'}}>
          Add customer response
        </Button>
      )}
    </View>
  );
}

function RenderFollowupList(props) {
  const {visitorFollowUp, handleResponseSubmit} = props;

  const [responseFor, setResponseFor] = useState();

  const toggleResponseDialog = v => setResponseFor(!isNaN(v) ? v : undefined);

  const handleSubmit = data => {
    handleResponseSubmit({...data, followUpId: responseFor});
  };

  return (
    <View style={styles.followupBody}>
      <AddResponseDialog
        open={!isNaN(responseFor)}
        handleClose={toggleResponseDialog}
        handleSubmit={handleSubmit}
      />
      {visitorFollowUp?.length ? (
        <FlatList
          data={visitorFollowUp}
          extraData={visitorFollowUp}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <RenderFollowupCard
              followup={item}
              toggleResponseDialog={toggleResponseDialog}
            />
          )}
        />
      ) : (
        <NoResult title="No follow up found for this visitor" />
      )}
    </View>
  );
}

function VisitorDetails(props) {
  const {route, navigation} = props;
  const {visitorId} = route?.params || {};

  const {getVisitor, getPipelineData, updateFollowUp} = useSalesActions();

  const [selectedTab, setSelectedTab] = useState(0);
  const [routes] = React.useState([
    {key: 0, title: 'Visitor details'},
    {key: 1, title: 'Follow up list'},
  ]);

  const {selectedProject} = useSelector(state => state.project);
  const {
    loading,
    visitor,
    pipelines,
    visitorFollowUp,
    occupationOptions,
    sourceTypeOptions,
  } = useSelector(state => state.sales);

  useEffect(() => {
    getVisitor({project_id: selectedProject.id, visitor_id: visitorId});
    getPipelineData(selectedProject.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject.id, visitorId]);

  const onEdit = () => {
    navigation.navigate('AddVisitor', {visitor});
  };

  const handleResponseSubmit = ({status, response, followUpId}) => {
    updateFollowUp({
      project_id: selectedProject.id,
      followup_id: followUpId,
      followup_status: status,
      followup_details: response,
    });
  };

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 0:
        return (
          <RenderVisitorDetails
            {...props}
            visitor={visitor}
            pipelines={pipelines}
            occupationOptions={occupationOptions}
            sourceTypeOptions={sourceTypeOptions}
            onEdit={onEdit}
          />
        );
      case 1:
        return (
          <RenderFollowupList
            {...props}
            visitorFollowUp={visitorFollowUp}
            handleResponseSubmit={handleResponseSubmit}
          />
        );
    }
  };

  return (
    <>
      <Spinner visible={loading} textContent={''} />

      <View style={styles.body}>
        <TabView
          navigationState={{index: selectedTab, routes}}
          renderScene={renderScene}
          onIndexChange={setSelectedTab}
          initialLayout={{width: Layout.window.width}}
          renderTabBar={tabBarProps => {
            return (
              <View style={styles.headerContainer}>
                <ProjectHeader {...props}/>
                <MaterialTabBar {...tabBarProps} />
              </View>
            );
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    ...getShadow(5),
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    paddingBottom: 20,
  },
  detailsContainer: {
    position: 'relative',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  detailRow: {
    flexShrink: 1,
    marginBottom: 10,
  },
  value: {
    lineHeight: 14,
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  followupBody: {
    padding: 10,
    flexGrow: 1,
  },
  followupContainer: {
    backgroundColor: '#F2F4F5',
    borderRadius: 10,
    padding: 15,
    paddingBottom: 30,
    marginBottom: 10,
  },
  followupRow: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  followupValue: {
    color: '#000',
    lineHeight: 14,
  },
});

export default withTheme(VisitorDetails);
