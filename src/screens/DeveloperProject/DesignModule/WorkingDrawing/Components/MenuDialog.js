import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {IconButton, Subheading, Text} from 'react-native-paper';
import FileViewer from 'react-native-file-viewer';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {checkDownloaded, downloadFile, getDownloadUrl} from 'utils/download';
import FolderIcon from 'assets/images/folder_icon.png';
import FileIcon from 'assets/images/file_icon.png';

function MenuDialog(props) {
  const {
    modulePermissions,
    modalContent,
    toggleDialog,
    toggleMenu,
    versionDataHandler,
    activityDataHandler,
    showActivity,
  } = props;
  const {id, is_preset, file_type, title, files_id} = modalContent;

  const snackbar = useSnackbar();

  const fileType = file_type ? 'image/jpeg' : is_preset;

  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (modalContent?.file_name) {
      setDownloading(false);
      checkDownloaded(modalContent).then(result => {
        setDownloaded(result);
      });
    }
  }, [modalContent]);

  const fixedFolder =
    fileType === 'folder' || ['Architech', 'Structure', 'MEP'].includes(title);

  return (
    <View>
      <View style={styles.viewDirection}>
        <Image
          source={is_preset && !file_type ? FolderIcon : FileIcon}
          style={styles.PdfIcon}
        />
        <Subheading style={styles.title}>{title}</Subheading>
      </View>

      <View>
        {!fixedFolder ? (
          <>
            {file_type === 'image/jpeg' ? (
              <TouchableOpacity
                onPress={() => versionDataHandler(id, files_id)}>
                <View style={styles.viewDirection}>
                  <IconButton icon="file-multiple" />
                  <Text style={styles.ModalText}>Manage version</Text>
                </View>
              </TouchableOpacity>
            ) : null}
            {modulePermissions?.editor || modulePermissions?.admin ? (
              <TouchableOpacity
                onPress={() => {
                  toggleDialog('renameFile');
                  toggleMenu();
                }}>
                <View style={styles.viewDirection}>
                  <IconButton icon="pencil" />
                  <Text style={styles.ModalText}>Rename</Text>
                </View>
              </TouchableOpacity>
            ) : null}
            {showActivity ? (
              <TouchableOpacity onPress={() => activityDataHandler(id)}>
                <View style={styles.viewDirection}>
                  <IconButton icon="information" />
                  <Text style={styles.ModalText}>Activity</Text>
                </View>
              </TouchableOpacity>
            ) : null}
            {modulePermissions?.editor || modulePermissions?.admin ? (
              <TouchableOpacity
                onPress={() => {
                  toggleDialog('deleteFileFolder');
                  toggleMenu();
                }}>
                <View style={styles.viewDirection}>
                  <IconButton icon="delete" />
                  <Text style={styles.ModalText}>Delete</Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </>
        ) : null}
      </View>
      {/* ) : null} */}
    </View>
  );
}

const styles = StyleSheet.create({
  viewDirection: {
    flexDirection: 'row',
    marginRight: 50,
  },
  ModalText: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  title: {
    marginHorizontal: 10,
    marginVertical: 5,
    overflow: 'hidden',
  },
  PdfIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default MenuDialog;
