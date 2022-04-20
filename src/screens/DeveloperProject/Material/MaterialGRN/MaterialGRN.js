import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Subheading, Text, Divider, Caption} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getShadow} from 'utils';
import {theme} from '../../../../styles/theme';

const OrderDetails = () => {
  return (
    <View style={styles.orderContainer}>
      <View style={styles.materialSection}>
        <Caption style={styles.materialSubSection}>Material Order no:</Caption>
        <Text>12</Text>
      </View>
      <View style={styles.materialSection}>
        <View style={styles.materialAmountSection}>
          <Caption style={styles.materialSubSection}>Order Amount:</Caption>
          <Text
            style={{
              color: theme.colors.primary,
            }}>{`₹${' 15'}`}</Text>
        </View>
      </View>
    </View>
  );
};

const CompanyDetails = () => {
  return (
    <View style={styles.orderContainer}>
      <View style={styles.companyDetailsContainer}>
        <Text>Company: </Text>
        <Text>Shreeji</Text>
      </View>
      <View style={styles.supplier}>
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
        style={styles.button}>
        <MaterialCommunityIcons
          name="arrow-right"
          color={theme.colors.primary}
          size={18}
        />
      </OpacityButton>
      <OrderDetails />
      <Divider style={styles.divider} />
      <CompanyDetails />
    </TouchableOpacity>
  );
};

const MaterialGRN = props => {
  return (
    <View style={styles.orderContainer}>
      <Subheading style={styles.SubHeading}>Material GRN</Subheading>
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
    // backgroundColor: '#999999',
    padding: 5,
    backgroundColor: '#fff',
    ...getShadow(2),
    marginTop: 20,
    borderRadius: 5,
  },
  orderContainer: {
    padding: 10,
  },
  materialSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  materialSubSection: {
    flexDirection: 'row',
    fontSize: 14,
    marginRight: 10,
  },
  materialAmountSection: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  companyDetailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  supplier: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  divider: {
    height: 2,
  },
  SubHeading: {
    fontSize: 18,
  },
});
