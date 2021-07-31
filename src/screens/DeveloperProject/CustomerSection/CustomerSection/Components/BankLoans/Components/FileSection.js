import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  Button,
  IconButton,
  Subheading,
  Text,
  Caption,
  Portal,
  Dialog,
} from 'react-native-paper';
import {theme} from 'styles/theme';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import RenderInput from 'components/Atoms/RenderInput';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import useCustomerActions from 'redux/actions/customerActions';
import PdfIcon from 'assets/images/pdf_icon.png';
import useImagePicker from 'utils/useImagePicker';

const uploadSchema = Yup.object().shape({
  file_reason: Yup.string().trim().required('Required'),
  file_name: Yup.string().trim().required('Required'),
});

function RenderFile({file, remove, handleFileRemove}) {
  const {file_name, name, file_reason, id} = file;
  return (
    <View style={styles.fileContainer}>
      <Image source={PdfIcon} style={styles.pdfIcon} />
      <View style={styles.fileContentContainer}>
        <View style={{flex: 0.8}}>
          <Text numberOfLines={1}>{file_name || name}</Text>
          {file_reason ? (
            <Caption style={{lineHeight: 15}}>{file_reason}</Caption>
          ) : null}
        </View>
        {remove ? (
          <IconButton
            icon="close-circle"
            size={20}
            color={theme.colors.red}
            onPress={() => handleFileRemove(id)}
          />
        ) : null}
      </View>
    </View>
  );
}

function FileUploadModal(props) {
  const {open, selectedFile = {}, toggleDialog, handleFileUpload} = props;
  const {t} = useTranslation();

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{file: selectedFile}}
      enableReinitialize
      validationSchema={uploadSchema}
      onSubmit={async values => handleFileUpload(values)}>
      {({values, handleChange, errors, handleSubmit}) => (
        <Portal>
          <Dialog visible={open} onDismiss={toggleDialog} style={{top: -100}}>
            <Dialog.Content>
              <RenderFile {...{file: selectedFile, remove: false}} />

              <>
                <RenderInput
                  name="file_name"
                  label={t('label_name')}
                  containerStyles={styles.input}
                  value={values.file_name}
                  onChangeText={handleChange('file_name')}
                  error={errors.file_name}
                />
                <RenderInput
                  name="file_reason"
                  label={t('label_reason')}
                  containerStyles={styles.input}
                  value={values.file_reason}
                  onChangeText={handleChange('file_reason')}
                  error={errors.file_reason}
                />
              </>
            </Dialog.Content>
            <Dialog.Actions>
              <Button color={theme.colors.error} onPress={toggleDialog}>
                Cancel
              </Button>
              <Button style={{minWidth: 80}} onPress={handleSubmit}>
                Confirm
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
    </Formik>
  );
}

function FileSection(props) {
  const {route, toggleShareModal, modulePermissions, bankDetails} = props;
  const {project_id, unit} = route?.params || {};
  const {files} = bankDetails || {};

  const [uploadDialog, setUploadDialog] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState();

  const {openImagePicker} = useImagePicker();
  const {
    updateBankFiles,
    getBankDetails,
    removeBankFile,
  } = useCustomerActions();

  const toggleDialog = () => setUploadDialog(v => !v);

  const handleFileUpload = values => {
    toggleDialog();

    const formData = new FormData();

    formData.append('project_id', project_id);
    formData.append('unit_id', unit.unitId);
    formData.append('file', values.file);
    formData.append('file_name', values.file_name);
    formData.append('file_reason', values.file_reason);

    updateBankFiles(formData).then(() => {
      getBankDetails({project_id, unit_id: unit.unitId});
    });
  };

  const handleFileRemove = file_id => {
    removeBankFile({file_id, project_id, unit_id: unit.unitId}).then(() => {
      getBankDetails({project_id, unit_id: unit.unitId});
    });
  };

  const onChoose = v => {
    setSelectedFile(v);
    toggleDialog();
  };

  return (
    <View style={styles.fileHeading}>
      <FileUploadModal
        open={uploadDialog}
        selectedFile={selectedFile}
        toggleDialog={toggleDialog}
        handleFileUpload={handleFileUpload}
      />
      <View style={styles.headingContainer}>
        <Subheading style={{color: theme.colors.primary}}>
          BANK REQUIRED FILES
        </Subheading>
        {/* TODO: reactivate this */}
        {/* <IconButton
          icon="share-variant"
          size={18}
          onPress={toggleShareModal}
          color={theme.colors.primary}
        /> */}
      </View>

      <View style={styles.filesContainer}>
        {files?.map?.((file, index) => (
          <RenderFile
            key={index}
            {...{
              file,
              index,
              remove: modulePermissions.editor || modulePermissions.admin,
              handleFileRemove,
            }}
          />
        ))}
      </View>
      {modulePermissions.editor || modulePermissions.admin ? (
        <View style={styles.actionContainer}>
          <OpacityButton
            opacity={0.1}
            color={theme.colors.primary}
            style={styles.submitButton}
            onPress={() => openImagePicker({type: 'file', onChoose})}>
            <IconButton icon="upload" size={20} color={theme.colors.primary} />
            <Text style={styles.buttonText}>{'Upload'}</Text>
          </OpacityButton>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingVertical: 7,
  },
  actionContainer: {
    marginTop: 15,
  },
  submitButton: {
    width: '100%',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: theme.colors.primary,
  },
  fileHeading: {
    marginTop: 20,
    marginBottom: 10,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filesContainer: {},
  fileContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  pdfIcon: {
    height: 40,
    width: 40,
  },
  fileContentContainer: {
    flexGrow: 1,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default FileSection;
