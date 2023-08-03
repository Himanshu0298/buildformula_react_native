import React from 'react';
import {useFormik} from 'formik';
import {StyleSheet, View} from 'react-native';
import {Text, Dialog, Button, Portal} from 'react-native-paper';
import * as Yup from 'yup';
import {secondaryTheme} from 'styles/theme';
import RenderInput from 'components/Atoms/RenderInput';

const schema = Yup.object().shape({
  folder_name: Yup.string().trim().required('Required'),
});

function CreateFolderDialogue(props) {
  const {visible, toggleDialogue, createFolderHandler} = props;
  const folderNameRef = React.useRef();

  const {values, errors, handleChange, handleSubmit, handleBlur} = useFormik({
    initialValues: {folder_name: ''},
    enableReinitialize: true,
    validateOnBlur: false,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: v => createFolderHandler(values.folder_name, v.file),
  });

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialogue} style={{top: -100}}>
        <View style={styles.dialogTitleContainer}>
          <Text style={{color: '#000'}}>Create New Folder</Text>
        </View>

        <View style={styles.dialogContentContainer}>
          <RenderInput
            name="folder_name"
            label="Folder name"
            containerStyles={styles.input}
            value={values.folder_name}
            onChangeText={handleChange('folder_name')}
            onBlur={handleBlur('folder_name')}
            ref={folderNameRef}
            onSubmitEditing={handleSubmit}
            error={errors.folder_name}
          />

          <View style={styles.dialogActionContainer}>
            <Button
              style={{width: '40%', marginHorizontal: 5}}
              contentStyle={{padding: 2}}
              theme={{roundness: 15}}
              mode="contained"
              onPress={toggleDialogue}>
              <Text theme={secondaryTheme}>cancel</Text>
            </Button>
            <Button
              style={{width: '40%', marginHorizontal: 5}}
              mode="contained"
              contentStyle={{padding: 1}}
              theme={{roundness: 15}}
              onPress={handleSubmit}>
              <Text theme={secondaryTheme}>save</Text>
            </Button>
          </View>
        </View>
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

export default CreateFolderDialogue;
