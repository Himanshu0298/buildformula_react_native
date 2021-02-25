import React from 'react';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import {StyleSheet, View, Image} from 'react-native';
import {
  IconButton,
  Subheading,
  Text,
  FAB,
  Menu,
  Dialog,
  Divider,
  Button,
  Portal,
} from 'react-native-paper';
import useFileActions from 'redux/actions/fileActions';
import Modal from 'react-native-modal';
import PdfIcon from 'assets/images/pdf_icon.png';
import FolderIcon from 'assets/images/folder_icon.png';
import UploadFileIcon from 'assets/images/upload_files.png';
import {theme, secondaryTheme} from 'styles/theme';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';

const schema = Yup.object().shape({
  folder_name: Yup.string().trim().required('Required'),
});

function RenameDialogue(props) {
  const {visible, toggleDialoge, dialogueContent, renameFolderHandler} = props;
  const renaNameRef = React.useRef();
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialoge} style={{top: -100}}>
        <View style={styles.dialogTitleContainer}>
          <Text style={{color: '#000'}}>
            {dialogueContent?.file_name || dialogueContent?.folder_name}
          </Text>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{rename_file: ''}}
          validationSchema={Yup.object().shape({
            rename_file: Yup.string().trim().required('Required'),
          })}
          onSubmit={async (values) => {
            if (dialogueContent?.folder_name) {
              renameFolderHandler(values.rename_file, dialogueContent?.id);
            }
          }}>
          {({values, errors, handleChange, handleBlur, handleSubmit}) => {
            return (
              <View style={styles.dialogContentContainer}>
                <RenderInput
                  name="rename_file"
                  label={'file name'}
                  containerStyles={styles.input}
                  value={values.rename_file}
                  onChangeText={handleChange('rename_file')}
                  onBlur={handleBlur('rename_file')}
                  ref={renaNameRef}
                  onSubmitEditing={handleSubmit}
                  error={errors.rename_file}
                />

                <View style={styles.dialogActionContainer}>
                  <Button
                    style={{width: '40%', marginHorizontal: 5}}
                    mode="contained"
                    contentStyle={{padding: 1}}
                    theme={{roundness: 15}}
                    onPress={handleSubmit}>
                    <Text theme={secondaryTheme}>{'save'}</Text>
                  </Button>
                  <Button
                    style={{width: '40%', marginHorizontal: 5}}
                    contentStyle={{padding: 2}}
                    theme={{roundness: 15}}
                    mode="contained"
                    onPress={toggleDialoge}>
                    <Text theme={secondaryTheme}>{'cancel'}</Text>
                  </Button>
                </View>
              </View>
            );
          }}
        </Formik>
      </Dialog>
    </Portal>
  );
}

function CreateFolder(props) {
  const {visible, toggleDialog, createFolderHandler} = props;
  const folderNameRef = React.useRef();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialog} style={{top: -100}}>
        <View style={styles.dialogTitleContainer}>
          <Text style={{color: '#000'}}>Create New Folder</Text>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{folderName: ''}}
          validationSchema={Yup.object().shape({
            folder_name: Yup.string().trim().required('Required'),
          })}
          onSubmit={async (values) => {
            createFolderHandler(values.folder_name);
          }}>
          {({values, errors, handleChange, handleBlur, handleSubmit}) => {
            return (
              <View style={styles.dialogContentContainer}>
                <RenderInput
                  name="folder_name"
                  label={'Folder name'}
                  containerStyles={styles.input}
                  value={values.folder_name}
                  onChangeText={handleChange('folder_name')}
                  onBlur={handleBlur('folder_name')}
                  ref={folderNameRef}
                  onSubmitEditing={handleSubmit}
                  error={errors.folder_name}
                />

                <View style={styles.dialogActionContainer}>
                  <Button
                    style={{width: '40%', marginHorizontal: 5}}
                    mode="contained"
                    contentStyle={{padding: 1}}
                    theme={{roundness: 15}}
                    onPress={handleSubmit}>
                    <Text theme={secondaryTheme}>{'save'}</Text>
                  </Button>
                  <Button
                    style={{width: '40%', marginHorizontal: 5}}
                    contentStyle={{padding: 2}}
                    theme={{roundness: 15}}
                    mode="contained"
                    onPress={toggleDialog}>
                    <Text theme={secondaryTheme}>{'cancel'}</Text>
                  </Button>
                </View>
              </View>
            );
          }}
        </Formik>
      </Dialog>
    </Portal>
  );
}

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
function VersionModal(props) {
  const {versions} = props;
  return (
    <View>
      <View style={styles.backNavigation}>
        <Text>Versions</Text>
        <Button
          color="#4872F4"
          style={styles.button}
          onPress={() => console.log('Pressed')}>
          Add New Version
        </Button>
      </View>
      <View>
        {versions?.map((version, index) => (
          <VersionFile version={version} key={index} />
        ))}
      </View>
    </View>
  );
}

