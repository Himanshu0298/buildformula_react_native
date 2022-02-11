import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Button, IconButton, Subheading, Text} from 'react-native-paper';
import FolderIcon from 'assets/images/folder_icon.png';
import FileIcon from 'assets/images/file_icon.png';
import FileViewer from 'react-native-file-viewer';
import {useSnackbar} from 'components/Atoms/Snackbar';
import Share from 'react-native-share';
import {checkDownloaded, downloadFile, getDownloadUrl} from 'utils/download';

function MenuDialog(props) {
  const {
    theme,
    modulePermissions,
    modalContent,
    toggleDialog,
    toggleMenu,
    versionDataHandler,
    activityDataHandler,
    toggleShareDialog,
  } = props;
  const {id, file_name, folder_name} = modalContent;

  const snackbar = useSnackbar();

  const fileType = folder_name ? 'folder' : 'file';

  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    if (modalContent?.file_name) {
      setDownloading(false);
      checkDownloaded(modalContent).then(result => {
        setDownloaded(result);
      });
    }
  }, [modalContent]);

  const toggleDownloading = () => setDownloading(v => !v);
  const toggleSharing = () => setSharing(v => !v);

  const handleDownload = async () => {
    try {
      toggleDownloading();
      const fileUrl = getDownloadUrl(modalContent);
      const {dir} = await downloadFile(modalContent, fileUrl);
      snackbar.showMessage({message: 'File Downloaded Successfully!'});
      setDownloaded(dir);
      toggleDownloading();
    } catch (error) {
      toggleDownloading();
      console.log('----->erorr', error);
    }
  };

  const openFile = filePath => {
    filePath = filePath || downloaded;
    console.log('-----> open path', filePath);
    FileViewer.open(filePath);
  };

  const handleShare = async () => {
    try {
      toggleSharing();
      const fileUrl = getDownloadUrl(modalContent);
      const {base64} = await downloadFile(modalContent, fileUrl, true);

      const options = {
        title: 'Share',
        message: `Share ${file_name || folder_name} :`,
        url: base64,
      };

      toggleSharing();

      return Share.open(options);
    } catch (error) {
      console.log('-----> error', error);
      return error;
    }
  };

  return (
    <View>
      <View style={styles.viewDirection}>
        <Image
          source={fileType === 'folder' ? FolderIcon : FileIcon}
          style={styles.PdfIcon}
        />
        <Subheading style={{marginHorizontal: 10, marginVertical: 5}}>
          {file_name || folder_name}
        </Subheading>
      </View>

      <TouchableOpacity onPress={toggleShareDialog}>
        <View style={styles.viewDirection}>
          <IconButton icon="account-plus" />
          <View>
            <Text style={styles.ModalText}>Share</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleShare}>
        <View style={styles.viewDirection}>
          <IconButton icon="share-variant" />
          <View style={styles.rowBetween}>
            <Text style={styles.ModalText}>Share Copy</Text>
            {sharing ? (
              <ActivityIndicator color={theme.colors.primary} />
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
      {fileType === 'file' ? (
        <TouchableOpacity onPress={handleDownload}>
          <View style={styles.viewDirection}>
            <IconButton icon="download" />
            <View style={styles.rowBetween}>
              <Text style={styles.ModalText}> Download</Text>
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
      ) : null}
      {fileType === 'file' ? (
        <TouchableOpacity onPress={() => versionDataHandler(id)}>
          <View style={styles.viewDirection}>
            <IconButton icon="file-multiple" onPress={() => {}} />
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
            <IconButton icon="pencil" onPress={() => {}} />
            <Text style={styles.ModalText}>Rename</Text>
          </View>
        </TouchableOpacity>
      ) : null}
      {/* <TouchableOpacity
        onPress={() => {
          console.log('inPrint');
        }}>
        <View style={styles.viewDirection}>
          <IconButton icon="printer" />
          <Text style={styles.ModalText}>Print</Text>
        </View>
      </TouchableOpacity> */}

      <TouchableOpacity onPress={() => activityDataHandler(fileType, id)}>
        <View style={styles.viewDirection}>
          <IconButton icon="information" onPress={() => {}} />
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
            <IconButton icon="delete" onPress={() => {}} />
            <Text style={styles.ModalText}>Delete</Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  PdfIcon: {
    width: 38,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  viewDirection: {
    flexDirection: 'row',
  },
  ModalText: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  rowBetween: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default MenuDialog;
