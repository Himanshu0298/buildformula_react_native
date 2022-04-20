import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Subheading, Text, Divider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {theme} from './src/styles/theme';
import {theme} from '../../../../styles/theme';

const CHALLAN_STATUS = [
  {color: 'green', value: 20},
  {color: 'red', value: 20},
  {color: 'orange', value: 20},
];

const Row = props => {
  const {data} = props;
  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      {data.map(item => {
        return (
          <View style={{width: '50%'}}>
            <Text>{item}</Text>
          </View>
        );
      })}
    </View>
  );
};

export const OrderNo = props => {
  const data1 = [11, 'Cement march'];
  const data2 = ['Rs 500', 'Quility Material Raamesh'];

  return (
    <View>
      <Text style={{color: theme.colors.primary}}>Material Order No.</Text>
      <Row data={data1} />
      <Row data={data2} />
    </View>
  );
};

const ChallanStatus = props => {
  return (
    <View>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <OpacityButton
          opacity={0.18}
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            marginRight: 15,
          }}

          // style={styles.addButton}
          // onPress={toggleAddDialog}
        >
          <Text style={{color: theme.colors.primary}}>6</Text>
        </OpacityButton>
        <Text>Electronic Material March 22</Text>
      </View>
      <Text style={{marginTop: 5}}>Challan Status</Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        {CHALLAN_STATUS.map(item => {
          return (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 20,
              }}>
              <MaterialCommunityIcons
                name="playlist-check"
                size={30}
                color={item.color}
                style={{marginRight: 5}}
              />
              <Text>({item.value})</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const Created = props => {
  return (
    <View>
      <Text style={{color: '#5E6D7C'}}>Created by</Text>
      <Text>Nilesh Gupta</Text>
      <Text>nileshratangupta@gmail.com</Text>
      <Text>28 Mar, 2022, 06:17PM</Text>
    </View>
  );
};

const OrderDetail = props => {
  const {navigation} = props;

  const onPress = () => {
    navigation.push('DeliveryDetails');
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: 20,
        padding: 10,
        backgroundColor: 'grey',
        borderRadius: 5,
      }}>
      <OrderNo />
      <Divider style={{height: 1, marginTop: 10, marginBottom: 10}} />
      <Created />
      <Divider style={{height: 1, marginTop: 10, marginBottom: 10}} />
      <ChallanStatus />
    </TouchableOpacity>
  );
};

const Header = () => {
  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Subheading style={{width: '50%', fontWeight: 'bold'}}>
          Material Utility
        </Subheading>
        <Subheading style={{width: '50%', fontWeight: 'bold'}}>
          Delivered
        </Subheading>
      </View>
      <Text>Select material order for which delivery to be added.</Text>
    </View>
  );
};

const MaterialUtility = props => {
  return (
    <View style={{padding: 20}}>
      <Header />
      <OrderDetail {...props} />
      <OrderDetail {...props} />
      <OrderDetail {...props} />
    </View>
  );
};

export default MaterialUtility;
