import {useSnackbar} from 'components/Atoms/Snackbar';
import React from 'react';
import {View} from 'react-native';
import {downloadFile, getDownloadUrl, getFileExtension} from 'utils/download';
import FileViewer from 'react-native-file-viewer';
import {useImagePicker} from 'hooks';
import useDesignModuleActions from 'redux/actions/designModuleActions';
import {useSelector} from 'react-redux';
import FDFiles from '../Components/FDFiles';

function FDTowerList(props) {
  const {navigation, route} = props;

  const {folder_id} = route?.params || {};
  const snackbar = useSnackbar();
  const {openImagePicker} = useImagePicker();

  const {getFDTowers} = useDesignModuleActions();

  const {plotList} = useSelector(s => s.designModule);
  const {selectedProject} = useSelector(s => s.project);
  const project_id = selectedProject.id;

  console.log('===========> plotList', plotList);

  const [menuId, setMenuId] = React.useState();
  const [modelContentType, setModalContentType] = React.useState('menu');
  const [modalContent, setModalContent] = React.useState({});
  const [shareDialog, setShareDialog] = React.useState(false);
  const [DialogType, setDialogType] = React.useState();

  const toggleMenu = folderIndex => setMenuId(folderIndex);
  const toggleDialog = v => setDialogType(v);
  const toggleShareDialog = () => setShareDialog(v => !v);

  React.useEffect(() => {
    getFDTowers({project_id, folder_id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renameFileHandler = async (name, id, type) => {
    await console.log('===========> ', renameFileHandler);
    toggleDialog();
  };

  const deleteFileHandler = async (id, type) => {
    await toggleDialog();
    snackbar.showMessage({
      message: 'File Deleted!',
      variant: 'success',
    });
  };

  const versionDataHandler = async (id, type) => {
    setModalContentType('version');
  };

  const activityDataHandler = (action_type, id) => {
    setModalContentType('activity');
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
    console.log('===========> ');
  };

  const handleFileUpload = async file => {
    const {name} = file;
    const extension = getFileExtension(file.name);
    file.name = `${name}.${extension}`;

    const formData = new FormData();

    console.log('===========> ');
  };

  const handleNewVersionUpload = file_id => {
    openImagePicker({
      type: 'file',
      onChoose: async v => {
        const formData = new FormData();

        console.log('===========> ');
      },
    });
  };

  const handleDeleteVersion = async (version, type) => {
    setModalContentType('version');
    console.log('===========> ');
  };

  const onSelectStructure = () => {
    navigation.navigate('FDTowerPreview');
  };
  return (
    <View>
      <FDFiles
        data={plotList}
        menuId={menuId}
        modelContentType={modelContentType}
        modalContent={modalContent}
        // versionData={versionData}
        DialogType={DialogType}
        toggleDialog={toggleDialog}
        onSelectStructure={onSelectStructure}
        toggleMenu={toggleMenu}
        setModalContentType={setModalContentType}
        setModalContent={setModalContent}
        onPressFile={onPressFile}
        versionDataHandler={versionDataHandler}
        activityDataHandler={activityDataHandler}
        toggleShareDialog={toggleShareDialog}
        handleNewVersionUpload={handleNewVersionUpload}
        handleDeleteVersion={handleDeleteVersion}
        renameFileHandler={renameFileHandler}
        deleteFileHandler={deleteFileHandler}
        onChoose={onChoose}
      />
    </View>
  );
}

export default FDTowerList;
