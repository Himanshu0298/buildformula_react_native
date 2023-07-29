import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Button, IconButton, Subheading, Text} from 'react-native-paper';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {checkDownloaded, downloadFile, getDownloadUrl} from 'utils/download';
import {theme} from 'styles/theme';
import FileViewer from 'react-native-file-viewer';
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
  } = props;
  const {id, row_type, file_type, is_preset, title} = modalContent;

  const snackbar = useSnackbar();

  const fileType = row_type ? 'folder' : 'file';

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
      const fileUrl = getDownloadUrl({modalContent, common: true});
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
  const openFile = filePath => {
    filePath = filePath || downloaded;
    console.log('-----> open path', filePath);
    FileViewer.open(filePath);
  };

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
        {/* <TouchableOpacity onPress={handleDownload}>
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
        </TouchableOpacity> */}
        {!fixedFolder ? (
          <>
            {file_type === 'image/jpeg' ? (
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
            <TouchableOpacity onPress={() => activityDataHandler(id)}>
              <View style={styles.viewDirection}>
                <IconButton icon="information" />
                <Text style={styles.ModalText}>Activity</Text>
              </View>
            </TouchableOpacity>

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
          </>
        ) : null}
      </View>
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
