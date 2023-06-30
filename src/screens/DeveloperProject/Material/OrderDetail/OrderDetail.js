import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Subheading, Text, Divider, Caption, Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {getShadow} from 'utils';
import {MODIFY_REQUEST_STATUS} from 'utils/constant';
import dayjs from 'dayjs';
import {useAlert} from 'components/Atoms/Alert';
import {theme} from '../../../../styles/theme';
import Header from '../CommonComponents/Header';
import MenuDialog from '../MaterialGRN/Components/MenuDialog';

const RenderRow = props => {
  const {item, containerStyle} = props;
  return (
    <View style={containerStyle}>
      <Caption>{item.label}</Caption>
      <Text>{item.value}</Text>
      {item.subValue ? <Caption>{item.subValue}</Caption> : null}
    </View>
  );
};

function ChallanSection(props) {
  const {item, onDelete, navigation, orderNumber, updateStatus} = props;

  const {created} = item;

  const materialId = item.id;

  const onUpdate = () => {
    navigation.navigate('AddChallan', {materialId, item, orderNumber});
  };

  return (
    <View style={styles.challanContainer}>
      <View style={styles.challanSection}>
        <RenderRow
          item={{label: 'Challan Number', value: item.challan_number}}
        />
        <RenderRow
          item={{
            label: 'Delivery Date',
            value: dayjs(created).format('DD MMM YYYY'),
          }}
        />
        <MenuDialog
          onUpdate={onUpdate}
          onDelete={() => onDelete(materialId)}
          onUpdateStatus={updateStatus}
        />
      </View>
    </View>
  );
}

const Created = props => {
  const {item} = props;

  return (
    <View style={styles.createdContainer}>
      <RenderRow
        item={{
          label: 'Created by',
          value: `${item.first_name} ${item.last_name}`,
          subValue: item.email,
        }}
      />
    </View>
  );
};

const Updated = props => {
  const {item} = props;

  return (
    <View style={styles.updatedContainer}>
      <RenderRow
        item={{
          label: 'Updated by',
          value: `${item.first_name} ${item.last_name}`,
          subValue: item.email,
        }}
      />
    </View>
  );
};

const Details = props => {
  const {
    navigation,
    materialOrderNo,
    materialChallanList,
    finalized_amount,
    materialId,
  } = props;
  const {damaged_quentity, delivered_quentity, total_quentity, remaining} =
    materialChallanList?.infoData || {};

  const {company_name, supplier_name, crated} =
    materialChallanList.workorder || {};

  return (
    <View style={styles.orderedContainer}>
      <View style={styles.orderedItem}>
        <RenderRow
          item={{label: 'Ordered', value: total_quentity?.material_quantity}}
          containerStyle={styles.orderedListValue}
        />
        <RenderRow
          item={{label: 'Delivered', value: delivered_quentity?.quantity}}
          containerStyle={styles.orderedListValue}
        />
        <RenderRow
          item={{label: 'Damage', value: damaged_quentity?.damage}}
          containerStyle={styles.orderedListValue}
        />
        <RenderRow
          item={{label: 'Remaining', value: remaining}}
          containerStyle={styles.orderedListValue}
        />

        <OpacityButton
          opacity={0.1}
          color={theme.colors.primary}
          style={styles.button}
          onPress={() =>
            navigation.navigate('MaterialList', {materialOrderNo, materialId})
          }>
          <MaterialCommunityIcons
            name="chevron-right"
            color={theme.colors.primary}
            size={18}
          />
        </OpacityButton>
      </View>
      <View style={styles.orderedList}>
        <Caption> Company Name: </Caption>
        <Text>{company_name} </Text>
      </View>
      <View style={styles.orderedList}>
        <Caption> Supplier Name: </Caption>
        <Text>{supplier_name} </Text>
      </View>
      <View style={styles.orderedList}>
        <Caption> Finalize Amount: </Caption>
        <Text>{finalized_amount} </Text>
      </View>
      <View style={styles.orderedList}>
        <Caption> PO Date: </Caption>
        <Text>{crated} </Text>
      </View>
    </View>
  );
};

