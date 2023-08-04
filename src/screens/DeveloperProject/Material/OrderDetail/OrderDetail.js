import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Subheading,
  Text,
  Divider,
  Caption,
  Button,
  Dialog,
  Portal,
  Menu,
  IconButton,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {getShadow} from 'utils';
import {MODIFY_REQUEST_STATUS} from 'utils/constant';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {useAlert} from 'components/Atoms/Alert';
import {theme} from '../../../../styles/theme';
import Header from '../CommonComponents/Header';
import MenuDialog from '../MaterialGRN/Components/MenuDialog';

const FILTER = [
  {value: 'all', label: 'All'},
  {value: 'pending', label: 'Pending'},
  {value: 'rejected', label: 'Rejected'},
  {value: 'approved', label: 'Approved'},
];

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

const OnStatusUpdate = props => {
  const {visible, updateStatus, toggleAddDialog} = props;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleAddDialog}>
        <View style={styles.buttonRow}>
          <Button
            compact
            mode="outlined"
            color="green"
            onPress={() => updateStatus('approved')}>
            Approved
          </Button>
          <Button
            mode="outlined"
            color="red"
            compact
            onPress={() => updateStatus('rejected')}>
            Rejected
          </Button>
          <Button
            color="orange"
            mode="outlined"
            compact
            onPress={() => updateStatus('pending')}>
            Pending
          </Button>
        </View>
      </Dialog>
    </Portal>
  );
};

function ChallanSection(props) {
  const {item, onDelete, onUpdate, onUpdateStatus} = props;
  const {created, id: materialId, challan_status: status, delivery_date} = item;

  return (
    <View style={styles.challanContainer}>
      <View style={styles.challanSection}>
        <RenderRow
          item={{label: 'Challan Number', value: item.challan_number}}
        />
        <RenderRow
          item={{
            label: 'Delivery Date',
            value: dayjs(delivery_date).format('DD MMM YYYY'),
          }}
        />
        <MenuDialog
          onUpdate={onUpdate}
          onDelete={() => onDelete(materialId)}
          status={status}
          onUpdateStatus={onUpdateStatus}
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
      <View style={{marginBottom: 10}}>
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
    </View>
  );
};

function CommonCard(props) {
  const {
    navigation,
    materialOrderNo: orderNumber,
    item,
    onDelete,
    onUpdateStatus,
  } = props;

  const onUpdate = () => {
    navigation.navigate('AddChallan', {materialId: item.id, item, orderNumber});
  };

  return (
    <View style={styles.commonCard}>
      <ChallanSection
        item={item}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onUpdateStatus={onUpdateStatus}
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

  const alert = useAlert();

  const {getMaterialChallanList, deleteChallan, updateDirectGRNStatus} =
    useMaterialManagementActions();
  const {materialChallanList, materialOrderList, loading} = useSelector(
    s => s.materialManagement,
  );

  const {selectedProject} = useSelector(s => s.project);

  const [addDialog, setAddDialog] = React.useState(false);
  const [selectedMaterialId, setSelectedMaterialId] = React.useState();
  const [sort, setSort] = React.useState('all');
  const [visible, setVisible] = React.useState(false);

  const toggleMenu = () => setVisible(v => !v);

  const toggleAddDialog = () => setAddDialog(v => !v);

  const materialDeliveryChallan = useMemo(() => {
    return materialChallanList?.infoData?.material_delivery_challan || [];
  }, [materialChallanList]);

  const project_id = selectedProject?.id;

  React.useEffect(() => {
    getList(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedMaterial = useMemo(() => {
    return materialOrderList?.find(
      i => i.material_order_no === material_order_no,
    );
  }, [materialOrderList, material_order_no]);

  const filteredChallan = useMemo(() => {
    if (sort === 'all') return materialDeliveryChallan;
    return materialDeliveryChallan.filter(i => i.challan_status === sort);
  }, [materialDeliveryChallan, sort]);

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

  const onUpdateStatus = id => {
    setSelectedMaterialId(id);
    toggleAddDialog();
  };

  const handleUpdateStatus = status => {
    toggleAddDialog();

    const restData = {
      project_id: selectedProject.id,
      challan_id: selectedMaterialId,
      status,
    };

    alert.show({
      title: 'Confirm',
      message: `Are you sure you want to change the status to ${status}?`,
      confirmText: 'Yes',
      onConfirm: async () => {
        await updateDirectGRNStatus(restData);
        getList();
      },
    });
  };

  return (
    <View style={styles.headerContainer}>
      <OnStatusUpdate
        toggleAddDialog={toggleAddDialog}
        visible={addDialog}
        updateStatus={handleUpdateStatus}
      />
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
          <View style={{flexDirection: 'row'}}>
            <OpacityButton
              opacity={0.1}
              color={theme.colors.primary}
              onPress={() =>
                navigation.navigate('AddChallan', {
                  material_order_no,
                  materialId,
                })
              }>
              <MaterialCommunityIcons
                name="plus"
                color={theme.colors.primary}
                size={18}
              />
              <Text style={{color: theme.colors.primary}}>Add Challan</Text>
            </OpacityButton>
            <Menu
              style={styles.filterMenu}
              visible={visible}
              onDismiss={toggleMenu}
              anchor={
                <IconButton
                  icon="filter-variant"
                  size={23}
                  onPress={toggleMenu}
                  color="#4872f4"
                  style={styles.iconButton}
                />
              }>
              {FILTER.map((i, index) => {
                const active = i.value === sort;
                return (
                  <Menu.Item
                    index={index?.toString()}
                    title={i.label}
                    style={active ? styles.menuItem : {}}
                    titleStyle={active ? styles.titleStyle : {}}
                    onPress={() => {
                      setSort(i.value);
                      toggleMenu();
                    }}
                  />
                );
              })}
            </Menu>
          </View>
        </View>
        {filteredChallan?.map(item => {
          return (
            <CommonCard
              {...props}
              item={item}
              key={item.id}
              challanList={materialOrderList}
              materialOrderNo={material_order_no}
              onDelete={onDelete}
              onUpdateStatus={() => onUpdateStatus(item.id)}
              toggleAddDialog={toggleAddDialog}
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
  buttonRow: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconButton: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
  },
  menuItem: {
    backgroundColor: '#4872f4',
  },
  titleStyle: {
    color: '#fff',
  },
});
