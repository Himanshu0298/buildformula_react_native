import React, {useMemo, useState} from 'react';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {Button, TextInput, withTheme} from 'react-native-paper';
import BaseText from 'components/Atoms/BaseText';
import Layout from 'utils/Layout';
import {getFloorNumber} from 'utils';
import {theme} from 'styles/theme';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useBackHandler} from '@react-native-community/hooks';
import FloorBar from 'components/Atoms/FloorBar';
import DuplicateDialog from './DuplicateDialog';

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
    setSelectedFloor,
    onChangeUnit,
    unitsValidity,
    showAllUnits,
    selectedStructureType,
  } = props;

  return (
    <FloorBar
      floorId={floorId}
      showBadge={true}
      badgeActive={false}
      onPress={setSelectedFloor}
      inputProps={{
        onChangeText: (units) => onChangeUnit(floorId, units),
        value: floors?.[floorId]?.unitCount?.toString() || '',
      }}
      buttonLabel={
        selectedStructureType === 4 || selectedStructureType === 1
          ? unitsValidity[floorId]
            ? 'BHK assigned'
            : '  Assign BHK  '
          : 'View Units'
      }
      buttonProps={{
        disabled: !floors?.[floorId]?.unitCount,
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
    setSelectedFloor,
    onChangeFloors,
    duplicateFloors,
    selectedStructureType,
    goBack,
  } = props;

  const snackbar = useSnackbar();

  const [duplicateDialog, setDuplicateDialog] = useState(false);

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

  const floorOptions = useMemo(() => {
    return Object.keys(floors).map((key) => ({
      label: getFloorNumber(key),
      value: key,
    }));
  }, [floors]);

  const toggleDuplicateDialog = () => setDuplicateDialog((v) => !v);

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

  return (
    <SafeAreaView style={{flex: 1}}>
      <DuplicateDialog
        open={duplicateDialog}
        title="Duplicate Floors"
        options={floorOptions}
        handleClose={toggleDuplicateDialog}
        handleSubmit={duplicateFloors}
      />
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
              disabled={!floorCount}
              contentStyle={{paddingVertical: 2, paddingHorizontal: 6}}
              theme={{roundness: 10}}
              onPress={toggleDuplicateDialog}>
              {'Duplicate Floors'}
            </Button>
          </View>
          <View style={styles.floorsListContainer}>
            <FlatList
              data={Object.keys(floors)}
              contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}
              extraData={{...floors}}
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
            mode="contained"
            contentStyle={{padding: 3}}
            theme={{roundness: 15}}
            //done like to avoid passing button event object
            onPress={() => validateFloors()}>
            {'Back'}
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
});

export default withTheme(FloorsScreen);
