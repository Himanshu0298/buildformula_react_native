import React, {useMemo} from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Badge, Button, TextInput, withTheme} from 'react-native-paper';
import BaseText from '../../../../../components/BaseText';
import floorSlab from '../../../../../assets/images/slab.png';
import Layout from '../../../../../utils/Layout';
import {getFloorNumber} from '../../../../../utils';
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

function RenderFloor(props) {
  const {
    floorId,
    floors,
    selectedFloor,
    setSelectedFloor,
    onChangeUnit,
    unitsValidity,
    showAllUnits,
    selectedStructureType,
  } = props;
  return (
    <View style={styles.floorContainer}>
      <View style={styles.badgeContainer}>
        <View>
          <Badge style={styles.badge} visible={selectedFloor === floorId} />
        </View>
      </View>
      <View style={styles.floorContent}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.floorLabelContainer}
            onPress={() => setSelectedFloor(floorId)}>
            <BaseText style={styles.floorLabel}>
              {getFloorNumber(floorId)}
            </BaseText>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              dense
              blurOnSubmit
              onChangeText={(units) => onChangeUnit(floorId, units)}
              style={styles.unitsInput}
              keyboardType="decimal-pad"
              value={
                floors[floorId] && floors[floorId].unitCount
                  ? floors[floorId].unitCount.toString()
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
              disabled={!(floors[floorId] && floors[floorId].unitCount)}
              color={unitsValidity[floorId] ? theme.colors.primary : '#5B6F7C'}
              contentStyle={{padding: 1}}
              mode="contained"
              uppercase={false}
              onPress={() => showAllUnits(floorId)}>
              <BaseText style={styles.allUnitsLabel}>
                {selectedStructureType === 4 || selectedStructureType === 1
                  ? unitsValidity[floorId]
                    ? 'BHK assigned'
                    : '  Assign BHK  '
                  : 'View Units'}
              </BaseText>
            </Button>
          </View>
        </View>
        <Image source={floorSlab} style={styles.slabImage} />
      </View>
    </View>
  );
}

function FloorsScreen(props) {
  const {
    floors = {},
    floorCount,
    selectedFloor,
    setSelectedFloor,
    onChangeFloors,
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
      <View style={styles.container}>
        <View style={{flex: 1}}>
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
          <View style={styles.floorsListContainer}>
            <FlatList
              data={Object.keys(floors)}
              contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}
              extraData={floors}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.toString()}
              renderItem={({item}) => (
                <RenderFloor
                  floorId={item}
                  unitsValidity={unitsValidityData}
                  {...props}
                />
              )}
            />
          </View>
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
    paddingTop: 20,
    paddingBottom: 10,
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
    marginBottom: 30,
    flexGrow: 1,
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
