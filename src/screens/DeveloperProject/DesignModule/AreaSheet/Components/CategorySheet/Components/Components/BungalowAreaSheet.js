import * as React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInput, useTheme, withTheme} from 'react-native-paper';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import RenderTable from 'components/Atoms/RenderTable';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useDesignModuleActions from 'redux/actions/designModuleActions';
import {useSelector} from 'react-redux';
import RenderOpacityButton from 'components/Atoms/RenderOpacityButton';
import {cloneDeep} from 'lodash';

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

function BungalowAreaSheet(props) {
  const {setSelectedSubCategory} = props;

  const [sheetData, setSheetData] = React.useState([]);
  const theme = useTheme();

  const {getCategoryBungalowSheet, updateCategoryBungalowSheet} =
    useDesignModuleActions();

  const {selectedProject} = useSelector(s => s.project);
  const {bungalowList} = useSelector(s => s.designModule);

  const project_id = selectedProject.id;

  const {category_sheet_bungalow_data: bungalowData, project_bungalow_data} =
    bungalowList || {};

  React.useEffect(() => {
    getCategoryBungalowSheet({project_id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      AndroidKeyboardAdjust?.adjustResize();
      return () => AndroidKeyboardAdjust.adjustPan();
    }
    return null;
  }, []);

  const UpdateData = () => {
    const updatedSheetData = new Array(bungalowData.length)
      .fill(new Array(BUNGALOW_AREA_DETAILS.length - 1).fill(''))
      .map((item, index) => {
        const updatedData = item.map((_value, cellIndex) => {
          const {key} = BUNGALOW_AREA_DETAILS[cellIndex + 1];
          return bungalowData[key];
        });
        return cloneDeep({
          id: index,
          title: 'All Banglow',
          data: updatedData,
        });
      });
    setSheetData(updatedSheetData);
  };

  React.useEffect(() => {
    if (project_bungalow_data?.length) {
      UpdateData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project_bungalow_data]);

  const updateValue = (rowId, cellIndex, text) => {
    const index = sheetData.findIndex(i => i.id === rowId);

    const oldSheetData = cloneDeep(sheetData);
    oldSheetData[index].data[cellIndex] = text;

    setSheetData([...oldSheetData]);
  };

  const submitForm = async () => {
    const {data} = sheetData[0];

    const updatedData = cloneDeep(bungalowData);

    data.map((i, index) => {
      const {key} = BUNGALOW_AREA_DETAILS[index + 1];
      updatedData[key] = i;
      return i;
    });

    delete updatedData.last_updated;

    updateCategoryBungalowSheet({
      project_id,
      net_land_area: updatedData.net_land_area,
      undevided_land_area: updatedData.undevided_land_area,
      super_build_up_area: updatedData.super_build_up_area,
      construction_build_up_area: updatedData.construction_build_up_area,
      construction_super_build_up_area:
        updatedData.construction_super_build_up_area,
      carpet_area: updatedData.carpet_area,
    });
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
          <Text style={styles.headerTitle}>Bungalow</Text>
        </View>
        <RenderOpacityButton
          handleClose={() => UpdateData()}
          submitForm={submitForm}
        />
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.tableContainer}>
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
  },
  tableContainer: {
    borderColor: '#C3C3C3',
    alignItems: 'center',
  },

  backButton: {
    borderRadius: 50,
    marginRight: 7,
  },

  textInput: {
    height: 37,
    borderWidth: 0,
  },
});
export default withTheme(BungalowAreaSheet);
