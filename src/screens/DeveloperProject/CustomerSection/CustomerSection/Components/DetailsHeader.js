import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {theme} from 'styles/theme';
import {getFloorNumber, getTowerLabel} from 'utils';
import {STRUCTURE_TYPE_LABELS} from 'utils/constant';

function renderDetailText(label, value) {
  return (
    <Text style={{marginVertical: 4}}>
      {label} : <Text style={{color: theme.colors.primary}}>{value}</Text>
    </Text>
  );
}

function DetailsHeader(props) {
  const {
    structureType,
    selectedStructure,
    unitId,
    unit,
    tower_label,
    floor_id,
    tower_id,
  } = props;

  const id = unit?.id;

  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailSubContainer}>
        {renderDetailText(
          'Project type',
          STRUCTURE_TYPE_LABELS[structureType || selectedStructure],
        )}
        {renderDetailText('Floor', getFloorNumber(floor_id))}
      </View>
      <View style={styles.detailSubContainer}>
        {/* {renderDetailText('Tower', tower_label)} */}
        {renderDetailText('Tower', tower_label || getTowerLabel(tower_id))}

        {renderDetailText('Unit number', unitId || id)}
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
    // marginTop: 15,
  },
});

export default DetailsHeader;
