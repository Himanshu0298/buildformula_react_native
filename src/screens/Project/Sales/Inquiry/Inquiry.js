/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  withTheme,
  Caption,
  FAB,
  Title,
  Subheading,
  Divider,
} from 'react-native-paper';
import {getShadow} from 'utils';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import Spinner from 'react-native-loading-spinner-overlay';
import {secondaryTheme, theme} from 'styles/theme';
import ProjectHeader from 'components/Layout/ProjectHeader';
import {PRIORITY_COLORS, TYPE_LABELS} from 'utils/constant';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TabView} from 'react-native-tab-view';
import Layout from 'utils/Layout';
import MaterialTabBar from 'components/MaterialTabBar';
import CustomBadge from 'components/CustomBadge';
import {SafeAreaView} from 'react-native-safe-area-context';

function StatsRow({visitorAnalytics}) {
  const {
    totalVisitors = 0,
    weeklyVisitors = 0,
    monthlyVisitors = 0,
    yearlyVisitors = 0,
  } = visitorAnalytics;
  return (
    <View style={styles.statsRowMainContainer}>
      <View style={styles.rowItemContainer}>
        <Title theme={secondaryTheme} style={styles.rowTitle}>
          {totalVisitors}
        </Title>
        <Caption theme={secondaryTheme} style={styles.rowLabel}>
          Total
        </Caption>
      </View>
      <View style={styles.rowItemContainer}>
        <Title theme={secondaryTheme} style={styles.rowTitle}>
          {weeklyVisitors}
        </Title>
        <Caption theme={secondaryTheme} style={styles.rowLabel}>
          Weekly
        </Caption>
      </View>
      <View style={styles.rowItemContainer}>
        <Title theme={secondaryTheme} style={styles.rowTitle}>
          {monthlyVisitors}
        </Title>
        <Caption theme={secondaryTheme} style={styles.rowLabel}>
          Monthly
        </Caption>
      </View>
      <View style={styles.rowItemContainer}>
        <Title theme={secondaryTheme} style={styles.rowTitle}>
          {yearlyVisitors}
        </Title>
        <Caption theme={secondaryTheme} style={styles.rowLabel}>
          Yearly
        </Caption>
      </View>
    </View>
  );
}

function RenderVisitorItem({data, index, toggleSheet}) {
  const {
    first_name,
    last_name,
    phone,
    follow_up_date,
    priority = 'low',
    inquiry_for,
  } = data;

  return (
    <TouchableOpacity onPress={() => toggleSheet(index)}>
      <View style={styles.rowMainContainer}>
        <View style={styles.rowItemContainer}>
          <Subheading
            theme={secondaryTheme}
            style={[styles.visitorTitle, styles.name]}>
            {first_name} {last_name}
          </Subheading>
          <Caption theme={secondaryTheme} style={styles.rowLabel}>
            +91 {phone}
          </Caption>
        </View>
        <View style={styles.rowItemContainer}>
          <Subheading theme={secondaryTheme} style={styles.visitorTitle}>
            {dayjs(follow_up_date).format('DD MMM')}
          </Subheading>
          <CustomBadge color={PRIORITY_COLORS[priority]} label={priority} />
        </View>
        <View style={styles.rowItemContainer}>
          <Subheading theme={secondaryTheme} style={styles.visitorTitle}>
            {TYPE_LABELS[inquiry_for]}
          </Subheading>
          <CustomBadge
            color="rgba(72,114,244,0.15)"
            label={data.title || 'NEW VISITOR'}
            labelStyles={styles.statusLabel}
          />
        </View>
      </View>
      <Divider />
    </TouchableOpacity>
  );
}

function RenderContent({
  data,
  onRefresh,
  showAnalyticsRow,
  visitorAnalytics,
  toggleSheet,
}) {
  return (
    <View style={styles.contentContainer}>
      {showAnalyticsRow ? (
        <StatsRow visitorAnalytics={visitorAnalytics} />
      ) : null}
      <FlatList
        data={data}
        extraData={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.scrollView}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <RenderVisitorItem
            data={item}
            index={index}
            toggleSheet={toggleSheet}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.noResultContainer}>
            <Subheading theme={secondaryTheme}>{'No Data Found'}</Subheading>
          </View>
        }
      />
    </View>
  );
}

