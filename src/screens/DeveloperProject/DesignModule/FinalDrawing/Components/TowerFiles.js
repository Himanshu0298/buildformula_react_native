import React, {useRef, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  SectionList,
} from 'react-native';
import {
  Caption,
  Divider,
  FAB,
  IconButton,
  Subheading,
  Text,
} from 'react-native-paper';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import FileViewer from 'react-native-file-viewer';
import Animated from 'react-native-reanimated';
import _ from 'lodash';
import BottomSheet from 'reanimated-bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';
import {ScrollView} from 'react-native-gesture-handler';
import {getPermissions, getShadow} from 'utils';
import {useImagePicker} from 'hooks';
import {theme} from 'styles/theme';
import useDesignModuleActions from 'redux/actions/designModuleActions';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {downloadFile, getDownloadUrl, getFileExtension} from 'utils/download';
import NoResult from 'components/Atoms/NoResult';
import FileIcon from 'assets/images/file_icon.png';
import {useDownload} from 'components/Atoms/Download';
import MenuDialog from './MenuDialog';
import VersionDialog from './VersionDialog';
import RenameDialogue from './RenameDialog';
import DeleteDialog from './DeleteDialog';

const SNAP_POINTS = [0, '50%'];

function RenderFile(props) {
  const {index, item, toggleMenu, setModalContentType, setModalContent} = props;

  const {title, created} = item;

  const download = useDownload();

  const onPressFile = async file => {
    download.link({
      name: getFileName(file.title),
      data: {project_id: file.project_id, file_url: file.file_url},
      showAction: false,
      onFinish: ({dir}) => {
        FileViewer.open(`file://${dir}`);
      },
    });
  };

  return (
    <View style={styles.recentFiles}>
      <TouchableOpacity
        style={styles.sectionContainer}
        onPress={() => onPressFile(item)}>
        <Image source={FileIcon} style={styles.fileIcon} />
        <View style={{width: 120}}>
          <Text style={(styles.verticalFlex, styles.text)} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.sectionSubContainer}>
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

function getFileName(string) {
  if (string.includes('/')) {
    const splits = string.split('/');
    return splits[splits.length - 1];
  }

  return string;
}

function RenderActivity({item}) {
  const {user_full_name, log_type, created, log_text} = item;

  return (
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
  );
}

function ActivityModal(props) {
  const {activities = []} = useSelector(s => s.designModule);

  const processedActivities = useMemo(() => {
    const sectionedData = [];
    activities?.map(i => {
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
        keyExtractor={i => i.id}
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
            {modelContentType === 'menu' ? (
              <MenuDialog
                {...props}
                showActivity={false}
                showShare={false}
                showRename={false}
                showVersion={false}
              />
            ) : null}
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

function FinalDrawingTowerFiles(props) {
  const {route} = props;
  const {folderId, tower_id} = route?.params || {};

  const {
    getFDTowerFloors,
    renameFDTowerFile,
    getFDVersion,
    deleteFDVersion,
    addFDTowerFiles,
    deleteFDTowerFile,
    FDTowerFileActivityLogs,
    uploadTowerFileVersion,
  } = useDesignModuleActions();
  const {openFilePicker} = useImagePicker();

  const modulePermissions = getPermissions('Files');

  const [menuId, setMenuId] = React.useState();
  const [modelContentType, setModalContentType] = React.useState('menu');
  const [modalContent, setModalContent] = React.useState({});
  const [shareDialog, setShareDialog] = React.useState(false);
  const [DialogType, setDialogType] = React.useState();

  const snackbar = useSnackbar();
  const download = useDownload();
  const {selectedProject} = useSelector(s => s.project);
  const {versionData, loading, fdTowerFloorsList} = useSelector(
    s => s.designModule,
  );

  const towerFiles = fdTowerFloorsList?.data?.final_drawing_tower_files || [];

  const project_id = selectedProject.id;

  React.useEffect(() => {
    loadFloors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadFloors = () => {
    getFDTowerFloors({
      project_id,
      folder_id: folderId,
      tower_id,
    });
  };

  const toggleMenu = folderIndex => setMenuId(folderIndex);
  const toggleDialog = v => setDialogType(v);
  const toggleShareDialog = () => setShareDialog(v => !v);

  const renameFileHandler = async (name, id) => {
    await renameFDTowerFile({
      file_name: name,
      final_drawing_tower_files_id: id,
      project_id,
    });
    loadFloors();
    toggleDialog();
  };

  const deleteFileHandler = async id => {
    await deleteFDTowerFile({final_drawing_tower_files_id: id, project_id});
    loadFloors();
    toggleDialog();
    snackbar.showMessage({
      message: 'File Deleted!',
      variant: 'success',
    });
  };

  const versionDataHandler = async id => {
    setModalContentType('version');
    getFDVersion({project_id, final_drawing_files_id: id});
  };

  const activityDataHandler = id => {
    setModalContentType('activity');
    FDTowerFileActivityLogs({project_id, record_id: id});
  };

  const onPressFile = async file => {
    download.link({
      name: getFileName(file.title),
      data: {project_id: file.project_id, file_url: file.file_url},
      showAction: false,
      onFinish: ({dir}) => {
        FileViewer.open(`file://${dir}`);
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

    formData.append('folder_id', folderId);
    formData.append('myfile[]', file);
    formData.append('project_id', project_id);
    formData.append('tower_id', tower_id);

    await addFDTowerFiles(formData);
    toggleDialog();
    snackbar.showMessage({
      message: 'File Uploaded Sucessfully!',
      variant: 'success',
    });
    loadFloors();
  };

  const handleNewVersionUpload = file_id => {
    openFilePicker({
      type: 'file',
      onChoose: async v => {
        const formData = new FormData();

        formData.append('final_drawing_tower_files_id', file_id);
        formData.append('myfile', v);
        formData.append('folder_id', folderId);
        formData.append('project_id', project_id);

        await uploadTowerFileVersion(formData);
        getFDVersion({project_id, final_drawing_files_id: file_id});
      },
    });
  };

  const handleDeleteVersion = async (version, type) => {
    setModalContentType('version');
    await deleteFDVersion({
      project_id,
      record_id: version.id,
      record_type: type,
    });
    getFDVersion({
      project_id,
      final_drawing_files_id: version.final_drawing_files_id,
    });
  };

  return (
    <>
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
          handleDeleteVersion,
        }}
      />
      <RenameDialogue
        visible={DialogType === 'renameFile'}
        toggleDialogue={toggleDialog}
        dialogueContent={modalContent}
        renameFolderHandler={renameFileHandler}
      />
      <DeleteDialog
        visible={DialogType === 'deleteFileFolder'}
        toggleDialogue={toggleDialog}
        dialogueContent={modalContent}
        deleteFileHandler={deleteFileHandler}
      />
      <View style={styles.container}>
        <Spinner visible={loading} textContent="" />
        <ScrollView contentContainerStyle={{paddingBottom: '50%'}}>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={loadFloors} />
            }
            data={towerFiles}
            extraData={towerFiles}
            keyExtractor={i => i.id}
            contentContainerStyle={styles.contentContainerStyle}
            ListEmptyComponent={<NoResult title="No Data found!" />}
            renderItem={({item, index}) => (
              <RenderFile
                {...props}
                {...{
                  item,
                  index,
                  menuId,
                  toggleMenu,
                  setModalContentType,
                  setModalContent,
                  onPressFile,
                }}
              />
            )}
          />
        </ScrollView>
      </View>
      {menuId === undefined ? (
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => openFilePicker({type: 'file', onChoose})}
          medium
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  contentContainerStyle: {
    padding: 10,
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
    marginBottom: 10,
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
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionSubContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recentFiles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalFlex: {
    flexDirection: 'column',
  },
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 30,
    zIndex: 2,
    backgroundColor: theme.colors.primary,
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
});

export default FinalDrawingTowerFiles;
