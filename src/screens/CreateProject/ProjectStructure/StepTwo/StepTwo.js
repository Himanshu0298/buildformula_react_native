import React, {useState} from 'react';
import {View, StyleSheet, Keyboard, TouchableOpacity} from 'react-native';
import {Menu, Title, withTheme} from 'react-native-paper';
import FormTitle from 'components/Atoms/FormTitle';
import {useTranslation} from 'react-i18next';
import {secondaryTheme, theme} from 'styles/theme';
import {getFloorNumber, getShadow, getTowerLabel, getUnitLabel} from 'utils';
import {useSnackbar} from 'components/Atoms/Snackbar';
import MaterialTabs from 'react-native-material-tabs';
import {
  MAX_TOWERS,
  MAX_FLOORS,
  MAX_UNITS,
  STRUCTURE_TYPE_LABELS,
} from 'utils/constant';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import AntIcons from 'react-native-vector-icons/AntDesign';
import {useBackHandler} from '@react-native-community/hooks';
import useAddProjectActions from 'redux/actions/addProjectActions';
import {cloneDeep} from 'lodash';
import UnitsScreen from './Components/UnitsScreen';
import FloorsScreen from './Components/FloorsScreen';
import TowersScreen from './Components/TowersScreen';

const STRUCTURE_TYPES = [2, 3, 1, 4, 5];

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
  towerData = {},
}) {
  const towers = {};
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
  floorData = {},
}) {
  const {towers} = currentStructureData;
  const floors = {};
  for (let i = 0; i <= floorCount; i += 1) {
    floors[i] = floorData;
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
  const units = {};
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
  }
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

function validateUnits({
  selectedStructureType,
  units,
  unitCount,
  selectedFloor,
}) {
  let error = '';
  let allValid = true;
  if (selectedStructureType === 1 || selectedStructureType === 4) {
    for (let i = 1; i <= unitCount; i++) {
      if (!units[i].bhk) {
        allValid = false;
        error = `Assign BHK to unit ${getUnitLabel(selectedFloor, i)}`;
        break;
      }
    }
  }
  if (selectedStructureType >= 4) {
    if (!unitCount) {
      allValid = false;
      error = 'Minimum one unit is required';
    }
  }
  return {allValid, error};
}

function validateTowers(data, selectedStructureType) {
  const result = {};
  let error = '';
  let allValid = true;

  if (selectedStructureType < 4) {
    const {towers, towerCount} = data;
    if (!towerCount || towerCount === 0) {
      allValid = false;
      error = 'Minimum one tower is required';
    }
    Object.keys(towers).map(towerId => {
      result[towerId] = true;
      const {floors = {}, floorCount} = towers[towerId] || {};
      if (isNaN(floorCount)) {
        // check if floorCount is null
        result[towerId] = false;
        allValid = false;
        if (!error) {
          error = `Please Provide missing data for tower ${getTowerLabel(
            towerId,
          )}`;
        }
      } else {
        Object.keys(floors).map(floorId => {
          // check if all floors has 0 or more units
          if (isNaN(floors?.[floorId]?.unitCount)) {
            result[towerId] = false;
            allValid = false;
            if (!error) {
              error = `Please Provide missing data for tower ${getTowerLabel(
                towerId,
              )}`;
            }
          } else {
            const unitResult = validateUnits({
              selectedStructureType,
              units: floors?.[floorId]?.units,
              unitCount: floors?.[floorId]?.unitCount,
              selectedFloor: floorId,
            });
            result[towerId] = unitResult.allValid;
            allValid = unitResult.allValid;
            if (!allValid && !error) {
              error = `Please Provide missing data for tower ${getTowerLabel(
                towerId,
              )}`;
            }
          }
        });
      }
    });
  } else {
    const {units, unitCount} = data;
    const unitResult = validateUnits({
      selectedStructureType,
      units,
      unitCount,
      selectedFloor: 0,
    });
    allValid = unitResult.allValid;
    if (!allValid && !error) {
      error = unitResult.error;
    }
  }

  return {
    towerValidationById: result,
    allTowersValid: allValid,
    errorMessage: error,
  };
}

function StepTwo(props) {
  const {navigation} = props;

  const {t} = useTranslation();
  const snackbar = useSnackbar();

  let {structure, structureTypes, selectedStructureType, loading} = useSelector(
    state => state.addProject,
  );
  const {project} = useSelector(state => state.addProject);
  const {user} = useSelector(state => state.user);

  const [showModal, setShowModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    selectedStructureType < 4 ? 0 : 2,
  );
  const [selectedTower, setSelectedTower] = useState();
  const [selectedFloor, setSelectedFloor] = useState();

  const {updateStructure, saveStructure} = useAddProjectActions();

  selectedStructureType = parseInt(selectedStructureType, 10);
  const currentStructureData = structure[selectedStructureType];

  const toggleMenu = () => setShowModal(v => !v);

  const handleBack = () => {
    const selectedTypes = STRUCTURE_TYPES.filter(key => structureTypes[key]);
    const selectedTypeIndex = selectedTypes.indexOf(selectedStructureType);

    if (selectedTypeIndex > 0) {
      if (
        (selectedTab === 0 && selectedStructureType < 4) ||
        selectedStructureType >= 4
      ) {
        const previousType = selectedTypes[selectedTypeIndex - 1];
        updateStructure({selectedStructureType: previousType});
        setSelectedTab(previousType < 4 ? 0 : 2);
        return true;
      }
    }
    return false;
  };

  // TODO: use event-listener instead of hook and unmount on screen un-focus
  // Handle back press
  useBackHandler(handleBack);

  const showAllFloors = towerId => {
    Keyboard.dismiss();
    setSelectedTower(towerId);
    setSelectedTab(1);
  };

  const showAllUnits = floorId => {
    Keyboard.dismiss();
    setSelectedFloor(floorId);
    setSelectedTab(2);
  };

  const updateTowers = towerCount => {
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

  const updateFloors = floorCount => {
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
    if (unitCount && unitCount > MAX_UNITS[selectedStructureType]) {
      snackbar.showMessage({
        variant: 'warning',
        message: `Max ${MAX_UNITS[selectedStructureType]} units are allowed`,
      });
      updateStructure(
        updateUnits({
          structure,
          currentStructureData,
          selectedStructureType,
          selectedTower,
          floorId,
          unitCount: MAX_UNITS[selectedStructureType],
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

  const duplicateTowers = (from, duplicateTo) => {
    const {towers, towerCount} = structure[selectedStructureType];

    const fromTower = towers[from];

    const _towers = cloneDeep(towers);
    duplicateTo.map(key => {
      _towers[key] = fromTower;
    });

    updateStructure({
      structure: {
        ...structure,
        [selectedStructureType]: {towerCount, towers: _towers},
      },
    });
  };

  const duplicateFloors = (from, duplicateTo) => {
    const {towers} = currentStructureData;

    const {floors, floorCount} = towers[selectedTower];

    const fromFloor = floors[from];

    const _floors = cloneDeep(floors);
    duplicateTo.map(key => {
      _floors[key] = fromFloor;
    });

    updateStructure({
      structure: {
        ...structure,
        [selectedStructureType]: {
          ...currentStructureData,
          towers: {
            ...towers,
            [selectedTower]: {
              floorCount,
              floors: _floors,
            },
          },
        },
      },
    });
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

  const updateBungalows = unitCount => onChangeUnit(null, unitCount);

  const saveStructureType = async () => {
    // Validate all the previous types data is valid or not
    const selectedTypes = STRUCTURE_TYPES.filter(key => structureTypes[key]);
    const selectedTypeIndex = selectedTypes.indexOf(selectedStructureType);

    let allTypeValid = true;

    await Promise.all(
      selectedTypes.map(async (type, index) => {
        if (index <= selectedTypeIndex && allTypeValid) {
          const data = structure[type];
          const {allTowersValid, errorMessage} = await validateTowers(
            data,
            type,
          );

          if (!allTowersValid) {
            allTypeValid = allTowersValid;

            updateStructure({selectedStructureType: type});
            setSelectedTab(type < 4 ? 0 : 2);
            snackbar.showMessage({
              variant: 'warning',
              message: errorMessage,
            });
          }
        }
      }),
    );
    // check if all data is correctly provided
    if (allTypeValid) {
      if (selectedTypeIndex < selectedTypes.length - 1) {
        const nextType = selectedTypes[selectedTypeIndex + 1];
        updateStructure({selectedStructureType: nextType});
        setSelectedTab(nextType < 4 ? 0 : 2);
      } else {
        saveStructure({
          structureData: structure,
          projectId: project.id,
          userId: user.id,
        }).then(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'GeneralDashboard'}, {name: 'PlanSelect'}],
          });
        });
      }
    }
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
          }
          return `${t(
            'project_structure_subtitle_units',
          )} : tower ${getTowerLabel(selectedTower)} > ${getFloorNumber(
            selectedFloor,
          )}`;
      }
    } else if (selectedStructureType === 4) {
      return t('projectStructureSubtitleBungalows');
    } else if (selectedStructureType === 5) {
      return t('projectStructureSubtitlePlots');
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <FormTitle
        title={false}
        subTitle={getSubtitle()}
        renderTitle={() => {
          return (
            <View style={styles.titleContainer}>
              <Title theme={secondaryTheme}>
                {t('label_project_structure')}
              </Title>
              <Menu
                visible={showModal}
                onDismiss={toggleMenu}
                anchor={
                  <TouchableOpacity
                    onPress={toggleMenu}
                    style={styles.structureTitle}>
                    <Title theme={secondaryTheme}>
                      {t(STRUCTURE_TYPE_LABELS[selectedStructureType])}
                    </Title>
                    <AntIcons
                      name="caretdown"
                      color="#fff"
                      style={{marginLeft: 5}}
                    />
                  </TouchableOpacity>
                }>
                {MENU_OPTIONS.map(option => {
                  if (structureTypes[option.value]) {
                    return (
                      <Menu.Item
                        key={option.value}
                        title={t(STRUCTURE_TYPE_LABELS[option.value])}
                        onPress={() => {
                          toggleMenu();
                          setSelectedTab(option.value < 4 ? 0 : 2);
                          updateStructure({
                            selectedStructureType: option.value,
                          });
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
            inactiveTextColor="#919191"
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
          currentStructureData={currentStructureData}
          selectedStructureType={selectedStructureType}
          duplicateTowers={duplicateTowers}
          setSelectedTower={setSelectedTower}
          showAllFloors={showAllFloors}
          onChangeTowers={updateTowers}
          saveStructureType={saveStructureType}
          validateTowers={validateTowers}
        />
      ) : null}
      {selectedTab === 1 ? (
        <FloorsScreen
          floors={currentStructureData?.towers?.[selectedTower]?.floors}
          floorCount={currentStructureData?.towers?.[selectedTower]?.floorCount}
          selectedStructureType={selectedStructureType}
          setSelectedFloor={setSelectedFloor}
          duplicateFloors={duplicateFloors}
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
          validateUnits={validateUnits}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  structureTitle: {
    marginLeft: 10,
    flexDirection: 'row',

    alignItems: 'center',
  },
  barContainer: {
    ...getShadow(5),
    backgroundColor: '#fff',
  },
});

export default withTheme(StepTwo);
