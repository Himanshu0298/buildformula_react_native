import React, {useMemo, useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {withTheme} from 'react-native-paper';
import FormTitle from '../../../../components/FormTitle';
import {useTranslation} from 'react-i18next';
import {theme} from '../../../../styles/theme';
import {getShadow} from '../../../../utils';
import {useSnackbar} from '../../../../components/Snackbar';
import MaterialTabs from 'react-native-material-tabs';
import TowersScreen from './Components/TowersScreen';
import FloorsScreen from './Components/FloorsScreen';
import UnitsScreen from './Components/UnitsScreen';
import {MAX_TOWERS, MAX_FLOORS, MAX_UNITS} from '../../../../utils/constant';
import useStructureActions from '../../../../redux/actions/structureActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

function updateTower({structure, structureType, towerCount}) {
  console.log('-----> towerCount', towerCount);
  let towers = {};
  for (let i = 1; i <= towerCount; i += 1) {
    towers[i] = {};
  }
  return {
    structure: {
      ...structure,
      [structureType]: {
        towerCount,
        towers,
      },
    },
  };
}

function updateFloor({
  structure,
  currentStructureData,
  structureType,
  selectedTower,
  floorCount,
}) {
  const {towers} = currentStructureData;
  let floors = {};
  for (let i = 0; i < floorCount; i += 1) {
    floors[i] = {};
  }
  console.log('----->floors ', floors);
  return {
    structure: {
      ...structure,
      [structureType]: {
        ...currentStructureData,
        towers: {
          ...towers,
          [selectedTower]: {
            floorCount,
            floors,
          },
        },
      },
    },
  };
}

function updateUnits({
  structure,
  currentStructureData,
  structureType,
  selectedTower,
  floorId,
  unitsCount,
}) {
  const {towers} = currentStructureData;
  const towerData = towers[selectedTower];

  let units = {};
  for (let i = 1; i <= unitsCount; i += 1) {
    units[i] = {};
  }
  return {
    structure: {
      ...structure,
      [structureType]: {
        ...currentStructureData,
        towers: {
          ...towers,
          [selectedTower]: {
            ...towerData,
            floors: {
              ...towerData.floors,
              [floorId]: {
                unitsCount,
                units,
              },
            },
          },
        },
      },
    },
  };
}

function StepTwo(props) {
  const {
    navigation,
    route: {params = {}},
  } = props;
  const {structureType = 1} = params;

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTower, setSelectedTower] = useState();
  const [selectedFloor, setSelectedFloor] = useState();

  const {t} = useTranslation();
  const snackbar = useSnackbar();

  const {updateStructure, saveTowersCount} = useStructureActions();

  const {structure, loading} = useSelector((state) => state.structure);
  const {user} = useSelector((state) => state.user);

  const currentStructureData = useMemo(() => {
    return structure[structureType];
  }, [structure, structureType]);

  const toggleSelectedTower = (value) => {
    Keyboard.dismiss();
    if (selectedTower === value) {
      setSelectedTower(undefined);
    } else {
      setSelectedTower(value);
    }
  };

  const showAllUnits = (floorId) => {
    Keyboard.dismiss();
    setSelectedFloor(floorId);
    setSelectedTab(2);
  };

  const updateTowers = (value) => {
    if (value && value > MAX_TOWERS) {
      snackbar.showMessage({
        variant: 'warning',
        message: `Max ${MAX_TOWERS} towers are allowed`,
      });
      updateStructure(
        updateTower({structure, structureType, towerCount: MAX_TOWERS}),
      );
    } else {
      updateStructure(
        updateTower({structure, structureType, towerCount: value}),
      );
    }
  };

  const updateFloors = (value) => {
    if (value && value > MAX_FLOORS) {
      snackbar.showMessage({
        variant: 'warning',
        message: `Max ${MAX_FLOORS} floors are allowed`,
      });
      updateStructure(
        updateFloor({
          structure,
          currentStructureData,
          structureType,
          selectedTower,
          floorCount: MAX_FLOORS,
        }),
      );
    } else {
      updateStructure(
        updateFloor({
          structure,
          currentStructureData,
          structureType,
          selectedTower,
          floorCount: value,
        }),
      );
    }
  };

  const onChangeUnit = (floorId, units) => {
    if (units && units > MAX_UNITS) {
      snackbar.showMessage({
        variant: 'warning',
        message: `Max ${MAX_UNITS} units are allowed per floor`,
      });
      updateStructure(
        updateUnits({
          structure,
          currentStructureData,
          structureType,
          selectedTower,
          floorId,
          unitsCount: MAX_FLOORS,
        }),
      );
    } else {
      updateStructure(
        updateUnits({
          structure,
          currentStructureData,
          structureType,
          selectedTower,
          floorId,
          unitsCount: units,
        }),
      );
    }
  };

  const saveTowers = () => {
    let formData = new FormData();

    formData.append('current_type_id', structureType);
    formData.append('tower', currentStructureData.towerCount);
    formData.append('user_id', user.id);
    formData.append('project_id', 1);

    saveTowersCount(formData).then(() => {
      setSelectedTab(1);
    });
  };

  const saveFloors = () => {
    let formData = new FormData();

    formData.append('current_type_id', structureType);
    formData.append('tower', currentStructureData.towerCount);
    formData.append('user_id', user.id);
    formData.append('project_id', 1);

    saveTowersCount(formData).then(() => {
      setSelectedTab(1);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={loading} textContent={''} />
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <FormTitle
        title={t('projectStructureApartment')}
        subTitle={t('projectStructureSubtitleTowers')}
      />
      <View style={styles.barContainer}>
        <MaterialTabs
          items={['Towers', 'Floors', 'Units']}
          selectedIndex={selectedTab}
          onChange={setSelectedTab}
          barColor="#fff"
          indicatorColor={theme.colors.primary}
          inactiveTextColor={'#ccc'}
          activeTextColor={theme.colors.primary}
          uppercase={false}
          textStyle={{
            fontFamily: 'Nunito-Regular',
          }}
        />
      </View>
      {selectedTab === 0 ? (
        <TowersScreen
          towers={currentStructureData.towerCount}
          selectedTower={selectedTower}
          toggleSelectedTower={toggleSelectedTower}
          onChangeTowers={updateTowers}
          saveTowers={saveTowers}
        />
      ) : null}
      {selectedTab === 1 ? (
        <FloorsScreen
          floors={currentStructureData.towers[selectedTower].floors}
          floorCount={currentStructureData.towers[selectedTower].floorCount}
          showAllUnits={showAllUnits}
          onChangeFloors={updateFloors}
          saveFloors={saveFloors}
          onChangeUnit={onChangeUnit}
        />
      ) : null}
      {selectedTab === 2 ? (
        <UnitsScreen
          selectedFloor={selectedFloor}
          units={
            currentStructureData.towers[selectedTower].floors[selectedFloor]
              .units
          }
          unitsCount={
            currentStructureData.towers[selectedTower].floors[selectedFloor]
              .unitsCount
          }
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barContainer: {
    ...getShadow(5),
    backgroundColor: '#fff',
  },
});

export default withTheme(StepTwo);
