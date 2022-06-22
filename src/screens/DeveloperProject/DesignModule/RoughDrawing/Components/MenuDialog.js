import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import FileViewer from 'react-native-file-viewer';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {checkDownloaded, downloadFile, getDownloadUrl} from 'utils/download';

function MenuDialog(props) {
  const {
    modulePermissions,
    modalContent,
    toggleDialog,
    toggleMenu,
    versionDataHandler,
    activityDataHandler,
    toggleShareDialog,
  } = props;
  const {id, folder_name} = modalContent;

  const snackbar = useSnackbar();

  const fileType = folder_name ? 'folder' : 'file';

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

  const toggleDownloading = () => setDownloading(v => !v);

  const handleDownload = async () => {
    try {
      toggleDownloading();
      const fileUrl = getDownloadUrl(modalContent);
      const {dir} = await downloadFile(modalContent, fileUrl);
      snackbar.showMessage({
        message: 'File Downloaded Successfully!',
        variant: 'success',
      });
      setDownloaded(dir);
      toggleDownloading();
    } catch (error) {
      toggleDownloading();
      console.log('----->erorr', error);
    }
  };

  const defaultFolderCheck = name => {
    return ['Architect', 'Structure', 'MEP'].includes(name);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleShareDialog}>
        <View style={styles.viewDirection}>
          <IconButton icon="download" />
          <View>
            <Text style={styles.ModalText}>Download</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* {defaultFolderCheck(folder_name) ? ( */}
      <View>
        {/* {fileType === 'file' ? (
          <TouchableOpacity onPress={handleDownload}>
            <View style={styles.viewDirection}>
              <IconButton icon="download" />
              <View style={styles.rowBetween}>
                <Text style={styles.ModalText}>Download</Text>
                {downloading ? (
                  <ActivityIndicator color={theme.colors.primary} />
                ) : downloaded ? (
                  <Button compact onPress={() => openFile()}>
                    Open
                  </Button>
                ) : null}
              </View>
            </View>
          </TouchableOpacity>
        ) : null} */}
        {fileType === 'file' ? (
          <TouchableOpacity onPress={() => versionDataHandler(id)}>
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

        <TouchableOpacity onPress={() => activityDataHandler(fileType, id)}>
          <View style={styles.viewDirection}>
            <IconButton icon="information" />
            <Text style={styles.ModalText}>Activity</Text>
          </View>
        </TouchableOpacity>

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
      </View>
      {/* ) : null} */}
    </View>
  );
}

const styles = StyleSheet.create({
  viewDirection: {
    flexDirection: 'row',
  },
  ModalText: {
    alignItems: 'center',
    paddingVertical: 15,
  },
});

export default MenuDialog;
