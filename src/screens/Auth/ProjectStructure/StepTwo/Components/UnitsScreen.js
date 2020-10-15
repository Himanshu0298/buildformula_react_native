import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import {Button, Subheading, TextInput, withTheme} from 'react-native-paper';
import BaseText from '../../../../../components/BaseText';
import {useSnackbar} from '../../../../../components/Snackbar';
import {theme} from '../../../../../styles/theme';
import {getFloorNumber, getUnitLabel} from '../../../../../utils';
import Layout from '../../../../../utils/Layout';
import bungalowHut from '../../../../../assets/images/bungalow_hut.png';
import plotHut from '../../../../../assets/images/plot.png';
import {useBackHandler} from '@react-native-community/hooks';

const BHK_OPTIONS = [
  {type: 1, color: 'rgba(244,175,72)'},
  {type: 2, color: 'rgba(134, 134, 134)'},
  {type: 3, color: 'rgba(72, 161, 244)'},
  {type: 4, color: 'rgba(149, 100, 100)'},
  {type: 5, color: 'rgba(168, 72, 244)'},
  {type: 6, color: 'rgba(0, 205, 205)'},
  {type: 7, color: 'rgba(99, 149, 104)'},
];

const DEFAULT_UNIT_COLOR = '#5B6F7C';

function RenderUnits({
  unitCount,
  units = {},
  selectedFloor,
  selectedStructureType,
  selectedBhk,
  onPress,
}) {
  let unitsList = [];
  for (let i = 1; i <= unitCount; i += 1) {
    const {bhk} = units[i];

    const unitBhk = BHK_OPTIONS.find((item) => item.type === bhk);

    let unit;

    if (selectedStructureType < 4) {
      unit = (
        <TouchableOpacity
          key={i}
          onPress={() => onPress(i)}
          style={[
            styles.unitContainer,
            {
              borderRadius: 5,
              backgroundColor:
                (unitBhk && addOpacity(unitBhk.color, 1)) || DEFAULT_UNIT_COLOR,
            },
          ]}>
          <Subheading>{getUnitLabel(selectedFloor, i)}</Subheading>
        </TouchableOpacity>
      );
    } else {
      unit = (
        <TouchableOpacity
          key={i}
          onPress={() => onPress(i)}
          style={[styles.imageContainer]}>
          <Image
            source={selectedStructureType === 4 ? bungalowHut : plotHut}
            style={selectedStructureType === 4 ? styles.hut : styles.plot}
          />
          <View
            style={{
              paddingHorizontal: 6,
              marginTop: 3,
              borderRadius: 20,
              backgroundColor: unitBhk ? addOpacity(unitBhk.color, 1) : null,
            }}>
            <BaseText
              style={[styles.hutLabel, {color: unitBhk ? '#fff' : '#000'}]}>
              {i}
            </BaseText>
          </View>
        </TouchableOpacity>
      );
    }

    unitsList.push(unit);
  }
  return <View style={styles.unitsList}>{unitsList}</View>;
}

function addOpacity(color, opacity) {
  return color.split(')')[0] + ',' + opacity + ')';
}

function RenderBhkButton({bhk, onPress, selected}) {
  return (
    <View style={styles.bhkContainer}>
      <TouchableOpacity
        onPress={() => onPress(bhk.type)}
        style={[
          styles.bhkButton,
          {
            backgroundColor: selected
              ? addOpacity(bhk.color, 1)
              : addOpacity(bhk.color, 0.1),
          },
        ]}>
        <BaseText
          style={[
            styles.bhkLabel,
            {
              color: selected ? '#fff' : addOpacity(bhk.color, 1),
            },
          ]}>
          {bhk.type} BHK
        </BaseText>
      </TouchableOpacity>
    </View>
  );
}

