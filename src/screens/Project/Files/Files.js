import React from 'react';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

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
  Caption,
} from 'react-native-paper';
import useFileActions from 'redux/actions/fileActions';
import Modal from 'react-native-modal';
import PdfIcon from 'assets/images/pdf_icon.png';
import FolderIcon from 'assets/images/folder_icon.png';
import UploadFileIcon from 'assets/images/upload_files.png';
import {theme, secondaryTheme} from 'styles/theme';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import useImagePicker from 'utils/useImagePicker';
import {useTranslation} from 'react-i18next';
import Spinner from 'react-native-loading-spinner-overlay';

const schema = Yup.object().shape({
  folder_name: Yup.string().trim().required('Required'),
});

function DeleteFileFolder(props) {
  const {visible, toggleDialogue, dialogueContent, deleteFileHandler} = props;
  const fileType = dialogueContent.folder_name ? 'folder' : 'file';
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialogue} style={{top: -100}}>
        <Dialog.Content>
          <>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 16}}>
                Are you sure you want to delete
              </Text>
              <Text>
                {dialogueContent.folder_name || dialogueContent.file_name}
              </Text>
            </View>
          </>
        </Dialog.Content>
        <Dialog.Actions>
          <Button color={theme.colors.error} onPress={toggleDialogue}>
            Cancel
          </Button>
          <Button
            style={{minWidth: 80}}
            onPress={() => {
              console.log('--->dial', dialogueContent);
              deleteFileHandler(
                dialogueContent.id,
                fileType,
                dialogueContent.file_type,
              );
            }}>
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

