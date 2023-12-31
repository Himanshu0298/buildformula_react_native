import React, {useEffect} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Text, Divider, Caption} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import NoResult from 'components/Atoms/NoResult';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {theme} from 'styles/theme';
import {getShadow} from 'utils';
import Header from '../CommonComponents/Header';

const RenderRow = props => {
  const {item, damage} = props;
  return (
    <View style={styles.renderContainer}>
      <Caption numberOfLines={1} style={styles.label}>
        {item.label}
      </Caption>
      <Text style={{color: damage && theme.colors.red}}>{item.value}</Text>
    </View>
  );
};

const Quantity = props => {
  const {item} = props;

  const {material_quantity, quantity_list, damage_list, missing, remaining} =
    item || {};
  return (
    <View style={styles.quantityContainer}>
      <Text>Quantity</Text>

      <View style={styles.itemContainer}>
        <RenderRow item={{label: 'LOM: ', value: item?.lomtitle || '-'}} />
        <RenderRow
          item={{
            label: 'Qty Ordered: ',
            value: material_quantity,
          }}
        />
      </View>
      <View style={styles.itemContainer}>
        <RenderRow item={{label: 'Qty Delivered: ', value: quantity_list}} />
        <RenderRow item={{label: 'Qty Damage: ', value: damage_list}} damage />
      </View>
      <View style={styles.itemContainer}>
        <RenderRow
          item={{
            label: 'Qty Missing: ',
            value: missing,
          }}
        />
        <RenderRow item={{label: 'Qty Remaining: ', value: remaining}} />
      </View>
    </View>
  );
};

const DetailsCard = props => {
  const {item, materialChallanList} = props;
  const {
    category_title,
    sub_category_title,
    subcategory_title,
    work_units_title,
    unit_title,
  } = item;

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.subHeading}>
        <Text style={{color: theme.colors.primary}}>{category_title}</Text>
        <MaterialCommunityIcons
          name="label"
          size={20}
          style={[styles.labelIcon, {color: theme.colors.primary}]}
        />
        <Text style={{color: theme.colors.primary}}>
          {`${sub_category_title || subcategory_title} ${
            work_units_title || unit_title || ''
          }`}
        </Text>
      </View>
      <Divider style={styles.divider} />
      <Quantity {...props} materialChallanList={materialChallanList} />
    </View>
  );
};

const MaterialList = props => {
  const {route} = props;
  const {materialId, materialOrderNo} = route?.params || {};

  const {getSelectMaterialChallan} = useMaterialManagementActions();

  const {materialChallanList, selectedMaterialChallan, loading} = useSelector(
    s => s.materialManagement,
  );
  const {selectedProject} = useSelector(s => s.project);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialChallanList]);

  const loadData = () =>
    getSelectMaterialChallan({
      project_id: selectedProject.id,
      material_request_id: materialId,
      material_order_no: materialOrderNo,
    });

  const renderEmpty = () => <NoResult />;

  return (
    <View style={styles.materialContainer}>
      <Header title="List " {...props} />
      <Spinner visible={loading} textContent="" />
      <FlatList
        data={selectedMaterialChallan}
        extraData={selectedMaterialChallan}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={loadData} />
        }
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmpty}
        renderItem={({item}) => {
          return (
            <DetailsCard
              {...props}
              item={item}
              materialChallanList={materialChallanList}
            />
          );
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
  contentContainerStyle: {
    flexGrow: 1,
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
    flexGrow: 1,
  },
});
