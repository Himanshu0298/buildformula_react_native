import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';

function ActionButtons(props) {
  const {cancelLabel, submitLabel, style, onCancel, onSubmit} = props;

  return (
    <View style={[styles.actionContainer, style]}>
      <Button
        style={styles.actionButton}
        contentStyle={styles.buttonLabel}
        theme={{roundness: 15}}
        onPress={onCancel}>
        {cancelLabel || 'Cancel'}
      </Button>
      <Button
        style={styles.actionButton}
        contentStyle={styles.buttonLabel}
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
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonLabel: {
    padding: 3,
  },
});

export default ActionButtons;
