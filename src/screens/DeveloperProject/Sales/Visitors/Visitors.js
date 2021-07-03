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
import {theme} from 'styles/theme';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {PRIORITY_COLORS, STRUCTURE_TYPE_LABELS} from 'utils/constant';
import {TabView} from 'react-native-tab-view';
import Layout from 'utils/Layout';
import MaterialTabBar from 'components/Atoms/MaterialTabBar';
import CustomBadge from 'components/Atoms/CustomBadge';

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
        <Title style={styles.rowTitle}>{totalVisitors}</Title>
        <Caption style={styles.rowLabel}>Total</Caption>
      </View>
      <View style={styles.rowItemContainer}>
        <Title style={styles.rowTitle}>{weeklyVisitors}</Title>
        <Caption style={styles.rowLabel}>Weekly</Caption>
      </View>
      <View style={styles.rowItemContainer}>
        <Title style={styles.rowTitle}>{monthlyVisitors}</Title>
        <Caption style={styles.rowLabel}>Monthly</Caption>
      </View>
      <View style={styles.rowItemContainer}>
        <Title style={styles.rowTitle}>{yearlyVisitors}</Title>
        <Caption style={styles.rowLabel}>Yearly</Caption>
      </View>
    </View>
  );
}

function RenderVisitorItem({data, index, navToDetails}) {
  const {
    id,
    first_name,
    last_name,
    phone,
    follow_up_date,
    priority = 'low',
    inquiry_for,
  } = data;

  return (
    <TouchableOpacity onPress={() => navToDetails(id)}>
      <View style={styles.rowMainContainer}>
        <View style={styles.rowItemContainer}>
          <Subheading style={[styles.visitorTitle, styles.name]}>
            {first_name} {last_name}
          </Subheading>
          <Caption style={styles.rowLabel}>+91 {phone}</Caption>
        </View>
        <View style={styles.rowItemContainer}>
          <Subheading style={styles.visitorTitle}>
            {dayjs(follow_up_date).format('DD MMM')}
          </Subheading>
          <CustomBadge
            color={PRIORITY_COLORS[priority]}
            label={priority}
            style={styles.badge}
          />
        </View>
        <View style={styles.rowItemContainer}>
          <Subheading style={styles.visitorTitle}>
            {STRUCTURE_TYPE_LABELS[inquiry_for]}
          </Subheading>
          <CustomBadge
            color="rgba(72,114,244,0.15)"
            label={data.title || 'NEW VISITOR'}
            labelStyles={styles.statusLabel}
            style={styles.badge}
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
  navToDetails,
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
        contentContainerStyle={{flexGrow: 1, paddingBottom: 60}}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <RenderVisitorItem
            data={item}
            index={index}
            navToDetails={navToDetails}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.noResultContainer}>
            <Subheading>{'No Data Found'}</Subheading>
          </View>
        }
      />
    </View>
  );
}

function Visitors(props) {
  const {navigation} = props;

  const [selectedTab, setSelectedTab] = useState(0);
  const [routes] = React.useState([
    {key: 0, title: "Visitor's list"},
    {key: 1, title: 'Follow up list'},
    {key: 2, title: "Today's list"},
  ]);
  const [selectDialog, setSelectDialog] = useState(false);

  const {selectedProject} = useSelector(state => state.project);
  const {
    loading,
    visitors,
    followups,
    todayFollowups,
    visitorAnalytics,
  } = useSelector(state => state.sales);

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

  const toggleSelectDialog = () => setSelectDialog(v => !v);

  const onStateChange = ({open}) => setSelectDialog(open);

  const navToDetails = id => {
    navigation.navigate('VisitorDetails', {visitorId: id});
  };

  const renderScene = ({route: {key}}) => {
    return (
      <RenderContent
        data={tabData[key]}
        onRefresh={onRefresh}
        showAnalyticsRow={key === 0}
        visitorAnalytics={visitorAnalytics}
        navToDetails={navToDetails}
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
        renderTabBar={tabBarProps => {
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
    </>
  );
}

export default withTheme(Visitors);

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
  badge: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 2,
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
  },
  scrollView: {
    flexGrow: 1,
  },
  noResultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
