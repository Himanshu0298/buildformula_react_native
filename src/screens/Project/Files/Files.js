import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {IconButton, Subheading, Text, FAB, Caption} from 'react-native-paper';
import useFileActions from 'redux/actions/fileActions';
import Modal from 'react-native-modal';
import PdfIcon from 'assets/images/pdf_icon.png';
import FolderIcon from 'assets/images/folder_icon.png';
import UploadFileIcon from 'assets/images/upload_files.png';
import {theme} from 'styles/theme';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import useImagePicker from 'utils/useImagePicker';
import Spinner from 'react-native-loading-spinner-overlay';
import RNBackgroundDownloader from 'react-native-background-downloader';
import DeleteDialog from './Components/DeleteDialog';
import UploadDialog from './Components/UploadDialog';
import RenameDialogue from './Components/RenameDialog';
import CreateFolderDialogue from './Components/CreateFolderDialog';
import MenuDialog from './Components/MenuDialog';
import VersionDialog from './Components/VersionDialog';

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

function RenderFolder(props) {
  const {
    folder,
    toggleMenu,
    navigation,
    setModalContentType,
    folderIndex,
    setModalContent,
  } = props;
  const {folder_name} = folder;

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity
        style={{flexGrow: 1}}
        onPress={() => {
          navigation.push('FilesHome', {folder_name, index_of: folder.id});
        }}>
        <View style={styles.sectionContainer}>
          <Image source={FolderIcon} style={styles.PdfIcon} />
          <View>
            <Text numberOfLines={2} style={styles.text}>
              {folder_name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <IconButton
        icon="dots-vertical"
        onPress={() => {
          toggleMenu(folderIndex);
          setModalContentType('menu');
          setModalContent(folder);
        }}
      />
    </View>
  );
}

function RenderFile(props) {
  const {
    file,
    toggleMenu,
    setModalContentType,
    fileIndex,
    setModalContent,
  } = props;

  const {file_name, created} = file;

  return (
    <View style={styles.recentFiles}>
      <View style={styles.sectionContainer}>
        <Image source={PdfIcon} style={styles.PdfIcon} />
        <View>
          <Text style={(styles.verticalFlex, styles.text)} numberOfLines={2}>
            {file_name}
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
              toggleMenu(fileIndex);
              setModalContentType('menu');
              setModalContent(file);
            }}
          />
        </View>
      </View>
    </View>
  );
}

