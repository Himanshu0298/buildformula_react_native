import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Button, IconButton, Subheading, Text} from 'react-native-paper';
import FolderIcon from 'assets/images/folder_icon.png';
import FileIcon from 'assets/images/file_icon.png';
import RNBackgroundDownloader from 'react-native-background-downloader';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';
import {useSnackbar} from 'components/Atoms/Snackbar';
import Share from 'react-native-share';

const {config, fs} = RNFetchBlob;

const DOWNLOAD_DIR = RNFetchBlob.fs.dirs.DownloadDir;

async function checkDuplicate(destination, count = 0) {
  const updatedDestination = count
    ? `${destination}_${count + 1}`
    : destination;
  try {
    const existingFile = await RNFS.stat(updatedDestination);
    if (existingFile) {
      return checkDuplicate(destination, count + 1);
    }
  } catch (error) {
    return updatedDestination;
  }
}

const getFileExtention = fileUrl => {
  // To get the file extension
  return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
};

function MenuDialog(props) {
  const {
    modalContent,
    toggleDialog,
    toggleMenu,
    versionDataHandler,
    activityDataHandler,
    toggleShareDialog,
  } = props;
  const {id, file_name, file_url, file_type} = modalContent;

  const snackbar = useSnackbar();

  const fileType = modalContent.folder_name ? 'folder' : 'file';

  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const date = new Date();
    const FILE_URL = file_url;
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const RootDir = fs.dirs.DocumentDir;
    const options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));

        snackbar.showMessage('File Downloaded Successfully!');
        openFile(res.path());
      });
  };

  const openFile = path => FileViewer.open(path || downloaded);

  const handleShare = async () => {
    try {
      const res = await RNFetchBlob.fetch('GET', file_url);
      const base64 = res.base64();

      const options = {
        title: 'Share',
        message: `Share ${
          modalContent.file_name || modalContent.folder_name
        } :`,
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
          {modalContent?.file_name || modalContent?.folder_name}
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
      <TouchableOpacity onPress={handleDownload}>
        <View style={styles.viewDirection}>
          <IconButton icon="download" />
          <View style={styles.downloadLabel}>
            <Text style={styles.ModalText}> Download</Text>
            {downloaded ? (
              <Button compact onPress={openFile}>
                Open
              </Button>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => versionDataHandler(modalContent.id)}>
        <View style={styles.viewDirection}>
          <IconButton icon="file-multiple" onPress={() => {}} />
          <Text style={styles.ModalText}>Manage version</Text>
        </View>
      </TouchableOpacity>
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
        onPress={() => activityDataHandler(fileType, modalContent.id)}>
        <View style={styles.viewDirection}>
          <IconButton icon="information" onPress={() => {}} />
          <Text style={styles.ModalText}>Activity</Text>
        </View>
      </TouchableOpacity>
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
