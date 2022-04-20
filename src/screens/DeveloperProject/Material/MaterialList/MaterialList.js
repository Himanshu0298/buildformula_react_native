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
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getShadow} from 'utils';
import {theme} from '../../../../styles/theme';
import Header from '../CommonComponents/Header';

const data = [1, 2];

const data2 = [1, 2, 3, 4, 5, 6];

const Row = props => {
  return (
    <View style={{flexDirection: 'row', marginTop: 5}}>
      {data.map(() => {
        return (
          <View style={{width: '50%', flexDirection: 'row'}}>
            <Text>Ordered: </Text>
            <Text>2000</Text>
          </View>
        );
      })}
    </View>
  );
};

const CommonCard = props => {
  return (
    <View style={{backgroundColor: 'red', marginTop: 20}}>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text>Brick</Text>
        <MaterialCommunityIcons
          name="label"
          size={20}
          style={{marginLeft: 5, marginRight: 5}}
        />
        <Text>Brick Bricks 6 inch, Nos</Text>
      </View>
      <Divider style={{height: 3}} />
      <View style={{padding: 10}}>
        <Text>Quantity</Text>
        <Row />
        <Row />
      </View>
    </View>
  );
};

const MaterialList = props => {
  return (
    <View style={{padding: 20}}>
      <Header title="List" />
      {data2.map(() => {
        return <CommonCard {...props} />;
      })}
    </View>
  );
};

export default MaterialList;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#999999',
    marginTop: 20,
  },
});
