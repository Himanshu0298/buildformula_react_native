import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Button, IconButton, Subheading, Text} from 'react-native-paper';
import FolderIcon from 'assets/images/folder_icon.png';
import RNBackgroundDownloader from 'react-native-background-downloader';
import RNFS, {DownloadDirectoryPath} from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

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

function MenuDialog(props) {
  const {
    setModalContentType,
    modalContent,
    toggleDialog,
    toggleMenu,
    versionDataHandler,
    toggleShareDialog,
  } = props;

  const [downloaded, setDownloaded] = useState(false);

  async function handleDownload() {
    const {id, file_name, file_url, file_type} = modalContent;

    let destination = `${DownloadDirectoryPath}/${file_name}`;

    destination = await checkDuplicate(destination, 0);

    const finalDestination = `${destination}.${file_type}`;

    const task = RNBackgroundDownloader.download({
      id: `${file_name}_${id}`,
      url: file_url,
      destination: finalDestination,
    })
      .begin(expectedBytes => {
        console.log(`Going to download ${expectedBytes} bytes!`);
      })
      .progress(percent => {
        console.log(`Downloaded: ${percent * 100}%`);
      })
      .done(() => {
        setDownloaded(finalDestination);
        console.log('Download is done!');
      })
      .error(error => {
        console.log('Download canceled due to error: ', error);
      });
  }

  const openFile = () => FileViewer.open(downloaded);

  return (
    <View>
      <View style={styles.viewDirection}>
        <Image source={FolderIcon} style={styles.PdfIcon} />
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

      <TouchableOpacity onPress={() => {}}>
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
      <TouchableOpacity
        onPress={() => {
          versionDataHandler(modalContent.id);
          setModalContentType('version');
        }}>
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
        onPress={() => {
          setModalContentType('activity');
        }}>
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
