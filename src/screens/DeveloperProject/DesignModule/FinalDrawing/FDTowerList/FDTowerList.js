import React, {useEffect, useMemo, useRef} from 'react';
import {
  FlatList,
  RefreshControl,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FileViewer from 'react-native-file-viewer';
import {useSelector} from 'react-redux';
import {
  Caption,
  Divider,
  FAB,
  IconButton,
  Subheading,
  Text,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import {Image} from 'react-native-svg';
import dayjs from 'dayjs';
import _ from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';
import NoResult from 'components/Atoms/NoResult';
import {useDownload} from 'components/Atoms/Download';
import {getFileName} from 'utils/constant';
import TowerSelector from 'components/Molecules/TowerSelector';
import FileIcon from 'assets/images/file_icon.png';
import {getShadow, getTowerLabel} from 'utils';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {theme} from 'styles/theme';
import useDesignModuleActions from 'redux/actions/designModuleActions';
import {useImagePicker} from 'hooks';
import {getFileExtension} from 'utils/download';
import {useSnackbar} from 'components/Atoms/Snackbar';
import SelectTower from '../Components/SelectTower';
import MenuDialog from '../Components/MenuDialog';
import RenameDialogue from '../Components/RenameDialog';
import DeleteDialog from '../Components/DeleteDialog';
import VersionDialog from '../Components/VersionDialog';

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
    <View style={styles.activityContainer}>
      <View style={styles.iconContainer}>{ACTIVITY_ICONS?.[log_type]}</View>
      <View style={styles.activityBody}>
        <View style={styles.activityUser}>
          <Text>{user_full_name}</Text>
          <Caption>{dayjs(created).fromNow()}</Caption>
        </View>
        <Caption>{ACTIVITY_LABEL?.[log_type] || log_type}</Caption>
        <Caption style={styles.fileName}>{getFileName([log_text])}</Caption>
      </View>
    </View>
  );
}

function ActivityModal(props) {
  const {towerFileActivities = {}} = useSelector(s => s.designModule);

  const processedActivities = useMemo(() => {
    const data = [];

    Object.entries(towerFileActivities)?.map(([key, values]) => {
      data[key] = data[key] || {};
      data[key].title = key;

      data[key].data = [data[key].data || [], ...values];

      return key;
    });

    return Object.values(data);
  }, [towerFileActivities]);

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
        //   // <Caption>{dayjs(title).format('DD MMM')}</Caption>
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

function RenderFile(props) {
  const {index, item, toggleMenu, setModalContentType, setModalContent} = props;

  const {title, created} = item;

  const download = useDownload();

  const onPressFile = async file => {
    download.link({
      name: getFileName(file.file_url),
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
        <View>
          <Text style={(styles.verticalFlex, styles.text)} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>

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

function FDTowerList(props) {
  const {navigation, route} = props;

  const {folderId} = route?.params || {};

  const structureLabel = 'Tower';

  const snackbar = useSnackbar();
  const download = useDownload();
  const {openFilePicker} = useImagePicker();

  const {
    getFDTowers,
    uploadTowerFileVersion,
    addFDTowerFiles,
    FDTowerFileActivityLogs,
    deleteFDVersion,
    renameFDTowerFile,
    getFDFloorFolderFileVersion,
    deleteFDTowerFile,
  } = useDesignModuleActions();

  const {fdTowers, loading, fdVersionData} = useSelector(s => s.designModule);
  const {selectedProject} = useSelector(s => s.project);
  const project_id = selectedProject.id;

  const versionData = fdVersionData?.data || [];

  const towerList = fdTowers?.data?.towers_lists || [];

  const towerCommonFiles = fdTowers?.data?.final_drawing_tower_files;

  const [menuId, setMenuId] = React.useState();
  const [modelContentType, setModalContentType] = React.useState('menu');
  const [modalContent, setModalContent] = React.useState({});
  const [shareDialog, setShareDialog] = React.useState(false);
  const [DialogType, setDialogType] = React.useState();

  const toggleMenu = folderIndex => setMenuId(folderIndex);
  const toggleDialog = v => setDialogType(v);
  const toggleShareDialog = () => setShareDialog(v => !v);

  React.useEffect(() => {
    loadFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadFiles = () => {
    getFDTowers({project_id, folder_id: folderId});
  };

  const renameFileHandler = async (name, id) => {
    await renameFDTowerFile({
      file_name: name,
      final_drawing_tower_files_id: id,
      project_id,
    });
    loadFiles();
    toggleDialog();
  };
  const deleteFileHandler = async id => {
    await deleteFDTowerFile({final_drawing_tower_files_id: id, project_id});
    loadFiles();
    toggleDialog();
    snackbar.showMessage({
      message: 'File Deleted!',
      variant: 'success',
    });
  };

  const versionDataHandler = async id => {
    setModalContentType('version');
    getFDFloorFolderFileVersion({project_id, final_drawing_tower_files_id: id});
  };

  const activityDataHandler = id => {
    setModalContentType('activity');
    FDTowerFileActivityLogs({project_id, record_id: id});
  };

  const onPressFile = async file => {
    download.link({
      name: getFileName(file.file_url),

      data: {project_id: file.project_id, file_url: file.file_url},
      showAction: false,
      onFinish: ({dir}) => {
        FileViewer.open(`file://${dir}`);
      },
    });
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
        getFDFloorFolderFileVersion({
          project_id,
          final_drawing_tower_files_id: file_id,
        });
      },
    });
  };

  const onChoose = v => {
    handleFileUpload(v);
  };

  const handleFileUpload = async file => {
    const formData = new FormData();

    formData.append('folder_id', folderId);
    formData.append('myfile[]', file);
    formData.append('project_id', project_id);
    formData.append('tower_id', 0);

    await addFDTowerFiles(formData);
    toggleDialog();
    snackbar.showMessage({
      message: 'File Uploaded Sucessfully!',
      variant: 'success',
    });
    loadFiles();
  };

  const handleDeleteVersion = async (version, type) => {
    setModalContentType('version');
    await deleteFDVersion({
      project_id,
      record_id: version.id,
      record_type: type,
    });
    getFDFloorFolderFileVersion({
      project_id,
      final_drawing_tower_files_id: version.final_drawing_files_id,
    });
  };

  const onSelectStructure = (itemId, index) => {
    const label = getTowerLabel(index + 1);

    const tower_id = towerList?.find(i => i.id === itemId)?.id;
    const towerLabel = towerList?.find(i => i.id === itemId)?.label;

    navigation.navigate('FDTowerPreview', {
      tower_id,
      folderId,
      towerLabel: towerLabel || label,
    });
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />

      <View style={styles.header}>
        <OpacityButton
          opacity={0.18}
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={18} />
        </OpacityButton>
        <Subheading style={styles.Subheading}>Tower</Subheading>
      </View>

      <SelectTower
        navigation={navigation}
        structureLabel={structureLabel}
        onSelectStructure={onSelectStructure}
        data={towerList}
      />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={loadFiles} />
        }
        data={towerCommonFiles}
        extraData={towerCommonFiles}
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

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => openFilePicker({type: 'file', onChoose})}
        medium
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  Subheading: {
    fontSize: 20,
    color: '#080707',
    alignItems: 'center',
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
  button: {
    marginRight: 10,
    borderRadius: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
export default FDTowerList;
