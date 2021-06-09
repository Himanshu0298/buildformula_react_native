import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {theme} from 'styles/theme';
import {getFloorNumber, getTowerLabel, getUnitLabel} from 'utils';
import {STRUCTURE_TYPE_LABELS} from 'utils/constant';

function renderDetailText(label, value) {
  return (
    <Text style={{marginVertical: 4}}>
      {label} : <Text style={{color: theme.colors.primary}}>{value}</Text>
    </Text>
  );
}

function DetailsHeader(props) {
  const {towerId, floorId, selectedStructure, unit} = props;

  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailSubContainer}>
        {renderDetailText(
          'Project type',
          STRUCTURE_TYPE_LABELS[selectedStructure],
        )}
        {renderDetailText('Floor type', getFloorNumber(floorId))}
      </View>
      <View style={styles.detailSubContainer}>
        {renderDetailText('Tower', getTowerLabel(towerId))}
        {renderDetailText('Unit number', getUnitLabel(floorId, unit.index))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailContainer: {
    flexDirection: 'row',
  },
  detailSubContainer: {
    flex: 1,
    marginTop: 15,
  },
});

export default DetailsHeader;
