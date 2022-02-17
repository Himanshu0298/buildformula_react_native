import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {IconButton, Subheading, Text} from 'react-native-paper';
import FileIcon from 'assets/images/file_icon.png';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import NoResult from 'components/Atoms/NoResult';
import {downloadFile, getDownloadUrl} from 'utils/download';
import {useSnackbar} from 'components/Atoms/Snackbar';
import FileViewer from 'react-native-file-viewer';

function RenderFile(props) {
  const {
    file,
    toggleMenu,
    setModalContentType,
    fileIndex,
    setModalContent,
    onPressFile,
  } = props;

  const {file_name, created} = file;

  return (
    <View style={styles.recentFiles}>
      <TouchableOpacity
        style={styles.sectionContainer}
        onPress={() => onPressFile(file)}>
        <Image source={FileIcon} style={styles.fileIcon} />
        <View>
          <Text style={(styles.verticalFlex, styles.text)} numberOfLines={2}>
            {file_name}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.date}>
            {dayjs(created).format('DD MMM YYYY')}
          </Text>
        </View>
        <View>
          <IconButton
            icon="dots-vertical"
            onPress={() => {
              toggleMenu(fileIndex);
              setModalContentType('menu');
              setModalContent(file);
            }}
          />
        </View>
      </View>
    </View>
  );
}

function FileSection(props) {
  const {route, toggleMenu, ...rest} = props;
  const {index_of: folderDepth = 0} = route?.params || {};

  const snackbar = useSnackbar();

  const {files} = useSelector(s => s.files);
  const filteredFiles = files?.[folderDepth] || [];

  const onPressFile = async file => {
    snackbar.showMessage({
      message: 'Preparing your download...',
      variant: 'warning',
      autoHideDuration: 10000,
    });
    const fileUrl = getDownloadUrl(file);
    const {dir} = await downloadFile(file, fileUrl);

    snackbar.showMessage({
      message: 'File Downloaded!',
      variant: 'success',
      action: {label: 'Open', onPress: () => FileViewer.open(dir)},
    });
  };

  return (
    <View style={styles.container}>
      <Subheading style={styles.Subheading}>Files</Subheading>
      {filteredFiles?.length ? (
        filteredFiles?.map((file, index) => (
          <RenderFile
            {...rest}
            file={file}
            key={index?.toString()}
            toggleMenu={toggleMenu}
            fileIndex={filteredFiles?.indexOf(file)}
            onPressFile={onPressFile}
          />
        ))
      ) : (
        <NoResult title="No Files Found" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  Subheading: {
    fontSize: 20,
    color: '#080707',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  text: {
    color: '#080707',
    paddingHorizontal: 10,
    fontSize: 14,
    alignItems: 'center',
    maxWidth: 170,
  },
  date: {
    color: '#080707',
  },
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  recentFiles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalFlex: {
    flexDirection: 'column',
  },
});

export default FileSection;
