import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {
  FAB,
  IconButton,
  Menu,
  Subheading,
  Text,
  TextInput,
  Dialog,
  Caption,
  Divider,
} from 'react-native-paper';
import FolderIcon from 'assets/images/folder_icon.png';
import UploadFileIcon from 'assets/images/file_icon.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import RenderInput from 'components/Atoms/RenderInput';
import ActionButtons from 'components/Atoms/ActionButtons';
import MenuDialog from 'screens/DeveloperProject/Files/Components/MenuDialog';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import _ from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import {useRef} from 'react';
import {SectionList, Tabs} from 'react-native-collapsible-tab-view';
import useImagePicker from 'hooks/useImagePicker';
import useFileActions from 'redux/actions/fileActions';
import {getFileExtension} from 'utils/download';
import ShareDialogue from 'screens/DeveloperProject/Files/Components/ShareDialogue';
import CreateFolderDialogue from 'screens/DeveloperProject/Files/Components/CreateFolderDialog';
import RenameDialogue from 'screens/DeveloperProject/Files/Components/RenameDialog';
import DeleteDialog from 'screens/DeveloperProject/Files/Components/DeleteDialog';
import dayjs from 'dayjs';
import {getShadow} from 'utils';

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

  const processedActivities = React.useMemo(() => {
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
  console.log('----->toggleMenu ', toggleMenu);

  const bottomSheetRef = useRef();
  const fall = new Animated.Value(1);
  const open = _.isFinite(menuId);

  React.useEffect(() => {
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
            {/* {modelContentType === 'version' ? (
              <VersionDialog {...props} />
            ) : null} */}
          </View>
        )}
      />
    </>
  );
}

