import React, {useState} from 'react';
import {StyleSheet, View, Text, Platform, Keyboard, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {TextInput, Caption, Button, IconButton} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import DocumentPicker from 'react-native-document-picker';
import {secondaryTheme, theme} from '../../styles/theme';
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

const FileInput = React.forwardRef((props, ref) => {
  const {
    error,
    file: selectedFile,
    compress = true,
    containerStyles,
    onChoose,
    type = 'file',
    ...rest
  } = props;

  const {showActionSheetWithOptions} = useActionSheet();

  const [showAlert, setShowAlert] = useState(false);

  const toggleConfirm = () => {
    Keyboard.dismiss();
    const sheetOptions = [
      'Cancel',
      type === 'file' ? 'Choose File : image | pdf' : 'Choose Image',
      'Take Picture',
    ];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options: sheetOptions,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          handleFilePicker();
        } else if (buttonIndex === 2) {
          handleCamera();
        }
      },
    );
  };

  const handleCamera = () => {
    ImagePicker.launchCamera(cameraOptions, (res) => {
      if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        const data = {
          uri: Platform.OS === 'android' ? `file:///${res.path}` : res.path,
          type: res.type,
          name: res.fileName,
        };

        console.log('-----> data', data);
        onChoose(data);
      }
    });
  };

  const handleFilePicker = async () => {
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

  return (
    <View style={[containerStyles, styles.container]}>
      <View style={styles.inputContainer}>
        <TextInput
          {...rest}
          ref={ref}
          dense
          error={error}
          mode="outlined"
          style={styles.input}
          blurOnSubmit
          theme={{
            roundness: 10,
            colors: {
              text: '#000',
              underlineColor: 'transparent',
            },
          }}
        />
      </View>
      <View style={styles.fileContainer}>
        <View style={styles.captionContainer}>
          <IconButton
            icon={selectedFile ? 'checkbox-marked-circle-outline' : 'alert-box'}
            color={selectedFile ? theme.colors.success : theme.colors.primary}
            size={15}
          />
          <Caption theme={secondaryTheme}>
            {selectedFile ? 'File Selected!' : 'No file chosen'}
          </Caption>
        </View>
        <Button
          icon="paperclip"
          compact
          style={styles.button}
          uppercase={false}
          // onPress={type === 'file' ? handleFilePicker : handleImagePicker}>
          onPress={toggleConfirm}>
          Choose File
        </Button>
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorStyles}>{error}</Text>
        </View>
      )}
    </View>
  );
});

FileInput.defaultProps = {
  returnKeyType: 'next',
  autoCapitalize: 'none',
  containerStyles: {},
};

FileInput.prototype = {
  error: PropTypes.string,
  ...TextInput.PropTypes,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '100%',
  },
  //File
  fileContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
  },
  captionContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#E5EAFA',
  },
  //Errors
  errorContainer: {
    marginLeft: 25,
  },
  errorStyles: {
    color: 'red',
  },
});

export default FileInput;
