import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import NoResult from 'components/Atoms/NoResult';
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Subheading, Text, Divider, Caption} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {getShadow} from 'utils';
import {theme} from 'styles/theme';
import Spinner from 'react-native-loading-spinner-overlay';

const OrderDetails = props => {
  const {item} = props;
  const {material_order_no, total_material_charges} = item;

  return (
    <View style={styles.orderContainer}>
      <View style={styles.materialSection}>
        <Caption style={styles.materialSubSection}>Material Order no:</Caption>
        <Text>{material_order_no}</Text>
      </View>
      <View style={styles.materialSection}>
        <View style={styles.materialAmountSection}>
          <Caption style={styles.materialSubSection}>Order Amount:</Caption>
          <Text
            style={{
              color: theme.colors.primary,
            }}>{`₹ ${total_material_charges}`}</Text>
        </View>
      </View>
    </View>
  );
};

const CompanyDetails = props => {
  const {item} = props;
  const {company_name, supplier_name} = item;
  return (
    <View style={styles.orderContainer}>
      <View style={styles.companyDetailsContainer}>
        <Text>Company: </Text>
        <Text>{company_name}</Text>
      </View>
      <View style={styles.supplier}>
        <Text>Supplier: </Text>
        <Text>{supplier_name}</Text>
      </View>
    </View>
  );
};

const OrderCard = props => {
  const {navigation, item} = props;
  const {material_order_no, material_requests_id: materialId} = item;

  const handleNav = () => {
    if (materialId) {
      navigation.navigate('OrderDetail', {material_order_no, materialId});
    }
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handleNav}>
      <OpacityButton
        opacity={0.1}
        color={theme.colors.primary}
        style={styles.button}>
        <MaterialCommunityIcons
          name="arrow-right"
          color={theme.colors.primary}
          size={18}
        />
      </OpacityButton>
      <OrderDetails {...props} />
      <Divider style={styles.divider} />
      <CompanyDetails {...props} />
    </TouchableOpacity>
  );
};

const MaterialGRN = props => {
  const {getMaterialOrderList} = useMaterialManagementActions();

  const {materialOrderList, loading} = useSelector(s => s.materialManagement);

  const {selectedProject} = useSelector(s => s.project);

  React.useEffect(() => {
    getMaterialOrderList({project_id: selectedProject.id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reloadOrders = () => {
    getMaterialOrderList({project_id: selectedProject.id});
  };

  const renderEmpty = () => <NoResult />;

  return (
    <View style={styles.orderContainer}>
      <Subheading>Material GRN</Subheading>
      <Text>Select material order for which delivery to be added.</Text>
      <Spinner visible={loading} textContent="" />
      <FlatList
        data={materialOrderList}
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
  );
};

export default MaterialGRN;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 5,
    backgroundColor: '#fff',
    ...getShadow(2),
    marginTop: 20,
    borderRadius: 5,
  },
  orderContainer: {
    flexGrow: 1,
    padding: 10,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 50,
    paddingHorizontal: 2,
  },
  materialSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  materialSubSection: {
    flexDirection: 'row',
    fontSize: 14,
    marginRight: 10,
  },
  materialAmountSection: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  companyDetailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  supplier: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  divider: {
    height: 2,
  },
});
