import React from 'react';
import {View} from 'react-native';
import Header from '../CommonComponents/Header';
import {OrderNo} from '../MaterialUtility/MaterialUtility';

const DeliveryDetails = props => {
  return (
    <View style={{padding: 20}}>
      <Header title="Delivery Details" {...props} />
      <OrderNo />
    </View>
  );
};

export default DeliveryDetails;
