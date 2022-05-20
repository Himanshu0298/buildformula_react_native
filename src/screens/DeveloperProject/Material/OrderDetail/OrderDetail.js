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
import {theme} from '../../../../styles/theme';
import Header from '../CommonComponents/Header';

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

const ChallanSection = props => {
  const {item} = props;
  const {created} = item;
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
      </View>
    </View>
  );
};

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
  const {navigation, materialOrderNo, summaryData} = props;
  const {damage, delivered, ordered, remaining} = summaryData;
  return (
    <View style={styles.orderedContainer}>
      <View style={styles.orderedItem}>
        <View style={styles.itemContainer}>
          <RenderRow
            item={{label: 'Ordered  ', value: ordered}}
            containerStyle={styles.orderedListValue}
          />
          <RenderRow
            item={{label: 'Delivered  ', value: delivered}}
            containerStyle={styles.orderedListValue}
          />
        </View>
        <View style={styles.itemContainer}>
          <RenderRow
            item={{label: 'Damage  ', value: damage}}
            containerStyle={styles.orderedListValue}
          />
          <RenderRow
            item={{label: 'Remaining   ', value: remaining}}
            containerStyle={styles.orderedListValue}
          />
        </View>
      </View>
      <View style={styles.orderNavigation}>
        <OpacityButton
          opacity={0.1}
          color={theme.colors.primary}
          style={styles.button}
          onPress={() =>
            navigation.navigate('MaterialList', {materialOrderNo})
          }>
          <MaterialCommunityIcons
            name="chevron-right"
            color={theme.colors.primary}
            size={18}
          />
        </OpacityButton>
      </View>
    </View>
  );
};

const CommonCard = props => {
  const {navigation, materialOrderNo: orderNumber, item} = props;
  return (
    <View style={styles.commonCard}>
      <ChallanSection item={item} />
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
};

const OrderDetail = props => {
  const {navigation, route} = props;

  const {material_order_no, materialId} = route?.params || {};

  const {getMaterialChallanList} = useMaterialManagementActions();
  const {materialChallanList, materialOrderList, loading} = useSelector(
    s => s.materialManagement,
  );

  const {selectedProject} = useSelector(s => s.project);

  React.useEffect(() => {
    getMaterialChallanList({project_id: selectedProject.id, material_order_no});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedMaterial = useMemo(() => {
    return materialOrderList?.find(
      i => i.material_order_no === material_order_no,
    );
  }, [materialOrderList, material_order_no]);

  return (
    <View style={styles.headerContainer}>
      <Header title={`M.O. No. : ${material_order_no}`} {...props} />
      <Details
        {...props}
        materialOrderNo={material_order_no}
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
        {materialChallanList.map(item => {
          return (
            <CommonCard
              {...props}
              item={item}
              challanList={materialChallanList}
              materialOrderNo={material_order_no}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

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
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    ...getShadow(1),
    borderRadius: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderedListValue: {
    alignItems: 'center',
  },
  orderedItem: {
    margin: 5,
    paddingVertical: 10,
    paddingRight: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  orderNavigation: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
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
});
