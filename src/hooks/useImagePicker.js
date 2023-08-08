import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Platform, Keyboard} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import DocumentPicker from 'react-native-document-picker';
import {useActionSheet} from '@expo/react-native-action-sheet';
import RNFS from 'react-native-fs';

const MAX_WIDTH = 1050;
const MAX_HEIGHT = 1400;
const QUALITY = 0.9;

const CAMERA_OPTIONS = {
  title: 'Choose File',
  mediaType: 'photo',
  cameraType: 'back',
  quality: QUALITY,
  maxWidth: MAX_WIDTH,
  maxHeight: MAX_HEIGHT,
  allowsEditing: true,
};

const processImage = res => {
  const {assets} = res;
  if (!assets?.length) {
    console.log('ImagePicker Error: ', res);
    return {};
  }
  const data = {
    uri: assets[0].uri,
    type: assets[0].type,
    name: assets[0].fileName,
  };
  return data;
};

const handleImagePicker = ({type, onChoose}) => {
  launchImageLibrary(CAMERA_OPTIONS, res => {
    const data = processImage(res);
    console.log('-----> data', data);
    onChoose(data);
  });
};

const handleCamera = ({type, onChoose}) => {
  launchCamera(CAMERA_OPTIONS, res => {
    const data = processImage(res);
    console.log('-----> data', data);
    onChoose(data);
  });
};

async function processFiles(res) {
  try {
    const {type, uri, name} = res;

    if (type === 'image/jpeg' || type === 'image/png') {
      const resizedData = await ImageResizer.createResizedImage(
        uri,
        MAX_WIDTH,
        MAX_HEIGHT,
        'JPEG',
        QUALITY * 100,
      );

      const data = {uri: resizedData.uri, type, name};

      return data;
    }
    const DEST_PATH = `${RNFS.TemporaryDirectoryPath}${name}`;
    const isExists = await RNFS.exists(DEST_PATH);

    if (isExists) {
      await RNFS.unlink(DEST_PATH);
    }

    await RNFS.copyFile(res.uri, DEST_PATH);

    const stat = await RNFS.stat(DEST_PATH);

    const processedUri = Platform.OS === 'ios' ? res.uri : `file:///${res.uri}`;

    const data = {uri: processedUri, type, name};
    console.log('----->data ', data);
    return data;
  } catch (error) {
    console.log('-----> error', error);
    throw error;
  }
}

const handleFilePicker = async ({type, multiple, onChoose}) => {
  try {
    const fileTypes = [DocumentPicker.types.images];
    if (type === 'file') {
      fileTypes.push(DocumentPicker.types.pdf);
      fileTypes.push(DocumentPicker.types.allFiles);
    }

    let data;
    if (multiple) {
      const res = await DocumentPicker.pickMultiple({type: fileTypes});
      data = await Promise.all(res.map(async item => processFiles(item)));
    } else {
      const res = await DocumentPicker.pick({type: fileTypes});
      console.log('----->res ', res);
      data = await processFiles(res[0]);
    }

    onChoose(data);
    console.log('===========> data', data);
  } catch (err) {
    console.log('----->err ', err);
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
};

function useImagePicker() {
  const {showActionSheetWithOptions} = useActionSheet();

  const openImagePicker = ({type, onChoose}) => {
    Keyboard.dismiss();

    const options = ['Choose Image', 'Take Picture', 'Cancel'];

    if (type === 'file') {
      options.splice(2, 0, 'Choose File');
    }

    showActionSheetWithOptions(
      {options, cancelButtonIndex: options.length - 1},
      buttonIndex => {
        switch (options[buttonIndex]) {
          case 'Choose File':
            handleFilePicker({type, onChoose});
            break;
          case 'Take Picture':
            handleCamera({type, onChoose});
            break;
          case 'Choose Image':
            handleImagePicker({type, onChoose});
            break;
          default:
        }
      },
    );
  };

  return {
    openImagePicker,
    openFilePicker: handleFilePicker,
    openCamera: handleCamera,
  };
}

export default useImagePicker;
