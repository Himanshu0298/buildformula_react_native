import * as React from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TextInput, useTheme, withTheme} from 'react-native-paper';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import RenderTable from 'components/Atoms/RenderTable';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useDesignModuleActions from 'redux/actions/designModuleActions';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getTowerLabel} from 'utils';
import RenderSelect from 'components/Atoms/RenderSelect';
import {cloneDeep, debounce} from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';

const Tower_AREA_DETAILS = [
  {label: 'Floor', key: 'floor', value: ''},
  {label: 'Super buildup area', key: 'super_build_up_area', value: ''},
  {label: 'Buildup area', key: 'build_up_area', value: ''},
  {label: 'Carpet', key: 'carpet', value: ''},
  {label: 'Wash area', key: 'wash_area', value: ''},
  {label: 'Balcony area', key: 'balcony_area', value: ''},
  {label: 'Total area', key: 'total_area', value: ''},
  {label: 'North', key: 'north', value: ''},
  {label: ' South ', key: 'south', value: ''},
  {label: 'East', key: 'east', value: ''},
  {label: 'West', key: 'west', value: ''},
  {label: 'Open Terrace Area', key: 'open_terrace_area', value: ''},
  {label: 'Undivided land', key: 'undevided_land', value: ''},
];
const TABLE_WIDTH = [90, 130, 120, 90, 100, 100, 100, 80, 80, 80, 80, 130, 130];

function TowerUnitSheet(props) {
  const {setSelectedUnit} = props;
  const [sheetData, setSheetData] = React.useState();

  const {getTowerUnitSheet, updateTowerUnitSheet} = useDesignModuleActions();
  const theme = useTheme();

  const [selectedTower, setSelectedTower] = React.useState();

  const {selectedProject} = useSelector(s => s.project);
  const {unitTowerList, loading} = useSelector(s => s.designModule);

  const {unit_sheet_towers_data} = unitTowerList;

  const project_id = selectedProject.id;

  const structureData = selectedProject?.project_structure || {};
  const {towers} = structureData?.['6'] || {};

  const towerOptions = React.useMemo(() => {
    return towers.map((item, index) => ({
      label: getTowerLabel(index + 1),
      value: item.tower_id,
    }));
  }, [towers]);

  useEffect(() => {
    if (towerOptions?.length) {
      setSelectedTower(towerOptions?.[0].value);
    }
  }, [towerOptions]);

  useEffect(() => {
    if (selectedTower) {
      loadInitialData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTower]);

  const loadInitialData = () =>
    getTowerUnitSheet({project_id, tower_id: selectedTower});

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      AndroidKeyboardAdjust?.adjustResize();
      return () => AndroidKeyboardAdjust.adjustPan();
    }
    return null;
  }, []);

  React.useEffect(() => {
    if (unit_sheet_towers_data?.length) {
      const leftTitle = unit_sheet_towers_data.map(item => item.title);
      const updatedSheetData = new Array(unit_sheet_towers_data.length)
        .fill(new Array(Tower_AREA_DETAILS.length - 1).fill(''))
        .map((item, index) => {
          const updatedData = item.map((_value, cellIndex) => {
            const {key} = Tower_AREA_DETAILS[cellIndex + 1];
            return unit_sheet_towers_data[index][key];
          });
          return cloneDeep({
            id: index,
            title: `${leftTitle[index]}`,
            data: updatedData,
          });
        });

      setSheetData(updatedSheetData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit_sheet_towers_data]);

  const syncData = (rowIndex, updatedSheetData, existingData) => {
    let updatedData = {};
    const currentData = existingData[rowIndex];

    updatedSheetData[rowIndex].data.map((value, cellIndex) => {
      const {key} = Tower_AREA_DETAILS[cellIndex + 1];
      updatedData[key] = Number(value);
      return value;
    });

    updatedData = {...currentData, ...updatedData};

    updateTowerUnitSheet(updatedData);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = React.useCallback(debounce(syncData, 1000), []);

  const updateValue = (rowId, cellIndex, text) => {
    const rowIndex = sheetData.findIndex(i => i.id === rowId);

    const oldSheetData = cloneDeep(sheetData);
    oldSheetData[rowIndex].data[cellIndex] = text;
    setSheetData([...oldSheetData]);

    debouncedSave(rowIndex, oldSheetData, unit_sheet_towers_data);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <View style={styles.renderSelectContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.button}>
            <OpacityButton
              opacity={0.1}
              color={theme.colors.primary}
              style={styles.backButton}
              onPress={() => setSelectedUnit()}>
              <MaterialCommunityIcons
                name="keyboard-backspace"
                size={18}
                color="black"
              />
            </OpacityButton>
          </View>
          <Text style={styles.headerTitle}>Tower</Text>
        </View>
        <View style={styles.savedContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="#00ff00" />
          ) : (
            <>
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={24}
                color="green"
              />
              <View style={styles.textContainer}>
                <Text>Saved</Text>
              </View>
            </>
          )}
        </View>
      </View>
      <View style={styles.selectTower}>
        <RenderSelect
          name="tower"
          label="Tower"
          options={towerOptions}
          value={selectedTower}
          onSelect={setSelectedTower}
        />
      </View>

      <View style={styles.scrollContent}>
        <RenderTable
          tableWidths={TABLE_WIDTH}
          headerColumns={Tower_AREA_DETAILS.map(i => i.label)}
          data={sheetData}
          renderCell={(cellData, cellIndex, rowId) => {
            return (
              <TextInput
                value={cellData?.toString()}
                style={styles.textInput}
                onChangeText={text => updateValue(rowId, cellIndex, text)}
                keyboardType="numeric"
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: 'black',
  },
  scrollContent: {
    flexGrow: 1,
  },
  backButton: {
    borderRadius: 50,
    marginRight: 7,
  },
  renderSelectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  savedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  textContainer: {
    marginLeft: 5,
  },
  selectTower: {
    paddingBottom: 20,
  },
  textInput: {
    height: 37,
    borderWidth: 0,
  },
});

export default withTheme(TowerUnitSheet);
