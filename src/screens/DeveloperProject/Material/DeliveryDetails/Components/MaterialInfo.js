import * as React from 'react';
import {
  Caption,
  Divider,
  Subheading,
  Text,
  withTheme,
} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from 'styles/theme';
import {getShadow} from 'utils';

const LIST_DATA = [
  {label: 'Fine Qantity: ', value: '1999'},
  {label: 'Damage Qantity: ', value: '1'},
];

const RenderRow = props => {
  const {item} = props;
  return (
    <View style={styles.renderContainer}>
      <Caption style={styles.label}>{item.label}</Caption>
      <Text>{item.value}</Text>
    </View>
  );
};

const MaterialData = props => {
  return (
    <View style={styles.quantityContainer}>
      <View style={styles.itemContainer}>
        {LIST_DATA.map(item => {
          return <RenderRow item={item} />;
        })}
      </View>
    </View>
  );
};

const MaterialInfo = () => {
  return (
    <View style={{margin: 10}}>
      <Subheading>Material Info</Subheading>
      <View style={styles.detailsContainer}>
        <View style={styles.subHeading}>
          <Text style={{color: theme.colors.primary}}>Brick-1 </Text>
          <MaterialCommunityIcons
            name="label"
            size={20}
            style={[styles.labelIcon, {color: theme.colors.primary}]}
          />
          <Text style={{color: theme.colors.primary}}> Bricks-2, Nos</Text>
        </View>
        <Divider style={styles.divider} />
        <MaterialData />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  renderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
  },
  detailsContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    ...getShadow(2),
    borderRadius: 5,
  },
  subHeading: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 2,
  },
  quantityContainer: {
    padding: 10,
  },
  itemContainer: {
    flexGrow: 1,
  },
});

export default withTheme(MaterialInfo);
