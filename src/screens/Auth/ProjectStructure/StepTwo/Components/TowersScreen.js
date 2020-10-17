import React, {useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Button, Subheading, TextInput, withTheme} from 'react-native-paper';
import BaseText from '../../../../../components/BaseText';
import towerActive from '../../../../../assets/images/tower.png';
import towerInactive from '../../../../../assets/images/tower_inactive.png';
import Layout from '../../../../../utils/Layout';
import {useSnackbar} from '../../../../../components/Snackbar';
import {getTowerLabel} from '../../../../../utils';
import {useAlert} from '../../../../../components/Alert';

function RenderTowers({towerCount, towerValidationById, onPress}) {
  let towersList = [];
  for (let i = 1; i <= towerCount; i += 1) {
    const active = towerValidationById[i];
    towersList.push(
      <TouchableOpacity
        key={i}
        onPress={() => onPress(i)}
        style={styles.towerContainer}>
        <ImageBackground
          source={active ? towerActive : towerInactive}
          style={styles.towerImage}>
          <View style={styles.towerLabelContainer}>
            <Subheading style={!active && styles.inactiveLabel}>
              {getTowerLabel(i)}
            </Subheading>
          </View>
        </ImageBackground>
      </TouchableOpacity>,
    );
  }
  return <View style={styles.towersList}>{towersList}</View>;
}

function TowersScreen(props) {
  const {
    theme,
    towers = {},
    towerCount = '',
    showAllFloors,
    assignToAllTowers,
    onChangeTowers,
    saveStructureType,
  } = props;

  const snackbar = useSnackbar();
  const alert = useAlert();

  const [applyToAll, setApplyToAll] = useState(false);

  //check towers data is valid for all floors
  const {towerValidationById, allTowersValid, errorMessage} = useMemo(() => {
    let result = {};
    let error = '';
    let allValid = true;

    Object.keys(towers).map((towerId) => {
      result[towerId] = true;
      const {floors = {}, floorCount} = towers[towerId] || {};
      if (isNaN(floorCount)) {
        //check if floorCount is null
        result[towerId] = false;
        allValid = false;
        if (!error) {
          error = `Please Provide missing data for tower ${getTowerLabel(
            towerId,
          )}`;
        }
      } else {
        Object.keys(floors).map((floorId) => {
          //check if all floors has 0 or more units
          if (isNaN(floors[floorId].unitCount)) {
            result[towerId] = false;
            allValid = false;
            if (!error) {
              error = `Please Provide missing data for tower ${getTowerLabel(
                towerId,
              )}`;
            }
          }
        });
      }
    });

    return {
      towerValidationById: result,
      allTowersValid: allValid,
      errorMessage: error,
    };
  }, [towers]);

  const handleTowerSelect = (towerId) => {
    if (!applyToAll) {
      showAllFloors(towerId);
    } else {
      alert.show({
        title: 'Confirm',
        message: `Are you sure you want to assign all the towers with Tower ${getTowerLabel(
          towerId,
        )}'s Data`,
        confirmText: 'Confirm',
        dismissable: false,
        onCancel: () => setApplyToAll(false),
        onConfirm: () => {
          setApplyToAll(false);
          assignToAllTowers(towerCount, towers[towerId]);
        },
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
              <BaseText style={styles.title}>Towers</BaseText>
              <TextInput
                dense
                mode="outlined"
                blurOnSubmit
                value={towerCount ? towerCount.toString() : towerCount}
                onChangeText={onChangeTowers}
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
                onPress={() => setApplyToAll((v) => !v)}>
                <BaseText style={styles.applyButton}>
                  {applyToAll
                    ? '  Cancel Apply All   '
                    : 'Apply for all towers'}
                </BaseText>
              </Button>
            </View>
            {applyToAll ? (
              <View style={styles.selectTowerHeadingContainer}>
                <BaseText style={styles.selectTowerHeading}>
                  Select the Base Tower for the assignment
                </BaseText>
              </View>
            ) : null}
            {towerCount && towerCount > 0 ? (
              <View style={styles.towersListContainer}>
                <RenderTowers
                  towerValidationById={towerValidationById}
                  onPress={handleTowerSelect}
                  towerCount={towerCount}
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
              onPress={() => {
                if (!allTowersValid) {
                  snackbar.showMessage({
                    variant: 'warning',
                    message: errorMessage,
                  });
                } else {
                  saveStructureType();
                }
              }}>
              <BaseText style={styles.nextButtonLabel}>{'Next'}</BaseText>
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
    paddingHorizontal: 20,
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
  selectTowerHeadingContainer: {
    marginTop: 15,
  },
  selectTowerHeading: {
    fontSize: 14,
    color: '#000',
  },
  towersListContainer: {
    marginTop: 20,
  },
  towersList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  towerContainer: {
    width: Layout.window.width * 0.22,
    height: Layout.window.width * 0.15,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  towerImage: {
    height: Layout.window.width * 0.133,
    width: Layout.window.width * 0.17,
    display: 'flex',
    alignItems: 'center',
  },
  towerLabelContainer: {
    marginTop: 3,
  },
  inactiveLabel: {
    color: 'gray',
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

export default withTheme(TowersScreen);
