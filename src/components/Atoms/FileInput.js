import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {TextInput, Caption, Button, IconButton} from 'react-native-paper';
import {theme} from 'styles/theme';
import useImagePicker from '../../utils/useImagePicker';

const FileInput = React.forwardRef((props, ref) => {
  const {
    error,
    file: selectedFile,
    containerStyles,
    onChoose,
    type = 'file',
    ...rest
  } = props;

  const {openImagePicker} = useImagePicker();

  const openPicker = () => {
    openImagePicker({type, onChoose});
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
          <Caption>
            {selectedFile ? 'File Selected!' : 'No file chosen'}
          </Caption>
        </View>
        <Button
          icon="paperclip"
          compact
          style={styles.button}
          uppercase={false}
          // onPress={type === 'file' ? handleFilePicker : handleImagePicker}>
          onPress={openPicker}>
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
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '100%',
  },
  // File
  fileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#E5EAFA',
  },
  // Errors
  errorContainer: {
    marginLeft: 25,
  },
  errorStyles: {
    color: 'red',
  },
});

export default FileInput;
