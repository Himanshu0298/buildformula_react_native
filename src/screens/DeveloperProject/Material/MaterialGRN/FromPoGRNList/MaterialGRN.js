import NoResult from 'components/Atoms/NoResult';
import React, {useMemo} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Text, ProgressBar, Searchbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {getShadow} from 'utils';
import {theme} from 'styles/theme';
import Spinner from 'react-native-loading-spinner-overlay';

function OrderCard(props) {
  const {navigation, item} = props;
  const {
    material_order_no,
    material_request_id,
    materialrequestid,
    company_name,
    supplier_name,
    percentage,
    finalized_amount,
  } = item;

  const progressBar = Math.round(percentage) / 100;

  const materialId = Number(material_request_id || materialrequestid);

  const handleNav = () => {
    navigation.navigate('OrderDetail', {material_order_no, materialId});
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handleNav}>
      <View style={styles.cardHeader}>
        <View style={styles.idBox}>
          <Text style={{color: theme.colors.primary}}>{material_order_no}</Text>
        </View>
        <View style={styles.amountBox}>
          <Text>{`₹ ${finalized_amount || 0}`}</Text>
        </View>
      </View>
      <View style={styles.bodyContent}>
        <View style={styles.detailsBox}>
          <Text style={styles.companyName}>{company_name}</Text>
          <View />
          <View style={styles.cardHeader}>
            <Text style={styles.supplierName}>{supplier_name}</Text>
            <Text>{`${percentage} %`}</Text>
          </View>
        </View>
        <ProgressBar progress={progressBar} color={theme.colors.success} />
      </View>
    </TouchableOpacity>
  );
}

function MaterialGRN(props) {
  const {getMaterialOrderList} = useMaterialManagementActions();

  const {materialOrderList, loading} = useSelector(s => s.materialManagement);
  const {selectedProject} = useSelector(s => s.project);

  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    getMaterialOrderList({project_id: selectedProject.id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredOrders = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return materialOrderList.filter(
      i =>
        i?.supplier_name?.toLowerCase().includes(query) ||
        i?.company_name?.toLowerCase().includes(query) ||
        i?.materialrequesttitle?.toLowerCase().includes(query),
    );
  }, [materialOrderList, searchQuery]);

  const reloadOrders = () => {
    getMaterialOrderList({project_id: selectedProject.id});
  };

  const onSearch = v => setSearchQuery(v);

  const renderEmpty = () => <NoResult />;

  return (
    <View style={styles.orderContainer}>
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={onSearch}
        style={styles.search}
      />
      <View style={[styles.orderContainer, styles.orderMainBox]}>
        <Spinner visible={loading} textContent="" />
        <FlatList
          data={filteredOrders}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={reloadOrders} />
          }
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.material_order_no}
          ListEmptyComponent={renderEmpty}
          renderItem={({item}) => {
            return <OrderCard {...props} item={item} />;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    backgroundColor: '#fff',
    ...getShadow(2),
    marginVertical: 10,
    borderRadius: 5,
    flex: 1,
  },
  orderContainer: {
    flexGrow: 1,
    padding: 10,
    flex: 1,
  },
  orderMainBox: {
    padding: 0,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 2,
  },
  search: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    ...getShadow(2),
    marginVertical: 10,
    marginHorizontal: 2,
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  idBox: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  amountBox: {
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  detailsBox: {
    marginVertical: 5,
  },
  companyName: {
    color: theme.colors.primary,
  },
});

export default MaterialGRN;
