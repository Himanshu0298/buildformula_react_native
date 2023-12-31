import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Button, IconButton, Subheading, Text} from 'react-native-paper';
import {checkDownloaded} from 'utils/download';
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
    downloadFile,
  } = props;
  const {id, row_type, is_preset, title} = modalContent;

  const fileType = row_type ? 'folder' : 'file';

  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (modalContent?.title) {
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
      const dir = downloadFile(modalContent);
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

  return (
    <View>
      <View style={styles.viewDirection}>
        <Image
          source={row_type === 'folder' ? FolderIcon : FileIcon}
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

        {is_preset === 'no' ? (
          <>
            {row_type === 'file' ? (
              <TouchableOpacity
                onPress={() => versionDataHandler(id, fileType)}>
                <View style={styles.viewDirection}>
                  <IconButton icon="file-multiple" />
                  <Text style={styles.ModalText}>Manage version</Text>
                </View>
              </TouchableOpacity>
            ) : null}
            {/* {modulePermissions?.editor || modulePermissions?.admin ? ( */}
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
            {/* ) : null} */}

            <TouchableOpacity onPress={() => activityDataHandler(id, fileType)}>
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
  },
  ModalText: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  title: {
    marginHorizontal: 10,
    marginVertical: 5,
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
