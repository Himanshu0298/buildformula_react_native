import React, {useEffect, useMemo, useRef} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import {
  Caption,
  Divider,
  FAB,
  IconButton,
  Subheading,
  Text,
  Title,
} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import _ from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import {Image} from 'react-native-svg';
import FileViewer from 'react-native-file-viewer';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSnackbar} from 'components/Atoms/Snackbar';
import useDesignModuleActions from 'redux/actions/designModuleActions';
import NoResult from 'components/Atoms/NoResult';
import {useDownload} from 'components/Atoms/Download';
import FileIcon from 'assets/images/file_icon.png';
import {getFileExtension} from 'utils/download';
import {getShadow} from 'utils';
import {theme} from 'styles/theme';
import {useImagePicker} from 'hooks';
import {getFileName} from 'utils/constant';
import MenuDialog from '../Components/MenuDialog';
import VersionDialog from '../Components/VersionDialog';
import RenameDialogue from '../Components/RenameDialog';
import DeleteDialog from '../Components/DeleteDialog';
import SelectStructure from '../Components/SelectStructure';

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

function ActivityModal(props) {
  const {wdFileActivities = []} = useSelector(s => s.designModule);

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
    <ScrollView>
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
    </ScrollView>
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
              <MenuDialog {...props} showShare={false} />
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

function WDBungalowList(props) {
  const {navigation, route} = props;
  const {folderId} = route?.params || {};

  const structureLabel = 'Bungalows';
  const snackbar = useSnackbar();

  const {openFilePicker} = useImagePicker();

  const {
    getWDBungalowList,
    uploadWDBungalowsFile,
    renameWDCommonFile,
    deleteWDPlotBungalowFile,
    getWDCommonFileActivity,
    uploadWDBungalowPlotFileVersion,
    getBungalowPlotFileVersion,
    deleteWDPlotBungalowFileVersion,
  } = useDesignModuleActions();

  const [menuId, setMenuId] = React.useState();
  const [modelContentType, setModalContentType] = React.useState('menu');
  const [modalContent, setModalContent] = React.useState({});
  const [shareDialog, setShareDialog] = React.useState(false);
  const [DialogType, setDialogType] = React.useState();

  const toggleMenu = folderIndex => setMenuId(folderIndex);
  const toggleDialog = v => setDialogType(v);
  const toggleShareDialog = () => setShareDialog(v => !v);

  const {wdBungalows, version, loading} = useSelector(s => s.designModule);
  const {selectedProject} = useSelector(s => s.project);
  const project_id = selectedProject.id;

  const bungalowsList = wdBungalows?.bungalows;
  const versionData = version?.list || [];

  const bungalowFiles = wdBungalows?.working_drawing_bunglow_files;

  React.useEffect(() => {
    loadFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadFiles = () => {
    getWDBungalowList({project_id, folder_id: folderId});
  };
  const renameFileHandler = async (name, id) => {
    await renameWDCommonFile({
      file_name: name,
      working_drawing_bunglow_plot_files_id: id,
      project_id,
    });
    loadFiles();
    toggleDialog();
  };
  const deleteFileHandler = async id => {
    await deleteWDPlotBungalowFile({
      working_drawing_bunglow_plot_files_id: id,
      project_id,
    });
    loadFiles();
    toggleDialog();
    snackbar.showMessage({
      message: 'File Deleted!',
      variant: 'success',
    });
  };

  const versionDataHandler = async id => {
    setModalContentType('version');
    getBungalowPlotFileVersion({
      project_id,
      working_drawing_bunglow_plot_files: id,
    });
  };

  const activityDataHandler = (id, type) => {
    setModalContentType('activity');
    getWDCommonFileActivity({
      project_id,
      working_drawing_bunglow_plot_files_id: id,
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
    formData.append('attachmentFile', file);
    formData.append('project_id', project_id);
    formData.append('bunglow_plot_id', 0);

    await uploadWDBungalowsFile(formData);
    toggleDialog();
    snackbar.showMessage({
      message: 'File Uploaded Successfully!',
      variant: 'success',
    });
    loadFiles();
  };

  const handleNewVersionUpload = (id, file_id) => {
    openFilePicker({
      type: 'file',
      onChoose: async v => {
        const formData = new FormData();

        formData.append('working_drawing_bunglow_plot_files_id', file_id);
        formData.append('myfile', v);
        formData.append('folder_id', folderId);
        formData.append('project_id', project_id);

        await uploadWDBungalowPlotFileVersion(formData);
        getBungalowPlotFileVersion({
          project_id,
          working_drawing_bunglow_plot_files: file_id,
        });
      },
    });
  };

  const handleDeleteVersion = async (id, file_id) => {
    setModalContentType('version');
    deleteWDPlotBungalowFileVersion({
      project_id,
      working_drawing_bunglow_plot_file_version: id,
    });
    getBungalowPlotFileVersion({
      project_id,
      working_drawing_bunglow_plot_files: file_id,
    });
  };

  const onSelectStructure = values => {
    const tower_id = bungalowsList?.find(i => i.id === values)?.id;
    const towerLabel = bungalowsList?.find(i => i.id === values)?.project_unit;
    navigation.navigate('WDBungalowFileList', {
      tower_id,
      folderId,
      towerLabel,
      structureLabel,
    });
  };

  return (
    <>
      <Spinner visible={loading} textContent="" />
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

      <View styles={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.header}>
            <IconButton
              icon="keyboard-backspace"
              size={20}
              color="#4872f4"
              style={styles.backIcon}
              onPress={navigation.goBack}
            />
            <Title> Bungalows</Title>
          </View>

          <SelectStructure
            structureLabel={structureLabel}
            navigation={navigation}
            onSelectStructure={onSelectStructure}
            data={bungalowsList}
          />

          <FlatList
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={loadFiles} />
            }
            data={bungalowFiles}
            extraData={bungalowFiles}
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

  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
    zIndex: 1,
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
    zIndex: 1,

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
  contentContainerStyle: {
    paddingBottom: 40,
  },
});
export default WDBungalowList;
