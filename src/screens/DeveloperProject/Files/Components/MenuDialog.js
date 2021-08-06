import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Button, IconButton, Subheading, Text} from 'react-native-paper';
import FolderIcon from 'assets/images/folder_icon.png';
import FileIcon from 'assets/images/file_icon.png';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';
import {useSnackbar} from 'components/Atoms/Snackbar';
import Share from 'react-native-share';
import {getDownloadUrl} from 'utils';
import {useSelector} from 'react-redux';

const {DocumentDir, DownloadDir} = RNFetchBlob.fs.dirs;

const DIR = Platform.OS === 'ios' ? DocumentDir : DownloadDir;

const normalizeFilePath = path =>
  path.startsWith('file://') ? path.slice(7) : path;

const getFileName = name => {
  const split = name.split('.');
  return split[0];
};

const getFileExtension = fileUrl => {
  // To get the file extension
  const fileExt = /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;

  return fileExt[0];
};

function getFilePath(file) {
  const {file_name, file_url} = file;

  const fileName = getFileName(file_name);
  const fileExt = getFileExtension(file_url);

  return DIR + `/${fileName}.${fileExt}`;
}

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

  const {token} = useSelector(s => s.user);

  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    setDownloading(false);
    if (file_name) {
      const path = getFilePath(modalContent);
      RNFS.exists(path).then(output => {
        if (output) {
          setDownloaded(path);
        } else {
          setDownloaded(false);
        }
      });
    }
  }, [file_name, modalContent]);

  const toggleDownloading = () => setDownloading(v => !v);

  const handleDownload = async () => {
    toggleDownloading();
    const FILE_URL = getDownloadUrl(modalContent);
    const path = getFilePath(modalContent);

    const Authorization = `Bearer ${token}`;

    const options = {
      fileCache: true,
      path,
      addAndroidDownloads: {
        path,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };

    if (downloaded) {
      await RNFS.unlink(path);
    }

    RNFetchBlob.config(options)
      .fetch('GET', FILE_URL, {Authorization})
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));

        const downloadDir = normalizeFilePath(res.data);

        console.log('----->downloadDir ', downloadDir);

        setDownloaded(downloadDir);
        toggleDownloading();

        snackbar.showMessage({message: 'File Downloaded Successfully!'});
      })
      .catch(err => {
        toggleDownloading();
        console.log('-----> err', err);
      });
  };

  const openFile = filePath => {
    filePath = filePath || downloaded;
    console.log('-----> open path', filePath);
    FileViewer.open(filePath);
  };

  const handleShare = async () => {
    try {
      const res = await RNFetchBlob.fetch('GET', getDownloadUrl(id));
      const base64 = res.base64();

      const options = {
        title: 'Share',
        message: `Share ${file_name || folder_name} :`,
        url: base64,
      };

      return Share.open(options);
    } catch (error) {
      console.log('-----> error', error);
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
          <Text style={styles.ModalText}>Share Copy</Text>
        </View>
      </TouchableOpacity>
      {fileType === 'file' ? (
        <TouchableOpacity onPress={handleDownload}>
          <View style={styles.viewDirection}>
            <IconButton icon="download" />
            <View style={styles.downloadLabel}>
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
      <TouchableOpacity onPress={() => versionDataHandler(id)}>
        <View style={styles.viewDirection}>
          <IconButton icon="file-multiple" onPress={() => {}} />
          <Text style={styles.ModalText}>Manage version</Text>
        </View>
      </TouchableOpacity>
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
      <TouchableOpacity
        onPress={() => {
          console.log('inPrint');
        }}>
        <View style={styles.viewDirection}>
          <IconButton icon="printer" />
          <Text style={styles.ModalText}>Print</Text>
        </View>
      </TouchableOpacity>

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
  downloadLabel: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default MenuDialog;