function Files(props) {
  const {navigation, unit, route, theme} = props;
  const {folder_name: folderName, index_of: folderDepth = 0} =
    route?.params || {};

  const navToAdd = () => {
    navigation.navigate();
  };
  const {getFiles, uploadFile, getFolder, customerCreateFolder} =
    useFileActions();

  const {openImagePicker} = useImagePicker();

  const [fab, setFab] = React.useState(false);

  const [DialogType, setDialogType] = React.useState();
  const [menuId, setMenuId] = React.useState();
  const [modelContentType, setModalContentType] = React.useState('menu');
  const [modalContent, setModalContent] = React.useState({});
  const data = useSelector(s => s.customer.files);
  const data1 = useSelector(s => s.customer);

  const project_id = 0;

  const toggleFab = () => setFab(v => !v);
  const [shareDialog, setShareDialog] = React.useState(false);

  const toggleDialog = v => setDialogType(v);
  const toggleMenu = folderIndex => setMenuId(folderIndex);

  const toggleShareDialog = () => setShareDialog(v => !v);

  const sheetRef = useRef(null);

  const onChoose = v => {
    handleFileUpload(v);
    // setSelectedUploadFile(v);
    // toggleDialog('uploadFile');
  };

  const createFolderHandler = async folder_name => {
    await customerCreateFolder({
      project_id,
      folder_name,
      unitid: unit.unit_id,
    });
    toggleDialog();
    getFolder({project_id, unitid: unit.unit_id});
  };

  // const renameFolderHandler = async (name, id, type) => {
  //   if (type === 'folder') {
  //     await renameFolder({
  //       folder_name: name,
  //       folder_id: id,
  //       user_id: user?.id,
  //       project_id: selectedProject?.id,
  //     });
  //     getFolder({project_id, unitid: unit.unit_id});
  //     toggleDialog();
  //   } else {
  //     await renameFile({project_id});
  //     toggleDialog();
  //     getFile({project_id, folder_id: folderDepth});
  //   }
  // };

  // const deleteFileHandler = async (id, type) => {
  //   if (type === 'folder') {
  //     await deleteFolder({folder_id: id, project_id});
  //     getFolder({project_id, unitid: unit.unit_id});
  //   } else {
  //     await deleteFile({file_id: id, project_id: 0});
  //     getFile({project_id, folder_id: 0, unitid: unit.unit_id});
  //   }

  //   toggleDialog();
  // };

  const handleFileUpload = async file => {
    const {name} = file;
    const extension = getFileExtension(file.name);
    file.name = `${name}.${extension}`;

    const formData = new FormData();

    formData.append('folder_id');
    formData.append('myfile[]', file);
    formData.append('project_id');

    await uploadFile(formData);
    toggleDialog();
    getFiles({folder_id: 0});
  };
  // const shareItem = async ({fileType, id, users, roles}) => {
  //   toggleMenu();
  //   if (fileType === 'folder') {
  //     await shareFolder({
  //       folder_id: id,
  //       project_id: 0,
  //       access: 'admin',
  //       share_user: users,
  //       share_roles: roles,
  //     });
  //   } else {
  //     await shareFile({
  //       project_id: 0,
  //       share_user: users,
  //       access: 'admin',
  //     });
  //   }
  // };

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

  return (
    <>
      <Tabs.ScrollView contentContainerStyle={styles.contentContainerStyle}>
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
        {/* <View styles={styles.contentContainer}>
          <View>
            <Subheading style={[styles.folder,{ color: theme.colors.primary}]}>FOLDERS</Subheading>
          </View>
          <View style={styles.container}>
            <View style={styles.fileSize}>
              <MaterialCommunityIcons
                name="folder"
                size={45}
                color={theme.colors.primary}
              />
              <View style={styles.folderName}>
                <Text style={styles.subheading}>Dharti Saket</Text>
                <Text>10 June 2020</Text>
              </View>
            </View>
            <View style={styles.fileSize}>
              <Text>2.24kb</Text>
              <Menu
                visible={console.log('-----> ')}
                onDismiss={() => toggleMenu()}
                anchor={
                  <IconButton
                    size={20}
                    onPress={() => toggleMenu()}
                    icon="dots-vertical"
                    style={styles.menuIcon}
                  />
                }>
                hello
              </Menu>
            </View>
          </View>
        </View>
        <View style={styles.contentContainerStyle}>
          <Subheading> FILE</Subheading>
          <View style={styles.container}>
            <View style={styles.fileSize}>
              <MaterialCommunityIcons
                name="folder-image"
                size={45}
                color={theme.colors.primary}
              />
              <View style={styles.folderName}>
                <Text style={styles.subheading}>Dharti Saket</Text>
                <Text>10 June 2020</Text>
              </View>
            </View>
            <View style={styles.fileSize}>
              <Text>2.24kb</Text>
              <Menu
                visible={console.log('-----> ')}
                onDismiss={() => toggleMenu()}
                anchor={
                  <IconButton
                    size={20}
                    onPress={() => toggleMenu()}
                    icon="dots-vertical"
                    style={styles.menuIcon}
                  />
                }>
                hello
              </Menu>
            </View>
          </View>
        </View> */}
        {/* <BottomSheetBehavior
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
                onPress={console.log('-----> ')}
                color="grey"
              />
            </View>
            {modelContentType === 'menu' ? <MenuDialog {...props} /> : null}
          </View>
        )}
      />
        {/* <Dialog visible={visible} onDismiss={hideDialog}>
          <View style={styles.dialogContainer}>
            <Text style={styles.dialog}>New Folder</Text>
            <RenderInput
              placeholder="Untitled folder"
              value={text}
              onChangeText={t => setText(t)}
            />
            <ActionButtons
              style={styles.actionButton}
              cancelLabel="CANCEL"
              submitLabel="SAVE"
              onCancel={navigation.goBack}
              onSubmit={console.log('-----> ')}
            />
          </View>
        </Dialog> */}
      </Tabs.ScrollView>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[0, 300]}
        borderRadius={10}
        renderContent={() => (
          <View style={{backgroundColor: 'red', height: '100%'}}>
            <Text>hello</Text>
          </View>
        )}
      />

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

      <RenderMenuModal
        {...props}
        {...{
          menuId,
          modelContentType,
          modalContent,
          toggleMenu,
          setModalContentType,
          toggleDialog,
          toggleShareDialog,
        }}
      />

      {shareDialog ? (
        <ShareDialogue
          open={shareDialog}
          selectedItem={modalContent}
          handleClose={toggleShareDialog}
          // handleSubmit={shareItem}
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
        // renameFolderHandler={renameFolderHandler}
      />

      <DeleteDialog
        visible={DialogType === 'deleteFileFolder'}
        toggleDialogue={toggleDialog}
        dialogueContent={modalContent}
        // deleteFileHandler={deleteFileHandler}
      />
    </>
  );
}
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 10,
    bottom: 2,
    zIndex: 2,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    margin: 20,
  },
  folder: {},
  contentContainerStyle: {
    flexGrow: 1,
    display: 'flex',
  },

  fileSize: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  folderName: {
    marginHorizontal: 15,
  },
  subheading: {
    fontWeight: 'bold',
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
});

export default Files;
