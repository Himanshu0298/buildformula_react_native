import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Divider, Text, withTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BungalowUnitSheet from './Components/BungalowUnitSheet';
import PlotUnitSheet from './Components/PlotUnitSheet';
import TowerUnitSheet from './Components/TowerUnitSheet';

const UNITS = [
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

function UnitAreaSheet(props) {
  const [selectedSubCategory, setSelectedUnit] = React.useState();

  return (
    <View>
      {!selectedSubCategory ? (
        UNITS.map((item, index) => (
          <RenderRow
            key={index?.toString()}
            {...{
              item,
              selectedSubCategory,
              setSelected: setSelectedUnit,
            }}
          />
        ))
      ) : (
        <>
          {selectedSubCategory === 'tower' ? (
            <TowerUnitSheet {...props} {...{setSelectedUnit}} />
          ) : null}
          {selectedSubCategory === 'bungalow' ? (
            <BungalowUnitSheet {...props} {...{setSelectedUnit}} />
          ) : null}
          {selectedSubCategory === 'plot' ? (
            <PlotUnitSheet {...props} {...{setSelectedUnit}} />
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

export default withTheme(UnitAreaSheet);
