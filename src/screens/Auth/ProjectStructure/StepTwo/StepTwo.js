import React, {useMemo, useState, useEffect} from 'react';
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
import {getFloorNumber, getShadow, getTowerLabel} from '../../../../utils';
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
import {useBackHandler} from '@react-native-community/hooks';

const STRUCTURE_TYPES = [2, 3, 1, 4, 5];

const TYPE_LABELS = {
  2: 'shops',
  3: 'offices',
  1: 'apartments',
  4: 'bungalows',
  5: 'plots',
};

const MENU_OPTIONS = [
  {label: 'shops', value: 2},
  {label: 'offices', value: 3},
  {label: 'apartments', value: 1},
  {label: 'bungalows', value: 4},
  {label: 'plots', value: 5},
];

function updateTower({
  structure,
  selectedStructureType,
  towerCount,
  towerData,
}) {
  let towers = {};
  for (let i = 1; i <= towerCount; i += 1) {
    towers[i] = towerData;
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
  let units = {};
  for (let i = 1; i <= unitCount; i += 1) {
    units[i] = {bhk};
  }

  if (selectedStructureType < 4) {
    const {towers} = currentStructureData;
    const towerData = towers[selectedTower];

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
  } else {
    return {
      structure: {
        ...structure,
        [selectedStructureType]: {
          unitCount,
          units,
        },
      },
    };
  }
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
  if (selectedStructureType < 4) {
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
  } else {
    const {units} = currentStructureData;

    return {
      structure: {
        ...structure,
        [selectedStructureType]: {
          ...currentStructureData,
          units: {
            ...units,
            [unitId]: {
              bhk,
            },
          },
        },
      },
    };
  }
}

function updateStructureUnits({structure, selectedStructureType, unitCount}) {
  let units = {};
  for (let i = 1; i <= unitCount; i += 1) {
    units[i] = {};
  }
  return {
    structure: {
      ...structure,
      [selectedStructureType]: {
        unitCount,
        units,
      },
    },
  };
}

function StepTwo(props) {
  const {navigation} = props;

  const {t} = useTranslation();
  const snackbar = useSnackbar();

  let {structure, structureTypes, selectedStructureType, loading} = useSelector(
    (state) => state.structure,
  );
  const {project} = useSelector((state) => state.project);
  const {user} = useSelector((state) => state.user);

  const [showModal, setShowModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    selectedStructureType < 4 ? 0 : 2,
  );
  const [selectedTower, setSelectedTower] = useState();
  const [selectedFloor, setSelectedFloor] = useState();

  const {updateStructure, saveStructure} = useStructureActions();

  selectedStructureType = parseInt(selectedStructureType, 10);

  useEffect(() => {
    setSelectedTab(selectedStructureType < 4 ? 0 : 2);
  }, [selectedStructureType]);

  const currentStructureData = useMemo(() => {
    return structure[selectedStructureType];
  }, [structure, selectedStructureType]);

  const toggleMenu = () => setShowModal((v) => !v);

  const handleBack = () => {
    const selectedTypes = STRUCTURE_TYPES.filter((key) => structureTypes[key]);
    const index = selectedTypes.indexOf(selectedStructureType);

    if (index > 0) {
      if (
        (selectedTab === 0 && selectedStructureType < 4) ||
        selectedStructureType >= 4
      ) {
        const previousType = selectedTypes[index - 1];
        updateStructure({selectedStructureType: previousType});
        return true;
      }
    }
    return false;
  };

  //Handle back press
  useBackHandler(handleBack);

  const handleNext = () => {
    const selectedTypes = STRUCTURE_TYPES.filter((key) => structureTypes[key]);
    const index = selectedTypes.indexOf(selectedStructureType);

    if (index < selectedTypes.length - 1) {
      const nextType = selectedTypes[index + 1];
      updateStructure({selectedStructureType: nextType});
    } else {
      navigation.navigate('PlanSelect');
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

  const onChangeUnit = (floorId, unitCount) => {
    if (unitCount === '') {
      unitCount = undefined;
    }
    if (unitCount && unitCount > MAX_UNITS) {
      snackbar.showMessage({
        variant: 'warning',
        message: `Max ${MAX_UNITS} units are allowed`,
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
          unitCount,
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

  const assignToAllTowers = (towerCount, towerData) => {
    updateStructure(
      updateTower({
        structure,
        selectedStructureType,
        towerCount,
        towerData,
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

  const updateBungalows = (unitCount) => {
    onChangeUnit(null, unitCount);
  };

  const saveStructureType = async () => {
    saveStructure({
      typeId: selectedStructureType,
      structureTypeData: currentStructureData,
      projectId: project.project_id,
      userId: user.id,
    }).then(() => {
      handleNext();
    });
  };

  const getSubtitle = () => {
    if (selectedStructureType < 4) {
      switch (selectedTab) {
        case 0:
          return t('project_structure_subtitle_towers');
        case 1:
          return `${t(
            'project_structure_subtitle_floors',
          )} : tower ${getTowerLabel(selectedTower)}`;
        case 2:
          if (selectedStructureType === 1) {
            return `tower ${getTowerLabel(selectedTower)} > ${getFloorNumber(
              selectedFloor,
            )} : ${t('project_structure_subtitle_units_bhk')}`;
          } else {
            return `${t(
              'project_structure_subtitle_units',
            )} : tower ${getTowerLabel(selectedTower)} > ${getFloorNumber(
              selectedFloor,
            )}`;
          }
      }
    } else if (selectedStructureType === 4) {
      return t('projectStructureSubtitleBungalows');
    } else if (selectedStructureType === 5) {
      return t('projectStructureSubtitlePlots');
    }
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
        subTitle={getSubtitle()}
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
                {MENU_OPTIONS.map((option) => {
                  if (structureTypes[option.value]) {
                    return (
                      <Menu.Item
                        key={option.value}
                        theme={secondaryTheme}
                        title={t(TYPE_LABELS[option.value])}
                        onPress={() => {
                          updateStructure({
                            selectedStructureType: option.value,
                          });
                          toggleMenu();
                        }}
                      />
                    );
                  }
                })}
              </Menu>
            </View>
          );
        }}
      />
      <View style={styles.barContainer}>
        {selectedStructureType < 4 ? (
          <MaterialTabs
            items={['Towers', 'Floors', 'Units']}
            selectedIndex={selectedTab}
            onChange={() => {}}
            barColor="#fff"
            indicatorColor={theme.colors.primary}
            inactiveTextColor={'#919191'}
            activeTextColor={theme.colors.primary}
            uppercase={false}
            textStyle={{
              fontFamily: 'Nunito-Regular',
            }}
          />
        ) : null}
      </View>
      {selectedTab === 0 ? (
        <TowersScreen
          towers={currentStructureData?.towers}
          towerCount={currentStructureData?.towerCount}
          selectedTower={selectedTower}
          assignToAllTowers={assignToAllTowers}
          setSelectedTower={setSelectedTower}
          showAllFloors={showAllFloors}
          onChangeTowers={updateTowers}
          saveStructureType={saveStructureType}
        />
      ) : null}
      {selectedTab === 1 ? (
        <FloorsScreen
          floors={currentStructureData?.towers?.[selectedTower]?.floors}
          floorCount={currentStructureData?.towers?.[selectedTower]?.floorCount}
          selectedStructureType={selectedStructureType}
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
          selectedStructureType={selectedStructureType}
          currentStructureData={currentStructureData}
          goBack={() => setSelectedTab(1)}
          handleNext={saveStructureType}
          assignBhkToUnit={assignBhkToUnit}
          assignToAllUnits={assignToAllUnits}
          updateBungalows={updateBungalows}
          units={
            currentStructureData?.towers?.[selectedTower]?.floors[selectedFloor]
              ?.units || currentStructureData?.units
          }
          unitCount={
            currentStructureData?.towers?.[selectedTower]?.floors[selectedFloor]
              ?.unitCount || currentStructureData?.unitCount
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
