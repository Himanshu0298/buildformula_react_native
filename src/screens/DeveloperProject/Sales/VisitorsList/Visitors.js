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
  Text,
  Badge,
} from 'react-native-paper';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import Spinner from 'react-native-loading-spinner-overlay';
import {PRIORITY_COLORS, STRUCTURE_TYPE_LABELS} from 'utils/constant';
import CustomBadge from 'components/Atoms/CustomBadge';
import NoDataFound from 'assets/images/NoDataFound.png';
import {getShadow, getPermissions} from 'utils';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSalesLoading} from 'redux/selectors';
import {store} from 'redux/store';

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
  const {theme, data, navToDetails, sourceTypeOptions} = props;

  const {
    id,
    first_name,
    last_name,
    phone,
    priority = 'low',
    inquiry_for_title,
    created,
    title,
  } = data;

  const source = useMemo(() => {
    return sourceTypeOptions.find(v => v.value === data.source_type);
  }, [data.source_type, sourceTypeOptions]);

  return (
    <TouchableOpacity onPress={() => navToDetails(id)}>
      <View style={styles.rowMainContainer}>
        <View style={styles.rowItemContainer}>
          <Subheading style={[styles.visitorTitle, styles.name]}>
            {first_name} {last_name}
          </Subheading>
          <Caption style={styles.rowLabel}>+91 {phone}</Caption>
          <Caption
            style={{
              color: theme.colors.primary,
              fontWeight: '700',
              marginTop: -2,
            }}>
            {source?.label || '-'}
          </Caption>
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
            {inquiry_for_title}
          </Subheading>
          <CustomBadge
            color="rgba(72,114,244,0.15)"
            label={title || 'NEW VISITOR'}
            labelStyles={[styles.statusLabel, {color: theme.colors.primary}]}
            style={styles.badge}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

function RenderVisitors(props) {
  const {theme, visitors, onRefresh, navToDetails, loadMore, totalPage, page} =
    props;

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
        // ListFooterComponent={
        //   page >= totalPage ? (
        //     <Caption style={styles.noMoreData}>No More Data Display!</Caption>
        //   ) : (
        //     ''
        //   )
        // }
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
        // onEndReached={() => {
        //   loadMore();
        // }}
        // onEndReachedThreshold={0.5}
      />
    </View>
  );
}

function Header(props) {
  const {theme, searchQuery, setSearchQuery, filterCount, navToFilter} = props;
  const {colors} = theme;

  const onSearch = v => setSearchQuery(v);

  return (
    <>
      <View style={styles.headerContainer}>
        <Subheading style={{color: colors.primary}}>Inquiry list</Subheading>
        <View>
          {filterCount ? (
            <Badge style={styles.filterCount}>{filterCount}</Badge>
          ) : undefined}
          <OpacityButton
            color="#4872f4"
            opacity={0.18}
            style={styles.editIcon}
            onPress={() => navToFilter()}>
            <MaterialIcon name="filter-variant" color="#4872f4" size={16} />
          </OpacityButton>
        </View>
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

  const [page, setPage] = React.useState(1);

  const {selectedProject} = useSelector(s => s.project);
  const {
    visitors,
    visitorAnalytics,
    totalPage,
    sourceTypeOptions,
    visitorsFilters,
    loading,
  } = useSelector(s => s.sales);

  const modulePermission = getPermissions('Inquiry');

  const {isProjectAdmin} = store.getState().project;

  const {
    getVisitors,
    getSalesData,
    getCountryCodes,
    getAssignToData,
    getBrokersList,
    getPipelineData,
  } = useSalesActions();
  const [filter, setFilter] = React.useState('recent');
  const [searchQuery, setSearchQuery] = React.useState('');

  const projectId = selectedProject.id;

  const loadMoreData = async () => {
    await setPage(page + 1);
    if (page <= totalPage) {
      await loadVisitorData(page);
    }
  };

  const filterCount = useMemo(() => {
    return Object.values(visitorsFilters)?.filter(i => i !== '').length;
  }, [visitorsFilters]);

  const filteredVisitors = useMemo(() => {
    return visitors.filter(
      i =>
        i?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i?.last_name?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [visitors, searchQuery]);

  const navToFilter = () => navigation.navigate('VisitorFilter');

  useEffect(() => {
    if (projectId) {
      loadData();
      loadVisitorData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, filter, visitorsFilters]);

  const loadVisitorData = async pageno => {
    await getVisitors({
      project_id: projectId,
      sort_mode: visitorsFilters?.sortby,
      priority_mode: visitorsFilters?.priority,
      lead_status: visitorsFilters?.status,
      source_type: visitorsFilters?.sourceType,
      role: modulePermission?.admin || isProjectAdmin ? 'admin' : 'none',
      // page: pageno || page,
    });
  };

  const loadData = () => {
    getSalesData({
      project_id: projectId,
      role: modulePermission?.admin || isProjectAdmin ? 'admin' : 'none',
    });
    getCountryCodes({project_id: projectId});
    getAssignToData({project_id: projectId});
    getBrokersList({project_id: projectId});
    getPipelineData({project_id: selectedProject.id});
  };

  const onRefresh = async () => {
    loadData();
    loadVisitorData(page);
  };

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
        navToFilter={navToFilter}
        filterCount={filterCount}
      />

      <StatsRow visitorAnalytics={visitorAnalytics} />

      <View style={{flexGrow: 1}}>
        <RenderVisitors
          {...props}
          page={page}
          totalPage={totalPage}
          visitors={filteredVisitors}
          onRefresh={onRefresh}
          loadMore={loadMoreData}
          navToDetails={navToDetails}
          sourceTypeOptions={sourceTypeOptions}
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
    fontWeight: '500',
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
  noMoreData: {
    textAlign: 'center',
    backgroundColor: '#8e8e8e',
    color: '#fff',
  },
  editIcon: {
    borderRadius: 20,
  },
  filterCount: {
    position: 'absolute',
    top: -9,
    right: 15,
  },
});
