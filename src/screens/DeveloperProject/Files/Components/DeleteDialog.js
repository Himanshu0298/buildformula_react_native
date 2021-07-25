import React from 'react';
import {View} from 'react-native';

import {Text, Dialog, Button, Portal} from 'react-native-paper';
import {theme} from 'styles/theme';

function DeleteDialog(props) {
  const {visible, toggleDialogue, dialogueContent, deleteFileHandler} = props;
  const fileType = dialogueContent.folder_name ? 'folder' : 'file';

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialogue} style={{top: -100}}>
        <Dialog.Content>
          <>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 16}}>
                Are you sure you want to delete
              </Text>
              <Text>
                {dialogueContent.folder_name || dialogueContent.file_name}
              </Text>
            </View>
          </>
        </Dialog.Content>
        <Dialog.Actions>
          <Button color={theme.colors.error} onPress={toggleDialogue}>
            Cancel
          </Button>
          <Button
            style={{minWidth: 80}}
            onPress={() => {
              deleteFileHandler(
                dialogueContent.id,
                fileType,
                dialogueContent.file_type,
              );
            }}>
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default DeleteDialog;
