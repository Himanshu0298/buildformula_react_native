import {launchCamera} from 'react-native-image-picker';
import {Platform, Keyboard} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import DocumentPicker from 'react-native-document-picker';
import {useActionSheet} from '@expo/react-native-action-sheet';
import RNFS from 'react-native-fs';

const MAX_WIDTH = 1050;
const MAX_HEIGHT = 1400;
const QUALITY = 0.9;

const cameraOptions = {
  title: 'Choose File',
  mediaType: 'photo',
  cameraType: 'back',
  quality: QUALITY,
  maxWidth: MAX_WIDTH,
  maxHeight: MAX_HEIGHT,
  allowsEditing: true,
};

const handleCamera = ({type, onChoose}) => {
  launchCamera(cameraOptions, res => {
    if (!res.uri || res.error) {
      console.log('ImagePicker Error: ', res);
    } else {
      const data = {
        // uri: Platform.OS === 'android' ? `file:///${path}` : path,
        uri: res.uri,
        type: res.type,
        name: res.fileName,
      };

      console.log('-----> data', data);
      onChoose(data);
    }
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
    } else {
      const DEST_PATH = `${RNFS.TemporaryDirectoryPath}/${name}`;
      await RNFS.copyFile(res.uri, DEST_PATH);

      const stat = await RNFS.stat(DEST_PATH);

      const data = {
        uri: Platform.OS === 'ios' ? stat.path : `file:///${stat.path}`,
        type,
        name,
      };

      return data;
    }
  } catch (error) {
    console.log('-----> error', error);
  }
}

const handleFilePicker = async ({type, multiple, onChoose}) => {
  try {
    const fileTypes = [DocumentPicker.types.images];
    if (type === 'file') {
      fileTypes.push(DocumentPicker.types.pdf);
    }

    if (multiple) {
      const res = await DocumentPicker.pickMultiple({type: fileTypes});
      console.log('-----> res', res);
      const data = await Promise.all(
        res.map(async item => await processFiles(item)),
      );

      console.log('-----> data', data);
      onChoose(data);
    } else {
      const res = await DocumentPicker.pick({type: fileTypes});
      const data = await processFiles(res);

      console.log('-----> data', data);
      onChoose(data);
    }
  } catch (err) {
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

    const options = [
      type === 'file' ? 'Choose File : image | pdf' : 'Choose Image',
      'Take Picture',
      'Cancel',
    ];

    showActionSheetWithOptions({options, cancelButtonIndex: 2}, buttonIndex => {
      if (buttonIndex === 0) {
        handleFilePicker({type, onChoose});
      } else if (buttonIndex === 1) {
        handleCamera({type, onChoose});
      }
    });
  };

  return {openImagePicker, openFilePicker: handleFilePicker};
}

export default useImagePicker;
