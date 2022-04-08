import React, {useRef, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import {
  IconButton,
  Subheading,
  Text,
  FAB,
  withTheme,
  Divider,
  Caption,
} from 'react-native-paper';
import useFileActions from 'redux/actions/fileActions';
import FolderIcon from 'assets/images/folder_icon.png';
import UploadFileIcon from 'assets/images/file_icon.png';
import {useSelector} from 'react-redux';
import useImagePicker from 'hooks/useImagePicker';
import Spinner from 'react-native-loading-spinner-overlay';
import BottomSheet from 'reanimated-bottom-sheet';
import {getPermissions, getShadow} from 'utils';
import Animated from 'react-native-reanimated';
import _ from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import dayjs from 'dayjs';
import {getFileExtension} from 'utils/download';
import DeleteDialog from './Components/DeleteDialog';
import RenameDialogue from './Components/RenameDialog';
import CreateFolderDialogue from './Components/CreateFolderDialog';
import MenuDialog from './Components/MenuDialog';
import VersionDialog from './Components/VersionDialog';
import FileSection from './Components/FilesSection';
import FoldersSection from './Components/FoldersSection';
import ShareDialogue from './Components/ShareDialogue';

const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

const SNAP_POINTS = [0, '70%'];

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

const ACTIVITY_LABEL = {
  new_version: 'Uploaded new version',
  add: 'Uploaded file',
  downloaded: 'Downloaded file',
  share: 'Shared file',
  rename: 'Renamed file',
  delete: 'Deleted file',
};

function getFileName(string) {
  if (string.includes('/')) {
    const splits = string.split('/');
    return splits[splits.length - 1];
  }

  return string;
}

function RenderActivity({item}) {
  const {first_name, last_name, logs_type, created, logs} = item;

  return (
    <View style={styles.activityContainer}>
      <View style={styles.iconContainer}>{ACTIVITY_ICONS?.[logs_type]}</View>
      <View style={styles.activityBody}>
        <View style={styles.activityUser}>
          <Text>
            {first_name} {last_name}
          </Text>
          <Caption>{dayjs(created).fromNow()}</Caption>
        </View>

        <Caption>{ACTIVITY_LABEL?.[logs_type] || logs_type}</Caption>
        <Caption style={styles.fileName}>{getFileName(logs)}</Caption>
      </View>
    </View>
  );
}

function ActivityModal(props) {
  const {theme} = props;
  const {activities} = useSelector(s => s.files);

  const processedActivities = useMemo(() => {
    const sectionedData = [];
    activities.map(i => {
      const key = dayjs(i.created).format('YYYY-MM-DD');

      sectionedData[key] = sectionedData[key] || {};
      sectionedData[key].title = key;
      sectionedData[key].data = sectionedData[key].data || [];
      sectionedData[key].data.push(i);

      return i;
    });

    return Object.values(sectionedData);
  }, [activities]);

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
        keyExtractor={(item, index) => index?.toString()}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={styles.activityScrollContainer}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={renderEmpty}
        renderItem={params => <RenderActivity {...params} />}
        renderSectionHeader={({section: {title}}) => (
          <Caption>{dayjs(title).format('DD MMM')}</Caption>
        )}
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

function Files(props) {
  const {theme, route, navigation} = props;
  const {folder_name: folderName, index_of: folderDepth = 0} =
    route?.params || {};

  const modulePermissions = getPermissions('Files');

  const {loading, versionData} = useSelector(s => s.files);
  const {selectedProject} = useSelector(s => s.project);
  const {user} = useSelector(s => s.user);

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

  const loadData = () => {
    getFolders({project_id, index_of: folderDepth});
    getFiles({project_id, folder_id: folderDepth});
  };

  React.useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const deleteFileHandler = async (id, type) => {
    if (type === 'folder') {
      await deleteFolder({folder_id: id, project_id});
      getFolders({project_id, index_of: folderDepth});
    } else {
      await deleteFile({file_id: id, project_id});
      getFiles({project_id, folder_id: folderDepth});
    }

    toggleDialog();
  };

  const onChoose = v => {
    handleFileUpload(v);
  };

  const handleFileUpload = async file => {
    const {name} = file;
    const extension = getFileExtension(file.name);
    file.name = `${name}.${extension}`;

    const formData = new FormData();

    formData.append('folder_id', folderDepth);
    formData.append('myfile[]', file);
    formData.append('project_id', project_id);

    await uploadFile(formData);
    toggleDialog();
    getFiles({project_id, folder_id: folderDepth});
  };

  const versionDataHandler = fileId => {
    setModalContentType('version');
    getVersion({project_id, file_id: fileId});
  };

  const activityDataHandler = (fileType, id) => {
    setModalContentType('activity');
    const params = {project_id, folder_id: folderDepth};
    if (fileType === 'file') {
      params.file_id = id;
    } else {
      params.folder_id = id;
    }
    getActivities(params);
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
            <TouchableOpacity
              style={styles.viewDirection}
              onPress={navigation.goBack}>
              <IconButton icon="arrow-left" onPress={navigation.goBack} />
              <Subheading style={styles.backNavHeading} numberOfLines={1}>
                {folderName}
              </Subheading>
            </TouchableOpacity>
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
            backgroundColor: fab ? theme.colors.white : theme.colors.primary,
          }}
          icon={fab ? 'window-close' : 'plus'}
          small
          onPress={toggleFab}
          onStateChange={() => {
            console.log('-----> onStateChange');
          }}
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
    zIndex: 2,
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
  backNavigation: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewDirection: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  backNavHeading: {
    maxWidth: 200,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  activityContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
  activityBody: {
    flexGrow: 1,
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
    flex: 1,
    flexShrink: 1,
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
});

export default withTheme(Files);
