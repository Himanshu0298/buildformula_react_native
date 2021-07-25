import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {IconButton, Subheading, Text, FAB} from 'react-native-paper';
import useFileActions from 'redux/actions/fileActions';
import Modal from 'react-native-modal';
import PdfIcon from 'assets/images/pdf_icon.png';
import FolderIcon from 'assets/images/folder_icon.png';
import UploadFileIcon from 'assets/images/upload_files.png';
import {theme} from 'styles/theme';
import {useSelector} from 'react-redux';
import useImagePicker from 'utils/useImagePicker';
import Spinner from 'react-native-loading-spinner-overlay';
import DeleteDialog from './Components/DeleteDialog';
import UploadDialog from './Components/UploadDialog';
import RenameDialogue from './Components/RenameDialog';
import CreateFolderDialogue from './Components/CreateFolderDialog';
import MenuDialog from './Components/MenuDialog';
import VersionDialog from './Components/VersionDialog';
import FileSection from './Components/FilesSection';
import FoldersSection from './Components/FoldersSection';

function ActivityModal() {
  return (
    <View>
      <ScrollView>
        <View>
          <View>
            <Text>10 June</Text>
          </View>
          <View style={styles.activityContainer}>
            <View style={styles.viewDirection}>
              <Image source={FolderIcon} style={styles.activityUserImage} />
              <View>
                <Text>Ashish Patel</Text>
                <Text>Update 5 times</Text>
              </View>
            </View>
            <View style={styles.upperAlignment}>
              <Text>5 min ago</Text>
            </View>
          </View>

          <View style={styles.userActivityPadding}>
            <Image source={PdfIcon} style={styles.activityImage} />
            <Text>Project Schedule For Dharti Saket Icon</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function RenderMenuModal(props) {
  const {
    menuId,
    modelContentType,
    modalContent,
    versionData,
    toggleMenu,
    setModalContentType,
    toggleDialog,
    handleDownload,
    versionDataHandler,
  } = props;

  return (
    <Modal
      isVisible={!isNaN(menuId)}
      backdropOpacity={0.4}
      onBackButtonPress={toggleMenu}
      onBackdropPress={toggleMenu}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <View style={styles.sheetContainer}>
        <View style={styles.closeContainer}>
          <IconButton
            icon="close-circle"
            size={25}
            onPress={() => {
              if (['parentActivity', 'menu'].includes(modelContentType)) {
                toggleMenu();
              } else {
                setModalContentType('menu');
              }
            }}
            color="grey"
          />
        </View>
        {modelContentType === 'menu' ? (
          <MenuDialog
            setModalContentType={setModalContentType}
            modalContent={modalContent}
            toggleDialog={toggleDialog}
            toggleMenu={toggleMenu}
            handleDownload={handleDownload}
            versionDataHandler={versionDataHandler}
          />
        ) : null}
        {modelContentType === 'parentActivity' ? <ActivityModal /> : null}
        {modelContentType === 'activity' ? <ActivityModal /> : null}
        {modelContentType === 'version' ? (
          <VersionDialog
            versionData={versionData}
            handleDownload={handleDownload}
          />
        ) : null}
        {}
      </View>
    </Modal>
  );
}

export default function Files(props) {
  const {route, navigation} = props;
  const {folder_name: folderName, index_of: folderDepth = 0} =
    route?.params || {};

  const {loading, versionData} = useSelector(s => s.files);
  const {selectedProject} = useSelector(s => s.project);
  const {user} = useSelector(state => state.user);

  const project_id = selectedProject.id;
  const user_id = user?.id;

  const {
    getFolders,
    createFolder,
    renameFolder,
    deleteFolder,
    getFiles,
    renameFile,
    uploadFile,
    deleteFile,
    getVersion,
  } = useFileActions();

  const {openImagePicker} = useImagePicker();

  const [fab, setFab] = React.useState(false);
  const [menuId, setMenuId] = React.useState();
  const [modelContentType, setModalContentType] = React.useState('menu');
  const [modalContent, setModalContent] = React.useState({});
  const [DialogType, setDialogType] = React.useState();
  const [selectedUploadFile, setSelectedUploadFile] = React.useState();

  React.useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = () => {
    getFolders({project_id, index_of: folderDepth});
    getFiles({project_id, folder_id: folderDepth});
  };

  const FAB_ACTIONS = [
    {
      icon: FolderIcon,
      color: theme.colors.primary,
      label: 'Create new folder',
      onPress: () => {
        toggleFab();
        toggleDialog('createFolder');
      },
    },
    {
      icon: FolderIcon,
      color: theme.colors.primary,
      label: 'Upload folder',
      onPress: () => console.log('in Create upload files'),
    },
    {
      icon: UploadFileIcon,
      color: theme.colors.primary,
      label: 'Upload files',
      onPress: () => {
        toggleFab();
        openImagePicker({type: 'file', onChoose});
      },
    },
  ];

  const toggleFab = () => setFab(v => !v);
  const toggleMenu = folderIndex => setMenuId(folderIndex);
  const toggleDialog = v => setDialogType(v);

  const createFolderHandler = async folder_name => {
    await createFolder({
      project_id,
      index_of: folderDepth,
      folder_name,
      user_id,
    });
    toggleDialog();
    getFolders({project_id, index_of: folderDepth});
  };

  const renameFolderHandler = async (name, id, type) => {
    if (type === 'folder') {
      await renameFolder({
        folder_name: name,
        folder_id: id,
        user_id: user?.id,
        project_id: selectedProject?.id,
      });
      getFolders({project_id, index_of: folderDepth});
      toggleDialog();
    } else {
      await renameFile({file_id: id, project_id, new_file_name: name});
      toggleDialog();
      getFiles({project_id, folder_id: folderDepth});
    }
  };

  const deleteFileHandler = async (id, fileFolder, type) => {
    if (fileFolder === 'folder') {
      await deleteFolder({folder_id: id, project_id: selectedProject?.id});
      getFolders({project_id, index_of: folderDepth});
      toggleDialog();
    } else {
      deleteFile({file_id: id, project_id: selectedProject?.id});
    }
  };

  const onChoose = v => {
    setSelectedUploadFile(v);
    toggleDialog('uploadFile');
  };

  const handleFileUpload = async values => {
    const formData = new FormData();

    formData.append('folder_id', folderDepth);
    formData.append('myfile[]', values.file);
    formData.append('project_id', selectedProject.id);

    await uploadFile(formData);
    toggleDialog();
    getFiles({project_id, folder_id: folderDepth});
  };

  const versionDataHandler = fileId => {
    getVersion({project_id, file_id: fileId});
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={loadData} />
        }>
        {folderName ? (
          <View style={styles.backNavigation}>
            <View style={styles.viewDirection}>
              <IconButton
                icon="arrow-left"
                onPress={() => navigation.goBack()}
              />
              <Subheading style={styles.backNavHeading} numberOfLines={1}>
                {folderName}
              </Subheading>
            </View>
            <IconButton
              icon="information"
              onPress={() => {
                setModalContentType('parentActivity');
                toggleMenu(folderDepth);
              }}
            />
          </View>
        ) : null}
        <FoldersSection
          {...props}
          {...{menuId, toggleMenu, setModalContent, setModalContentType}}
        />
        <FileSection
          {...props}
          {...{menuId, toggleMenu, setModalContent, setModalContentType}}
        />
      </ScrollView>

      <FAB.Group
        open={fab}
        style={styles.fab}
        fabStyle={{
          backgroundColor: fab ? '#fff' : theme.colors.primary,
        }}
        icon={fab ? 'window-close' : 'plus'}
        small
        onPress={toggleFab}
        onStateChange={() => {}}
        actions={FAB_ACTIONS}
      />

      <RenderMenuModal
        {...{
          menuId,
          modelContentType,
          modalContent,
          versionData,
          toggleMenu,
          setModalContentType,
          toggleDialog,
          versionDataHandler,
        }}
      />
      <CreateFolderDialogue
        visible={DialogType === 'createFolder'}
        toggleDialogue={toggleDialog}
        createFolderHandler={createFolderHandler}
      />
      <RenameDialogue
        visible={DialogType === 'renameFile'}
        toggleDialogue={toggleDialog}
        dialogueContent={modalContent}
        renameFolderHandler={renameFolderHandler}
      />
      <UploadDialog
        visible={DialogType === 'uploadFile'}
        toggleDialogue={toggleDialog}
        selectedUploadFile={selectedUploadFile}
        handleFileUpload={handleFileUpload}
      />
      <DeleteDialog
        visible={DialogType === 'deleteFileFolder'}
        toggleDialogue={toggleDialog}
        dialogueContent={modalContent}
        deleteFileHandler={deleteFileHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  fab: {
    position: 'absolute',
    right: 10,
    bottom: 2,
  },
  sheetContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 15,
    paddingBottom: 20,
    flex: 0.7,
  },
  closeContainer: {
    alignItems: 'flex-end',
  },
  viewDirection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backNavigation: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backNavHeading: {
    maxWidth: 200,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  activityUserImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 20,
  },
  activityImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  upperAlignment: {
    alignItems: 'baseline',
    paddingBottom: 20,
  },
  activityContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  userActivityPadding: {
    marginVertical: 10,
    flexDirection: 'row',
  },
});
