import React, {useMemo} from 'react';
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
    onChangeTowers,
    saveStructureType,
  } = props;

  const snackbar = useSnackbar();

  //check towers data is valid for all floors
  const {towerValidationById, allTowersValid, errorMessage} = useMemo(() => {
    let result = {};
    let error = '';
    let allValid = true;

    Object.keys(towers).map((towerId) => {
      result[towerId] = true;
      const {floors = {}, floorCount} = towers[towerId];
      if (isNaN(floorCount)) {
        //check if floorCount is 0 or more than 0
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
                onPress={() => {}}>
                <BaseText style={styles.applyButton}>
                  {'Apply for all towers'}
                </BaseText>
              </Button>
            </View>
            {towerCount && towerCount > 0 ? (
              <View style={styles.towersListContainer}>
                <RenderTowers
                  towerValidationById={towerValidationById}
                  onPress={showAllFloors}
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
    display: 'flex',
    justifyContent: 'center',
  },
  applyButton: {
    fontSize: 12,
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
    height: 50,
    width: 65,
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
