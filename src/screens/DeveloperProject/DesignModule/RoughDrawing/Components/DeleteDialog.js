import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Text, Dialog, Button, Portal} from 'react-native-paper';
import {theme} from 'styles/theme';

function DeleteDialog(props) {
  const {visible, toggleDialogue, dialogueContent, deleteFileHandler} = props;

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={toggleDialogue}
        style={styles.dialogContainer}>
        <Dialog.Content>
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>
              Are you sure you want to delete
            </Text>
            <Text>{dialogueContent.title || dialogueContent.file_name}</Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button color={theme.colors.error} onPress={toggleDialogue}>
            Cancel
          </Button>
          <Button
            style={styles.button}
            onPress={() => {
              deleteFileHandler(dialogueContent.id);
            }}>
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialogContainer: {
    top: -100,
  },
  alertContainer: {
    alignItems: 'center',
  },
  alertText: {
    fontSize: 16,
  },
  button: {
    minWidth: 80,
  },
});

export default DeleteDialog;
