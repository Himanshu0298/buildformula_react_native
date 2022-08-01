import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInput, withTheme} from 'react-native-paper';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import {useSelector} from 'react-redux';
import useDesignModuleActions from 'redux/actions/designModuleActions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {debounce, cloneDeep} from 'lodash';

const PROJECT_AREA_DETAILS = {
  total_plot_area: {label: 'Total Plot Area', value: ''},
  fsi: {label: 'F.S.I', value: ''},
  total_build_up_area: {label: 'Total Buildup Area', value: ''},
  total_carpet_area: {label: 'Total carpet area', value: ''},
  total_saleable_area: {label: 'Total saleable area', value: ''},
  parking_buildup_area: {label: 'Parking buildup area', value: ''},
  ground_coverage_area: {label: 'Ground coverage ratio', value: ''},
  tower_build_up_area: {label: 'Tower buildup area', value: ''},
  total_footprint_area: {label: 'Total footprint area', value: ''},
};

function RenderRow(props) {
  const {item, updateValue} = props;
  const {label, key, value} = item;

  return (
    <View style={styles.rowContainer}>
      <View style={styles.rowLeftContainer}>
        <Text>{label}</Text>
      </View>
      <TextInput
        value={value?.toString()}
        style={styles.textInput}
        onChangeText={text => updateValue(key, text)}
        keyboardType="numeric"
      />
    </View>
  );
}

function ProjectSheet() {
  const {selectedProject} = useSelector(s => s.project);
  const {projectAreaSheet, loading} = useSelector(s => s.designModule);
  const project_id = selectedProject.id;

  const [sheetData, setSheetData] = useState({});

  const {updateAreaSheet, getProjectSheetList} = useDesignModuleActions();

  useEffect(() => {
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      AndroidKeyboardAdjust?.adjustResize();
      return () => AndroidKeyboardAdjust.adjustPan();
    }
    return () => null;
  }, []);

  useEffect(() => {
    processData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectAreaSheet]);

  const loadInitialData = () => getProjectSheetList({project_id});

  const processData = () => {
    const updatedData = {...PROJECT_AREA_DETAILS};
    if (projectAreaSheet) {
      Object.keys(PROJECT_AREA_DETAILS)?.map(key => {
        updatedData[key] = {...updatedData[key], value: projectAreaSheet[key]};
        return key;
      });
    }
    setSheetData(updatedData);
  };

  const syncData = updatedSheetData => {
    const finalData = {};

    Object.entries(updatedSheetData).map(([key, {value}]) => {
      finalData[key] = value;
      return key;
    });
    updateAreaSheet({
      project_id,
      total_plot_area: finalData.total_plot_area,
      fsi: finalData.fsi,
      total_build_up_area: finalData.total_build_up_area,
      total_carpet_area: finalData.total_carpet_area,
      total_saleable_area: finalData.total_saleable_area,
      parking_buildup_area: finalData.parking_buildup_area,
      ground_coverage_area: finalData.ground_coverage_area,
      tower_build_up_area: finalData.tower_build_up_area,
      total_footprint_area: finalData.total_footprint_area,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = React.useCallback(debounce(syncData, 1000), []);

  const updateValue = (key, value) => {
    const updatedSheetData = cloneDeep(sheetData);

    updatedSheetData[key].value = value ? Number(value) : value;

    setSheetData(updatedSheetData);

    debouncedSave(updatedSheetData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Project Area Details</Text>
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
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={loadInitialData} />
        }
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.tableContainer}>
          {Object.keys(sheetData)?.map(key => (
            <RenderRow
              key={key}
              item={{...sheetData[key], key}}
              updateValue={updateValue}
              setSelected
            />
          ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    paddingBottom: 13,
    color: 'black',
  },
  scrollContent: {
    paddingBottom: 50,
  },
  tableContainer: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#C3C3C3',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#C3C3C3',
  },
  rowLeftContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#DEE1E7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 37,
    width: 150,
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

export default withTheme(ProjectSheet);
