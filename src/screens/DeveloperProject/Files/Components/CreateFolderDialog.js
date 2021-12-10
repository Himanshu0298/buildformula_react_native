import React from 'react';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import {StyleSheet, View} from 'react-native';
import {Text, Dialog, Button, Portal} from 'react-native-paper';
import {secondaryTheme} from 'styles/theme';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  folder_name: Yup.string().trim().required('Required'),
});

function CreateFolderDialogue(props) {
  const {visible, toggleDialogue, createFolderHandler} = props;
  const folderNameRef = React.useRef();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialogue} style={{top: -100}}>
        <View style={styles.dialogTitleContainer}>
          <Text style={{color: '#000'}}>Create New Folder</Text>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{folderName: ''}}
          validationSchema={schema}
          onSubmit={async values => {
            createFolderHandler(values.folder_name);
          }}>
          {({values, errors, handleChange, handleBlur, handleSubmit}) => {
            return (
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

export default CreateFolderDialogue;
