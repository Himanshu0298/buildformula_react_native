import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Divider, Caption} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from 'styles/theme';
import {getShadow} from 'utils';
import Header from '../CommonComponents/Header';

const LIST_DATA = [
  {label: 'Ordered: ', value: '2000'},
  {label: 'Remaining: ', value: '1959'},
];

const SUB_LIST_DATA = [
  {label: 'Delivered: ', value: '40'},
  {label: 'Damage: ', value: '1'},
];

const RenderRow = props => {
  const {item} = props;
  return (
    <View style={styles.renderContainer}>
      <Caption numberOfLines={1} style={styles.label}>
        {item.label}
      </Caption>
      <Text>{item.value}</Text>
    </View>
  );
};

const Quantity = props => {
  return (
    <View style={styles.quantityContainer}>
      <Text>Quantity</Text>

      <View style={styles.itemContainer}>
        {LIST_DATA.map(item => {
          return <RenderRow item={item} />;
        })}
      </View>
      <View style={styles.itemContainer}>
        {SUB_LIST_DATA.map(item => {
          return <RenderRow item={item} />;
        })}
      </View>
    </View>
  );
};

const DetailsCard = props => {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.subHeading}>
        <Text style={{color: theme.colors.primary}}>Brick</Text>
        <MaterialCommunityIcons
          name="label"
          size={20}
          style={[styles.labelIcon, {color: theme.colors.primary}]}
        />
        <Text style={{color: theme.colors.primary}}>
          Brick Bricks 6 inch, Nos
        </Text>
      </View>
      <Divider style={styles.divider} />
      <Quantity />
    </View>
  );
};

const MaterialList = props => {
  return (
    <View style={styles.materialContainer}>
      <Header title="List" {...props} />
      <DetailsCard {...props} />
    </View>
  );
};

export default MaterialList;

const styles = StyleSheet.create({
  renderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
  },
  quantityContainer: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    ...getShadow(2),
    borderRadius: 5,
  },
  subHeading: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelIcon: {
    marginLeft: 5,
    marginRight: 5,
  },
  divider: {
    height: 2,
  },
  materialContainer: {
    paddingHorizontal: 15,
  },
});
