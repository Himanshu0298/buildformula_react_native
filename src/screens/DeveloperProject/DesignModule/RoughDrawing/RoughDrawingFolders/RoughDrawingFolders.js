import React, {useRef, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
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
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import useDesignModuleActions from 'redux/actions/designModuleActions';
import {useSnackbar} from 'components/Atoms/Snackbar';
import NoResult from 'components/Atoms/NoResult';
import {theme} from 'styles/theme';
import DeleteDialog from '../Components/DeleteDialog';
import RenameDialogue from '../Components/RenameDialog';
import CreateFolderDialogue from '../Components/CreateFolderDialog';
import MenuDialog from '../Components/MenuDialog';
import VersionDialog from '../Components/VersionDialog';
import FolderSectionGridView from '../Components/FolderSectionGridView';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

const SNAP_POINTS = [0, '70%'];

function RenderFolder(props) {
  const {
    item,
    index,
    setModalContentType,
    toggleMenu,
    navigation,
    setModalContent,
  } = props;
  const {title} = item;

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity
        style={{flexGrow: 1}}
        onPress={() => {
          navigation.navigate('RoughDrawingFiles', {
            ...props,
            title,
            folderId: item.id,
          });
        }}>
        <View style={styles.sectionContainer}>
          <Image source={FolderIcon} style={styles.PdfIcon} />
          <View>
            <Text numberOfLines={2} style={styles.text}>
              {title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <IconButton
        icon="dots-vertical"
        onPress={() => {
          toggleMenu(index);
          setModalContentType('menu');
          setModalContent(item);
        }}
      />
    </View>
  );
}

function FolderSection(props) {
  const {
    folders,
    menuId,
    toggleMenu,
    setModalContentType,
    loadData,
    setModalContent,
  } = props;
  const {data} = folders || {};

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={loadData} />
        }
        data={data}
        extraData={data}
        keyExtractor={i => i.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={<NoResult title="No Data found!" />}
        renderItem={({item, index}) => (
          <RenderFolder
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
    </View>
  );
}

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
  add: 'Folder Added',
  downloaded: 'Downloaded Folder file',
  rename: 'Renamed Folder',
  delete: 'Deleted Folder',
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

const ListViewControl = props => {
  const {listMode, setListMode} = props;
  return (
    <View style={styles.headerActionContainer}>
      <TouchableOpacity onPress={() => setListMode('list')}>
        <Foundation
          name="list-bullet"
          size={20}
          color={listMode === 'list' ? theme.colors.primary : undefined}
          style={styles.headerIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setListMode('grid')}>
        <Fontisto
          name="nav-icon-grid"
          size={17}
          color={listMode === 'grid' ? theme.colors.primary : undefined}
        />
      </TouchableOpacity>
    </View>
  );
};

function RoughDrawingFolder(props) {
  const {route, navigation} = props;
  const {folder_name: folderName, index_of: folderDepth = 0} =
    route?.params || {};

  const modulePermissions = getPermissions('Files');
  const snackbar = useSnackbar();

  const {versionData} = useSelector(s => s.files);
  const {selectedProject} = useSelector(s => s.project);
  const {folders, loading} = useSelector(s => s.designModule);

  const project_id = selectedProject.id;

  const {getVersion, addVersion} = useFileActions();
  const {
    getRDFolders,
    createRDFolder,
    renameRDFolder,
    deleteRDFolder,
    getRDActivities,
  } = useDesignModuleActions();

  const {openImagePicker} = useImagePicker();

  const [menuId, setMenuId] = React.useState();
  const [modelContentType, setModalContentType] = React.useState('menu');
  const [modalContent, setModalContent] = React.useState({});
  const [shareDialog, setShareDialog] = React.useState(false);
  const [DialogType, setDialogType] = React.useState();
  const [listMode, setListMode] = React.useState('list');

  React.useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = () => {
    getRDFolders({project_id, mode: 'folder', default_folders: 'no'});
  };

  const toggleMenu = folderIndex => setMenuId(folderIndex);
  const toggleDialog = v => setDialogType(v);
  const toggleShareDialog = () => setShareDialog(v => !v);

  const createFolderHandler = async folder_name => {
    await createRDFolder({
      project_id,
      row_type: 'folder',
      parent_id: 0,
      is_preset: 'no',
      folder_name,
    });
    toggleDialog();
    getRDFolders({project_id, mode: 'folder', default_folders: 'no'});
  };

  const renameFolderHandler = async (name, id, type) => {
    await renameRDFolder({
      folder_name: name,
      rough_drawing_id: id,
      project_id,
    });
    getRDFolders({project_id, mode: 'folder', default_folders: 'no'});
    toggleDialog();
  };

  const deleteFolderHandler = async (id, type) => {
    await deleteRDFolder({rough_drawing_id: id, project_id});
    getRDFolders({project_id, mode: 'folder', default_folders: 'no'});
    toggleDialog();
    snackbar.showMessage({
      message: 'Folder Deleted!',
      variant: 'success',
    });
  };

  const versionDataHandler = fileId => {
    setModalContentType('version');
    getVersion({project_id, file_id: fileId});
  };

  const activityDataHandler = (action_type, id) => {
    setModalContentType('activity');
    getRDActivities({project_id, rough_drawing_id: id, action_type: 'file'});
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
      {/* <RefreshControl refreshing={false} onRefresh={loadData} /> */}
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
      <View style={styles.headerContainer}>
        <Subheading>Rough Drawing</Subheading>
        <ListViewControl {...props} {...{listMode, setListMode}} />
      </View>
      {listMode === 'list' ? (
        <FolderSection
          {...props}
          folders={folders}
          {...{
            menuId,
            toggleMenu,
            setModalContent,
            setModalContentType,
            loadData,
          }}
        />
      ) : null}
      {listMode === 'grid' ? (
        <FolderSectionGridView
          {...props}
          folders={folders}
          {...{
            menuId,
            toggleMenu,
            setModalContent,
            setModalContentType,
            loadData,
          }}
        />
      ) : null}
      {modulePermissions?.editor || modulePermissions?.admin ? (
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => toggleDialog('createFolder')}
          medium
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
        deleteFileHandler={deleteFolderHandler}
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 30,
  },
  headerActionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerIcon: {
    marginHorizontal: 10,
  },
  PdfIcon: {
    width: 38,
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
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 5,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
});

export default withTheme(RoughDrawingFolder);
