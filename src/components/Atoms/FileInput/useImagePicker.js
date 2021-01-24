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
  launchCamera(cameraOptions, (res) => {
    if (res.error) {
      console.log('ImagePicker Error: ', res.error);
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

const handleFilePicker = async ({type, onChoose}) => {
  try {
    const fileTypes = [DocumentPicker.types.images];
    if (type === 'file') {
      fileTypes.push(DocumentPicker.types.pdf);
    }
    const res = await DocumentPicker.pick({type: fileTypes});
    console.log('-----> res', res);

    if (res.type === 'image/jpeg' || res.type === 'image/png') {
      ImageResizer.createResizedImage(
        res.uri,
        MAX_WIDTH,
        MAX_HEIGHT,
        'JPEG',
        QUALITY * 100,
      )
        .then((resizedData) => {
          const data = {
            uri: resizedData.uri,
            type: res.type,
            name: resizedData.name,
          };

          console.log('-----> data', data);

          onChoose(data);
        })
        .catch((err) => {
          console.log('----->createResizedImage ', err);
          throw err;
        });
    } else {
      const destPath = `${RNFS.TemporaryDirectoryPath}/${'vshwan'}`;
      await RNFS.copyFile(res.uri, destPath);

      const stat = await RNFS.stat(destPath);

      const data = {
        uri: Platform.OS === 'ios' ? stat.path : `file:///${stat.path}`,
        type: res.type,
        name: res.name,
      };

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

    showActionSheetWithOptions(
      {options, cancelButtonIndex: 2},
      (buttonIndex) => {
        if (buttonIndex === 0) {
          handleFilePicker({type, onChoose});
        } else if (buttonIndex === 1) {
          handleCamera({type, onChoose});
        }
      },
    );
  };

  return {openImagePicker};
}

export default useImagePicker;
