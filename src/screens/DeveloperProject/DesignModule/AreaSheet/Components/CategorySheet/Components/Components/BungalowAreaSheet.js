import RenderInput from 'components/Atoms/RenderInput';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Portal, TextInput, useTheme, withTheme} from 'react-native-paper';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import RenderTable from 'components/Atoms/RenderTable';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BUNGALOW_AREA_DETAILS = [
  {label: 'Banglow', key: 'banglow', value: ''},
  {label: 'Net land area', key: 'net_land_area', value: ''},
  {label: 'Undivided land area', key: 'undivided_land_area', value: ''},
  {label: 'Super buildup area', key: 'super_buildup_area', value: ''},
  {
    label: 'Construction buildup area',
    key: 'construction_buildup_area',
    value: '',
  },
  {
    label: 'Construction super buildup area',
    key: 'construction_super_buildup_area',
    value: '',
  },
  {label: 'Carpet area', key: 'carpet_area', value: ''},
];
const TABLE_WIDTH = [70, 130, 120, 170, 150, 170, 120];

const STATIC_DATA = [
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
];

function BungalowAreaSheet(props) {
  const {setSelectedSubCategory} = props;

  const [sheetData, setSheetData] = React.useState([...BUNGALOW_AREA_DETAILS]);

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
      updatedData.unshift(`10${index + 1}`);
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
        <Text style={styles.headerTitle}>Bungalow</Text>

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
            headerColumns={BUNGALOW_AREA_DETAILS.map(i => i.label)}
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
export default withTheme(BungalowAreaSheet);