function UnitsScreen(props) {
  const {
    units = {},
    goBack,
    unitCount = 0,
    selectedFloor,
    assignBhkToUnit,
    assignToAllUnits,
    selectedStructureType,
    updateBungalows,
    currentStructureData,
    handleNext,
  } = props;

  const snackbar = useSnackbar();

  const [selectedBhk, setSelectedBhk] = useState(1);

  useBackHandler(() => {
    if (selectedStructureType < 4) {
      validateUnits();
      return true;
    }
    return false;
  });

  const toggleSelectedBhk = (value) => {
    if (selectedBhk === value) {
      setSelectedBhk(undefined);
    } else {
      setSelectedBhk(value);
    }
  };

  const assignBhk = (unit) => {
    if (selectedBhk) {
      assignBhkToUnit(unit, selectedBhk);
    } else if (selectedStructureType === 4 || selectedStructureType === 1) {
      snackbar.showMessage({
        message: 'Select a BHK to assign to unit',
        variant: 'warning',
      });
    }
  };

  const validateUnits = () => {
    let error = '';
    let allValid = true;
    if (selectedStructureType === 1 || selectedStructureType === 4) {
      for (let i = 1; i <= unitCount; i++) {
        if (!units[i].bhk) {
          allValid = false;
          error = `Assign BHK to unit ${getUnitLabel(selectedFloor, i)}`;
          break;
        }
      }

      if (!allValid) {
        return snackbar.showMessage({
          message: error,
          variant: 'warning',
        });
      }
    }
    return goBack();
  };

  const assignToAll = (bhk) => {
    if (selectedBhk) {
      assignToAllUnits(unitCount, selectedBhk);
    } else if (selectedStructureType === 4 || selectedStructureType === 1) {
      snackbar.showMessage({
        message: 'Select a BHK to assign to all units',
        variant: 'warning',
      });
    }
  };

  const handleButtonPress = () => {
    if (selectedStructureType < 4) {
      validateUnits();
    } else {
      handleNext();
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View>
            {selectedStructureType === 4 || selectedStructureType === 1 ? (
              <View>
                <View style={styles.headingContainer}>
                  <BaseText style={styles.assignHeading}>
                    Select and assign BHK type to individual unit
                  </BaseText>
                </View>
                <View style={styles.bhkListContainer}>
                  {BHK_OPTIONS.map((bhk, index) => (
                    <RenderBhkButton
                      key={index}
                      bhk={bhk}
                      selected={selectedBhk === bhk.type}
                      onPress={toggleSelectedBhk}
                    />
                  ))}
                </View>
              </View>
            ) : null}
            <View style={styles.headingContainer}>
              {selectedStructureType < 4 ? (
                <BaseText style={styles.title}>
                  {getFloorNumber(selectedFloor)} units - {unitCount || 0}
                </BaseText>
              ) : (
                <View style={styles.unitInputContainer}>
                  <BaseText style={styles.title}>
                    {selectedStructureType === 4 ? 'Bungalows' : 'Plots'}
                  </BaseText>
                  <TextInput
                    dense
                    mode="outlined"
                    blurOnSubmit
                    value={currentStructureData?.unitCount?.toString() || ''}
                    onChangeText={updateBungalows}
                    style={styles.input}
                    keyboardType="decimal-pad"
                    theme={{
                      roundness: 10,
                      colors: {
                        underlineColor: 'transparent',
                        text: '#000',
                        accent: theme.colors.primary,
                      },
                    }}
                  />
                </View>
              )}
              {selectedStructureType === 4 || selectedStructureType === 1 ? (
                <Button
                  compact
                  mode="contained"
                  uppercase={false}
                  disabled={!selectedBhk}
                  contentStyle={{paddingHorizontal: 6}}
                  theme={{roundness: 10}}
                  onPress={assignToAll}>
                  <BaseText style={styles.applyButton}>
                    {'Apply for all'}
                  </BaseText>
                </Button>
              ) : null}
            </View>
            {unitCount && unitCount > 0 ? (
              <View style={styles.unitsListContainer}>
                <RenderUnits
                  selectedBhk={selectedBhk}
                  selectedStructureType={selectedStructureType}
                  selectedFloor={selectedFloor}
                  onPress={assignBhk}
                  unitCount={unitCount}
                  units={units}
                />
              </View>
            ) : null}
          </View>

          <View style={styles.button}>
            <Button
              style={{width: '50%'}}
              compact
              mode="contained"
              contentStyle={{padding: 5}}
              theme={{roundness: 15}}
              onPress={handleButtonPress}>
              <BaseText style={styles.nextButtonLabel}>
                {selectedStructureType < 4 ? 'Back' : 'Next'}
              </BaseText>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Layout.window.width * 0.05,
    paddingVertical: 10,
  },
  bhkListContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  bhkContainer: {},
  bhkButton: {
    margin: 5,
    paddingHorizontal: 14,
    borderRadius: 5,
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bhkLabel: {
    fontSize: 13,
  },
  headingContainer: {
    flexDirection: 'row',
    display: 'flex',
    marginLeft: Layout.window.width * 0.015,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  unitInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assignHeading: {
    fontSize: 14,
    color: '#000',
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  input: {
    width: 80,
    marginLeft: 20,
    marginTop: -7,
    display: 'flex',
    justifyContent: 'center',
  },
  unitsListContainer: {},
  unitsList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  unitContainer: {
    width: Layout.window.width * 0.15,
    margin: Layout.window.width * 0.015,
    height: Layout.window.width * 0.15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: Layout.window.width * 0.15,
    height: Layout.window.width * 0.18,
    marginHorizontal: Layout.window.width * 0.037,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hut: {
    height: Layout.window.width * 0.11,
    width: Layout.window.width * 0.15,
  },
  plot: {
    height: Layout.window.width * 0.11,
    width: Layout.window.width * 0.18,
  },
  hutLabel: {
    fontSize: 14,
    color: '#000',
  },
  button: {
    marginTop: 20,
    width: '95%',
    display: 'flex',
    alignItems: 'flex-end',
  },
  nextButtonLabel: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default withTheme(UnitsScreen);
