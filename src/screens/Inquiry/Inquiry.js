/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  RefreshControl,
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
import MaterialTabs from 'react-native-material-tabs';
import {getShadow} from '../../utils';
import useSalesActions from '../../redux/actions/salesActions';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import Spinner from 'react-native-loading-spinner-overlay';
import {secondaryTheme, theme} from '../../styles/theme';
import ProjectHeader from '../../components/Layout/ProjectHeader';
import {PRIORITY_COLORS, TYPE_LABELS} from '../../utils/constant';
import BaseText from '../../components/BaseText';

const TABS = ["Visitor's list", 'Follow up list', "Today's list"];

function StatsRow({visitorAnalytics}) {
  const {
    totalVisitors = 0,
    weeklyVisitors = 0,
    monthlyVisitors = 0,
    yearlyVisitors = 0,
  } = visitorAnalytics;
  return (
    <View style={styles.rowMainContainer}>
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

function RenderVisitorItem({data}) {
  const {
    first_name,
    last_name,
    phone,
    follow_up_date,
    priority = 'low',
    inquiry_for,
  } = data;
  return (
    <>
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
          <View
            style={[
              styles.priorityBadge,
              {backgroundColor: PRIORITY_COLORS[priority]},
            ]}>
            <BaseText style={styles.priorityLabel}>{priority}</BaseText>
          </View>
        </View>
        <View style={styles.rowItemContainer}>
          <Subheading theme={secondaryTheme} style={styles.visitorTitle}>
            {TYPE_LABELS[inquiry_for]}
          </Subheading>
          <View
            style={[
              styles.priorityBadge,
              {backgroundColor: 'rgba(72,114,244,0.3)'},
            ]}>
            <BaseText style={styles.statusLabel}>{'NEGOTIATION'}</BaseText>
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
}

function RenderContent({data, onRefresh, showAnalyticsRow, visitorAnalytics}) {
  return (
    <>
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
        renderItem={({item}) => <RenderVisitorItem data={item} />}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.noResultContainer}>
            <Subheading theme={secondaryTheme}>{'No Data Found'}</Subheading>
          </View>
        }
      />
    </>
  );
}

function Inquiry(props) {
  const {navigation} = props;

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectDialog, setSelectDialog] = useState(false);

  const {selectedProject} = useSelector((state) => state.project);
  const {
    loading,
    visitors,
    followups,
    todayFollowups,
    visitorAnalytics,
  } = useSelector((state) => state.sales);

  const {getVisitors, getFollowUps, getSalesData} = useSalesActions();

  const projectId = 2;

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

  const tabData = [visitors, followups, todayFollowups];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Spinner visible={loading} textContent={''} />
        <StatusBar barStyle="light-content" />
        <View style={styles.headerContainer}>
          <ProjectHeader />
          <MaterialTabs
            items={TABS}
            selectedIndex={selectedTab}
            onChange={setSelectedTab}
            barColor="#fff"
            indicatorColor={theme.colors.primary}
            inactiveTextColor={'#919191'}
            activeTextColor={theme.colors.primary}
            uppercase={false}
            textStyle={{
              fontFamily: 'Nunito-Regular',
            }}
          />
        </View>
        <RenderContent
          data={tabData[selectedTab]}
          onRefresh={onRefresh}
          showAnalyticsRow={selectedTab === 0}
          visitorAnalytics={visitorAnalytics}
        />
      </SafeAreaView>
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
            onPress: () => console.log('Pressed notifications'),
          },
        ]}
      />
    </>
  );
}

export default withTheme(Inquiry);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,
  },
  headerContainer: {
    ...getShadow(5),
    backgroundColor: '#fff',
  },
  rowMainContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    ...getShadow(2),
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
  priorityBadge: {
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityLabel: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 10,
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
});
