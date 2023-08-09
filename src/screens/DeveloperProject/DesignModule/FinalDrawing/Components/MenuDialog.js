import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Button, IconButton, Subheading, Text} from 'react-native-paper';

import {ShareAsset} from 'react-native-share';
import FileViewer from 'react-native-file-viewer';
import {checkDownloaded} from 'utils/download';
import FolderIcon from 'assets/images/folder_icon.png';
import FileIcon from 'assets/images/file_icon.png';
import {getPermissions} from 'utils';
import {useDownload} from 'components/Atoms/Download';

import {getFileName} from 'utils/constant';
import {theme} from 'styles/theme';

function MenuDialog(props) {
  const {
    modalContent,
    toggleDialog,
    toggleMenu,
    versionDataHandler,
    activityDataHandler,
    showActivity = true,
    showShare = true,
    showRename = true,
    showVersion = true,
  } = props;
  const {id, row_type, file_type, is_preset, title, files_id, folder_title} =
    modalContent;
  const modulePermissions = getPermissions('Files');

  console.log('===========> modalContent', modalContent);

  const download = useDownload();

  const fileType = row_type ? 'folder' : 'file';

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

  const fixedFolder =
    fileType === 'folder' || ['Architech', 'Structure', 'MEP'].includes(title);

  const handleDownload = async () => {
    try {
      download.link({
        name: getFileName(modalContent.file_url),
        data: {
          file_url: modalContent.file_url,
          project_id: modalContent.project_id,
        },
        onFinish: ({dir}) => {
          console.log('onFinish===========>dir ', dir);

          FileViewer.open(`file://${dir}`);
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

          return ShareAsset.open(options);
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
    FileViewer.open(`file://${filePath}`);
  };

  return (
    <View>
      <View style={styles.viewDirection}>
        {folder_title ? (
          <View>
            <Subheading style={styles.title}>{folder_title}</Subheading>
          </View>
        ) : (
          <>
            <Image
              source={is_preset && !file_type ? FolderIcon : FileIcon}
              style={styles.PdfIcon}
            />
            <Subheading style={styles.title}>{title}</Subheading>
          </>
        )}
      </View>
      {showShare ? (
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
      ) : null}
      <View>
        <TouchableOpacity onPress={handleDownload}>
          <View style={styles.viewDirection}>
            <IconButton icon="download" />
            <View style={styles.rowBetween}>
              <Text style={styles.ModalText}>Download</Text>
              {/* {downloading ? (
                <ActivityIndicator color={theme.colors.primary} />
              ) : downloaded ? (
                <Button compact onPress={() => openFile()}>
                  Open
                </Button>
              ) : null} */}
            </View>
          </View>
        </TouchableOpacity>

        {!fixedFolder ? (
          <>
            {showVersion ? (
              <TouchableOpacity
                onPress={() => versionDataHandler(id, files_id)}>
                <View style={styles.viewDirection}>
                  <IconButton icon="file-multiple" />
                  <Text style={styles.ModalText}>Manage version</Text>
                </View>
              </TouchableOpacity>
            ) : null}
            {modulePermissions?.editor || modulePermissions?.admin ? (
              showRename ? (
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
            {showActivity ? (
              <TouchableOpacity
                onPress={() => activityDataHandler(id, files_id)}>
                <View style={styles.viewDirection}>
                  <IconButton icon="information" />
                  <Text style={styles.ModalText}>Activity</Text>
                </View>
              </TouchableOpacity>
            ) : null}

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
