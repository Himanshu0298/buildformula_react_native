import React from 'react';
import {Formik} from 'formik';
import {StyleSheet, View} from 'react-native';
import {Text, Dialog, Button, Portal} from 'react-native-paper';
import * as Yup from 'yup';
import {secondaryTheme} from 'styles/theme';
import RenderInput from 'components/Atoms/RenderInput';

const schema = Yup.object().shape({
  name: Yup.string().trim().required('Required'),
});

function RenameDialogue(props) {
  const {visible, toggleDialogue, dialogueContent, renameFolderHandler} = props;
  const {file_name, folder_name, title, folder_title} = dialogueContent || {};

  const renaNameRef = React.useRef();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialogue} style={{top: -100}}>
        <View style={styles.dialogTitleContainer}>
          <Text style={{color: '#000'}}>
            {folder_title || file_name || folder_name}
          </Text>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{
            name: folder_title || file_name || folder_name || title,
          }}
          validationSchema={schema}
          onSubmit={async values => {
            renameFolderHandler(values.name, dialogueContent?.id);
          }}>
          {({values, errors, handleChange, handleBlur, handleSubmit}) => {
            return (
              <View style={styles.dialogContentContainer}>
                <RenderInput
                  name="name"
                  label="file name"
                  containerStyles={styles.input}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  ref={renaNameRef}
                  onSubmitEditing={handleSubmit}
                  error={errors.name}
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
  input: {marginVertical: 5, overflow: 'hidden'},
});

export default RenameDialogue;
