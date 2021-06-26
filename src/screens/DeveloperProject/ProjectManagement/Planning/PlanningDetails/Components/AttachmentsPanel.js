import CustomDialog from 'components/Atoms/CustomDialog';
import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Caption, IconButton, Text, withTheme} from 'react-native-paper';
import fileIcon from 'assets/images/file_icon.png';

function AddAttachmentDialog(props) {
  const {theme, handleSubmit} = props;

  const [files, setFiles] = useState([{name: 'filename-apartment.pdf'}]);

  const submitForm = () => {
    handleSubmit(files);
  };

  return (
    <CustomDialog {...props} title="Attachments" submitForm={submitForm}>
      <View style={styles.contentContainer}>
        <ScrollView>
          {files.map((file, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.fileContainer,
                  {borderColor: theme.colors.primary},
                ]}>
                <View style={styles.row}>
                  <Image source={fileIcon} style={styles.fileIcon} />
                  <View style={styles.fileBody}>
                    <Text style={{marginLeft: 10}} numberOfLines={1}>
                      {file.name}
                    </Text>
                    <View style={styles.row}>
                      <IconButton
                        icon="file-multiple"
                        color="#5E6D7C"
                        size={14}
                      />
                      <Caption numberOfLines={1}>
                        V1 Uploaded on 4:00 PM 25 Aug 2020
                      </Caption>
                    </View>
                  </View>
                </View>
                <View style={styles.actionRow}>
                  <Button compact uppercase={false} icon="file-multiple">
                    New Version
                  </Button>
                  <Button compact uppercase={false} icon="message-reply-text">
                    Comment
                  </Button>
                  <Button
                    color={theme.colors.red}
                    compact
                    uppercase={false}
                    icon="delete">
                    Delete
                  </Button>
                </View>
              </View>
            );
          })}
          <View style={styles.addButtonContainer}>
            <Button style={{width: '50%'}} mode="outlined">
              Add File
            </Button>
          </View>
        </ScrollView>
      </View>
    </CustomDialog>
  );
}

function AttachmentsPanel(props) {
  const [dialog, setDialog] = useState(false);

  const toggleDialog = () => setDialog(v => !v);

  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      {dialog ? (
        <AddAttachmentDialog
          {...props}
          open={dialog}
          handleClose={toggleDialog}
          handleSubmit={handleSubmit}
        />
      ) : null}
      <Text>Attachments</Text>
      <IconButton
        size={20}
        style={styles.plusButton}
        icon="plus"
        onPress={toggleDialog}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F4F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  plusButton: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 15,
    flexGrow: 1,
  },
  addButtonContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  fileContainer: {
    borderWidth: 0.3,
    marginVertical: 5,
    borderRadius: 5,
    padding: 10,
  },
  fileIcon: {
    height: 45,
    width: 35,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileBody: {
    justifyContent: 'space-between',
    flex: 1,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});

export default withTheme(AttachmentsPanel);
