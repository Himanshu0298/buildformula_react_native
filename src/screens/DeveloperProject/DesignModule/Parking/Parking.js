import * as React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
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
import {getDownloadUrl, getFileExtension} from 'utils/download';
import {useImagePicker} from 'hooks';
import {useSnackbar} from 'components/Atoms/Snackbar';
import Spinner from 'react-native-loading-spinner-overlay';
import {useAlert} from 'components/Atoms/Alert';
import {cloneDeep, debounce} from 'lodash';
import {getFileName} from 'utils/constant';
import {useDownload} from 'components/Atoms/Download';
import FileViewer from 'react-native-file-viewer';

const Parking_DETAILS = [
  {label: 'Parking', key: 'parking', value: ''},
  {label: 'Allocated to', key: 'allocated_to', value: ''},
];
const TABLE_WIDTH = [Layout.window.width * 0.25, Layout.window.width * 0.65];

function RenderFile(props) {
  const {item, handleDelete} = props;

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const download = useDownload();

  const onPressFile = async file => {
    const fileUrl = getDownloadUrl({file: file.file_url, common: true});
    const name = getFileName(file.title);
    download.link({
      name,
      link: fileUrl,
      showAction: false,
      onFinish: ({dir}) => {
        FileViewer.open(`file://${dir}`);
      },
    });
  };

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
          {/* <Menu.Item
            onPress={() => {
              console.log('-->');
            }}
            title="Download"
          /> */}
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
  const [sheetData, setSheetData] = React.useState([]);
  const [menuIndex, setMenuIndex] = React.useState(false);

  const snackbar = useSnackbar();
  const alert = useAlert();

  const {
    getParkingList,
    updateParkingList,
    uploadParkingFile,
    deleteParkingFile,
  } = useDesignModuleActions();

  const {selectedProject} = useSelector(s => s.project);
  const project_id = selectedProject.id;

  const {parkingList, loading} = useSelector(s => s.designModule);
  const {all_parking_units = []} = parkingList || {};

  React.useEffect(() => {
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadInitialData = () => getParkingList({project_id});

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      AndroidKeyboardAdjust?.setAdjustResize();
      return () => AndroidKeyboardAdjust.setAdjustResize();
    }
    return null;
  }, []);

  React.useEffect(() => {
    processData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all_parking_units]);

  const processData = () => {
    if (all_parking_units.length) {
      const data = all_parking_units.map((item, index) => {
        return {title: index + 1, id: item.id, data: [item.allotment_data]};
      });

      setSheetData(data);
    }
  };

  const toggleMenu = v => setMenuIndex(v);

  const syncData = updatedSheetData => {
    const updatedData = updatedSheetData.map(i => ({
      id: i.id,
      allotment_data: i.data[0],
    }));
    updateParkingList({
      project_id,
      parking_allotments: updatedData,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = React.useCallback(debounce(syncData, 1000), []);

  const updateValue = (id, cellIndex, value) => {
    const updatedSheetData = cloneDeep(sheetData);
    const rowIndex = sheetData.findIndex(i => i.id === id);

    updatedSheetData[rowIndex].data[cellIndex] = value;

    setSheetData(updatedSheetData);

    debouncedSave(updatedSheetData);
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
      <View style={styles.actionButton}>
        <Text style={styles.headerTitle}>Parking Sheet</Text>

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
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={loadInitialData} />
        }
        keyboardShouldPersistTaps="handled">
        <View style={styles.tableContainer}>
          <RenderTable
            tableWidths={TABLE_WIDTH}
            headerColumns={Parking_DETAILS.map(i => i.label)}
            data={sheetData}
            renderCell={(cellData, cellIndex, id) => {
              return (
                <TextInput
                  value={cellData?.toString()}
                  style={styles.textInput}
                  onChangeText={text => updateValue(id, cellIndex, text)}
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
  headerTitle: {
    fontSize: 18,
    color: 'black',
    paddingVertical: 20,
  },
  scrollContent: {
    paddingBottom: '50%',
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
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

export default withTheme(Parking);
