import React from 'react';
import {StyleSheet, View, Image, Alert} from 'react-native';
import {
  IconButton,
  Subheading,
  Text,
  Menu,
  Divider,
  FAB,
} from 'react-native-paper';
import useFileActions from 'redux/actions/fileActions';
import Modal from 'react-native-modal';
import PdfIcon from 'assets/images/pdf_icon.png';
import FolderIcon from 'assets/images/folder_icon.png';
import UploadFileIcon from 'assets/images/upload_files.png';

import {theme} from 'styles/theme';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';

function ActivityModal() {
  return (
    <View>
      <Text>info</Text>
    </View>
  );
}

function VersionModal() {
  return (
    <View>
      <Text>HELLO</Text>
    </View>
  );
}
function VersionActivityModal({versionModal}) {
  return (
    <View>
      {versionModal === 'Version' ? <VersionModal /> : <ActivityModal />}
    </View>
  );
}

function MenuModal({toggleModelState, modalView, folder_name, modalType}) {
  return (
    <View>
      <View style={styles.spaceBetween}>
        <Image source={modalType} style={styles.PdfIcon} />
        <Subheading style={{marginHorizontal: 10, marginVertical: 5}}>
          {folder_name || 'First File Name'}
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
          onPress={() => {
            toggleModelState(true);
            modalView('Version');
          }}
        />
        <Text style={styles.ModalText}>Manage version</Text>
      </View>
      <View style={styles.viewDirection}>
        <IconButton icon="pencil" onPress={() => {}} />
        <Text style={styles.ModalText}>Rename</Text>
      </View>
      <View style={styles.viewDirection}>
        <IconButton icon="printer" onPress={() => {}} />
        <Text style={styles.ModalText}>Print</Text>
      </View>
      <View style={styles.viewDirection}>
        <IconButton
          icon="information"
          onPress={() => {
            toggleModelState(true);
            modalView('Activity');
          }}
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
  const {folder, toggleMenu, navigation, modelTypeChange} = props;
  const {folder_name, type} = folder;

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.push('FilesHome', {folder_name});
        }}>
        <View style={styles.sectionContainer}>
          <Image source={FolderIcon} style={styles.PdfIcon} />
          <View>
            <Text numberOfLines={1} style={styles.text}>
              {folder_name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View>
        <IconButton
          icon="dots-vertical"
          onPress={() => {
            toggleMenu(true);
            modelTypeChange(FolderIcon);
          }}
        />
      </View>
    </View>
  );
}

function RenderFile({file, toggleMenu, menuId, modelTypeChange}) {
  const {file_name, date} = file;

  return (
    <View style={styles.recentFiles}>
      <View style={styles.sectionContainer}>
        <Image source={PdfIcon} style={styles.PdfIcon} />
        <View>
          <Text numberOfLines={1} style={styles.text}>
            {file_name}
          </Text>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.date}>{dayjs(date).format('DD MMM YYYY')}</Text>
        </View>
        <View>
          <Menu
            visible={menuId === file_name}
            onDismiss={toggleMenu}
            anchor={
              <IconButton
                icon="dots-vertical"
                onPress={() => {
                  toggleMenu(true);
                  modelTypeChange(PdfIcon);
                }}
              />
            }
          />
        </View>
      </View>
    </View>
  );
}

export default function Files(props) {
  const {route, navigation} = props;
  const {folder_name} = route?.params || {};

  const files = [
    {file_name: 'firstfile', date: new Date(), type: 'file'},
    {file_name: 'secondfile', date: new Date(), type: 'file'},
    {file_name: 'thirdfile', date: new Date(), type: 'file'},
  ];
  const folders = [
    {folder_name: 'firstfile', date: new Date(), type: 'folder'},
    {folder_name: 'secondfile', date: new Date(), type: 'folder'},
    {folder_name: 'thirdfile', date: new Date(), type: 'folder'},
  ];

  // const {folders} = useSelector((state) => state.files);
  const {selectedProject} = useSelector((state) => state.project);
  const {getFolders, createFolder} = useFileActions();

  const [state, setState] = React.useState(false);
  const [menuId, setMenuId] = React.useState(false);
  const [versionState, setVersionState] = React.useState(false);
  const [versionModal, setVersionModal] = React.useState('Activity');
  const [modalType, setModalType] = React.useState({FolderIcon});

  const onStateChange = ({open}) => setState({open});
  const {open} = state;
  const toggleMenu = (model) => setMenuId(model);
  const toggleModelState = (version) => setVersionState(version);
  const modalView = (view) => setVersionModal(view);
  const modelTypeChange = (type) => setModalType(type);

  React.useEffect(() => {
    getFolders({
      project_id: selectedProject.id,
      index_of: 0,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const hideFolderView = () => {
    if (folder_name) {
      return true;
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {hideFolderView() ? (
          <View style={styles.backNavigation}>
            <View style={styles.spaceBetween}>
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
                toggleModelState(true);
                modalView('Activity');
              }}
            />
          </View>
        ) : (
          <View />
        )}
        <Subheading style={styles.Subheading}>Folders</Subheading>
        <View>
          {folders.map((folder, index) => (
            <RenderFolder
              {...props}
              folder={folder}
              key={index}
              menuId={menuId}
              toggleMenu={toggleMenu}
              modelTypeChange={modelTypeChange}
            />
          ))}
        </View>
        <Subheading style={styles.Subheading}>Files</Subheading>
        <View>
          {files.map((file, index) => (
            <RenderFile
              file={file}
              key={index}
              menuId={menuId}
              toggleMenu={toggleMenu}
              modelTypeChange={modelTypeChange}
            />
          ))}
        </View>
      </ScrollView>
      <FAB.Group
        open={open}
        style={styles.fab}
        fabStyle={{
          backgroundColor: open ? '#fff' : theme.colors.primary,
        }}
        icon={open ? 'window-close' : 'plus'}
        small
        onPress={() => {
          if (open) {
            console.log('in here');
          }
        }}
        onStateChange={onStateChange}
        actions={[
          {
            icon: FolderIcon,
            color: theme.colors.primary,
            label: 'Create new folder',
            onPress: () => {
              console.log('in Create new folder');
            },
          },
          {
            icon: FolderIcon,
            color: theme.colors.primary,
            label: 'Upload folder',
            onPress: () => {
              console.log('in Create upload folder');
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
        isVisible={menuId || versionState}
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
                versionState ? toggleModelState(false) : toggleMenu(false);
              }}
              color="grey"
            />
          </View>

          {versionState ? (
            <VersionActivityModal versionModal={versionModal} />
          ) : (
            <MenuModal
              toggleModelState={toggleModelState}
              modalView={modalView}
              folder_name={folder_name}
              modalType={modalType}
            />
          )}
        </View>
      </Modal>
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
    width: 36,
    height: 36,
    paddingLeft: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  text: {
    color: '#080707',
    paddingLeft: 10,
    fontSize: 14,
    alignItems: 'center',
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
  spaceBetween: {
    flexDirection: 'row',
  },
  ModalText: {
    alignItems: 'center',
    paddingVertical: 15,
  },
});
