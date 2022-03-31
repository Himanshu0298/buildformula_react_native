import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Divider, Text, withTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BungalowAreaSheet from './Components/Components/BungalowAreaSheet';
import PlotAreaSheet from './Components/PlotAreaSheet';
import TowerAreaSheet from './Components/TowerAreaSheet';

const CATEGORY = [
  {label: 'Tower', key: 'tower', value: ''},
  {label: 'Bungalow', key: 'bungalow', value: ''},
  {label: 'Plot', key: 'plot', value: ''},
];

function RenderRow(props) {
  const {item, setSelected} = props;
  const {label, key} = item;

  return (
    <TouchableOpacity onPress={() => setSelected(key)}>
      <View style={styles.optionContainer}>
        <Text style={styles.optionLabel}>{label}</Text>
        <MaterialCommunityIcons name="chevron-right" size={28} color="black" />
      </View>
      <Divider />
    </TouchableOpacity>
  );
}

function CategorySheet(props) {
  const [selectedSubCategory, setSelectedSubCategory] = React.useState();

  return (
    <View>
      {!selectedSubCategory ? (
        CATEGORY.map((item, index) => (
          <RenderRow
            key={index?.toString()}
            {...{
              item,
              selectedSubCategory,
              setSelected: setSelectedSubCategory,
            }}
          />
        ))
      ) : (
        <>
          {selectedSubCategory === 'tower' ? (
            <TowerAreaSheet {...props} {...{setSelectedSubCategory}} />
          ) : null}
          {selectedSubCategory === 'bungalow' ? (
            <BungalowAreaSheet {...props} {...{setSelectedSubCategory}} />
          ) : null}
          {selectedSubCategory === 'plot' ? (
            <PlotAreaSheet {...props} {...{setSelectedSubCategory}} />
          ) : null}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  optionLabel: {
    margin: 10,
    color: 'black',
    fontSize: 16,
  },
});

export default withTheme(CategorySheet);
