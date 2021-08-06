import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {IconButton, Subheading, Text, FAB, withTheme} from 'react-native-paper';
import useFileActions from 'redux/actions/fileActions';
import PdfIcon from 'assets/images/pdf_icon.png';
import FolderIcon from 'assets/images/folder_icon.png';
import UploadFileIcon from 'assets/images/upload_files.png';
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
import ShareDialogue from './Components/ShareDialogue';
import BottomSheet from 'reanimated-bottom-sheet';
import {getPermissions, getShadow} from 'utils';
import Animated from 'react-native-reanimated';

const SNAP_POINTS = [0, '70%'];

function ActivityModal() {
  return (
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
  );
}

function RenderMenuModal(props) {
  const {menuId, modelContentType, toggleMenu, setModalContentType} = props;

  const bottomSheetRef = useRef();
  const fall = new Animated.Value(1);
  const open = !isNaN(menuId);

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
        onCloseEnd={onClose}
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

function Files(props) {
  const {theme, route, navigation} = props;
  const {folder_name: folderName, index_of: folderDepth = 0} =
    route?.params || {};

  const modulePermissions = getPermissions('Files');

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
    getActivities,
    shareFolder,
    shareFile,
    addVersion,
  } = useFileActions();

  const {openImagePicker} = useImagePicker();

  const [fab, setFab] = React.useState(false);
  const [menuId, setMenuId] = React.useState();
  const [modelContentType, setModalContentType] = React.useState('menu');
  const [modalContent, setModalContent] = React.useState({});
  const [shareDialog, setShareDialog] = React.useState(false);
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
  const toggleShareDialog = () => setShareDialog(v => !v);

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
      await deleteFolder({folder_id: id, project_id});
      getFolders({project_id, index_of: folderDepth});
      toggleDialog();
    } else {
      deleteFile({file_id: id, project_id});
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
    formData.append('project_id', project_id);

    await uploadFile(formData);
    toggleDialog();
    getFiles({project_id, folder_id: folderDepth});
  };

  const versionDataHandler = fileId => {
    setModalContentType('version');
    getVersion({project_id, file_id: fileId});
  };

  const activityDataHandler = (type, id) => {
    setModalContentType('activity');
    getActivities({project_id});
  };

  const shareItem = async ({fileType, id, users, roles}) => {
    toggleMenu();
    if (fileType === 'folder') {
      await shareFolder({
        folder_id: id,
        project_id,
        access: 'admin',
        share_user: users,
        share_roles: roles,
      });
    } else {
      await shareFile({
        file_id: id,
        project_id,
        share_user: users,
        access: 'admin',
      });
    }
  };

  const handleNewVersionUpload = file_id => {
    openImagePicker({
      type: 'file',
      onChoose: async v => {
        const formData = new FormData();

        formData.append('file_id', file_id);
        formData.append('file_upload', v);
        formData.append('project_id', project_id);

        await addVersion(formData);
        getVersion({project_id, file_id});
      },
    });
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
      {modulePermissions?.editor || modulePermissions?.admin ? (
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
      ) : null}
      <RenderMenuModal
        {...props}
        {...{
          modulePermissions,
          menuId,
          modelContentType,
          modalContent,
          versionData,
          toggleMenu,
          setModalContentType,
          toggleDialog,
          versionDataHandler,
          activityDataHandler,
          toggleShareDialog,
          handleNewVersionUpload,
        }}
      />

      {shareDialog ? (
        <ShareDialogue
          open={shareDialog}
          selectedItem={modalContent}
          handleClose={toggleShareDialog}
          handleSubmit={shareItem}
        />
      ) : null}

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

export default withTheme(Files);
