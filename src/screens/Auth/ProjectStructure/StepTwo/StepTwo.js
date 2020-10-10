import React, {useMemo, useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {Menu, Title, withTheme} from 'react-native-paper';
import FormTitle from '../../../../components/FormTitle';
import {useTranslation} from 'react-i18next';
import {secondaryTheme, theme} from '../../../../styles/theme';
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
import AntIcons from 'react-native-vector-icons/AntDesign';

const TYPE_LABELS = {
  2: 'shop',
  3: 'office',
  1: 'apartment',
  4: 'bungalow',
  5: 'plot',
};

function updateTower({structure, selectedStructureType, towerCount}) {
  let towers = {};
  for (let i = 1; i <= towerCount; i += 1) {
    towers[i] = {};
  }
  return {
    structure: {
      ...structure,
      [selectedStructureType]: {
        towerCount,
        towers,
      },
    },
  };
}

function updateFloor({
  structure,
  currentStructureData,
  selectedStructureType,
  selectedTower,
  floorCount,
  floorData,
}) {
  const {towers} = currentStructureData;
  let floors = {};
  for (let i = 0; i < floorCount; i += 1) {
    floors[i] = floorData || {};
  }
  return {
    structure: {
      ...structure,
      [selectedStructureType]: {
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
  selectedStructureType,
  selectedTower,
  floorId,
  unitCount,
  bhk,
}) {
  const {towers} = currentStructureData;
  const towerData = towers[selectedTower];

  let units = {};
  for (let i = 1; i <= unitCount; i += 1) {
    units[i] = {bhk};
  }

  console.log('-----> units', units);
  return {
    structure: {
      ...structure,
      [selectedStructureType]: {
        ...currentStructureData,
        towers: {
          ...towers,
          [selectedTower]: {
            ...towerData,
            floors: {
              ...towerData.floors,
              [floorId]: {
                unitCount,
                units,
              },
            },
          },
        },
      },
    },
  };
}

function updateUnitsBhk({
  structure,
  currentStructureData,
  selectedStructureType,
  selectedTower,
  floorId,
  unitId,
  bhk,
}) {
  const {towers} = currentStructureData;
  const towerData = towers[selectedTower];
  const floorData = towerData.floors[floorId];
  const {units} = towerData.floors[floorId];

  return {
    structure: {
      ...structure,
      [selectedStructureType]: {
        ...currentStructureData,
        towers: {
          ...towers,
          [selectedTower]: {
            ...towerData,
            floors: {
              ...towerData.floors,
              [floorId]: {
                ...floorData,
                units: {
                  ...units,
                  [unitId]: {
                    bhk,
                  },
                },
              },
            },
          },
        },
      },
    },
  };
}

function StepTwo(props) {
  const {navigation} = props;

  const [showModal, setShowModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTower, setSelectedTower] = useState();
  const [selectedFloor, setSelectedFloor] = useState();

  const {t} = useTranslation();
  const snackbar = useSnackbar();

  const {updateStructure, saveStructure} = useStructureActions();

  const {
    structure,
    structureTypes,
    selectedStructureType,
    loading,
  } = useSelector((state) => state.structure);

  const {project_id} = useSelector((state) => state.project);
  const {user} = useSelector((state) => state.user);

  const currentStructureData = useMemo(() => {
    return structure[selectedStructureType];
  }, [structure, selectedStructureType]);

  const toggleMenu = () => setShowModal((v) => !v);

  const toggleSelectedTower = (value) => {
    Keyboard.dismiss();
    if (selectedTower === value) {
      setSelectedTower(undefined);
    } else {
      setSelectedTower(value);
    }
  };

  const showAllFloors = (towerId) => {
    Keyboard.dismiss();
    setSelectedTower(towerId);
    setSelectedTab(1);
  };

  const showAllUnits = (floorId) => {
    Keyboard.dismiss();
    setSelectedFloor(floorId);
    setSelectedTab(2);
  };

  const updateTowers = (towerCount) => {
    if (towerCount === '') {
      towerCount = undefined;
    }
    if (towerCount && towerCount > MAX_TOWERS) {
      snackbar.showMessage({
        variant: 'warning',
        message: `Max ${MAX_TOWERS} towers are allowed`,
      });
      updateStructure(
        updateTower({structure, selectedStructureType, towerCount: MAX_TOWERS}),
      );
    } else {
      updateStructure(
        updateTower({structure, selectedStructureType, towerCount}),
      );
    }
  };

  const updateFloors = (floorCount) => {
    setSelectedFloor();
    if (floorCount === '') {
      floorCount = undefined;
    }
    if (floorCount && floorCount > MAX_FLOORS) {
      snackbar.showMessage({
        variant: 'warning',
        message: `Max ${MAX_FLOORS} floors are allowed`,
      });
      updateStructure(
        updateFloor({
          structure,
          currentStructureData,
          selectedStructureType,
          selectedTower,
          floorCount: MAX_FLOORS,
        }),
      );
    } else {
      updateStructure(
        updateFloor({
          structure,
          currentStructureData,
          selectedStructureType,
          selectedTower,
          floorCount,
        }),
      );
    }
  };

  const onChangeUnit = (floorId, units) => {
    if (units === '') {
      units = undefined;
    }
    if (units && units > MAX_UNITS) {
      snackbar.showMessage({
        variant: 'warning',
        message: `Max ${MAX_UNITS} units are allowed per floor`,
      });
      updateStructure(
        updateUnits({
          structure,
          currentStructureData,
          selectedStructureType,
          selectedTower,
          floorId,
          unitCount: MAX_FLOORS,
        }),
      );
    } else {
      updateStructure(
        updateUnits({
          structure,
          currentStructureData,
          selectedStructureType,
          selectedTower,
          floorId,
          unitCount: units,
        }),
      );
    }
  };

  const assignBhkToUnit = (unitId, bhk) => {
    updateStructure(
      updateUnitsBhk({
        structure,
        currentStructureData,
        selectedStructureType,
        selectedTower,
        floorId: selectedFloor,
        unitId,
        bhk,
      }),
    );
  };

  const assignToAllFloors = (floorCount, floorData) => {
    updateStructure(
      updateFloor({
        structure,
        currentStructureData,
        selectedStructureType,
        selectedTower,
        floorCount,
        floorData,
      }),
    );
  };

  const assignToAllUnits = (unitCount, bhk) => {
    updateStructure(
      updateUnits({
        structure,
        currentStructureData,
        selectedStructureType,
        selectedTower,
        floorId: selectedFloor,
        unitCount,
        bhk,
      }),
    );
  };

  const saveStructureType = async () => {
    saveStructure({
      typeId: selectedStructureType,
      structureTypeData: currentStructureData,
      projectId: project_id,
      userId: user.id,
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
        title={false}
        subTitle={t('projectStructureSubtitleTowers')}
        renderTitle={() => {
          return (
            <View style={styles.titleContainer}>
              <Title>{t('projectStructure')} : </Title>
              <Menu
                visible={showModal}
                onDismiss={toggleMenu}
                anchor={
                  <TouchableOpacity
                    onPress={toggleMenu}
                    style={styles.titleContainer}>
                    <Title>{t(TYPE_LABELS[selectedStructureType])}</Title>
                    <AntIcons
                      name="caretdown"
                      color="#fff"
                      style={{marginLeft: 5}}
                    />
                  </TouchableOpacity>
                }>
                {Object.keys(structureTypes)
                  .filter((key) => structureTypes[key])
                  .map((key) => {
                    return (
                      <Menu.Item
                        key={key}
                        theme={secondaryTheme}
                        onPress={() => {
                          updateStructure({selectedStructureType: key});
                          toggleMenu();
                        }}
                        title={t(TYPE_LABELS[key])}
                      />
                    );
                  })}
              </Menu>
            </View>
          );
        }}
      />
      <View style={styles.barContainer}>
        <MaterialTabs
          items={['Towers', 'Floors', 'Units']}
          selectedIndex={selectedTab}
          onChange={() => {}}
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
          towers={currentStructureData.towers}
          towerCount={currentStructureData.towerCount}
          showAllFloors={showAllFloors}
          onChangeTowers={updateTowers}
          saveStructureType={saveStructureType}
        />
      ) : null}
      {selectedTab === 1 ? (
        <FloorsScreen
          floors={currentStructureData.towers[selectedTower].floors}
          floorCount={currentStructureData.towers[selectedTower].floorCount}
          selectedFloor={selectedFloor}
          setSelectedFloor={setSelectedFloor}
          assignToAllFloors={assignToAllFloors}
          showAllUnits={showAllUnits}
          onChangeFloors={updateFloors}
          onChangeUnit={onChangeUnit}
          goBack={() => setSelectedTab(0)}
        />
      ) : null}
      {selectedTab === 2 ? (
        <UnitsScreen
          selectedFloor={selectedFloor}
          goBack={() => setSelectedTab(1)}
          assignBhkToUnit={assignBhkToUnit}
          assignToAllUnits={assignToAllUnits}
          units={
            currentStructureData.towers[selectedTower].floors[selectedFloor]
              .units
          }
          unitCount={
            currentStructureData.towers[selectedTower].floors[selectedFloor]
              .unitCount
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
  titleContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  barContainer: {
    ...getShadow(5),
    backgroundColor: '#fff',
  },
});

export default withTheme(StepTwo);
