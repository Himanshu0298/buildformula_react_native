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
import {cloneDeep, debounce} from 'lodash';
import {useEffect} from 'react';

const BUNGALOW_AREA_DETAILS = [
  {label: 'Banglow', key: 'banglow', value: ''},
  {label: 'Net land area', key: 'net_land_area', value: ''},
  {label: 'Undivided land area', key: 'undevided_land_area', value: ''},
  {label: 'Super buildup area', key: 'super_build_up_area', value: ''},
  {
    label: 'Construction buildup area',
    key: 'construction_build_up_area',
    value: '',
  },
  {
    label: 'Construction super buildup area',
    key: 'construction_super_build_up_area',
    value: '',
  },
  {label: 'Carpet area', key: 'carpet_area', value: ''},
];
const TABLE_WIDTH = [70, 130, 120, 170, 150, 170, 120];

function BungalowUnitSheet(props) {
  const {setSelectedUnit} = props;

  const [sheetData, setSheetData] = React.useState([]);

  const {getBungalowUnitSheet, updateBungalowUnitSheet} =
    useDesignModuleActions();
  const theme = useTheme();

  const {selectedProject} = useSelector(s => s.project);
  const {unitBungalowList, loading} = useSelector(s => s.designModule);

  const {unit_sheet_bungalow_data = []} = unitBungalowList || {};
  const project_id = selectedProject.id;

  useEffect(() => {
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadInitialData = () => getBungalowUnitSheet({project_id});

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      AndroidKeyboardAdjust?.setAdjustResize();
      return () => AndroidKeyboardAdjust.setAdjustResize();
    }
    return null;
  }, []);

  React.useEffect(() => {
    if (unit_sheet_bungalow_data?.length) {
      const updatedSheetData = new Array(unit_sheet_bungalow_data.length)
        .fill(new Array(BUNGALOW_AREA_DETAILS.length - 1).fill(''))
        .map((item, index) => {
          const updatedData = item.map((_value, cellIndex) => {
            const {key} = BUNGALOW_AREA_DETAILS[cellIndex + 1];
            return unit_sheet_bungalow_data[index][key];
          });
          return cloneDeep({
            id: index,
            title: `${index + 1}`,
            data: updatedData,
          });
        });

      setSheetData(updatedSheetData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit_sheet_bungalow_data]);

  const syncData = (rowIndex, updatedSheetData, existingData) => {
    const currentRow = existingData[rowIndex];
    let updatedData = {};
    updatedSheetData[rowIndex].data.map((value, cellIndex) => {
      const {key} = BUNGALOW_AREA_DETAILS[cellIndex + 1];
      updatedData[key] = Number(value);
      return value;
    });

    updatedData = {...currentRow, ...updatedData};
    updateBungalowUnitSheet(updatedData);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = React.useCallback(debounce(syncData, 1000), []);

  const updateValue = (rowId, cellIndex, text) => {
    const rowIndex = sheetData.findIndex(i => i.id === rowId);

    const oldSheetData = cloneDeep(sheetData);
    oldSheetData[rowIndex].data[cellIndex] = text;
    setSheetData([...oldSheetData]);

    debouncedSave(rowIndex, oldSheetData, unit_sheet_bungalow_data);
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
              onPress={() => setSelectedUnit()}>
              <MaterialCommunityIcons
                name="keyboard-backspace"
                size={18}
                color="black"
              />
            </OpacityButton>
          </View>
          <Text style={styles.headerTitle}>Bungalow</Text>
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
      <View style={styles.scrollContent}>
        <RenderTable
          tableWidths={TABLE_WIDTH}
          headerColumns={BUNGALOW_AREA_DETAILS.map(i => i.label)}
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
export default withTheme(BungalowUnitSheet);
