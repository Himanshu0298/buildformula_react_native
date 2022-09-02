import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInput, useTheme, withTheme} from 'react-native-paper';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import RenderTable from 'components/Atoms/RenderTable';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import useDesignModuleActions from 'redux/actions/designModuleActions';
import {cloneDeep, debounce} from 'lodash';

const TOWER_AREA_DETAILS = [
  {label: 'Tower', key: 'tower', value: ''},
  {label: 'Total saleable area', key: 'total_saleable_area', value: ''},
  {label: 'Total carpet area', key: 'total_carpet_area', value: ''},
  {
    label: 'Total balcony carpet area',
    key: 'total_balcony_carpet_area',
    value: '',
  },
  {label: 'Total wash area carpet', key: 'total_wash_area_carpet', value: ''},
  {label: 'Total flat carpet area', key: 'total_flat_carpet_area', value: ''},
  {label: 'Tower buildup area', key: 'total_build_up_area', value: ''},
  {label: 'Total lobby area', key: 'total_lobby_area', value: ''},
  {label: 'Total Staircase area', key: 'total_straircase_area', value: ''},
  {label: 'Total Lift Area', key: 'total_lift_area', value: ''},
  {label: 'Total Floor Plate Area', key: 'total_floor_plat_area', value: ''},
  {
    label: 'Total Built-up Plinth Area',
    key: 'total_build_up_plinth_area',
    value: '',
  },
  {
    label: 'Tarrace cabin,lift room,pump, etc area',
    key: 'tarrace_cabin_lift_room_pump_etc_area',
    value: '',
  },
];

const TABLE_WIDTH = [
  70, 130, 120, 170, 150, 170, 120, 120, 140, 125, 145, 150, 170,
];

function TowerAreaSheet(props) {
  const {setSelectedSubCategory} = props;

  const [sheetData, setSheetData] = useState([]);

  const {getCategoryTowerSheet, updateCategoryTowerSheet} =
    useDesignModuleActions();
  const theme = useTheme();

  const {selectedProject} = useSelector(s => s.project);
  const {towerList, loading} = useSelector(s => s.designModule);
  const project_id = selectedProject.id;

  const {project_tower_data = [], category_sheet_towers_data = []} =
    towerList || [];

  useEffect(() => {
    getCategoryTowerSheet({project_id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      AndroidKeyboardAdjust?.adjustResize();
      return () => AndroidKeyboardAdjust.adjustPan();
    }
    return null;
  }, []);

  useEffect(() => {
    if (project_tower_data?.length) {
      const towerLabels = project_tower_data?.map(i => i.tower_title);
      const updatedSheetData = new Array(project_tower_data.length)
        .fill(new Array(TOWER_AREA_DETAILS.length - 1).fill(''))
        .map((item, index) => {
          const rowData = category_sheet_towers_data[index] || {};
          const updatedData = item.map((_value, cellIndex) => {
            const {key} = TOWER_AREA_DETAILS[cellIndex + 1];
            return rowData[key];
          });
          return cloneDeep({
            id: index + 1,
            title: `Tower ${towerLabels[index]}`,
            data: updatedData,
          });
        });
      setSheetData(updatedSheetData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project_tower_data]);

  const syncData = (rowIndex, updatedSheetData) => {
    let updatedData = {};
    updatedSheetData[rowIndex].data.map((value, cellIndex) => {
      const {key} = TOWER_AREA_DETAILS[cellIndex + 1];
      updatedData[key] = Number(value);
      return value;
    });

    const currentData = category_sheet_towers_data[rowIndex];

    updatedData = {...currentData, ...updatedData};

    updateCategoryTowerSheet(updatedData);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = React.useCallback(debounce(syncData, 1000), [
    category_sheet_towers_data,
  ]);

  const updateValue = (rowId, cellIndex, text) => {
    const rowIndex = sheetData.findIndex(i => i.id === rowId);

    const oldSheetData = cloneDeep(sheetData);
    oldSheetData[rowIndex].data[cellIndex] = text;
    setSheetData([...oldSheetData]);

    debouncedSave(rowIndex, oldSheetData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerButtonContainer}>
          <View style={styles.button}>
            <OpacityButton
              opacity={0.1}
              color={theme.colors.primary}
              style={styles.backButton}
              onPress={() => setSelectedSubCategory()}>
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
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.tableContainer}>
          <RenderTable
            tableWidths={TABLE_WIDTH}
            headerColumns={TOWER_AREA_DETAILS.map(i => i.label)}
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
      </KeyboardAwareScrollView>
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
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  headerButtonContainer: {
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
    paddingBottom: 50,
    flexGrow: 1,
  },
  tableContainer: {
    borderColor: '#C3C3C3',
    alignItems: 'center',
    flexGrow: 1,
  },

  backButton: {
    borderRadius: 50,
    marginRight: 7,
  },
  textInput: {
    height: 37,
    borderWidth: 0,
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
});

export default withTheme(TowerAreaSheet);
