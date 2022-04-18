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

const OrderDetails = () => {
  return (
    <View style={{padding: 10}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Text style={{width: '40%'}}>Material Order no:</Text>
        <Text>12</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Text style={{width: '40%'}}>Order amount</Text>
        <Text>12</Text>
      </View>
    </View>
  );
};

const CompanyDetails = () => {
  return (
    <View style={{padding: 10}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Text>Company: </Text>
        <Text>Shreeji</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Text>Supplies: </Text>
        <Text>Mukeshbhai</Text>
      </View>
    </View>
  );
};

const OrderCard = props => {
  const {navigation} = props;

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('OrderDetail')}>
      <OpacityButton
        opacity={0.1}
        color={theme.colors.primary}
        style={{position: 'absolute', top: 10, right: 10}}>
        <MaterialCommunityIcons
          name="arrow-right"
          color={theme.colors.primary}
          size={18}
        />
      </OpacityButton>
      <OrderDetails />
      <Divider style={{height: 2}} />
      <CompanyDetails />
    </TouchableOpacity>
  );
};

const MaterialGRN = props => {
  return (
    <View style={{padding: 20}}>
      <Subheading>Material GRN</Subheading>
      <Text>Select material order for which delivery to be added.</Text>
      <OrderCard {...props} />
      <OrderCard {...props} />
      <OrderCard {...props} />
    </View>
  );
};

export default MaterialGRN;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#999999',
    marginTop: 20,
  },
});
