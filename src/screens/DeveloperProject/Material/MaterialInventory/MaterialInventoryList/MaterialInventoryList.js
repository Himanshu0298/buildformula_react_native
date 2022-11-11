import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Divider, Subheading} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from 'styles/theme';

const arr = [
  {title: 'Cement', name: 'calendar'},
  {title: 'Bricks/ Blocks', name: 'star-circle-outline'},
  {title: 'Steel bar', name: 'note-outline'},
  {title: 'Ready Mix Concrete', name: 'chevron-right'},
  {title: 'Cement Test', name: 'chevron-right'},
  {title: 'Glass', name: 'chevron-right'},
];

const MCIcon = () => {
  return (
    <View style={styles.mcContainer}>
      <Text style={{color: theme.colors.white}}> MC</Text>
    </View>
  );
};

function MaterialInventory(props) {
  const {navigation} = props;

  const NavToSubList = () => navigation.navigate('MaterialInventorySubList');

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Subheading style={styles.subContainer}>Inventory</Subheading>
      </View>
      {arr.map(ele => {
        return (
          <View>
            <TouchableOpacity onPress={NavToSubList}>
              <View style={styles.sectionContainer}>
                <View style={styles.taskContainer}>
                  <View style={styles.calenderIcon}>
                    <MCIcon />
                  </View>
                  <Text style={styles.subHeading}>{ele.title}</Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={28}
                  color={theme.colors.silver}
                />
              </View>
            </TouchableOpacity>
            <Divider />
          </View>
        );
      })}
    </View>
  );
}

export default MaterialInventory;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 10,
  },

  subContainer: {
    fontSize: 18,
  },

  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  calenderIcon: {
    marginRight: 20,
    padding: 10,
  },
  mcContainer: {
    backgroundColor: theme.colors.primary,
    padding: 8,
    borderRadius: 5,
  },
  titleContainer: {
    margin: 10,
  },
});
