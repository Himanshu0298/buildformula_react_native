import React from 'react';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import {Dialog, Button, Portal} from 'react-native-paper';
import {theme} from 'styles/theme';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';

const schema = Yup.object().shape({
  file_name: Yup.string().trim().required('Required'),
});

function UploadDialog(props) {
  const {
    visible,
    selectedUploadFile = {},
    toggleDialogue,
    handleFileUpload,
  } = props;

  const {t} = useTranslation();

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{file: selectedUploadFile}}
      enableReinitialize
      validationSchema={schema}
      onSubmit={async values => handleFileUpload(values)}>
      {({values, handleChange, errors, handleSubmit}) => (
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={toggleDialogue}
            style={styles.dialog}>
            <Dialog.Content>
              <RenderInput
                name="file_name"
                label={t('label_name')}
                containerStyles={styles.input}
                value={values.file_name}
                onChangeText={handleChange('file_name')}
                error={errors.file_name}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button color={theme.colors.error} onPress={toggleDialogue}>
                Cancel
              </Button>
              <Button style={styles.confirmButton} onPress={handleSubmit}>
                Confirm
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
    </Formik>
  );
}

export default UploadDialog;

const styles = StyleSheet.create({
  confirmButton: {
    minWidth: 80,
  },
  input: {
    marginVertical: 5,
  },
  dialog: {
    top: -100,
  },
});
