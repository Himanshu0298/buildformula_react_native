import React, {useMemo, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button, TextInput, withTheme} from 'react-native-paper';
import BaseText from 'components/Atoms/BaseText';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {getTowerLabel} from 'utils';
// import TowerIcon from 'components/Atoms/TowerIcon';
import DuplicateDialog from './DuplicateDialog';

function RenderTowers({towerCount, towerValidationById, onPress}) {
  const towersList = [];
  for (let i = 1; i <= towerCount; i += 1) {
    const active = towerValidationById[i];
    // towersList.push(
    //   <TowerIcon onPress={onPress} key={i} index={i} active={active} />,
    // );
  }
  return <View style={styles.towersList}>{towersList}</View>;
}

function TowersScreen(props) {
  const {
    theme,
    currentStructureData,
    towers = {},
    towerCount = '',
    selectedStructureType,
    showAllFloors,
    duplicateTowers,
    onChangeTowers,
    saveStructureType,
    validateTowers,
  } = props;

  const snackbar = useSnackbar();

  const [duplicateDialog, setDuplicateDialog] = useState(false);

  // check towers data is valid for all floors
  const {towerValidationById, allTowersValid, errorMessage} = useMemo(
    () => validateTowers(currentStructureData, selectedStructureType),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentStructureData],
  );

  const towerOptions = useMemo(() => {
    return Object.keys(towers).map(key => ({
      label: getTowerLabel(key),
      value: key,
    }));
  }, [towers]);

  const toggleDuplicateDialog = () => setDuplicateDialog(v => !v);

  const onTowerPress = towerId => showAllFloors(towerId);

  return (
    <View style={{flex: 1}}>
      <DuplicateDialog
        open={duplicateDialog}
        title="Duplicate Towers"
        options={towerOptions}
        handleClose={toggleDuplicateDialog}
        handleSubmit={duplicateTowers}
      />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
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
                compact
                mode="contained"
                uppercase={false}
                disabled={!towerCount}
                contentStyle={{paddingVertical: 2, paddingHorizontal: 6}}
                theme={{roundness: 10}}
                onPress={toggleDuplicateDialog}
              >
                Duplicate towers
              </Button>
            </View>

            {towerCount && towerCount > 0 ? (
              <View style={styles.towersListContainer}>
                <RenderTowers
                  towerValidationById={towerValidationById}
                  onPress={onTowerPress}
                  towerCount={towerCount}
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
              onPress={() => {
                if (!allTowersValid) {
                  snackbar.showMessage({
                    variant: 'warning',
                    message: errorMessage,
                  });
                } else {
                  saveStructureType();
                }
              }}
            >
              Next
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
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

    justifyContent: 'center',
  },
  towersListContainer: {
    marginTop: 20,
  },
  towersList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  button: {
    marginTop: 20,
    width: '95%',

    alignItems: 'flex-end',
  },
});

export default withTheme(TowersScreen);
