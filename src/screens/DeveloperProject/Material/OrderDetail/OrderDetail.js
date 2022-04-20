import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Subheading, Text, Divider, Caption, Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getShadow} from 'utils';
import {theme} from '../../../../styles/theme';
import Header from '../CommonComponents/Header';

const CHALLAN_DETAILS = [
  {label: 'Challan Number:', value: '90'},
  {label: 'Delivery Date', value: '1/1/2022'},
];
const CREATED_BY = [
  {
    label: 'Created by:',
    value: 'Nilesh Gupta',
    subValue: 'rinkupoonia162@gmail.com',
  },
];
const UPDATED_BY = [
  {
    label: 'Updated by:',
    value: 'Nilesh Gupta',
    subValue: 'rinkupoonia162@gmail.com',
  },
];

const orderedListData = [1, 2, 3, 4];

const RenderRow = props => {
  const {item} = props;
  return (
    <View>
      <Caption>{item.label}</Caption>
      <Text>{item.value}</Text>
      {item.subValue ? <Caption>{item.subValue}</Caption> : null}
    </View>
  );
};

const ChallanSection = () => {
  return (
    <View style={styles.challanContainer}>
      {CHALLAN_DETAILS.map(item => {
        return <RenderRow item={item} />;
      })}
    </View>
  );
};

const Created = () => {
  return (
    <View style={styles.createdContainer}>
      {CREATED_BY.map(item => {
        return <RenderRow item={item} />;
      })}
    </View>
  );
};
const Updated = () => {
  return (
    <View style={styles.updatedContainer}>
      {UPDATED_BY.map(item => {
        return <RenderRow item={item} />;
      })}
    </View>
  );
};

const Details = props => {
  const {navigation} = props;
  return (
    <View style={styles.orderedContainer}>
      {orderedListData.map(() => {
        return (
          <View style={styles.orderedItem}>
            <Caption>Ordered</Caption>
            <Text>3232</Text>
          </View>
        );
      })}
      <View style={styles.orderNavigation}>
        <OpacityButton
          opacity={0.1}
          color={theme.colors.primary}
          style={styles.button}
          onPress={() => navigation.navigate('MaterialList')}>
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
  const {navigation} = props;
  return (
    <View style={styles.commonCard}>
      <ChallanSection />
      <Created />
      <Divider style={styles.divider} />
      <View style={styles.statusContainer}>
        <Updated />
        <View style={styles.statusHeading}>
          <Caption> Status</Caption>
          <Text>Pending</Text>
        </View>
      </View>

      <Button
        mode="contained"
        style={styles.viewButton}
        onPress={() => navigation.navigate('DeliveryDetails')}>
        View
      </Button>
    </View>
  );
};

const OrderDetail = props => {
  const {navigation} = props;
  return (
    <View style={styles.headerContainer}>
      <Header title="M.O. No.: 11" />
      <Details {...props} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subheadingContainer}>
          <Subheading>Challans</Subheading>
          <OpacityButton
            opacity={0.1}
            color={theme.colors.primary}
            onPress={() => navigation.navigate('AddChallan')}>
            <MaterialCommunityIcons
              name="plus"
              color={theme.colors.primary}
              size={18}
            />
            <Text style={{color: theme.colors.primary}}>Add Challan</Text>
          </OpacityButton>
        </View>
        <CommonCard {...props} />
        <CommonCard />
      </ScrollView>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  challanContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
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
  orderedItem: {
    margin: 5,
    paddingVertical: 10,
    paddingRight: 1,
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
    borderWidth: 1,
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
    padding: 20,
  },
  subheadingContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 15,
    flex: 1,
  },
});
