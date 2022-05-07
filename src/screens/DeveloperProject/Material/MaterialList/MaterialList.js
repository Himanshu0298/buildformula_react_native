import NoResult from 'components/Atoms/NoResult';
import React, {useMemo} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {Text, Divider, Caption} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {theme} from 'styles/theme';
import {getShadow} from 'utils';
import Header from '../CommonComponents/Header';

const RenderRow = props => {
  const {item} = props;
  return (
    <View style={styles.renderContainer}>
      <Caption numberOfLines={1} style={styles.label}>
        {item.label}
      </Caption>
      <Text>{item.value}</Text>
    </View>
  );
};

const Quantity = props => {
  const {item} = props;
  const {quantity: summary} = item;

  return (
    <View style={styles.quantityContainer}>
      <Text>Quantity</Text>

      <View style={styles.itemContainer}>
        <RenderRow item={{label: 'Ordered: ', value: summary.ordered}} />
        <RenderRow item={{label: 'Remaining: ', value: summary.remaining}} />
      </View>
      <View style={styles.itemContainer}>
        <RenderRow item={{label: 'Delivered: ', value: summary.delivered}} />
        <RenderRow item={{label: 'Damage: ', value: summary.damage}} />
      </View>
    </View>
  );
};

const DetailsCard = props => {
  const {item} = props;
  const {material, sub_material, unit} = item;

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.subHeading}>
        <Text style={{color: theme.colors.primary}}>{material}</Text>
        <MaterialCommunityIcons
          name="label"
          size={20}
          style={[styles.labelIcon, {color: theme.colors.primary}]}
        />
        <Text style={{color: theme.colors.primary}}>
          {`${sub_material} ${unit}`}
        </Text>
      </View>
      <Divider style={styles.divider} />
      <Quantity {...props} />
    </View>
  );
};

const MaterialList = props => {
  const {route} = props;
  const {materialOrderNo} = route?.params || {};

  const {getMaterialOrderList} = useMaterialManagementActions();

  const {materialOrderList} = useSelector(s => s.materialManagement);
  const {selectedProject} = useSelector(s => s.project);

  const {summary} = useMemo(() => {
    return materialOrderList?.find(
      i => i.material_order_no === materialOrderNo,
    );
  }, [materialOrderList, materialOrderNo]);

  const reloadOrders = () => {
    getMaterialOrderList({project_id: selectedProject.id});
  };

  const renderEmpty = () => <NoResult />;

  return (
    <View style={styles.materialContainer}>
      <Header title="List" {...props} />
      <FlatList
        data={summary?.summaryDetails || []}
        extraData={summary?.summaryDetails || []}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={reloadOrders} />
        }
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmpty}
        renderItem={({item}) => {
          return <DetailsCard {...props} item={item} />;
        }}
      />
    </View>
  );
};

export default MaterialList;

const styles = StyleSheet.create({
  renderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
  },
  quantityContainer: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    ...getShadow(2),
    borderRadius: 5,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  subHeading: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelIcon: {
    marginLeft: 5,
    marginRight: 5,
  },
  divider: {
    height: 2,
  },
  materialContainer: {
    paddingHorizontal: 15,
    flex: 1,
  },
});
