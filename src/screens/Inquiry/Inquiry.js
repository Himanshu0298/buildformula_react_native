/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  RefreshControl,
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

function StatsRow({visitors}) {
  const weekly = useMemo(() => {
    return visitors.filter((visitor) =>
      dayjs(visitor.created).isAfter(dayjs().startOf('week')),
    );
  }, [visitors]);
  const monthly = useMemo(() => {
    return visitors.filter((visitor) =>
      dayjs(visitor.created).isAfter(dayjs().startOf('month')),
    );
  }, [visitors]);
  const yearly = useMemo(() => {
    return visitors.filter((visitor) =>
      dayjs(visitor.created).isAfter(dayjs().startOf('year')),
    );
  }, [visitors]);
  return (
    <View style={styles.rowMainContainer}>
      <View style={styles.rowItemContainer}>
        <Title theme={secondaryTheme} style={styles.rowTitle}>
          {visitors.length}
        </Title>
        <Caption theme={secondaryTheme} style={styles.rowLabel}>
          Total
        </Caption>
      </View>
      <View style={styles.rowItemContainer}>
        <Title theme={secondaryTheme} style={styles.rowTitle}>
          {weekly.length}
        </Title>
        <Caption theme={secondaryTheme} style={styles.rowLabel}>
          Weekly
        </Caption>
      </View>
      <View style={styles.rowItemContainer}>
        <Title theme={secondaryTheme} style={styles.rowTitle}>
          {monthly.length}
        </Title>
        <Caption theme={secondaryTheme} style={styles.rowLabel}>
          Monthly
        </Caption>
      </View>
      <View style={styles.rowItemContainer}>
        <Title theme={secondaryTheme} style={styles.rowTitle}>
          {yearly.length}
        </Title>
        <Caption theme={secondaryTheme} style={styles.rowLabel}>
          Yearly
        </Caption>
      </View>
    </View>
  );
}

function RenderVisitorItem({visitor}) {
  const {
    first_name,
    last_name,
    phone,
    follow_up_date,
    priority = 'low',
    inquiry_for,
  } = visitor;
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

function VisitorsTab({visitors, onRefresh}) {
  if (visitors.length > 0) {
    return (
      <>
        <StatsRow visitors={visitors} />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }>
          {visitors.map((visitor, index) => (
            <RenderVisitorItem key={index} visitor={visitor} />
          ))}
        </ScrollView>
      </>
    );
  }
  return (
    <View style={styles.noResultContainer}>
      <Caption theme={secondaryTheme}>{'No Projects Found'}</Caption>
    </View>
  );
}

function FollowUpTab({followups, onRefresh}) {
  if (followups.length > 0) {
    return (
      <>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }>
          {followups.map((visitor, index) => (
            <RenderVisitorItem key={index} visitor={visitor} />
          ))}
        </ScrollView>
      </>
    );
  }
  return (
    <View style={styles.noResultContainer}>
      <Caption theme={secondaryTheme}>{'No Projects Found'}</Caption>
    </View>
  );
}

function Inquiry(props) {
  const {navigation} = props;

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectDialog, setSelectDialog] = useState(false);

  const {selectedProject} = useSelector((state) => state.project);
  const {loading, visitors, followups} = useSelector((state) => state.sales);

  const {getVisitors, getFollowUps} = useSalesActions();

  const projectId = 2;

  useEffect(() => {
    getVisitors(projectId);
    getFollowUps(projectId);
  }, [projectId]);

  const onRefresh = () => {
    if (selectedTab === 0) {
      getVisitors(projectId);
    } else if (selectedTab === 1) {
      getFollowUps(projectId);
    }
  };

  const toggleSelectDialog = () => setSelectDialog((v) => !v);

  const onStateChange = ({open}) => setSelectDialog(open);

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
        {selectedTab === 0 ? (
          <VisitorsTab visitors={visitors} onRefresh={onRefresh} />
        ) : null}
        {selectedTab === 1 ? (
          <FollowUpTab followups={followups} onRefresh={onRefresh} />
        ) : null}
        {selectedTab === 2 ? (
          <VisitorsTab visitors={visitors} onRefresh={onRefresh} />
        ) : null}
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
});
