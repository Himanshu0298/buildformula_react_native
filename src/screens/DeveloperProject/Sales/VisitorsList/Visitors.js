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
  Menu,
  Searchbar,
} from 'react-native-paper';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import Spinner from 'react-native-loading-spinner-overlay';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {PRIORITY_COLORS, STRUCTURE_TYPE_LABELS} from 'utils/constant';
import CustomBadge from 'components/Atoms/CustomBadge';
import NoDataFound from 'assets/images/NoDataFound.png';
import {getShadow, getPermissions} from 'utils';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSalesLoading} from 'redux/selectors';

const FILTERS = [
  {value: 'name', label: 'Name'},
  {value: 'recent', label: 'Recent'},
  {value: 'low', label: 'Low Priority'},
  {value: 'medium', label: 'Medium Priority'},
  {value: 'high', label: 'High Priority'},
];

function StatsRow({visitorAnalytics}) {
  const {
    totalVisitors = 0,
    weeklyVisitors = 0,
    monthlyVisitors = 0,
    yearlyVisitors = 0,
  } = visitorAnalytics;

  const data = [
    {label: 'Total', value: totalVisitors},
    {label: 'Weekly', value: weeklyVisitors},
    {label: 'Monthly', value: monthlyVisitors},
    {label: 'Yearly', value: yearlyVisitors},
  ];

  return (
    <View style={styles.statsRowMainContainer}>
      {data.map(i => (
        <View key={i.label} style={styles.rowItemContainer}>
          <Title style={styles.rowTitle}>{i.value}</Title>
          <Caption style={styles.rowLabel}>{i.label}</Caption>
        </View>
      ))}
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
    priority = 'low',
    inquiry_for,
    created,
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
            {dayjs(created).format('DD MMM')}
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
    </TouchableOpacity>
  );
}

function RenderVisitors(props) {
  const {theme, visitors, onRefresh, navToDetails} = props;

  const renderDivider = () => <Divider style={styles.divider} />;

  return (
    <View style={styles.contentContainer}>
      <FlatList
        data={visitors}
        extraData={visitors}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={renderDivider}
        renderItem={({item, index}) => (
          <RenderVisitorItem
            {...props}
            key={index?.toString()}
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
            <Title style={[styles.title, {color: theme.colors.primary}]}>
              Start adding your visitor
            </Title>
          </View>
        }
      />
    </View>
  );
}

function Header(props) {
  const {theme, filter, searchQuery, setFilter, setSearchQuery} = props;
  const {colors} = theme;

  const [visible, setVisible] = React.useState(false);

  const toggleMenu = () => setVisible(v => !v);

  const onSearch = v => setSearchQuery(v);

  return (
    <>
      <View style={styles.headerContainer}>
        <Subheading style={{color: colors.primary}}>Visitor's list</Subheading>
        <Menu
          visible={visible}
          onDismiss={toggleMenu}
          anchor={
            <OpacityButton
              opacity={0.1}
              color={colors.primary}
              style={styles.filterButton}
              onPress={toggleMenu}>
              <MaterialIcon
                name="filter-variant"
                color={colors.primary}
                size={22}
              />
            </OpacityButton>
          }>
          {FILTERS.map((i, index) => {
            const active = i.value === filter;
            return (
              <Menu.Item
                key={index?.toString()}
                title={i.label}
                style={active ? {backgroundColor: colors.primary} : {}}
                titleStyle={active ? {color: colors.white} : {}}
                onPress={() => {
                  setFilter(i.value);
                  toggleMenu();
                }}
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
    </>
  );
}

function Visitors(props) {
  const {theme, navigation} = props;

  const {selectedProject} = useSelector(s => s.project);
  const {visitors, visitorAnalytics} = useSelector(s => s.sales);

  const loading = useSalesLoading();

  const modulePermission = getPermissions('Visitors');

  const {getVisitors, getSalesData} = useSalesActions();
  const [filter, setFilter] = React.useState('name');
  const [searchQuery, setSearchQuery] = React.useState('');

  const projectId = selectedProject.id;

  const filteredVisitors = useMemo(() => {
    return visitors.filter(
      i =>
        i.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.last_name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [visitors, searchQuery]);

  useEffect(() => {
    if (projectId) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, filter]);

  const loadData = () => {
    getVisitors({project_id: projectId, filter_mode: filter});
    getSalesData({project_id: projectId});
  };

  const onRefresh = () => loadData();

  const navToDetails = id => {
    navigation.navigate('VisitorDetails', {visitorId: id});
  };

  const navToAddVisitor = () => navigation.navigate('AddVisitor');

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <Header
        {...props}
        filter={filter}
        searchQuery={searchQuery}
        setFilter={setFilter}
        setSearchQuery={setSearchQuery}
      />

      <StatsRow visitorAnalytics={visitorAnalytics} />

      <View style={{flexGrow: 1}}>
        <RenderVisitors
          {...props}
          visitors={filteredVisitors}
          onRefresh={onRefresh}
          navToDetails={navToDetails}
        />
      </View>
      {modulePermission?.editor || modulePermission?.admin ? (
        <FAB
          style={[styles.fab, {backgroundColor: theme.colors.primary}]}
          large
          icon="plus"
          onPress={navToAddVisitor}
        />
      ) : null}
    </View>
  );
}

export default withTheme(Visitors);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  contentContainer: {
    flex: 1,
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
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  title: {
    fontSize: 22,
    marginTop: 10,
  },
  divider: {
    height: 1,
    marginVertical: 2,
  },
  filterButton: {
    borderRadius: 50,
  },
});
