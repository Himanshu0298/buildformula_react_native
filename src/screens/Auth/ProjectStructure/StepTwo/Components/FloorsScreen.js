import React, {useMemo} from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Badge, Button, TextInput, withTheme} from 'react-native-paper';
import BaseText from '../../../../../components/BaseText';
import floorSlab from '../../../../../assets/images/slab.png';
import Layout from '../../../../../utils/Layout';
import {getFloorNumber, getUnitLabel} from '../../../../../utils';
import {theme} from '../../../../../styles/theme';
import {useSnackbar} from '../../../../../components/Snackbar';
import {useBackHandler} from '@react-native-community/hooks';

const checkUnitBhkValidity = (floors, floorCount) => {
  let result = {};
  let error = '';
  let allValid = true;

  for (let floorId = 0; floorId < floorCount; floorId += 1) {
    const {units = {}, unitCount} = floors[floorId];
    for (let unitId = 1; unitId <= unitCount; unitId++) {
      if (!units[unitId].bhk) {
        result[floorId] = false;
        allValid = false;
        if (!error) {
          error = `Assign BHK to units on floor ${getFloorNumber(floorId)}`;
        }
      } else {
        result[floorId] = true;
      }
    }
  }

  return {
    allUnitsValid: allValid,
    unitsValidityData: result,
    unitsError: error,
  };
};

function RenderFloors({
  floors,
  floorCount,
  selectedFloor,
  setSelectedFloor,
  onChangeUnit,
  showAllUnits,
  unitsValidity,
  selectedStructureType,
}) {
  let floorsList = [];
  for (let i = 0; i < floorCount; i += 1) {
    floorsList.push(
      <View key={i} style={styles.floorContainer}>
        <View style={styles.badgeContainer}>
          <View>
            <Badge style={styles.badge} visible={selectedFloor === i} />
          </View>
        </View>
        <View style={styles.floorContent}>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.floorLabelContainer}
              onPress={() => setSelectedFloor(i)}>
              <BaseText style={styles.floorLabel}>{getFloorNumber(i)}</BaseText>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                dense
                blurOnSubmit
                onChangeText={(units) => onChangeUnit(i, units)}
                style={styles.unitsInput}
                keyboardType="decimal-pad"
                value={
                  floors[i] && floors[i].unitCount
                    ? floors[i].unitCount.toString()
                    : ''
                }
                theme={{
                  colors: {
                    underlineColor: 'transparent',
                    text: '#000',
                    accent: theme.colors.primary,
                  },
                }}
              />
              <Button
                compact
                disabled={!(floors[i] && floors[i].unitCount)}
                color={unitsValidity[i] ? theme.colors.primary : '#5B6F7C'}
                contentStyle={{padding: 1}}
                mode="contained"
                uppercase={false}
                onPress={() => showAllUnits(i)}>
                <BaseText style={styles.allUnitsLabel}>
                  {selectedStructureType === 4 || selectedStructureType === 1
                    ? unitsValidity[i]
                      ? 'BHK assigned'
                      : '  Assign BHK  '
                    : 'View Units'}
                </BaseText>
              </Button>
            </View>
          </View>
          <Image source={floorSlab} style={styles.slabImage} />
        </View>
      </View>,
    );
  }
  return <View style={styles.floorsList}>{floorsList}</View>;
}

