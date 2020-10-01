import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Subheading, withTheme} from 'react-native-paper';
import BaseText from '../../../../../components/BaseText';
import {getFloorNumber} from '../../../../../utils';
import Layout from '../../../../../utils/Layout';

function RenderUnits({units, selectedFloor, selectedUnit, onPress}) {
  let unitsList = [];
  for (let i = 1; i <= units; i += 1) {
    const active = selectedUnit === i;
    unitsList.push(
      <TouchableOpacity
        key={i}
        onPress={() => onPress(i)}
        style={styles.unitContainer}>
        <Subheading style={!active && styles.inactiveLabel}>
          {`${selectedFloor}${i.toString().padStart(2, '0')}`}
        </Subheading>
      </TouchableOpacity>,
    );
  }
  return <View style={styles.unitsList}>{unitsList}</View>;
}

function UnitsScreen(props) {
  const {units, unitsCount, selectedFloor} = props;

  const [selectedUnit, setSelectedUnit] = useState();

  const toggleSelectedUnit = (value) => {
    if (selectedUnit === value) {
      setSelectedUnit(undefined);
    } else {
      setSelectedUnit(value);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <BaseText style={styles.title}>
              {getFloorNumber(selectedFloor)} units - {unitsCount || 0}
            </BaseText>
          </View>
          {unitsCount && unitsCount > 0 ? (
            <View style={styles.unitsListContainer}>
              <RenderUnits
                selectedUnit={selectedUnit}
                selectedFloor={selectedFloor}
                onPress={toggleSelectedUnit}
                units={unitsCount}
              />
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 150,
  },
  headingContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  unitsListContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitsList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  unitContainer: {
    width: Layout.window.width * 0.14,
    margin: Layout.window.width * 0.015,
    height: Layout.window.width * 0.14,
    backgroundColor: '#5B6F7C',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withTheme(UnitsScreen);
