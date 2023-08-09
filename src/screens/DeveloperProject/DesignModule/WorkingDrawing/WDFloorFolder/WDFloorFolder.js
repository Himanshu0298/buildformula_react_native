import React, {useEffect, useMemo, useRef} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Animated from 'react-native-reanimated';

import {
  Button,
  Caption,
  Dialog,
  Divider,
  IconButton,
  Portal,
  Subheading,
  Text,
  useTheme,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FileViewer from 'react-native-file-viewer';
import dayjs from 'dayjs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import _ from 'lodash';
import BottomSheet from 'reanimated-bottom-sheet';
import {Formik} from 'formik';
import {ScrollView} from 'react-native-gesture-handler';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import NoResult from 'components/Atoms/NoResult';
import {getShadow} from 'utils';
import FileIcon from 'assets/images/file_icon.png';

import useDesignModuleActions from 'redux/actions/designModuleActions';
import {useImagePicker} from 'hooks';
import {useSnackbar} from 'components/Atoms/Snackbar';

import {useDownload} from 'components/Atoms/Download';
import {getFileName} from 'utils/constant';
import {secondaryTheme, theme} from 'styles/theme';
import RenderInput from 'components/Atoms/RenderInput';
import {useAlert} from 'components/Atoms/Alert';
import CreateFolderDialogue from '../Components/CreateFolderDialog';
import MenuDialog from '../Components/MenuDialog';
import VersionDialog from '../Components/VersionDialog';
import DeleteDialog from '../Components/DeleteDialog';
import RenameDialogue from '../Components/RenameDialog';

const SNAP_POINTS = [0, '70%'];

const ACTIVITY_LABEL = {
  new_version: 'Uploaded new version',
  add: 'File Added',
  downloaded: 'Downloaded file',
  rename: 'Renamed File',
  delete: 'Deleted File',
};
const ACTIVITY_ICONS = {
  new_version: <MaterialIcons name="file-copy" size={20} />,
  rename: <MaterialCommunityIcons name="pencil" size={20} />,
  share: <MaterialIcons name="share" size={20} />,
  delete: <MaterialIcons name="delete" size={20} />,
  add: <Feather name="upload" size={20} />,
  downloaded: (
    <MaterialCommunityIcons name="cloud-download-outline" size={20} />
  ),
};

function RenderActivity({item}) {
  const {user_full_name, log_type, created, log_text} = item;

  return (
    <ScrollView contentContainerStyle={{marginBottom: 100}}>
      <View style={styles.activityContainer}>
        <View style={styles.iconContainer}>{ACTIVITY_ICONS?.[log_type]}</View>
        <View style={styles.activityBody}>
          <View style={styles.activityUser}>
            <Text>{user_full_name}</Text>
            <Caption>{dayjs(created).fromNow()}</Caption>
          </View>

          <Caption>{ACTIVITY_LABEL?.[log_type] || log_type}</Caption>
          <Caption style={styles.fileName}>{getFileName(log_text)}</Caption>
        </View>
      </View>
    </ScrollView>
  );
}

function RenderFile(props) {
  const {index, item, toggleMenu, setModalContentType, setModalContent} = props;

  const {title, created} = item || {};

  const download = useDownload();

  const onPressFile = async file => {
    download.link({
      name: getFileName(file.file_url),
      data: {file_url: file.file_url, project_id: file.project_id},
      showAction: false,
      onFinish: ({dir}) => {
        FileViewer.open(`file://${dir}`);
      },
    });
  };

  return (
    <TouchableOpacity
      style={styles.recentFiles}
      onPress={() => onPressFile(item)}>
      {title ? (
        <View style={styles.sectionContainer}>
          <Image source={FileIcon} style={styles.fileIcon} />
          <View>
            <Text style={(styles.verticalFlex, styles.text)} numberOfLines={2}>
              {title}
            </Text>
          </View>
        </View>
      ) : null}

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
              setModalContent({
                id: item.files_id,
                title,
                type: 'file',
                folderId: item.id,
              });
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

function ActivityModal(props) {
  const {wdFileActivities = {}} = useSelector(s => s.designModule);

  const processedActivities = useMemo(() => {
    const data = [];

    Object.entries(wdFileActivities)?.map(([key, values]) => {
      data[key] = data[key] || {};
      data[key].title = key;

      data[key].data = [data[key].data || [], ...values];

      return key;
    });

    return Object.values(data);
  }, [wdFileActivities]);

  const renderSeparator = () => <Divider />;
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text>No Activities found</Text>
    </View>
  );

  return (
    <View style={styles.activitiesContainer}>
      <Subheading style={{color: theme.colors.primary}}>Activity</Subheading>

      <SectionList
        sections={processedActivities}
        extraData={processedActivities}
        showsVerticalScrollIndicator={false}
        keyExtractor={i => i.id}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={styles.activityScrollContainer}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={renderEmpty}
        renderItem={params => <RenderActivity {...params} />}
        // renderSectionHeader={({section: {title}}) => (
        //   <Caption>{dayjs(title).format('DD MMM')}</Caption>
        // )}
      />
    </View>
  );
}

function RenderMenuModal(props) {
  const {menuId, modelContentType, toggleMenu, setModalContentType} = props;

  const bottomSheetRef = useRef();
  const fall = new Animated.Value(1);
  const open = _.isFinite(menuId);

  useEffect(() => {
    if (open) {
      bottomSheetRef?.current?.snapTo(1);
    } else {
      bottomSheetRef?.current?.snapTo(0);
    }
  }, [open]);

  const onClose = () => {
    if (['parentActivity', 'menu'].includes(modelContentType)) {
      toggleMenu();
    } else {
      setModalContentType('menu');
    }
  };

  return (
    <>
      {open ? (
        <Animated.View
          style={[
            styles.backdrop,
            {opacity: Animated.sub(1, Animated.multiply(fall, 0.9))},
          ]}
        />
      ) : null}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={SNAP_POINTS}
        initialSnap={0}
        borderRadius={30}
        callbackNode={fall}
        renderHeader={() => <View />}
        onCloseEnd={toggleMenu}
        renderContent={() => (
          <View style={styles.sheetContentContainer}>
            <View style={styles.closeContainer}>
              <IconButton
                icon="close-circle"
                size={25}
                onPress={onClose}
                color="grey"
              />
            </View>
            {modelContentType === 'menu' ? <MenuDialog {...props} /> : null}
            {modelContentType === 'parentActivity' ? (
              <ActivityModal {...props} />
            ) : null}
            {modelContentType === 'activity' ? (
              <ActivityModal {...props} />
            ) : null}
            {modelContentType === 'version' ? (
              <VersionDialog {...props} />
            ) : null}
          </View>
        )}
      />
    </>
  );
}

function RenderRow(props) {
  const {
    index,
    item,
    toggleMenu,
    setModalContentType,
    setModalContent,
    toggleDialog,
    handleFileUpload,
    deleteFolderHandler,
  } = props;
  const {folder_title, title, id} = item;

  return (
    <View style={styles.optionContainer}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={{fontSize: 18, margin: 10}}>{folder_title} </Text>
        </View>
        <View style={styles.headerSubContainers}>
          <View style={styles.editIconContainer}>
            <OpacityButton
              color="#4872f4"
              opacity={0.18}
              style={styles.editIcon}
              onPress={() => {
                toggleDialog('renameFile');
                setModalContent({
                  id: item.id,
                  title: folder_title,
                  type: 'folder',
                });
              }}>
              <MaterialIcons name="edit" color="#4872f4" size={13} />
            </OpacityButton>
          </View>

          <View>
            <OpacityButton
              color="#FF5D5D"
              opacity={0.18}
              onPress={() => deleteFolderHandler(id)}
              style={styles.deleteIcon}>
              <MaterialIcons name="delete" color="#FF5D5D" size={13} />
            </OpacityButton>
          </View>
        </View>
      </View>
      <Divider />

      {title ? (
        <RenderFile
          toggleMenu={toggleMenu}
          item={item}
          setModalContentType={setModalContentType}
          setModalContent={setModalContent}
          index={index}
        />
      ) : null}
      {!title ? (
        <TouchableOpacity
          style={styles.rightSection}
          onPress={() => handleFileUpload(id)}>
          <OpacityButton opacity={1} style={styles.button}>
            <MaterialCommunityIcons name="upload" size={10} color="#fff" />
          </OpacityButton>
          <Caption style={styles.uploadButton}>Upload</Caption>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

function WDFloorFolder(props) {
  const {navigation, route} = props;

  const {folderId, tower_id, floorId} = route?.params || {};

  const {colors} = useTheme();
  const {openFilePicker} = useImagePicker();

  const snackbar = useSnackbar();
  const alert = useAlert();

  const {
    createWDFloorFolder,
    getWDFloorFolder,
    uploadWDFloorFolderFile,
    getFloorFolderFileVersion,
    uploadWDFloorFolderFileVersion,
    deleteFloorFolderFileVersion,
    deleteWDFloorFolder,
    renameWDFloorFolder,
    deleteWDFloorFolderFile,
    renameWDFloorFolderFile,
    getWDFloorFolderFileActivity,
  } = useDesignModuleActions();

  const [menuId, setMenuId] = React.useState();
  const [modelContentType, setModalContentType] = React.useState('menu');
  const [modalContent, setModalContent] = React.useState({});
  const [shareDialog, setShareDialog] = React.useState(false);
  const [DialogType, setDialogType] = React.useState();

  const {selectedProject} = useSelector(s => s.project);
  const {loading, wdFolderList, wdFolderFileVersion} = useSelector(
    s => s.designModule,
  );
  const versionData = wdFolderFileVersion?.list || [];

  const project_id = selectedProject.id;

  const listData = wdFolderList?.list || [];

  const toggleMenu = folderIndex => setMenuId(folderIndex);
  const toggleDialog = v => setDialogType(v);
  const toggleShareDialog = () => setShareDialog(v => !v);

  const loadData = () => {
    getWDFloorFolder({working_drawing_floor_rows_id: floorId, project_id});
  };

  React.useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const versionDataHandler = async (id, files_id) => {
    setModalContentType('version');
    getFloorFolderFileVersion({
      project_id,
      working_drawing_tower_floors_files_id: id,
    });
  };

  const handleNewVersionUpload = (file_id, id, data) => {
    openFilePicker({
      type: 'file',
      onChoose: async v => {
        const formData = new FormData();

        formData.append('working_drawing_tower_floors_files_id', id);
        formData.append('myfile', v);
        formData.append('folder_id', data.folderId);
        formData.append('project_id', project_id);

        await uploadWDFloorFolderFileVersion(formData);
        getFloorFolderFileVersion({
          project_id,
          working_drawing_tower_floors_files_id: id,
        });
        loadData();
      },
    });
  };

  const handleDeleteVersion = async (id, fileId, data) => {
    setModalContentType('version');
    deleteFloorFolderFileVersion({
      project_id,
      working_drawing_tower_floors_files_id: id,
    });
    getFloorFolderFileVersion({
      project_id,
      working_drawing_tower_floors_files_id: fileId,
    });
  };

  const createFolderHandler = async (foldername, file) => {
    const data = {
      project_id,
      folder_name: foldername,
      tower_id,
      folder_id: folderId,
      working_drawing_floor_rows_id: floorId,
    };
    const {value} = await createWDFloorFolder(data);

    const response = value.data.list;

    const id = response.find(i => i.id)?.id;

    if (file) {
      uploadFile(id, file);
    }
    toggleDialog();
    loadData();
  };

  const uploadFile = async (id, v) => {
    const formData = new FormData();
    formData.append('folder_id', folderId);
    formData.append('myfile', v);
    formData.append('project_id', project_id);
    formData.append('tower_id', tower_id);
    formData.append('working_drawing_floor_rows_id', floorId);
    formData.append('working_drawing_floor_rows_folder_id', id);

    await uploadWDFloorFolderFile(formData);
    loadData();
    toggleDialog();
    snackbar.showMessage({
      message: 'File Uploaded Successfully!',
      variant: 'success',
    });
  };

  const handleFileUpload = async file => {
    openFilePicker({
      type: 'file',
      onChoose: v => {
        uploadFile(file, v);
      },
    });
    loadData();
  };

  const deleteFolderHandler = id => {
    toggleMenu();
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteWDFloorFolder({folder_id: id, project_id});
        loadData();
      },
    });
  };
  const deleteFileHandler = async (id, data) => {
    await deleteWDFloorFolderFile({
      working_drawing_tower_floors_files_id: data.files_id,
      project_id,
    });
    loadData();
    toggleDialog();
    snackbar.showMessage({
      message: 'File Deleted!',
      variant: 'success',
    });
  };

  const renameFolderHandler = async (name, id, type) => {
    await renameWDFloorFolder({
      folder_title: name,
      working_drawing_floor_rows_folder_id: id,
      project_id,
    });
    loadData();
    toggleDialog();
  };

  const renameFileHandler = async (name, id, data) => {
    await renameWDFloorFolderFile({
      file_title: name,
      working_drawing_tower_floors_files_id: id,
      project_id,
    });
    loadData();
    toggleDialog();
  };

  const activityDataHandler = (action_type, id, files_id) => {
    setModalContentType('activity');
    getWDFloorFolderFileActivity({
      project_id,
      working_drawing_tower_floors_files_id: id,
    });
  };

  const renderEmpty = () => <NoResult />;

  return (
    <>
      <RenderMenuModal
        {...props}
        {...{
          menuId,
          modelContentType,
          modalContent,
          versionData,
          toggleMenu,
          setModalContentType,
          toggleDialog,
          versionDataHandler,
          toggleShareDialog,
          handleNewVersionUpload,
          handleDeleteVersion,
          activityDataHandler,
        }}
      />
      {DialogType ? (
        <CreateFolderDialogue
          visible={DialogType === 'createFolder'}
          toggleDialogue={toggleDialog}
          createFolderHandler={createFolderHandler}
          placeholder="Destination Name"
          title="Create new destination"
          addFile
          handleFileUpload={handleFileUpload}
        />
      ) : null}

      <RenameDialogue
        visible={DialogType === 'renameFile'}
        toggleDialogue={toggleDialog}
        dialogueContent={modalContent}
        renameFileHandler={renameFileHandler}
        renameFolderHandler={renameFolderHandler}
      />

      <DeleteDialog
        visible={DialogType === 'deleteFileFolder'}
        toggleDialogue={toggleDialog}
        dialogueContent={modalContent}
        deleteFileHandler={deleteFileHandler}
      />
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
                opacity={0.3}
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
            renderItem={({item, index}) => {
              return (
                <RenderRow
                  item={item}
                  index={index}
                  toggleMenu={toggleMenu}
                  setModalContentType={setModalContentType}
                  setModalContent={setModalContent}
                  handleFileUpload={handleFileUpload}
                  deleteFolderHandler={deleteFolderHandler}
                  renameFolderHandler={renameFolderHandler}
                  toggleDialog={toggleDialog}
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
    paddingVertical: 4,
    backgroundColor: '#fff',
    ...getShadow(1),
    margin: 1,
    paddingHorizontal: 12,
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
    padding: 5,
  },
  backButton: {
    borderRadius: 50,
    marginRight: 7,
  },
  addButton: {
    marginRight: 7,
    padding: 9,
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

  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheetContentContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 15,
    paddingBottom: 20,
    flexGrow: 1,
    height: '100%',
    ...getShadow(2),
  },
  closeContainer: {
    alignItems: 'flex-end',
  },

  activityContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
  activityBody: {
    flexGrow: 1,
    flex: 1,
  },
  activitiesContainer: {
    flexGrow: 1,
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  activityScrollContainer: {
    paddingBottom: 80,
    marginTop: 10,
    flexGrow: 1,
  },
  fileName: {
    lineHeight: 12,
    marginRight: 20,
  },
  activityUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSection: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5,
  },
  uploadButton: {
    marginLeft: 5,
    color: theme.colors.primary,
    fontSize: 16,
  },
  editIconContainer: {
    marginRight: 5,
  },
  headerSubContainers: {
    flexDirection: 'row',
    marginEnd: 10,
    alignSelf: 'center',
  },
  deleteIcon: {
    borderRadius: 20,
  },
  editIcon: {
    borderRadius: 20,
    marginLeft: 15,
  },
});

export default WDFloorFolder;