function CommonCard(props) {
  const {
    navigation,
    materialOrderNo: orderNumber,
    item,
    onDelete,
    updateStatus,
  } = props;

  return (
    <View style={styles.commonCard}>
      <ChallanSection
        item={item}
        onDelete={onDelete}
        navigation={navigation}
        orderNumber={orderNumber}
        updateStatus={updateStatus}
      />
      <Created item={item} />
      <Divider style={styles.divider} />
      <View style={styles.statusContainer}>
        <Updated item={item} />
        <View style={styles.statusHeading}>
          <Caption> Status</Caption>
          <Text
            style={{
              color: MODIFY_REQUEST_STATUS[item.challan_status]?.color,
            }}>
            {item.challan_status}
          </Text>
        </View>
      </View>

      <Button
        mode="contained"
        style={styles.viewButton}
        onPress={() =>
          navigation.navigate('DeliveryDetails', {item, orderNumber})
        }>
        View
      </Button>
    </View>
  );
}

function OrderDetail(props) {
  const {navigation, route} = props;

  const {material_order_no, materialId, finalized_amount} = route?.params || {};

  const {getMaterialChallanList, deleteChallan, updateDirectGRNStatus} =
    useMaterialManagementActions();
  const {materialChallanList, materialOrderList, loading} = useSelector(
    s => s.materialManagement,
  );

  const materialDeliveryChallan =
    materialChallanList?.infoData?.material_delivery_challan || [];

  const {selectedProject} = useSelector(s => s.project);

  const project_id = selectedProject?.id;

  const alert = useAlert();

  React.useEffect(() => {
    getList(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedMaterial = useMemo(() => {
    return materialOrderList?.find(
      i => i.material_order_no === material_order_no,
    );
  }, [materialOrderList, material_order_no]);

  const getList = () => getMaterialChallanList({project_id, material_order_no});

  const onDelete = challanId => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteChallan({
          project_id,
          material_order_no,
          material_delivery_challan_id: challanId,
        }).then(() => {
          getList();
        });
      },
    });
  };

  const updateStatus = async status => {
    const restData = {
      project_id: selectedProject.id,
      challan_id: materialId,
      status,
    };
    await updateDirectGRNStatus(restData);
    getList();
  };
  return (
    <View style={styles.headerContainer}>
      <Header title={`PO ID : ${material_order_no}`} {...props} />
      <Details
        {...props}
        materialOrderNo={material_order_no}
        materialChallanList={materialChallanList}
        finalized_amount={finalized_amount}
        materialId={materialId}
        summaryData={selectedMaterial?.summary || []}
      />
      <Spinner visible={loading} textContent="" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subheadingContainer}>
          <Subheading>Challans</Subheading>
          <OpacityButton
            opacity={0.1}
            color={theme.colors.primary}
            onPress={() =>
              navigation.navigate('AddChallan', {material_order_no, materialId})
            }>
            <MaterialCommunityIcons
              name="plus"
              color={theme.colors.primary}
              size={18}
            />
            <Text style={{color: theme.colors.primary}}>Add Challan</Text>
          </OpacityButton>
        </View>
        {materialDeliveryChallan?.map(item => {
          return (
            <CommonCard
              {...props}
              item={item}
              key={item.id}
              challanList={materialOrderList}
              materialOrderNo={material_order_no}
              onDelete={onDelete}
              updateStatus={updateStatus}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default OrderDetail;

const styles = StyleSheet.create({
  challanContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  challanSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createdContainer: {
    paddingHorizontal: 10,
    padding: 5,
  },
  updatedContainer: {
    paddingHorizontal: 7,
    padding: 5,
  },
  orderedContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    ...getShadow(1),
    borderRadius: 5,
  },
  orderedListValue: {
    alignItems: 'center',
  },
  orderedItem: {
    flexGrow: 1,
    margin: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
  },
  commonCard: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    ...getShadow(2),
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 2,
    marginBottom: 3,
  },
  divider: {
    height: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  statusHeading: {
    marginRight: 20,
    paddingTop: 5,
  },
  viewButton: {
    width: '30%',
    marginLeft: 10,
  },
  headerContainer: {
    paddingHorizontal: 15,
    flex: 1,
  },
  subheadingContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 15,
    flex: 1,
  },

  orderedList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
