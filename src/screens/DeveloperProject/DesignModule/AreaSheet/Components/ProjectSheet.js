import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInput, useTheme, withTheme} from 'react-native-paper';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import useDesignModuleActions from 'redux/actions/designModuleActions';
import Spinner from 'react-native-loading-spinner-overlay';

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
  const {item, updateValue, setSelected} = props;
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
  const {selectedProject, loading} = useSelector(s => s.project);
  const {areaSheet} = useSelector(s => s.designModule);
  const {data} = areaSheet;
  const project_id = selectedProject.id;

  const [sheetData, setSheetData] = useState({});
  const [selected, setSelected] = useState(true);

  const {updateAreaSheet} = useDesignModuleActions();

  React.useEffect(() => {
    const updatedData = {...PROJECT_AREA_DETAILS};
    if (data) {
      Object.keys(PROJECT_AREA_DETAILS)?.map(key => {
        updatedData[key] = {...updatedData[key], value: data[key]};
        return key;
      });
    }
    setSheetData(updatedData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      AndroidKeyboardAdjust?.adjustResize();
      return () => AndroidKeyboardAdjust.adjustPan();
    }
    return () => null;
  }, []);

  const updateValue = (key, value) => {
    setSheetData(v => ({
      ...v,
      [key]: {...v[key], value: value ? Number(value) : value},
    }));
  };
  const theme = useTheme();

  const handleClose = () => {
    setSelected(false);
  };

  const submitForm = () => {
    const finalData = {};

    Object.entries(sheetData).map(([key, {value}]) => {
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

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Project Area Details</Text>
        {selected ? (
          <View style={styles.button}>
            <OpacityButton
              opacity={0.1}
              color={theme.colors.primary}
              style={styles.checkButton}
              onPress={submitForm}>
              <MaterialIcon
                name="check"
                color={theme.colors.primary}
                size={20}
              />
            </OpacityButton>
            <OpacityButton
              opacity={0.1}
              color={theme.colors.error}
              style={styles.closeButton}
              onPress={handleClose}>
              <MaterialIcon name="close" color={theme.colors.error} size={20} />
            </OpacityButton>
          </View>
        ) : null}
      </View>
      <KeyboardAwareScrollView
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
  button: {
    flexDirection: 'row',
    paddingBottom: 10,
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

  checkButton: {
    borderRadius: 50,
    marginRight: 10,
  },
  closeButton: {
    borderRadius: 50,
  },
  textInput: {
    height: 37,
    width: 150,
    borderWidth: 0,
  },
});

export default withTheme(ProjectSheet);
