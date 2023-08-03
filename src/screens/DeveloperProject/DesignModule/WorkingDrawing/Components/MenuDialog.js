import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Share from 'react-native-share';

import {Button, IconButton, Subheading, Text} from 'react-native-paper';
import FileViewer from 'react-native-file-viewer';
import {checkDownloaded, getDownloadUrl} from 'utils/download';
import FolderIcon from 'assets/images/folder_icon.png';
import FileIcon from 'assets/images/file_icon.png';
import {getPermissions} from 'utils';
import {theme} from 'styles/theme';
import {useDownload} from 'components/Atoms/Download';
import {getFileName} from 'utils/constant';

function MenuDialog(props) {
  const {
    modalContent,
    toggleDialog,
    toggleMenu,
    versionDataHandler,
    activityDataHandler,
    showActivity,
    showRename = true,
  } = props;
  const {id, is_preset, file_type, title, files_id, folder_title} =
    modalContent;

  const modulePermissions = getPermissions('Files');

  const download = useDownload();

  const fileType = file_type ? 'image/jpeg' : is_preset;

  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [sharing, setSharing] = useState(false);

  const toggleSharing = () => setSharing(v => !v);

  useEffect(() => {
    if (modalContent?.file_name) {
      setDownloading(false);
      checkDownloaded(modalContent).then(result => {
        setDownloaded(result);
      });
    }
  }, [modalContent]);

  const handleDownload = async () => {
    try {
      download.link({
        name: getFileName(modalContent.file_url),
        data: {
          file_url: modalContent.file_url,
          project_id: modalContent.project_id,
        },
        onFinish: ({dir}) => {
          setDownloaded(dir);
        },
      });
    } catch (error) {
      console.log('----->erorr', error);
    }
  };

  const handleShare = async () => {
    try {
      toggleSharing();

      return download.link({
        name: getFileName(modalContent.file_url),
        showAction: false,
        data: {
          file_url: modalContent.file_url,
          project_id: modalContent.project_id,
        },
        base64: true,
        onFinish: ({base64}) => {
          const options = {
            title: 'Share',
            // message: `Share ${file_name || folder_name} :`,
            url: base64,
          };
          toggleSharing();

          return Share.open(options);
        },
      });
    } catch (error) {
      console.log('-----> error', error);
      return error;
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
      {folder_title ? (
        <View>
          <Subheading style={styles.title}>{folder_title}</Subheading>
        </View>
      ) : (
        <View style={styles.viewDirection}>
          <Image
            source={is_preset && !file_type ? FolderIcon : FileIcon}
            style={styles.PdfIcon}
          />
          <Subheading style={styles.title}>{title}</Subheading>
        </View>
      )}

      <View>
        {!fixedFolder ? (
          <>
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
            {file_type === 'image/jpeg' ? (
              <TouchableOpacity
                onPress={() => versionDataHandler(id, files_id)}>
                <View style={styles.viewDirection}>
                  <IconButton icon="file-multiple" />
                  <Text style={styles.ModalText}>Manage version</Text>
                </View>
              </TouchableOpacity>
            ) : null}
            {showRename ? (
              modulePermissions?.editor || modulePermissions?.admin ? (
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
              ) : null
            ) : null}
            <TouchableOpacity onPress={() => activityDataHandler(id)}>
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
  rowBetween: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default MenuDialog;
