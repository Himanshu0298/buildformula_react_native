import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {FAB, IconButton, Subheading, Text} from 'react-native-paper';
import FileIcon from 'assets/images/file_icon.png';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import NoResult from 'components/Atoms/NoResult';
import {downloadFile, getDownloadUrl, getFileExtension} from 'utils/download';
import {useSnackbar} from 'components/Atoms/Snackbar';
import FileViewer from 'react-native-file-viewer';
import useDesignModuleActions from 'redux/actions/designModuleActions';
import {theme} from 'styles/theme';
import {useImagePicker} from 'hooks';

function RenderFile(props) {
  const {
    file,
    toggleMenu,
    setModalContentType,
    fileIndex,
    setModalContent,
    onPressFile,
  } = props;

  const {title, created} = file;

  return (
    <View style={styles.recentFiles}>
      <TouchableOpacity
        style={styles.sectionContainer}
        onPress={() => onPressFile(file)}>
        <Image source={FileIcon} style={styles.fileIcon} />
        <View>
          <Text style={(styles.verticalFlex, styles.text)} numberOfLines={2}>
            {title}
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

function RDFileSection(props) {
  const {route, toggleMenu, ...rest} = props;
  const {folderId} = route?.params || {};

  const {getRDFiles, uploadRDFile} = useDesignModuleActions();
  const {openImagePicker} = useImagePicker();

  const snackbar = useSnackbar();
  const {selectedProject} = useSelector(s => s.project);
  const {files} = useSelector(s => s.designModule);

  const project_id = selectedProject.id;
  const {data} = files;

  const [DialogType, setDialogType] = React.useState();

  const toggleDialog = v => setDialogType(v);

  React.useEffect(() => {
    loadFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadFiles = () => {
    getRDFiles({project_id, folder_id: folderId});
  };

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
      action: {label: 'Open', onPress: () => FileViewer.open(`file://${dir}`)},
    });
  };

  const onChoose = v => {
    handleFileUpload(v);
  };

  const handleFileUpload = async file => {
    const {name} = file;
    const extension = getFileExtension(file.name);
    file.name = `${name}.${extension}`;

    const formData = new FormData();

    formData.append('folder_id', folderId);
    formData.append('myfile[]', file);
    formData.append('project_id', project_id);

    await uploadRDFile(formData);
    toggleDialog();
    snackbar.showMessage({
      message: 'File Downloaded!',
      variant: 'success',
    });
    loadFiles();
  };

  return (
    <View style={styles.container}>
      <Subheading style={styles.Subheading}>Files</Subheading>
      {data?.length ? (
        data?.map((file, i) => (
          <RenderFile
            {...rest}
            file={file}
            key={i?.toString()}
            toggleMenu={toggleMenu}
            fileIndex={data?.indexOf(file)}
            onPressFile={onPressFile}
          />
        ))
      ) : (
        <NoResult title="No Files Found" />
      )}

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => openImagePicker({type: 'file', onChoose})}
        medium
      />
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
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 30,
    zIndex: 2,
    backgroundColor: theme.colors.primary,
  },
});

export default RDFileSection;
