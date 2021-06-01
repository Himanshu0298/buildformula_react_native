import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {IconButton, Subheading, Text} from 'react-native-paper';
import FolderIcon from 'assets/images/folder_icon.png';

function MenuDialog(props) {
  const {
    setModalContentType,
    modalContent,
    toggleCreateDialogue,
    toggleMenu,
    versionDataHandler,
  } = props;
  return (
    <View>
      <View style={styles.viewDirection}>
        <Image source={FolderIcon} style={styles.PdfIcon} />
        <Subheading style={{marginHorizontal: 10, marginVertical: 5}}>
          {modalContent?.file_name || modalContent?.folder_name}
        </Subheading>
      </View>

      <TouchableOpacity
        onPress={() => {
          console.log('--->in share');
        }}>
        <View style={styles.viewDirection}>
          <IconButton icon="account-plus" />
          <View>
            <Text style={styles.ModalText}>Share</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <View style={styles.viewDirection}>
          <IconButton icon="share-variant" />
          <Text style={styles.ModalText}>Share Copy</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.viewDirection}>
          <IconButton icon="download" />
          <Text style={styles.ModalText}> Download</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          versionDataHandler(modalContent.id);
          setModalContentType('version');
        }}>
        <View style={styles.viewDirection}>
          <IconButton icon="file-multiple" onPress={() => {}} />
          <Text style={styles.ModalText}>Manage version</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          toggleCreateDialogue('renameFile');
          toggleMenu();
        }}>
        <View style={styles.viewDirection}>
          <IconButton icon="pencil" onPress={() => {}} />
          <Text style={styles.ModalText}>Rename</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('inPrint');
        }}>
        <View style={styles.viewDirection}>
          <IconButton icon="printer" />
          <Text style={styles.ModalText}>Print</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setModalContentType('activity');
        }}>
        <View style={styles.viewDirection}>
          <IconButton icon="information" onPress={() => {}} />
          <Text style={styles.ModalText}>Activity</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          toggleCreateDialogue('deleteFileFolder');
          toggleMenu();
        }}>
        <View style={styles.viewDirection}>
          <IconButton icon="delete" onPress={() => {}} />
          <Text style={styles.ModalText}>Delete</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  PdfIcon: {
    width: 38,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  viewDirection: {
    flexDirection: 'row',
  },
  ModalText: {
    alignItems: 'center',
    paddingVertical: 15,
  },
});

export default MenuDialog;
