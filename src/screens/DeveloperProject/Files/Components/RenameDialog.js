import React from 'react';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import {StyleSheet, View} from 'react-native';
import {Text, Dialog, Button, Portal} from 'react-native-paper';
import {secondaryTheme} from 'styles/theme';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  rename_file: Yup.string().trim().required('Required'),
});

function RenameDialogue(props) {
  const {visible, toggleDialogue, dialogueContent, renameFolderHandler} = props;
  const fileType = dialogueContent.folder_name ? 'folder' : 'file';
  const renaNameRef = React.useRef();
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialogue} style={{top: -100}}>
        <View style={styles.dialogTitleContainer}>
          <Text style={{color: '#000'}}>
            {dialogueContent?.file_name || dialogueContent?.folder_name}
          </Text>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{rename_file: ''}}
          validationSchema={schema}
          onSubmit={async values => {
            renameFolderHandler(
              values.rename_file,
              dialogueContent?.id,
              fileType,
            );
          }}>
          {({values, errors, handleChange, handleBlur, handleSubmit}) => {
            return (
              <View style={styles.dialogContentContainer}>
                <RenderInput
                  name="rename_file"
                  label={'file name'}
                  containerStyles={styles.input}
                  value={values.rename_file}
                  onChangeText={handleChange('rename_file')}
                  onBlur={handleBlur('rename_file')}
                  ref={renaNameRef}
                  onSubmitEditing={handleSubmit}
                  error={errors.rename_file}
                />

                <View style={styles.dialogActionContainer}>
                  <Button
                    style={{width: '40%', marginHorizontal: 5}}
                    contentStyle={{padding: 2}}
                    theme={{roundness: 15}}
                    mode="contained"
                    onPress={toggleDialogue}>
                    <Text theme={secondaryTheme}>{'cancel'}</Text>
                  </Button>
                  <Button
                    style={{width: '40%', marginHorizontal: 5}}
                    mode="contained"
                    contentStyle={{padding: 1}}
                    theme={{roundness: 15}}
                    onPress={handleSubmit}>
                    <Text theme={secondaryTheme}>{'save'}</Text>
                  </Button>
                </View>
              </View>
            );
          }}
        </Formik>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialogTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  dialogContentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dialogActionContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {marginVertical: 5},
});

export default RenameDialogue;
