import React, {useMemo} from 'react';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {Button, TextInput, withTheme} from 'react-native-paper';
import BaseText from 'components/Atoms/BaseText';
import Layout from 'utils/Layout';
import {getFloorNumber} from 'utils';
import {theme} from 'styles/theme';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useBackHandler} from '@react-native-community/hooks';
import {useAlert} from 'components/Atoms/Alert';
import FloorBar from 'components/Atoms/FloorBar';

const checkUnitBhkValidity = (floors, floorCount) => {
  const result = {};
  let error = '';
  let allValid = true;

  for (let floorId = 0; floorId <= floorCount; floorId += 1) {
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
    <FloorBar
      floorId={floorId}
      badgeActive={selectedFloor === floorId}
      onPress={setSelectedFloor}
      inputProps={{
        onChangeText: (units) => onChangeUnit(floorId, units),
        value:
          floors[floorId] && floors[floorId].unitCount
            ? floors[floorId].unitCount.toString()
            : '',
      }}
      buttonLabel={
        selectedStructureType === 4 || selectedStructureType === 1
          ? unitsValidity[floorId]
            ? 'BHK assigned'
            : '  Assign BHK  '
          : 'View Units'
      }
      buttonProps={{
        disabled: !(floors[floorId] && floors[floorId].unitCount),
        color: unitsValidity[floorId] ? theme.colors.primary : '#5B6F7C',
        onPress: () => showAllUnits(floorId),
      }}
    />
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
  const alert = useAlert();

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

    for (let i = 0; i <= floorCount; i += 1) {
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
      alert.show({
        title: 'Confirm',
        message: `Are you sure you want to assign all the floors with ${getFloorNumber(
          selectedFloor,
        )}'s Data`,
        confirmText: 'Confirm',
        dismissable: false,
        onConfirm: () => assignToAllFloors(floorCount, floors[selectedFloor]),
      });
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
              extraData={{...floors, selectedFloor}}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
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
          <Button
            style={{width: '50%'}}
            compact
            mode="contained"
            contentStyle={{padding: 5}}
            theme={{roundness: 15}}
            onPress={() => validateFloors()}>
            <BaseText style={styles.nextButtonLabel}>{'Back'}</BaseText>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  applyButton: {
    fontSize: 12,
  },
  floorsListContainer: {
    marginTop: 20,
    marginBottom: 30,
    flexGrow: 1,
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
