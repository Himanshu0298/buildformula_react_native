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
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';

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
  const {item} = props;
  return (
    <View style={styles.quantityContainer}>
      <View style={styles.itemContainer}>
        <RenderRow item={{label: 'Fine Qantity: ', value: item.quantity}} />
        <RenderRow item={{label: 'Damage Qantity: ', value: item.damage}} />
      </View>
    </View>
  );
};

const MaterialInfo = props => {
  const {materialInfo = {}} = props;
  const {materials = []} = materialInfo;
  const {loading} = useSelector(s => s.materialManagement);

  return (
    <View style={styles.container}>
      <Subheading>Material Info</Subheading>
      <Spinner visible={loading} textContent="" />

      {materials?.map(item => {
        return (
          <View style={styles.detailsContainer}>
            <View style={styles.subHeading}>
              <Text style={{color: theme.colors.primary}}>
                {item.category_title}
              </Text>
              <MaterialCommunityIcons
                name="label"
                size={20}
                style={[styles.labelIcon, {color: theme.colors.primary}]}
              />
              <Text
                style={{
                  color: theme.colors.primary,
                }}>{` ${item.sub_category_title} ${item.work_units_title}`}</Text>
            </View>
            <Divider style={styles.divider} />
            <MaterialData item={item} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  renderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    margin: 10,
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
