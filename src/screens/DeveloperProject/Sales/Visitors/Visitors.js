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
  IconButton,
  Colors,
  Menu,
  Button,
} from 'react-native-paper';
import {getPermissions} from 'utils';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import Spinner from 'react-native-loading-spinner-overlay';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {PRIORITY_COLORS, STRUCTURE_TYPE_LABELS} from 'utils/constant';
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

function RenderVisitorItem(props) {
  const {theme, data, navToDetails} = props;
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
            labelStyles={[styles.statusLabel, {color: theme.colors.primary}]}
            style={styles.badge}
          />
        </View>
      </View>
      <Divider />
    </TouchableOpacity>
  );
}

function RenderVisitors(props) {
  const {
    theme,
    data,
    filter,
    onRefresh,
    showAnalyticsRow,
    visitorAnalytics,
    navToDetails,
    setFilter,
  } = props;

  const selectedColor = theme.colors.primary;

  const [visible, setVisible] = React.useState(false);

  const toggleMenu = () => setVisible(v => !v);

  return (
    <View style={styles.contentContainer}>
      <View style={{flexDirection: 'row', marginBottom: 40}}>
        <Button
          mode="outlined"
          color={filter === 'name' ? 'white' : null}
          style={{
            backgroundColor: filter === 'name' ? selectedColor : null,
            borderRadius: 20,
          }}
          onPress={() => setFilter('name')}>
          Name
        </Button>
        <Button
          mode="outlined"
          color={filter === 'recent' ? 'white' : null}
          style={{
            backgroundColor: filter === 'recent' ? selectedColor : null,
            borderRadius: 20,
          }}
          onPress={() => setFilter('recent')}>
          Recent
        </Button>
        <Menu
          visible={visible}
          onDismiss={toggleMenu}
          anchor={
            <IconButton
              icon="filter-variant"
              color={Colors.red500}
              size={20}
              onPress={toggleMenu}
              style={{borderWidth: 1}}
            />
          }>
          <Menu.Item
            onPress={() => {
              setFilter('less');
              toggleMenu();
            }}
            title="Less Priority"
          />
          <Menu.Item
            onPress={() => {
              setFilter('medium');
              toggleMenu();
            }}
            title="Medium Priority"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setFilter('high');
              toggleMenu();
            }}
            title="High Priority"
          />
        </Menu>
      </View>
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
            {...props}
            data={item}
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
  const {theme, navigation} = props;

  const [selectDialog, setSelectDialog] = useState(false);

  const {selectedProject} = useSelector(s => s.project);
  const {loading, visitors, visitorAnalytics} = useSelector(s => s.sales);

  const modulePermission = getPermissions('Visitors');

  const {getVisitors, getSalesData} = useSalesActions();
  const [filter, setFilter] = React.useState('name');

  const projectId = selectedProject.id;

  useEffect(() => {
    loadData();
  }, [projectId, filter]);

  const loadData = () => {
    getVisitors({project_id: projectId, filter_mode: `${filter}`});
    getSalesData({project_id: projectId});
  };

  const onRefresh = () => loadData();

  const toggleSelectDialog = () => setSelectDialog(v => !v);

  const onStateChange = ({open}) => setSelectDialog(open);

  const navToDetails = id => {
    navigation.navigate('VisitorDetails', {visitorId: id});
  };

  return (
    <>
      <Spinner visible={loading} textContent={''} />
      <ProjectHeader />

      <RenderVisitors
        {...props}
        filter={filter}
        data={visitors}
        showAnalyticsRow={true}
        visitorAnalytics={visitorAnalytics}
        onRefresh={onRefresh}
        setFilter={setFilter}
        navToDetails={navToDetails}
      />

      {modulePermission?.editor || modulePermission?.admin ? (
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
            // {
            //   icon: 'arrow-up',
            //   label: 'Follow up',
            //   onPress: () => navigation.navigate('AddFollowUp'),
            // },
          ]}
        />
      ) : null}
    </>
  );
}

export default withTheme(Visitors);

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    marginTop: 2,
  },
  statsRowMainContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',

    alignItems: 'center',
    backgroundColor: '#fff',
  },
  rowMainContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',

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
    textTransform: 'uppercase',
    fontSize: 10,
  },
  fab: {
    position: 'absolute',
    right: 0,
  },
  scrollView: {
    flexGrow: 1,
    marginBottom: 15,
  },
  noResultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
