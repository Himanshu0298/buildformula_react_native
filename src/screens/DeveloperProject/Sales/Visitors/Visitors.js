import React, {useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {
  withTheme,
  Caption,
  FAB,
  Title,
  Subheading,
  Divider,
  IconButton,
  Menu,
  Searchbar,
  Text,
} from 'react-native-paper';
import {getPermissions} from 'utils';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import Spinner from 'react-native-loading-spinner-overlay';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {PRIORITY_COLORS, STRUCTURE_TYPE_LABELS} from 'utils/constant';
import CustomBadge from 'components/Atoms/CustomBadge';
import NoDataFound from 'assets/images/NoDataFound.png';
import {getShadow} from 'utils';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FormTitle from 'components/Atoms/FormTitle';

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
      <Divider style={{height: 1}} />
    </TouchableOpacity>
  );
}

function RenderVisitors(props) {
  const {
    theme,
    data,
    onRefresh,
    showAnalyticsRow,
    visitorAnalytics,
    navToDetails,
    setFilter,
  } = props;

  const filterOptions = [
    {filter: 'name', title: 'Name'},
    {filter: 'recent', title: 'Recent'},
    {filter: 'low', title: 'Low Priority'},
    {filter: 'medium', title: 'Medium Priority'},
    {filter: 'high', title: 'High Priority'},
  ];

  const [visible, setVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const toggleMenu = () => setVisible(v => !v);

  console.log('----->data', data);
  const filteredUsers = useMemo(() => {
    return data.filter(
      i =>
        i.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.last_name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const onSearch = v => {
    setSearchQuery(v);
  };

  return (
    <View style={styles.contentContainer}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 10,
          justifyContent: 'space-between',
          marginHorizontal: 20,
          alignItems: 'center',
        }}>
        <Title style={{color: theme.colors.primary}}>Visitor's list</Title>
        <Menu
          visible={visible}
          onDismiss={toggleMenu}
          anchor={
            <OpacityButton
              opacity={0.1}
              color={theme.colors.primary}
              style={{borderRadius: 50}}
              onPress={toggleMenu}>
              <MaterialIcon
                name="filter-variant"
                color={theme.colors.primary}
                size={22}
              />
            </OpacityButton>
          }>
          {filterOptions.map(i => {
            return (
              <Menu.Item
                onPress={() => {
                  setFilter(i.filter);
                  toggleMenu();
                }}
                title={i.title}
              />
            );
          })}
        </Menu>
      </View>
      <Searchbar
        style={styles.searchBar}
        value={searchQuery}
        onChangeText={onSearch}
      />
      {showAnalyticsRow ? (
        <StatsRow visitorAnalytics={visitorAnalytics} />
      ) : null}
      <FlatList
        data={filteredUsers}
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
            <Image source={NoDataFound} />
            <Title
              style={{
                color: theme.colors.primary,
                fontSize: 22,
                marginTop: 10,
              }}>
              Start adding your visitor
            </Title>
          </View>
        }
      />
    </View>
  );
}

function Visitors(props) {
  const {theme, navigation} = props;

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
        <FAB
          style={[styles.fab, {backgroundColor: theme.colors.primary}]}
          large
          icon="plus"
          onPress={() => navigation.navigate('AddVisitor')}
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
    right: 20,
    bottom: 20,
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
  searchBar: {
    backgroundColor: '#EAECF11A',
    borderWidth: 1,
    borderColor: 'rgba(4, 29, 54, 0.1)',
    marginHorizontal: 10,
    ...getShadow(0),
  },
});
