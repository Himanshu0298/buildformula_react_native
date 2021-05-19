import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import {Button, Subheading, TextInput, withTheme} from 'react-native-paper';
import BaseText from 'components/Atoms/BaseText';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {secondaryTheme, theme} from 'styles/theme';
import {addOpacity, getFloorNumber, getUnitLabel} from 'utils';
import Layout from 'utils/Layout';
import bungalowHut from 'assets/images/bungalow_hut.png';
import plotHut from 'assets/images/plot.png';
import {useBackHandler} from '@react-native-community/hooks';
import BhkButton from 'components/Atoms/Buttons/BhkButton';
import {BHK_OPTIONS} from 'utils/constant';

const DEFAULT_UNIT_COLOR = '#5B6F7C';

function RenderUnits({
  unitCount,
  units = {},
  selectedFloor,
  selectedStructureType,
  selectedBhk,
  onPress,
}) {
  const unitsList = [];
  for (let i = 1; i <= unitCount; i += 1) {
    const {bhk} = units[i];

    const unitBhk = BHK_OPTIONS.find(item => item.type === bhk);

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
          <Subheading theme={secondaryTheme}>
            {getUnitLabel(selectedFloor, i)}
          </Subheading>
        </TouchableOpacity>
      );
    } else {
      unit = (
        <TouchableOpacity
          key={i}
          onPress={() => onPress(i)}
          style={styles.imageContainer}>
          <Image
            source={selectedStructureType === 4 ? bungalowHut : plotHut}
            style={selectedStructureType === 4 ? styles.hut : styles.plot}
          />
          <View
            style={[
              styles.labelContainer,
              {
                backgroundColor: unitBhk ? addOpacity(unitBhk.color, 1) : null,
              },
            ]}>
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
    validateUnits,
  } = props;

  const snackbar = useSnackbar();

  const [selectedBhk, setSelectedBhk] = useState();

  useBackHandler(() => {
    if (selectedStructureType < 4) {
      const {allValid, error} = validateUnits({
        selectedStructureType,
        units,
        unitCount,
        selectedFloor,
      });
      if (!allValid) {
        snackbar.showMessage({
          message: error,
          variant: 'warning',
        });
      } else {
        goBack();
      }
      return true;
    }
    return false;
  });

  const toggleSelectedBhk = value => {
    if (selectedBhk === value) {
      setSelectedBhk(undefined);
    } else {
      setSelectedBhk(value);
    }
  };

  const assignBhk = unit => {
    if (selectedBhk) {
      assignBhkToUnit(unit, selectedBhk);
    } else if (selectedStructureType === 4 || selectedStructureType === 1) {
      snackbar.showMessage({
        message: 'Select a BHK to assign to unit',
        variant: 'warning',
      });
    }
  };

  const assignToAll = bhk => {
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
      const {allValid, error} = validateUnits({
        selectedStructureType,
        units,
        unitCount,
        selectedFloor,
      });
      if (!allValid) {
        snackbar.showMessage({
          message: error,
          variant: 'warning',
        });
      } else {
        goBack();
      }
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
                    <BhkButton
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
                  mode="contained"
                  uppercase={false}
                  disabled={!selectedBhk}
                  contentStyle={{paddingHorizontal: 6}}
                  theme={{roundness: 10}}
                  onPress={assignToAll}>
                  {'Apply for all'}
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
              mode="contained"
              contentStyle={{padding: 3}}
              theme={{roundness: 15}}
              onPress={() => handleButtonPress()}>
              {selectedStructureType < 4 ? 'Back' : 'Next'}
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
    height: Layout.window.width * 0.12,
    width: Layout.window.width * 0.12,
  },
  hutLabel: {
    fontSize: 14,
    color: '#000',
  },
  labelContainer: {
    paddingHorizontal: 6,
    marginTop: 3,
    borderRadius: 20,
  },
  button: {
    marginTop: 20,
    width: '95%',
    display: 'flex',
    alignItems: 'flex-end',
  },
});

export default withTheme(UnitsScreen);
