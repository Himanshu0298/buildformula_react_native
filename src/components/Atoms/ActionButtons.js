import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import PropTypes from 'prop-types';

function ActionButtons(props) {
  const {
    cancelLabel,
    submitLabel,
    cancelDisabled,
    submitDisabled,
    style,
    onCancel,
    onSubmit,
  } = props;

  return (
    <View style={[styles.actionContainer, style]}>
      <Button
        style={styles.actionButton}
        contentStyle={styles.buttonLabel}
        theme={{roundness: 15}}
        disabled={cancelDisabled}
        mode="outlined"
        onPress={onCancel}>
        {cancelLabel || 'Cancel'}
      </Button>
      <Button
        style={styles.actionButton}
        contentStyle={styles.buttonLabel}
        disabled={submitDisabled}
        mode="contained"
        theme={{roundness: 15}}
        onPress={onSubmit}>
        {submitLabel || 'Save'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 2,
    marginHorizontal: -5,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonLabel: {
    padding: 3,
  },
});

ActionButtons.defaultProps = {
  cancelLabel: 'Cancel',
  submitLabel: 'Save',
  submitDisabled: false,
};

ActionButtons.propTypes = {
  cancelLabel: PropTypes.string,
  submitLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitDisabled: PropTypes.bool,
};

export default ActionButtons;
