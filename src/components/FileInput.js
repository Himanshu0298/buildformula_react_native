import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {
  TextInput,
  withTheme,
  Caption,
  Button,
  IconButton,
} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Choose File',
};

const MAX_LIMIT = 20;

const FileInput = React.forwardRef((props, ref) => {
  const {error, file, containerStyles, theme, onChoose, ...rest} = props;

  const handleImagePicker = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        onChoose({
          uri: response.uri,
          type: response.type,
          name: response.fileName,
          data: response.data,
        });
      }
    });
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
          <IconButton icon="alert-box" color={theme.colors.primary} size={15} />
          <Caption
            theme={{
              colors: {
                text: '#000',
              },
            }}>
            {file
              ? file.name.length > MAX_LIMIT
                ? file.name.substring(0, MAX_LIMIT - 3) + '...'
                : file.name
              : 'No file chosen'}
          </Caption>
        </View>
        <Button
          icon="paperclip"
          compact
          style={styles.button}
          uppercase={false}
          onPress={() => handleImagePicker()}>
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

export default withTheme(FileInput);