function VersionFile() {
  const [versionMenu, setVersionMenu] = React.useState(false);

  const toggleVersionMenu = () => setVersionMenu(!versionMenu);
  return (
    <View style={styles.recentFiles}>
      <View style={styles.sectionContainer}>
        <Image source={PdfIcon} style={styles.PdfIcon} />
        <View>
          <Text numberOfLines={1} style={styles.text}>
            First File Version
          </Text>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.date}>
            {dayjs(new Date()).format('DD MMM YYYY')}
          </Text>
        </View>
        <View>
          <Menu
            visible={versionMenu}
            onDismiss={toggleVersionMenu}
            anchor={
              <IconButton icon="dots-vertical" onPress={toggleVersionMenu} />
            }>
            <Menu.Item icon="download" onPress={() => {}} title="Download" />
            <Divider />
            <Menu.Item icon="delete" onPress={() => {}} title="Delete" />
          </Menu>
        </View>
      </View>
    </View>
  );
}

function MenuModal(props) {
  const {
    setModalContentType,
    modalContent,
    toggleCreateDialogue,
    toggleMenu,
  } = props;
  return (
    <View>
      <View style={styles.viewDirection}>
        <Image source={FolderIcon} style={styles.PdfIcon} />
        <Subheading style={{marginHorizontal: 10, marginVertical: 5}}>
          {modalContent?.file_name || modalContent?.folder_name}
        </Subheading>
      </View>
      <View style={styles.viewDirection}>
        <IconButton
          style={styles.ModalText}
          icon="account-plus"
          onPress={() => {}}
        />
        <View>
          <Text style={styles.ModalText}>Share</Text>
        </View>
      </View>
      <View style={styles.viewDirection}>
        <IconButton icon="share-variant" onPress={() => {}} />
        <Text style={styles.ModalText}>Share Copy</Text>
      </View>
      <View style={styles.viewDirection}>
        <IconButton icon="download" onPress={() => {}} />
        <Text style={styles.ModalText}> Download</Text>
      </View>
      <View style={styles.viewDirection}>
        <IconButton
          icon="file-multiple"
          onPress={() => setModalContentType('version')}
        />
        <Text style={styles.ModalText}>Manage version</Text>
      </View>
      <View style={styles.viewDirection}>
        <IconButton
          icon="pencil"
          onPress={() => {
            toggleCreateDialogue('renameFile');
            toggleMenu();
          }}
        />
        <Text style={styles.ModalText}>Rename</Text>
      </View>
      <View style={styles.viewDirection}>
        <IconButton icon="printer" onPress={() => {}} />
        <Text style={styles.ModalText}>Print</Text>
      </View>
      <View style={styles.viewDirection}>
        <IconButton
          icon="information"
          onPress={() => setModalContentType('activity')}
        />
        <Text style={styles.ModalText}>Activity</Text>
      </View>
      <View style={styles.viewDirection}>
        <IconButton icon="delete" onPress={() => {}} />
        <Text style={styles.ModalText}>Delete</Text>
      </View>
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
        onPress={() => {
          navigation.push('FilesHome', {
            folder_name,
            index_of: folder.id,
          });
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
      <View>
        <IconButton
          icon="dots-vertical"
          onPress={() => {
            toggleMenu(folderIndex);
            setModalContentType('menu');
            setModalContent(folder);
          }}
        />
      </View>
    </View>
  );
}

function RenderFile({
  file,
  toggleMenu,
  menuId,
  setModalContentType,
  fileIndex,
  setModalContent,
}) {
  const {file_name, created} = file;

  return (
    <View style={styles.recentFiles}>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.sectionContainer}>
          <Image source={PdfIcon} style={styles.PdfIcon} />
          <View>
            <Text style={(styles.verticalFlex, styles.text)} numberOfLines={2}>
              {file_name}
            </Text>
          </View>
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

export default function Files(props) {
  const {route, navigation} = props;
  const {folder_name, index_of: folderDepth = 0} = route?.params || {};

  const {folders, files} = useSelector((state) => state.files);
  const {selectedProject} = useSelector((state) => state.project);

  const {user} = useSelector((state) => state.user);
  const {getFolders, createFolder, getFiles, renameFolder} = useFileActions();

  const [fab, setFab] = React.useState(false);
  const [menuId, setMenuId] = React.useState(null);
  const [modelContentType, setModalContentType] = React.useState('menu');
  const [modalContent, setModalContent] = React.useState({});
  const [createDialogueView, setCreateDialogueView] = React.useState(false);

  const filteredFolders = folders?.[folderDepth];
  const filteredFiles = files?.[folderDepth];

  React.useEffect(() => {
    getFolders({
      project_id: selectedProject.id,
      index_of: folderDepth,
    });
    getFiles({project_id: selectedProject.id, folder_id: folderDepth});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleFab = () => setFab((v) => !v);
  const toggleMenu = (folderIndex) => setMenuId(folderIndex);

  const toggleCreateDialogue = (dialogueType) => {
    setCreateDialogueView(dialogueType);
  };

  const createFolderHandler = (folderName) => {
    createFolder({
      project_id: selectedProject.id,
      index_of: folderDepth,
      folder_name: folderName,
      user_id: user?.id,
    })
      .then((res) =>
        getFolders({
          project_id: selectedProject.id,
          index_of: folderDepth,
        }),
      )
      .then((res) => setCreateDialogueView());
  };
  const renameFolderHandler = (folderName, FolderId) => {
    renameFolder({
      folder_name: folderName,
      folder_id: FolderId,
      user_id: user?.id,
      project_id: selectedProject?.id,
    })
      .then((res) =>
        getFolders({
          project_id: selectedProject.id,
          index_of: folderDepth,
        }),
      )
      .then((res) => setCreateDialogueView());
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {folder_name ? (
          <View style={styles.backNavigation}>
            <View style={styles.viewDirection}>
              <IconButton
                icon="arrow-left"
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.Subheadings}>
                {folder_name || 'FOLDERNAME'}
              </Text>
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
        {filteredFolders ? (
          <Subheading style={styles.Subheading}>Folders</Subheading>
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
        {filteredFiles ? (
          <Subheading style={styles.Subheading}>Files</Subheading>
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
        actions={[
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
            onPress: () => {
              console.log('in Create upload files');
            },
          },
          {
            icon: UploadFileIcon,
            color: theme.colors.primary,
            label: 'Upload files',
            onPress: () => {
              console.log('in Create upload files');
            },
          },
        ]}
      />
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
            <MenuModal
              setModalContentType={setModalContentType}
              modalContent={modalContent}
              toggleCreateDialogue={toggleCreateDialogue}
              toggleMenu={toggleMenu}
            />
          ) : null}
          {modelContentType === 'parentActivity' ? <ActivityModal /> : null}
          {modelContentType === 'activity' ? <ActivityModal /> : null}
          {modelContentType === 'version' ? <VersionModal /> : null}
          {}
        </View>
      </Modal>
      <CreateFolder
        visible={createDialogueView === 'createFolder'}
        toggleDialog={toggleCreateDialogue}
        createFolderHandler={createFolderHandler}
      />
      <RenameDialogue
        visible={createDialogueView === 'renameFile'}
        toggleDialoge={toggleCreateDialogue}
        dialogueContent={modalContent}
        renameFolderHandler={renameFolderHandler}
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
    fontSize: 24,
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
    justifyContent: 'space-between',
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
    flex: 0.65,
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
  Subheadings: {
    fontSize: 30,
  },
  ModalText: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  button: {
    backgroundColor: '#DBE9F6',
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
  dialogTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  dialogContentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dialogActionContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {marginVertical: 5},
});
