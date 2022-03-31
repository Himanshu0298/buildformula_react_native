import RenderInput from 'components/Atoms/RenderInput';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Portal, TextInput, useTheme, withTheme} from 'react-native-paper';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import {getTowerLabel} from 'utils';
import RenderTable from 'components/Atoms/RenderTable';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tower_AREA_DETAILS = [
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
  {label: 'Tower buildup area', key: 'total_tower_buildup_area', value: ''},
  {label: 'Total lobby area', key: 'total_lobby_area', value: ''},
  {label: 'Total Staircase area', key: 'total_staircase_area', value: ''},
  {label: 'Total Lift Area', key: 'total_lift_area', value: ''},
  {label: 'Total Floor Plate Area', key: 'total_floor_plate_area', value: ''},
  {
    label: 'Total Built-up Plinth Area',
    key: 'total_built-up_plinth_area',
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

const STATIC_DATA = [
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
];

function TowerAreaSheet(props) {
  const {navigation, setSelectedSubCategory} = props;
  const [sheetData, setSheetData] = React.useState([...Tower_AREA_DETAILS]);

  const [selected, setSelected] = React.useState();

  React.useEffect(() => {
    AndroidKeyboardAdjust.adjustResize();
    return () => AndroidKeyboardAdjust.adjustPan();
  }, []);

  const value = React.useMemo(() => {
    return sheetData.find(i => i.key === selected)?.value;
  }, [sheetData, selected]);

  const processedData = React.useMemo(() => {
    return STATIC_DATA.map((item, index) => {
      const updatedData = [...item];
      updatedData.unshift(`Tower ${getTowerLabel(index + 1)}`);
      return {
        id: index + 1,
        data: updatedData,
      };
    });
  }, []);

  const updateValue = text => {
    const index = sheetData.findIndex(i => i.key === selected);
    if (index !== -1) {
      const oldSheetData = [...sheetData];
      oldSheetData[index].value = text;

      setSheetData([...oldSheetData]);
    }
  };
  const theme = useTheme();

  // const handleClose = () => {
  //   console.log('');
  // };
  // const submitForm = () => {
  //   console.log('');
  // };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
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
        {/* <View style={styles.button}>
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
        </View> */}
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.tableContainer}>
          <RenderTable
            tableWidths={TABLE_WIDTH}
            headerColumns={Tower_AREA_DETAILS.map(i => i.label)}
            data={processedData}
          />
          {/* <View style={styles.tableContainer}>
            {unitName.map((item, index) => (
              <RenderRow
                key={index?.toString()}
                {...{item, selected, setSelected}}
              />
            ))}
          </View> */}
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

  inputContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  backButton: {
    borderRadius: 50,
    marginRight: 7,
  },
  // checkButton: {
  //   borderRadius: 50,
  //   marginRight: 10,
  // },
  // closeButton: {
  //   borderRadius: 50,
  // },
});

export default withTheme(TowerAreaSheet);
