import * as React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {IconButton, Menu, withTheme} from 'react-native-paper';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import RenderTable from 'components/Atoms/RenderTable';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Layout from 'utils/Layout';
import useDesignModuleActions from 'redux/actions/designModuleActions';
import {useSelector} from 'react-redux';
import {theme} from 'styles/theme';
import FileIcon from 'assets/images/file_icon.png';
import {getFileExtension} from 'utils/download';
import {useImagePicker} from 'hooks';
import {useSnackbar} from 'components/Atoms/Snackbar';
import Spinner from 'react-native-loading-spinner-overlay';
import NoResult from 'components/Atoms/NoResult';
import {useAlert} from 'components/Atoms/Alert';

const Parking_DETAILS = [
  {label: 'Parking', key: 'parking', value: ''},
  {label: 'Allocated to', key: 'allocated_to', value: ''},
];
const TABLE_WIDTH = [Layout.window.width * 0.25, Layout.window.width * 0.65];

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

function RenderFile(props) {
  const {item, onPressFile, handleDelete} = props;

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.renderContainer}>
      <TouchableOpacity
        style={styles.renderContainer}
        onPress={() => onPressFile(item)}>
        <Image source={FileIcon} style={styles.fileIcon} />
        <View>
          <Text style={(styles.verticalFlex, styles.text)} numberOfLines={2}>
            {item?.title}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={{}}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<IconButton onPress={openMenu} icon="dots-vertical" />}>
          <Menu.Item
            onPress={() => {
              console.log('-->');
            }}
            title="Download"
          />
          <Menu.Item onPress={() => handleDelete(item.id)} title="Delete" />
        </Menu>
      </View>
    </View>
  );
}

const ParkingFiles = props => {
  const {onChoose, data, handleDelete} = props;
  const {parking_file} = data;
  const {file_type} = parking_file || {};

  const {openImagePicker} = useImagePicker();

  return (
    <View style={styles.parkingContainer}>
      <Text style={styles.parkingFilesText}>Parking Files</Text>
      {!file_type || file_type === 'image/jpg' ? (
        <View style={styles.uploadContainer}>
          <OpacityButton
            opacity={0.1}
            color={theme.colors.primary}
            onPress={() => openImagePicker({type: 'file', onChoose})}
            style={styles.backButton}>
            <MaterialCommunityIcons
              name="cloud-upload"
              size={25}
              color={theme.colors.primary}
            />
          </OpacityButton>
          <Text>Upload</Text>
        </View>
      ) : (
        <RenderFile item={parking_file} handleDelete={handleDelete} />
      )}
    </View>
  );
};

function Parking(props) {
  const [sheetData, setSheetData] = React.useState([...Parking_DETAILS]);
  const [menuIndex, setMenuIndex] = React.useState(false);

  const toggleMenu = v => setMenuIndex(v);

  const [selected, setSelected] = React.useState();
  const snackbar = useSnackbar();
  const alert = useAlert();

  const {getParkingList, uploadParkingFile, deleteParkingFile} =
    useDesignModuleActions();

  const {selectedProject} = useSelector(s => s.project);
  const project_id = selectedProject.id;

  const {parkingList, loading} = useSelector(s => s.designModule);
  const {all_parking_units = []} = parkingList || {};

  React.useEffect(() => {
    getParkingList({project_id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      AndroidKeyboardAdjust?.adjustResize();
      return () => AndroidKeyboardAdjust.adjustPan();
    }
    return null;
  }, []);

  const processedData = React.useMemo(() => {
    return all_parking_units.map((item, index) => {
      return {
        id: index + 1,
        title: index + 1,
        data: [item.allotment_data],
      };
    });
  }, [all_parking_units]);

  const updateValue = text => {
    const index = sheetData.findIndex(i => i.key === selected);
    if (index !== -1) {
      const oldSheetData = [...sheetData];
      oldSheetData[index].value = text;

      setSheetData([...oldSheetData]);
    }
  };

  const handleDelete = id => {
    toggleMenu();
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteParkingFile({project_id, parking_file_id: id}).then(() => {
          getParkingList({project_id});
        });
      },
    });
  };

  const onChoose = v => {
    handleFileUpload(v);
  };

  const handleFileUpload = async file => {
    const {name} = file;
    const extension = getFileExtension(file.name);
    file.name = `${name}.${extension}`;

    const formData = new FormData();

    formData.append('myfile', file);
    formData.append('project_id', project_id);

    await uploadParkingFile(formData);
    snackbar.showMessage({
      message: 'File Uploaded Sucessfully!',
      variant: 'success',
    });
    getParkingList({project_id});
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />

      <ParkingFiles
        onChoose={onChoose}
        data={parkingList}
        handleDelete={handleDelete}
      />
      <Text style={styles.headerTitle}>Parking Sheet</Text>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.tableContainer}>
          <RenderTable
            tableWidths={TABLE_WIDTH}
            headerColumns={Parking_DETAILS.map(i => i.label)}
            data={processedData}
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

          {/*           
          {processedData?.length ? (
            <RenderTable
              tableWidths={TABLE_WIDTH}
              headerColumns={Parking_DETAILS.map(i => i.label)}
              data={processedData}
            />
          ) : (
            <NoResult />
          )} */}
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
  headerTitle: {
    fontSize: 18,
    color: 'black',
    paddingVertical: 20,
  },
  scrollContent: {
    paddingBottom: 50,
    flexGrow: 1,
  },
  tableContainer: {
    flexGrow: 1,
    borderColor: '#C3C3C3',
    alignItems: 'center',
  },
  backButton: {
    borderRadius: 50,
    marginRight: 10,
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  verticalFlex: {
    flexDirection: 'column',
  },
  text: {
    color: '#080707',
    paddingHorizontal: 10,
    fontSize: 14,
    alignItems: 'center',
    maxWidth: 170,
  },
  parkingContainer: {
    marginTop: 20,
  },
  parkingFilesText: {
    fontSize: 18,
  },
  uploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  renderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default withTheme(Parking);
