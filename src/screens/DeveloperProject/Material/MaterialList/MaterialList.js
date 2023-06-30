import NoResult from 'components/Atoms/NoResult';
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
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
  const {materialChallanList} = props;
  const {damaged_quentity, delivered_quentity, total_quentity, remaining} =
    materialChallanList.infoData;

  return (
    <View style={styles.quantityContainer}>
      <Text>Quantity</Text>

      <View style={styles.itemContainer}>
        <RenderRow
          item={{label: 'Ordered: ', value: total_quentity?.material_quantity}}
        />
        <RenderRow item={{label: 'Remaining: ', value: remaining}} />
      </View>
      <View style={styles.itemContainer}>
        <RenderRow
          item={{label: 'Delivered: ', value: delivered_quentity?.quantity}}
        />
        <RenderRow
          item={{label: 'Damage: ', value: damaged_quentity?.damage}}
        />
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

  const {materialChallanList, selectedMaterialChallan} = useSelector(
    s => s.materialManagement,
  );
  const {selectedProject} = useSelector(s => s.project);

  const [materialList, setMaterialList] = useState(
    selectedMaterialChallan || [],
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialChallanList]);

  // const loadData = async () => {
  //   const resList = await Promise.all(
  //     materialChallanList?.workData.material_delivery_challan?.map(async i => {
  //       const {data} = await getSelectMaterialChallan({
  //         project_id: selectedProject.id,
  //         material_request_id: materialId,
  //         material_order_no: materialOrderNo,
  //       });

  //       return data?.data || [];
  //     }),
  //   );

  //   setMaterialList(resList.flat());
  //   setLoading(false);
  // };

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
        data={materialList}
        extraData={materialList}
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
