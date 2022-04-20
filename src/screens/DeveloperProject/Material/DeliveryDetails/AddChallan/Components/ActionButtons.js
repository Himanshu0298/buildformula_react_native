import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import PropTypes from 'prop-types';

function ActionButtons(props) {
  const {cancelLabel, onPress, submitDisabled, style, onCancel, onSubmit} =
    props;

  return (
    <View style={[styles.actionContainer, style]}>
      <Button
        style={styles.actionButton}
        contentStyle={styles.buttonLabel}
        theme={{roundness: 15}}
        onPress={onCancel}>
        Previous
      </Button>
      <Button
        style={styles.actionButton}
        contentStyle={styles.buttonLabel}
        disabled={submitDisabled}
        mode="contained"
        theme={{roundness: 10}}
        onPress={onPress}>
        Next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  actionButton: {
    flex: 1,
  },
  buttonLabel: {
    padding: 3,
  },
});

// ActionButtons.defaultProps = {
//   cancelLabel: 'Cancel',
//   submitLabel: 'Save',
//   submitDisabled: false,
// };

// ActionButtons.propTypes = {
//   cancelLabel: PropTypes.string,
//   submitLabel: PropTypes.string,
//   onCancel: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired,
//   submitDisabled: PropTypes.bool,
// };

export default ActionButtons;
