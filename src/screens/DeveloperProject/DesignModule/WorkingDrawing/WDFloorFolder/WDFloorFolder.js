import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Divider, IconButton, Text, useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NoResult from 'components/Atoms/NoResult';
import {getShadow} from 'utils';
import FileIcon from 'assets/images/file_icon.png';

import useDesignModuleActions from 'redux/actions/designModuleActions';
import {useImagePicker} from 'hooks';
import {useSnackbar} from 'components/Atoms/Snackbar';
import FileViewer from 'react-native-file-viewer';

import {useDownload} from 'components/Atoms/Download';
import {getDownloadUrl} from 'utils/download';
import {getFileName} from 'utils/constant';
import dayjs from 'dayjs';
import CreateFolderDialogue from '../Components/CreateFolderDialog';

function RenderFile(props) {
  const {
    index,
    item,
    toggleMenu,
    setModalContentType,
    setModalContent,
    fileData,
  } = props;

  const {title, created} = fileData || {};

  const download = useDownload();

  const onPressFile = async file => {
    const fileUrl = getDownloadUrl(file.file_url);
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
    <View style={styles.recentFiles}>
      <View style={styles.sectionContainer} onPress={() => onPressFile(item)}>
        <Image source={FileIcon} style={styles.fileIcon} />
        <View>
          <Text style={(styles.verticalFlex, styles.text)} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.date}>
            {dayjs(created).format('DD MMM YYYY')}
          </Text>
        </View>

        <View>
          <IconButton
            icon="dots-vertical"
            onPress={() => {
              toggleMenu(index);
              setModalContentType('menu');
              setModalContent(item);
            }}
          />
        </View>
      </View>
    </View>
  );
}

function RenderRow(props) {
  const {item, onPress, handleFileUpload, fileData} = props;
  const {folder_title} = item;

  return (
    <View>
      <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
        <Text style={{fontSize: 18, margin: 10}}>{folder_title} </Text>
        <Divider />
        <RenderFile fileData={fileData} />
        <View style={{marginTop: 10}}>
          {!fileData.title ? (
            <OpacityButton
              opacity={0.18}
              style={styles.button}
              onPress={handleFileUpload}>
              <MaterialCommunityIcons name="plus" size={18} />
              <Text> Add File</Text>
            </OpacityButton>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
}

function WDFloorFolder(props) {
  const {navigation, route} = props;

  const {folderId, tower_id, floorId, folder_id} = route?.params || {};

  const {colors} = useTheme();
  const {openImagePicker} = useImagePicker();

  const snackbar = useSnackbar();

  const {createWDFloorFolder, getWDFloorFolder, uploadWDFloorFolderFile} =
    useDesignModuleActions();

  const [DialogType, setDialogType] = React.useState();

  const {selectedProject} = useSelector(s => s.project);
  const {loading, wdFolderList} = useSelector(s => s.designModule);

  const project_id = selectedProject.id;

  const listData = wdFolderList?.list || [];

  const fileData = wdFolderList?.working_drawing_tower_floors_files_list || {};

  const toggleDialog = v => setDialogType(v);

  const loadData = () => {
    getWDFloorFolder({
      working_drawing_floor_rows_id: floorId,
      project_id,
    });
  };

  React.useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createFolderHandler = async folder_name => {
    await createWDFloorFolder({
      project_id,
      folder_name,
      tower_id,
      folder_id: folderId,
      working_drawing_floor_rows_id: floorId,
    });
    toggleDialog();
    loadData();
  };

  const onChoose = v => {
    handleFileUpload(v);
  };

  const handleFileUpload = async file => {
    const formData = new FormData();

    formData.append('folder_id', folderId);
    formData.append('myfile', file);
    formData.append('project_id', project_id);
    formData.append('tower_id', tower_id);
    formData.append('working_drawing_floor_rows_id', floorId);
    formData.append('working_drawing_floor_rows_folder_id', folder_id);

    await uploadWDFloorFolderFile(formData);
    toggleDialog();
    snackbar.showMessage({
      message: 'File Uploaded Sucessfully!',
      variant: 'success',
    });
    loadData();
  };

  const uploadImage = () => {
    openImagePicker({type: 'file', onChoose});
    toggleDialog();
  };

  const navToNext = item => {
    navigation.navigate('FloorDestinationFiles', {
      folder_title: item.folder_title,
      item,
      folderId,
    });
  };

  const renderEmpty = () => <NoResult />;

  return (
    <>
      <CreateFolderDialogue
        visible={DialogType === 'createFolder'}
        toggleDialogue={toggleDialog}
        createFolderHandler={createFolderHandler}
        placeholder="Destination Name"
        title="Create new destination"
        addFile
        handleFileUpload={uploadImage}
      />

      {/* <DeleteDialog
        visible={DialogType === 'deleteFileFolder'}
        toggleDialogue={toggleDialog}
        dialogueContent={modalContent}
        deleteFileHandler={deleteFolderHandler}
      />  */}
      <View style={styles.container}>
        <Spinner visible={loading} textContent="" />
        <View style={styles.headerContainer}>
          <View style={styles.button}>
            <OpacityButton
              opacity={0.1}
              color={colors.primary}
              style={styles.backButton}
              onPress={navigation.goBack}>
              <MaterialCommunityIcons
                name="keyboard-backspace"
                size={18}
                color="black"
              />
            </OpacityButton>
          </View>
          <View style={styles.headerSubContainer}>
            <View>
              <Text numberOfLines={2} style={styles.headerTitle}>
                List
              </Text>
            </View>
            <View>
              <OpacityButton
                opacity={0.5}
                color={colors.primary}
                style={styles.addButton}
                onPress={() => toggleDialog('createFolder')}>
                <Text> Add File Destination</Text>
              </OpacityButton>
            </View>
          </View>
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            data={listData}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={() => loadData()} />
            }
            contentContainerStyle={styles.flatList}
            keyExtractor={item => item.id}
            ListEmptyComponent={renderEmpty}
            renderItem={({item}) => {
              return (
                <RenderRow
                  item={item}
                  onPress={() => navToNext(item)}
                  fileData={fileData}
                />
              );
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  optionContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#fff',
    ...getShadow(1),
    margin: 1,
  },
  recentFiles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%',
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 10,
  },
  backButton: {
    borderRadius: 50,
    marginRight: 7,
  },
  addButton: {
    marginRight: 7,
  },
  headerTitle: {
    fontSize: 18,
    color: 'black',
  },

  fileIcon: {
    width: 25,
    height: 25,
    paddingLeft: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  flatList: {
    flexGrow: 1,
  },
  flatListContainer: {
    flex: 1,
  },
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#080707',
    paddingHorizontal: 10,
    fontSize: 14,
    alignItems: 'center',
    maxWidth: 170,
  },
  date: {
    color: '#080707',
  },
  verticalFlex: {
    flexDirection: 'column',
  },
});

export default WDFloorFolder;