function FloorsScreen(props) {
  const {
    floors = {},
    floorCount,
    selectedFloor,
    setSelectedFloor,
    onChangeFloors,
    showAllUnits,
    onChangeUnit,
    assignToAllFloors,
    selectedStructureType,
    goBack,
  } = props;

  const snackbar = useSnackbar();

  useBackHandler(() => {
    validateFloors();
    return true;
  });

  //check units data is valid for all floors
  const {
    unitsValidityData = {},
    allUnitsValid = true,
    unitsError = '',
  } = useMemo(() => {
    if (selectedStructureType === 4 || selectedStructureType === 1) {
      return checkUnitBhkValidity(floors, floorCount);
    }
    return {};
  }, [floors, floorCount, selectedStructureType]);

  //check floors data is valid for all floors
  const validateFloors = (floorId) => {
    let allValid = true;
    let error = '';

    if (!isNaN(floorId)) {
      const {unitCount = ''} = floors[floorId];
      return {
        valid: !isNaN(unitCount),
        error: `Please Provide units for the ${getFloorNumber(floorId)}`,
      };
    }

    for (let i = 0; i < floorCount; i += 1) {
      const {unitCount} = floors[i];

      //check if unitCount is 0 or more than 0
      if (isNaN(unitCount)) {
        allValid = false;
        if (!error) {
          error = `Please Provide units for the ${getFloorNumber(i)}`;
        }
      }
    }

    if (!allValid || !allUnitsValid) {
      return snackbar.showMessage({
        variant: 'warning',
        message: error || unitsError,
      });
    }

    setSelectedFloor();
    return goBack();
  };

  const assignToAll = () => {
    if (!isNaN(selectedFloor)) {
      const validationResult = validateFloors(selectedFloor);
      if (!validationResult.valid) {
        return snackbar.showMessage({
          variant: 'warning',
          message: validationResult.error,
        });
      }
      Alert.alert(
        'Confirm',
        `Are you sure you want to assign all the floors with ${getFloorNumber(
          selectedFloor,
        )}'s Data`,
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => assignToAllFloors(floorCount, floors[selectedFloor]),
          },
        ],
        {cancelable: true},
      );
    } else {
      snackbar.showMessage({
        variant: 'warning',
        message: 'Select a floor by clicking on floor label',
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View>
            <View style={styles.headingContainer}>
              <BaseText style={styles.title}>Floors</BaseText>
              <TextInput
                dense
                mode="outlined"
                blurOnSubmit
                value={floorCount ? floorCount.toString() : floorCount}
                onChangeText={onChangeFloors}
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
              <Button
                compact={true}
                mode="contained"
                uppercase={false}
                contentStyle={{paddingVertical: 2, paddingHorizontal: 6}}
                theme={{roundness: 10}}
                onPress={assignToAll}>
                <BaseText style={styles.applyButton}>
                  {'Apply for all floors'}
                </BaseText>
              </Button>
            </View>
            {floorCount && floorCount > 0 ? (
              <View style={styles.floorsListContainer}>
                <RenderFloors
                  setSelectedFloor={setSelectedFloor}
                  selectedStructureType={selectedStructureType}
                  unitsValidity={unitsValidityData}
                  selectedFloor={selectedFloor}
                  onChangeUnit={onChangeUnit}
                  floors={floors}
                  floorCount={floorCount}
                  showAllUnits={showAllUnits}
                />
              </View>
            ) : null}
          </View>
          <View style={styles.button}>
            {floorCount && floorCount > 0 ? (
              <Button
                style={{width: '50%'}}
                compact
                mode="contained"
                contentStyle={{padding: 5}}
                theme={{roundness: 15}}
                onPress={() => validateFloors()}>
                <BaseText style={styles.nextButtonLabel}>{'Back'}</BaseText>
              </Button>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Layout.window.width * 0.05,
    paddingVertical: 30,
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
  input: {
    width: 80,
    marginTop: -7,
    display: 'flex',
    justifyContent: 'center',
  },
  unitsInput: {
    width: 45,
    display: 'flex',
    marginHorizontal: 10,
    fontSize: 16,
    justifyContent: 'center',
  },
  applyButton: {
    fontSize: 12,
  },
  floorsListContainer: {
    marginTop: 20,
  },
  floorsList: {
    display: 'flex',
  },
  floorContainer: {
    marginBottom: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  badgeContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: theme.colors.primary,
  },
  floorContent: {
    flex: 0.8,
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  floorLabelContainer: {
    width: 70,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  floorLabel: {
    color: 'grey',
    fontSize: 12,
  },
  allUnitsLabel: {
    fontSize: 14,
  },
  slabImage: {
    height: Layout.window.width * 0.7 * (20 / 320),
    width: '100%',
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

export default withTheme(FloorsScreen);