function UploadFile(props) {
  const {
    visible,
    selectedUploadFile = {},
    toggleDialogue,
    handleFileUpload,
  } = props;
  const {t} = useTranslation();

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{file: selectedUploadFile}}
      enableReinitialize
      validationSchema={Yup.object().shape({
        file_name: Yup.string().trim().required('Required'),
      })}
      onSubmit={async values => handleFileUpload(values)}>
      {({values, handleChange, errors, handleSubmit}) => (
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={toggleDialogue}
            style={{top: -100}}>
            <Dialog.Content>
              <>
                <RenderInput
                  name="file_name"
                  label={t('label_name')}
                  containerStyles={styles.input}
                  value={values.file_name}
                  onChangeText={handleChange('file_name')}
                  error={errors.file_name}
                />
              </>
            </Dialog.Content>
            <Dialog.Actions>
              <Button color={theme.colors.error} onPress={toggleDialogue}>
                Cancel
              </Button>
              <Button style={{minWidth: 80}} onPress={handleSubmit}>
                Confirm
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
    </Formik>
  );
}
function RenameDialogue(props) {
  const {visible, toggleDialogue, dialogueContent, renameFolderHandler} = props;
  const fileType = dialogueContent.folder_name ? 'folder' : 'file';
  const renaNameRef = React.useRef();
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialogue} style={{top: -100}}>
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
          onSubmit={async values => {
            renameFolderHandler(
              values.rename_file,
              dialogueContent?.id,
              fileType,
            );
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
                    contentStyle={{padding: 2}}
                    theme={{roundness: 15}}
                    mode="contained"
                    onPress={toggleDialogue}>
                    <Text theme={secondaryTheme}>{'cancel'}</Text>
                  </Button>
                  <Button
                    style={{width: '40%', marginHorizontal: 5}}
                    mode="contained"
                    contentStyle={{padding: 1}}
                    theme={{roundness: 15}}
                    onPress={handleSubmit}>
                    <Text theme={secondaryTheme}>{'save'}</Text>
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
  const {visible, toggleDialogue, createFolderHandler} = props;
  const folderNameRef = React.useRef();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialogue} style={{top: -100}}>
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
          onSubmit={async values => {
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
                    contentStyle={{padding: 2}}
                    theme={{roundness: 15}}
                    mode="contained"
                    onPress={toggleDialogue}>
                    <Text theme={secondaryTheme}>{'cancel'}</Text>
                  </Button>
                  <Button
                    style={{width: '40%', marginHorizontal: 5}}
                    mode="contained"
                    contentStyle={{padding: 1}}
                    theme={{roundness: 15}}
                    onPress={handleSubmit}>
                    <Text theme={secondaryTheme}>{'save'}</Text>
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
  const {versionData} = props;

  const filteredVersion = [versionData?.current];
  console.log('--->', filteredVersion);
  versionData?.lists?.map(list => {
    filteredVersion?.push(list);
  });

  return (
    <View>
      <View style={styles.versionHeading}>
        <Text style={{color: '#4872F4', fontSize: 18}}>Versions</Text>
        <Button
          color="#4872F4"
          style={styles.button}
          onPress={() => console.log('Pressed')}>
          Add New Version
        </Button>
      </View>

      <View>
        {filteredVersion?.map((version, index) => (
          <VersionFile version={version} key={index} countVersion={index} />
        ))}
      </View>
    </View>
  );
}

function VersionFile(props) {
  const {version, countVersion} = props;
  const [versionMenu, setVersionMenu] = React.useState(false);

  const toggleVersionMenu = () => setVersionMenu(v => !v);
  return (
    <View>
      <View style={styles.versionFiles}>
        <View style={styles.sectionContainer}>
          <Image source={PdfIcon} style={styles.PdfIcon} />
          <View>
            {countVersion === 0 ? (
              <Text style={styles.text}>Current Version</Text>
            ) : (
              <Text style={styles.text}>Version {countVersion}</Text>
            )}
            <Text numberOfLines={1} style={styles.text}>
              By {version?.first_name} {version?.last_name}
            </Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View>
            <Text style={styles.date}>
              {dayjs(version?.created).format('DD MMM YYYY')}
            </Text>
          </View>
          <View>
            <Menu
              visible={true}
              onDismiss={toggleVersionMenu}
              anchor={
                <IconButton icon="dots-vertical" onPress={toggleVersionMenu} />
              }>
              <Menu.Item
                icon="download"
                onPress={() => {
                  console.log('--->download');
                }}
                title="Download"
              />
              <Divider />
              <Menu.Item icon="delete" onPress={() => {}} title="Delete" />
            </Menu>
          </View>
        </View>
      </View>
      <Divider />
    </View>
  );
}

function MenuModal(props) {
  const {
    setModalContentType,
    modalContent,
    toggleCreateDialogue,
    toggleMenu,
    versionDataHandler,
  } = props;
  return (
    <View>
      <View style={styles.viewDirection}>
        <Image source={FolderIcon} style={styles.PdfIcon} />
        <Subheading style={{marginHorizontal: 10, marginVertical: 5}}>
          {modalContent?.file_name || modalContent?.folder_name}
        </Subheading>
      </View>

      <TouchableOpacity
        onPress={() => {
          console.log('--->in share');
        }}>
        <View style={styles.viewDirection}>
          <IconButton icon="account-plus" />
          <View>
            <Text style={styles.ModalText}>Share</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <View style={styles.viewDirection}>
          <IconButton icon="share-variant" />
          <Text style={styles.ModalText}>Share Copy</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.viewDirection}>
          <IconButton icon="download" />
          <Text style={styles.ModalText}> Download</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          versionDataHandler(modalContent.id);
          setModalContentType('version');
        }}>
        <View style={styles.viewDirection}>
          <IconButton icon="file-multiple" onPress={() => {}} />
          <Text style={styles.ModalText}>Manage version</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          toggleCreateDialogue('renameFile');
          toggleMenu();
        }}>
        <View style={styles.viewDirection}>
          <IconButton icon="pencil" onPress={() => {}} />
          <Text style={styles.ModalText}>Rename</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('inPrint');
        }}>
        <View style={styles.viewDirection}>
          <IconButton icon="printer" />
          <Text style={styles.ModalText}>Print</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setModalContentType('activity');
        }}>
        <View style={styles.viewDirection}>
          <IconButton icon="information" onPress={() => {}} />
          <Text style={styles.ModalText}>Activity</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          toggleCreateDialogue('deleteFileFolder');
          toggleMenu();
        }}>
        <View style={styles.viewDirection}>
          <IconButton icon="delete" onPress={() => {}} />
          <Text style={styles.ModalText}>Delete</Text>
        </View>
      </TouchableOpacity>
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

  const toggleFab = () => setFab(v => !v);
  const toggleMenu = folderIndex => setMenuId(folderIndex);
  const toggleCreateDialogue = v => setCreateDialogueView(v);

  const createFolderHandler = folderName => {
    createFolder({
      project_id: selectedProject.id,
      index_of: folderDepth,
      folder_name: folderName,
      user_id: user?.id,
    })
      .then(res => {
        getFolders({project_id: selectedProject.id, index_of: folderDepth});
      })
      .then(res => setCreateDialogueView());
  };

  const renameFolderHandler = (name, id, type) => {
    if (type === 'folder') {
      renameFolder({
        folder_name: name,
        folder_id: id,
        user_id: user?.id,
        project_id: selectedProject?.id,
      })
        .then(res =>
          getFolders({
            project_id: selectedProject.id,
            index_of: folderDepth,
          }),
        )
        .then(res => setCreateDialogueView());
    } else {
      renameFile({
        file_id: id,
        project_id: selectedProject.id,
        new_file_name: name,
      }).then(res => {
        toggleCreateDialogue();
        getFiles({project_id: selectedProject.id, folder_id: folderDepth});
      });
    }
  };

  const deleteFileHandler = (id, fileFolder, type) => {
    if (fileFolder === 'folder') {
      deleteFolder({
        folder_id: id,
        project_id: selectedProject?.id,
      })
        .then(res =>
          getFolders({
            project_id: selectedProject.id,
            index_of: folderDepth,
          }),
        )
        .then(res => setCreateDialogueView());
    } else {
      deleteFile({
        file_id: id,
        type: type,
      });
    }
  };

  const onChoose = v => {
    setSelectedUploadFile(v);
    toggleCreateDialogue('uploadFile');
  };

  const handleFileUpload = values => {
    const formData = new FormData();
    values.file.name = values.file_name;
    formData.append('folder_id', folderDepth);
    formData.append('myfile[]', values.file);
    formData.append('project_id', selectedProject.id);

    uploadFile(formData).then(res =>
      getFiles({project_id: selectedProject.id, folder_id: folderDepth}),
    );
  };

  const versionDataHandler = fileId => {
    getVersion({
      project_id: selectedProject.id,
      file_id: fileId,
    });
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
              versionDataHandler={versionDataHandler}
            />
          ) : null}
          {modelContentType === 'parentActivity' ? <ActivityModal /> : null}
          {modelContentType === 'activity' ? <ActivityModal /> : null}
          {modelContentType === 'version' ? (
            <VersionModal versionData={versionData} />
          ) : null}
          {}
        </View>
      </Modal>
      <CreateFolder
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
      <UploadFile
        visible={createDialogueView === 'uploadFile'}
        toggleDialogue={toggleCreateDialogue}
        selectedUploadFile={selectedUploadFile}
        handleFileUpload={handleFileUpload}
      />
      <DeleteFileFolder
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
  versionFiles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  versionHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  noResultContainer: {
    alignItems: 'center',
    height: 100,
  },
});