function NoResult({title}) {
  return (
    <View style={styles.noResultContainer}>
      <Caption>{title}</Caption>
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
    toggleCreateDialogue,
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
            toggleCreateDialogue={toggleCreateDialogue}
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
  const {folder_name, index_of: folderDepth = 0} = route?.params || {};

  const {loading, folders, files, versionData} = useSelector(
    state => state.files,
  );
  const {selectedProject} = useSelector(state => state.project);

  const {user} = useSelector(state => state.user);
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
  const [createDialogueView, setCreateDialogueView] = React.useState(false);
  const [selectedUploadFile, setSelectedUploadFile] = React.useState();

  const filteredFolders = folders?.[folderDepth] || [];
  const filteredFiles = files?.[folderDepth] || [];

  React.useEffect(() => {
    getFolders({project_id: selectedProject.id, index_of: folderDepth});
    getFiles({project_id: selectedProject.id, folder_id: folderDepth});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const FAB_ACTIONS = [
    {
      icon: FolderIcon,
      color: theme.colors.primary,
      label: 'Create new folder',
      onPress: () => {
        toggleFab();
        toggleCreateDialogue('createFolder');
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
  const toggleCreateDialogue = v => setCreateDialogueView(v);

  const createFolderHandler = async folderName => {
    await createFolder({
      project_id: selectedProject.id,
      index_of: folderDepth,
      folder_name: folderName,
      user_id: user?.id,
    });
    await getFolders({project_id: selectedProject.id, index_of: folderDepth});
    setCreateDialogueView();
  };

  const renameFolderHandler = async (name, id, type) => {
    if (type === 'folder') {
      await renameFolder({
        folder_name: name,
        folder_id: id,
        user_id: user?.id,
        project_id: selectedProject?.id,
      });
      await getFolders({project_id: selectedProject.id, index_of: folderDepth});
      setCreateDialogueView();
    } else {
      renameFile({
        file_id: id,
        project_id: selectedProject.id,
        new_file_name: name,
      });
      toggleCreateDialogue();
      await getFiles({project_id: selectedProject.id, folder_id: folderDepth});
    }
  };

  const deleteFileHandler = async (id, fileFolder, type) => {
    if (fileFolder === 'folder') {
      await deleteFolder({folder_id: id, project_id: selectedProject?.id});
      await getFolders({project_id: selectedProject.id, index_of: folderDepth});
      setCreateDialogueView();
    } else {
      deleteFile({file_id: id, type: type});
    }
  };

  const onChoose = v => {
    setSelectedUploadFile(v);
    toggleCreateDialogue('uploadFile');
  };

  const handleFileUpload = async values => {
    const formData = new FormData();

    formData.append('folder_id', folderDepth);
    formData.append('myfile[]', values.file);
    formData.append('project_id', selectedProject.id);

    await uploadFile(formData);
    toggleCreateDialogue();
    await getFiles({project_id: selectedProject.id, folder_id: folderDepth});
  };

  const versionDataHandler = fileId => {
    getVersion({project_id: selectedProject.id, file_id: fileId});
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <ScrollView>
        {folder_name ? (
          <View style={styles.backNavigation}>
            <View style={styles.viewDirection}>
              <IconButton
                icon="arrow-left"
                onPress={() => navigation.goBack()}
              />
              <Subheading style={styles.backNavHeading} numberOfLines={1}>
                {folder_name || 'FOLDERNAME'}
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
        ) : (
          <View />
        )}
        <Subheading style={styles.Subheading}>Folders</Subheading>
        {filteredFolders?.length === 0 ? (
          <NoResult title="No Folders Found" />
        ) : null}
        <View>
          {filteredFolders?.map((folder, index) => (
            <RenderFolder
              {...props}
              folder={folder}
              key={index}
              menuId={menuId}
              toggleMenu={toggleMenu}
              setModalContentType={setModalContentType}
              folderDepth={folderDepth}
              folderIndex={filteredFolders.indexOf(folder)}
              setModalContent={setModalContent}
            />
          ))}
        </View>
        <Subheading style={styles.Subheading}>Files</Subheading>
        {filteredFolders?.length === 0 ? (
          <NoResult title="No Files Found" />
        ) : null}
        <View>
          {filteredFiles?.map((file, index) => (
            <RenderFile
              file={file}
              key={index}
              menuId={menuId}
              toggleMenu={toggleMenu}
              setModalContentType={setModalContentType}
              fileIndex={filteredFiles?.indexOf(file)}
              setModalContent={setModalContent}
            />
          ))}
        </View>
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
          toggleCreateDialogue,
          versionDataHandler,
        }}
      />

      <CreateFolderDialogue
        visible={createDialogueView === 'createFolder'}
        toggleDialogue={toggleCreateDialogue}
        createFolderHandler={createFolderHandler}
      />
      <RenameDialogue
        visible={createDialogueView === 'renameFile'}
        toggleDialogue={toggleCreateDialogue}
        dialogueContent={modalContent}
        renameFolderHandler={renameFolderHandler}
      />
      <UploadDialog
        visible={createDialogueView === 'uploadFile'}
        toggleDialogue={toggleCreateDialogue}
        selectedUploadFile={selectedUploadFile}
        handleFileUpload={handleFileUpload}
      />
      <DeleteDialog
        visible={createDialogueView === 'deleteFileFolder'}
        toggleDialogue={toggleCreateDialogue}
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
  Subheading: {
    fontSize: 20,
    color: '#080707',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
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
  },
  backNavigation: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backNavHeading: {
    fontSize: 22,
    color: '#080707',
    maxWidth: 200,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  verticalFlex: {
    flexDirection: 'column',
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
  noResultContainer: {
    alignItems: 'center',
    height: 100,
  },
});