function RenderVisitorDetails({data = {}, handleClose, handleEdit}) {
  return (
    <Modal
      isVisible={Boolean(data.user_id)}
      swipeDirection="down"
      backdropOpacity={0.4}
      onSwipeComplete={handleClose}
      onBackButtonPress={handleClose}
      onBackdropPress={handleClose}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <View style={styles.sheetContainer}>
        <View style={styles.sheetRow}>
          <Caption theme={secondaryTheme} style={styles.sheetRowLabel}>
            Visitor Name:
          </Caption>
          <Caption theme={secondaryTheme} style={styles.sheetRowValue}>
            {' '}
            {data.first_name} {data.last_name}
          </Caption>
        </View>
        <View style={styles.sheetRow}>
          <Caption theme={secondaryTheme} style={styles.sheetRowLabel}>
            Visitor Phone:
          </Caption>
          <Caption theme={secondaryTheme} style={styles.sheetRowValue}>
            {' +91'}
            {data.phone}
          </Caption>
        </View>
        <View style={styles.sheetRow}>
          <Caption theme={secondaryTheme} style={styles.sheetRowLabel}>
            Budget Range:
          </Caption>
          <Caption theme={secondaryTheme} style={styles.sheetRowValue}>
            {' Rs. '}
            {data.budget_from} {'-'} {' Rs. '}
            {data.budget_to}
          </Caption>
        </View>
        <View style={styles.sheetRow}>
          <Caption theme={secondaryTheme} style={styles.sheetRowLabel}>
            Date:
          </Caption>
          <Caption theme={secondaryTheme} style={styles.sheetRowValue}>
            {' '}
            {dayjs(data.follow_up_date).format('DD MMM')}
          </Caption>
        </View>
        <View style={styles.sheetRow}>
          <Caption theme={secondaryTheme} style={styles.sheetRowLabel}>
            Priority:
          </Caption>
          <CustomBadge
            color={PRIORITY_COLORS[data.priority]}
            style={{marginLeft: 10}}
            label={data.priority}
          />
        </View>
        <View style={styles.sheetRow}>
          <Caption theme={secondaryTheme} style={styles.sheetRowLabel}>
            Inquiry:
          </Caption>
          <Caption theme={secondaryTheme} style={styles.sheetRowValue}>
            {' '}
            {TYPE_LABELS[data.inquiry_for]} {data.bhk} BHK
          </Caption>
        </View>
        <View style={styles.sheetRow}>
          <Caption theme={secondaryTheme} style={styles.sheetRowLabel}>
            Status:
          </Caption>
          <CustomBadge
            color="rgba(72,114,244,0.15)"
            label={data.title || 'NEW VISITOR'}
            style={{marginLeft: 10}}
            labelStyles={styles.statusLabel}
          />
        </View>
        <View style={styles.sheetRow}>
          <Caption theme={secondaryTheme} style={styles.sheetRowLabel}>
            Remarks:
          </Caption>
          <Caption theme={secondaryTheme} style={styles.sheetRowValue}>
            {' '}
            {data.remarks}
          </Caption>
        </View>

        <View style={styles.editButtonContainer}>
          <TouchableOpacity style={styles.editButton}>
            <MaterialIcons name={'edit'} color={'#fff'} size={19} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function Inquiry(props) {
  const {navigation} = props;

  const [selectedTab, setSelectedTab] = useState(0);
  const [routes] = React.useState([
    {key: 0, title: "Visitor's list"},
    {key: 1, title: 'Follow up list'},
    {key: 2, title: "Today's list"},
  ]);
  const [selectDialog, setSelectDialog] = useState(false);
  const [sheetData, setSheetData] = useState();

  const {selectedProject} = useSelector((state) => state.project);
  const {
    loading,
    visitors,
    followups,
    todayFollowups,
    visitorAnalytics,
  } = useSelector((state) => state.sales);

  const {getVisitors, getFollowUps, getSalesData} = useSalesActions();

  const projectId = selectedProject.id;

  const tabData = [visitors, followups, todayFollowups];

  useEffect(() => {
    getVisitors(projectId);
    getFollowUps(projectId);
    getSalesData(projectId);
  }, [projectId]);

  const onRefresh = () => {
    if (selectedTab === 0) {
      getVisitors(projectId);
      getSalesData(projectId);
    } else if (selectedTab === 1 || selectedTab === 2) {
      getFollowUps(projectId);
    }
  };

  const toggleSelectDialog = () => setSelectDialog((v) => !v);

  const onStateChange = ({open}) => setSelectDialog(open);

  const toggleSheet = (index) => {
    if (!isNaN(index)) {
      return setSheetData(tabData[selectedTab][index]);
    }
    return setSheetData();
  };

  const handleEdit = (index) => {
    console.log('----->handleEdit ');
  };

  const renderScene = ({route: {key}}) => {
    return (
      <RenderContent
        data={tabData[key]}
        onRefresh={onRefresh}
        showAnalyticsRow={key === 0}
        visitorAnalytics={visitorAnalytics}
        toggleSheet={toggleSheet}
      />
    );
  };

  return (
    <>
      <Spinner visible={loading} textContent={''} />

      <TabView
        navigationState={{index: selectedTab, routes}}
        renderScene={renderScene}
        onIndexChange={setSelectedTab}
        initialLayout={{width: Layout.window.width}}
        renderTabBar={(tabBarProps) => {
          return (
            <View style={styles.headerContainer}>
              <ProjectHeader />
              <MaterialTabBar {...tabBarProps} />
            </View>
          );
        }}
      />
      <FAB.Group
        open={selectDialog}
        style={styles.fab}
        fabStyle={{
          backgroundColor: selectDialog ? '#fff' : theme.colors.primary,
        }}
        icon={selectDialog ? 'window-close' : 'plus'}
        small
        theme={secondaryTheme}
        onPress={toggleSelectDialog}
        onStateChange={onStateChange}
        actions={[
          {
            icon: 'account-question-outline',
            label: 'New visitor',
            onPress: () => navigation.navigate('AddVisitor'),
          },
          {
            icon: 'arrow-up',
            label: 'Follow up',
            onPress: () => navigation.navigate('AddFollowUp'),
          },
        ]}
      />
      <RenderVisitorDetails
        data={sheetData}
        handleClose={toggleSheet}
        handleEdit={handleEdit}
      />
    </>
  );
}

export default withTheme(Inquiry);

const styles = StyleSheet.create({
  headerContainer: {
    ...getShadow(5),
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    marginTop: 2,
  },
  statsRowMainContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  rowMainContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  rowItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: {
    // fontWeight: 'bold',
    fontFamily: 'Nunito-SemiBold',
  },
  rowLabel: {
    marginTop: -5,
    color: ' rgba(4, 29, 54, 0.6)',
    fontSize: 12,
  },
  visitorTitle: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
  },
  name: {
    textTransform: 'capitalize',
  },
  statusLabel: {
    color: theme.colors.primary,
    textTransform: 'uppercase',
    fontSize: 10,
  },
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 50,
  },
  scrollView: {
    flexGrow: 1,
  },
  noResultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetContainer: {
    backgroundColor: '#fff',
    display: 'flex',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingLeft: 30,
    paddingRight: 40,
    paddingVertical: 40,
  },
  sheetRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  sheetRowLabel: {
    fontWeight: 'bold',
  },
  sheetRowValue: {
    textTransform: 'capitalize',
    flexWrap: 'wrap',
  },
  editButtonContainer: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'flex-end',
  },
  editButton: {
    borderRadius: 100,
    height: 50,
    width: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
});
