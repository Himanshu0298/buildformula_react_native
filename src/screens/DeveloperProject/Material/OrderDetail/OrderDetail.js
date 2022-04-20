import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React, {useRef, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import {
  IconButton,
  Subheading,
  Text,
  FAB,
  withTheme,
  Divider,
  Caption,
  Headline,
  Button,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getShadow} from 'utils';
import {theme} from '../../../../styles/theme';
import Header from '../CommonComponents/Header';

const data2 = [1, 2, 3, 4];

const Row = props => {
  const {data} = props;
  return (
    <View style={{display: 'flex'}}>
      {data.map(item => {
        return (
          <View>
            <Text>{item}</Text>
          </View>
        );
      })}
    </View>
  );
};

export const OrderNo = props => {
  const data1 = ['Challan Number', 90, 'rinkupoonia162@gmail.com'];
  const data3 = ['Delivery Date', '1/1/2021'];

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 10,
      }}>
      <Row data={data1} />
      <Row data={data3} />
    </View>
  );
};

const Created = props => {
  return (
    <View style={{paddingHorizontal: 10}}>
      <Text style={{color: '#5E6D7C', marginBottom: 5}}>Created by</Text>
      <Text>Nilesh Gupta</Text>
      <Text>nileshratangupta@gmail.com</Text>
    </View>
  );
};

const Details = () => {
  return (
    <View style={{flexDirection: 'row', padding: 10, marginTop: 20}}>
      {data2.map(() => {
        return (
          <View style={{width: '20%'}}>
            <Text>Ordered</Text>
            <Text>3232</Text>
          </View>
        );
      })}
      <View
        style={{
          width: '20%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <OpacityButton
          opacity={0.1}
          color={theme.colors.primary}
          style={{borderRadius: 20}}>
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
  return (
    <View
      style={{
        marginTop: 20,
        backgroundColor: 'grey',
        paddingVertical: 10,
      }}>
      <OrderNo />
      <Created />
      <Divider style={{height: 2, marginVertical: 10}} />
      <OrderNo />
      <Button
        mode="contained"
        style={{width: '30%', marginLeft: 10}}
        onPress={() => console.log('Pressed')}>
        View
      </Button>
    </View>
  );
};

const OrderDetail = props => {
  return (
    <View style={{padding: 20}}>
      <Header title="M.O. No.: 11" />
      <Details />
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <Subheading>Challans</Subheading>
        <OpacityButton opacity={0.1} color={theme.colors.primary}>
          <MaterialCommunityIcons
            name="plus"
            color={theme.colors.primary}
            size={18}
          />
          <Text style={{color: theme.colors.primary}}>Add Challan</Text>
        </OpacityButton>
      </View>
      <CommonCard />
      <CommonCard />
      <CommonCard />
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#999999',
    marginTop: 20,
  },
});
