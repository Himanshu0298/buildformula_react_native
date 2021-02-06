import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Caption, Button, IconButton} from 'react-native-paper';
import {theme} from 'styles/theme';
import useImagePicker from '../../utils/useImagePicker';

const FileSelector = React.forwardRef((props, ref) => {
  const {
    error,
    value: selectedFile,
    containerStyles,
    onChoose,
    type = 'file',
    label,
  } = props;

  const {openImagePicker} = useImagePicker();

  const openPicker = () => openImagePicker({type, onChoose});

  return (
    <View style={[containerStyles, styles.container]}>
      {label ? <Text>{label}</Text> : null}
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

FileSelector.defaultProps = {
  returnKeyType: 'next',
  autoCapitalize: 'none',
  containerStyles: {},
};

FileSelector.prototype = {
  error: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
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

export default FileSelector;
