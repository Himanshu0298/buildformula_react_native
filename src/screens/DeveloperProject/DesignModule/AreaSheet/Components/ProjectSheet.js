import RenderInput from 'components/Atoms/RenderInput';
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Portal, TextInput, useTheme, withTheme} from 'react-native-paper';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const PROJECT_AREA_DETAILS = [
  {label: 'Total Plot Area', key: 'total_plot_area', value: ''},
  {label: 'F.S.I', key: 'fsi', value: ''},
  {label: 'Total Buildup Area', key: 'total_buildup_area', value: ''},
  {label: 'Total carpet area', key: 'total_carpet_area', value: ''},
  {label: 'Total saleable area', key: 'total_saleable_area', value: ''},
  {label: 'Parking buildup area', key: 'parking_buildup_area', value: ''},
  {label: 'Ground coverage ratio', key: 'tower_coverage_area', value: ''},
  {label: 'Tower buildup area', key: 'total_tower_buildup_area', value: ''},
  {label: 'Total footprint area', key: 'total_footprint_area', value: ''},
];

function RenderRow(props) {
  const {item, selected, setSelected} = props;
  const {label, value, key} = item;

  const theme = useTheme();

  return (
    <View style={styles.rowContainer}>
      <View style={styles.rowLeftContainer}>
        <Text>{label}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.rowRightContainer,
          selected === key
            ? {borderWidth: 1, borderColor: theme.colors.primary}
            : {},
        ]}
        onPress={() => setSelected(key)}>
        <Text>{value}</Text>
      </TouchableOpacity>
    </View>
  );
}

function ProjectSheet() {
  const [sheetData, setSheetData] = React.useState([...PROJECT_AREA_DETAILS]);
  const [selected, setSelected] = React.useState();

  React.useEffect(() => {
    AndroidKeyboardAdjust.adjustResize();
    return () => AndroidKeyboardAdjust.adjustPan();
  }, []);

  const value = React.useMemo(() => {
    return sheetData.find(i => i.key === selected)?.value;
  }, [sheetData, selected]);

  const updateValue = text => {
    const index = sheetData.findIndex(i => i.key === selected);
    if (index !== -1) {
      const oldSheetData = [...sheetData];
      oldSheetData[index].value = text;

      setSheetData([...oldSheetData]);
    }
  };
  const theme = useTheme();

  const handleClose = () => {
    console.log('');
  };
  const submitForm = () => {
    console.log('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Project Area Details</Text>
        <View style={styles.button}>
          <OpacityButton
            opacity={0.1}
            color={theme.colors.primary}
            style={styles.checkButton}
            onPress={submitForm}>
            <MaterialIcon name="check" color={theme.colors.primary} size={20} />
          </OpacityButton>
          <OpacityButton
            opacity={0.1}
            color={theme.colors.error}
            style={styles.closeButton}
            onPress={handleClose}>
            <MaterialIcon name="close" color={theme.colors.error} size={20} />
          </OpacityButton>
        </View>
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.tableContainer}>
          {sheetData.map((item, index) => (
            <RenderRow
              key={index?.toString()}
              {...{item, selected, setSelected}}
            />
          ))}
        </View>
      </KeyboardAwareScrollView>

      {selected ? (
        <Portal>
          <View style={styles.inputContainer}>
            <RenderInput
              autoFocus
              value={value}
              placeholder="Enter text or formula"
              onChangeText={updateValue}
              right={
                <TextInput.Icon
                  name="check"
                  color="#fff"
                  style={[
                    styles.checkIcon,
                    {backgroundColor: theme.colors.primary},
                  ]}
                />
              }
            />
          </View>
        </Portal>
      ) : null}
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
  checkIcon: {
    borderRadius: 4,
  },
  rowRightContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  checkButton: {
    borderRadius: 50,
    marginRight: 10,
  },
  closeButton: {
    borderRadius: 50,
  },
});

export default withTheme(ProjectSheet);
