import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {getShadow} from 'utils';
import {theme} from 'styles/theme';
import NoResult from 'components/Atoms/NoResult';
import {Caption, Searchbar, FAB} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {MODIFY_REQUEST_STATUS} from 'utils/constant';

const renderEmpty = () => <NoResult />;

const OrderCard = props => {
  const {navigation, item} = props;

  const {
    id,
    delivery_date,
    created,
    first_name,
    last_name,
    company_name,
    supplier_name,
    challan_status,
  } = item;

  const handleNav = () => {
    navigation.navigate('DirectGRNPreview', {id});
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handleNav}>
      <View style={styles.bodyContent}>
        <View style={styles.idBox}>
          <Text style={{color: theme.colors.primary}}>{id}</Text>
        </View>
        <View style={styles.row}>
          <Caption>Status: </Caption>
          <Text
            style={{
              color: MODIFY_REQUEST_STATUS[item.challan_status]?.color,
            }}>
            {challan_status}
          </Text>
        </View>
        <View style={styles.row}>
          <Caption>GRN Date: </Caption>
          <Text>{delivery_date}</Text>
        </View>
        <View style={styles.row}>
          <Caption>Created by: </Caption>
          <Text>
            {first_name} {last_name}
          </Text>
        </View>
        <View style={styles.row}>
          <Caption>Created Date: </Caption>
          <Text>{created}</Text>
        </View>
        <View style={styles.row}>
          <Caption>Company Name: </Caption>
          <Text>{company_name}</Text>
        </View>
        <View style={styles.row}>
          <Caption>Supplier Name: </Caption>
          <Text>{supplier_name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DirectGRN = props => {
  const {navigation} = props;

  const {getDirectMaterialGRNList} = useMaterialManagementActions();

  const [searchQuery, setSearchQuery] = React.useState('');

  const {selectedProject} = useSelector(s => s.project);
  const {directGRNList} = useSelector(s => s.materialManagement);

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = () => {
    getDirectMaterialGRNList({
      project_id: selectedProject.id,
    });
  };

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return directGRNList?.infoData?.filter(
      i =>
        i?.first_name?.toLowerCase().includes(query) ||
        i?.last_name?.toLowerCase().includes(query),
    );
  }, [directGRNList, searchQuery]);

  const onSearch = v => setSearchQuery(v);

  return (
    <View style={styles.mainContainer}>
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={onSearch}
        style={styles.search}
      />
      <FlatList
        data={filteredUsers}
        refreshControl={<RefreshControl refreshing={false} />}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.material_order_no}
        ListEmptyComponent={renderEmpty}
        renderItem={({item}) => {
          return <OrderCard navigation={navigation} item={item} />;
        }}
      />
      <FAB
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        large
        icon="plus"
        onPress={() => navigation.navigate('AddDirectGRN')}
      />
    </View>
  );
};

export default DirectGRN;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    padding: 10,
    flex: 1,
  },
  cardContainer: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 1,
    backgroundColor: '#fff',
    ...getShadow(4),
    borderRadius: 5,
    flex: 1,
  },

  idBox: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  search: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    ...getShadow(2),
    marginVertical: 10,
    marginHorizontal: 2,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
