import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  withTheme,
  Caption,
  Paragraph,
  FAB,
  IconButton,
} from 'react-native-paper';
import {getPermissions, getShadow} from 'utils';
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
import RenderActivity from './Components/Activity';

function RenderVisitorDetails(props) {
  const {visitor = {}, pipelines, occupationOptions, sourceTypeOptions} = props;

  const {
    // id: visitorId,
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

  const id = visitor.id;

  console.log('----->id', id);
  console.log('----->visitor', visitor);

  const occupation = occupationOptions.find(
    i => i.value === visitor.occupation,
  );
  const source = sourceTypeOptions.find(v => v.value === visitor.source_type);

  const inquiryStatus = pipelines.find(i => i.id === inquiry_status_id);

  const [selectDialog, setSelectDialog] = useState(false);

  const toggleSelectDialog = () => setSelectDialog(v => !v);

  const onStateChange = ({open}) => setSelectDialog(open);

  return (
    <ScrollView>
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
      </View>
    </ScrollView>
  );
}

function VisitorDetails(props) {
  const {route} = props;
  const {visitorId} = route?.params || {};

  const {navigation} = props;
  const [activityFilter, setActivityFilter] = useState('all');

  const modulePermission = getPermissions('Visitors');

  const {getVisitor, getPipelineData, getVisitorActivities} = useSalesActions();

  const [selectedTab, setSelectedTab] = useState(0);
  const [routes] = React.useState([
    {key: 0, title: 'Visitor Info'},
    {key: 1, title: 'Activity'},
  ]);

  const {selectedProject} = useSelector(state => state.project);
  const {
    loading,
    visitor,
    pipelines,
    occupationOptions,
    sourceTypeOptions,
  } = useSelector(state => state.sales);

  useEffect(() => {
    getVisitor({project_id: selectedProject.id, visitor_id: visitorId});
    getPipelineData(selectedProject.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject.id, visitorId]);

  useEffect(() => {
    getVisitorActivities({
      project_id: selectedProject.id,
      visitor_id: visitorId,
      filter_mode: activityFilter,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityFilter]);

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
            modulePermission={modulePermission}
          />
        );
      case 1:
        return (
          <RenderActivity
            activityFilter={activityFilter}
            setActivityFilter={setActivityFilter}
          />
        );
    }
  };

  const [selectDialog, setSelectDialog] = useState(false);

  const toggleSelectDialog = () => setSelectDialog(v => !v);

  const onStateChange = ({open}) => setSelectDialog(open);

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
                <ProjectHeader {...props} />
                <MaterialTabBar {...tabBarProps} />
              </View>
            );
          }}
        />
        {modulePermission?.editor || modulePermission?.admin ? (
          <FAB.Group
            open={selectDialog}
            style={styles.fab}
            fabStyle={{
              backgroundColor: selectDialog ? '#fff' : theme.colors.primary,
            }}
            icon={selectDialog ? 'window-close' : 'dots-horizontal'}
            small
            onPress={toggleSelectDialog}
            onStateChange={onStateChange}
            actions={[
              {
                icon: 'square-edit-outline',
                label: 'Edit',
                onPress: () => navigation.navigate('AddVisitor', {visitor}),
              },
              {
                icon: 'comment',
                label: 'Add comment',
                onPress: () =>
                  navigation.navigate('AddDetails', {
                    type: 'Comment',
                    visitorId,
                  }),
              },
              {
                icon: 'phone',
                label: 'Add Call Logs',
                onPress: () =>
                  navigation.navigate('AddDetails', {
                    type: 'Call Log',
                    visitorId,
                  }),
              },
              {
                icon: 'arrow-up',
                label: 'Add Follow-Up',
                onPress: () =>
                  navigation.navigate('AddDetails', {
                    type: 'Follow-up',
                    visitorId,
                  }),
              },
            ]}
          />
        ) : null}
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
    position: 'relative',
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
  fab: {
    position: 'absolute',
    right: 0,
  },
  value: {
    lineHeight: 14,
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
});

export default withTheme(VisitorDetails);
