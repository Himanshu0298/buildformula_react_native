import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  Button,
  IconButton,
  Subheading,
  TextInput,
  withTheme,
  Text,
  Caption,
  Portal,
  Dialog,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {secondaryTheme, theme} from 'styles/theme';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import RenderInput from 'components/Atoms/RenderInput';
import BaseText from 'components/Atoms/BaseText';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useCustomerActions from 'redux/actions/customerActions';
import _ from 'lodash';
import PdfIcon from 'assets/images/pdf_icon.png';
import useImagePicker from 'components/Atoms/FileInput/useImagePicker';

const schema = Yup.object().shape({
  bank_person: Yup.string().trim().required('Required'),
  phone: Yup.string().trim().required('Required'),
  email: Yup.string().email('Invalid').trim().required('Required'),
  bank_name: Yup.string().trim().required('Required'),
  bank_branch: Yup.string().trim().required('Required'),
  bank_address: Yup.string().trim().required('Required'),
});

const uploadSchema = Yup.object().shape({
  file_reason: Yup.string().trim().required('Required'),
  file_name: Yup.string().trim().required('Required'),
});

function RenderForm({formikProps}) {
  const {handleChange, handleSubmit, values, handleBlur, errors} = formikProps;

  const {t} = useTranslation();

  const bankPersonRef = React.useRef();
  const phoneRef = React.useRef();
  const emailRef = React.useRef();
  const bankNameRef = React.useRef();
  const bankBranchRef = React.useRef();
  const addressRef = React.useRef();

  return (
    <>
      <View style={styles.inputsContainer}>
        <RenderInput
          name="bank_person"
          label={t('label_bank_person')}
          ref={bankPersonRef}
          containerStyles={styles.input}
          value={values.bank_person}
          onChangeText={handleChange('bank_person')}
          onBlur={handleBlur('bank_person')}
          onSubmitEditing={() => phoneRef?.current?.focus()}
          error={errors.bank_person}
        />
        <RenderInput
          name="phone"
          label={t('label_phone')}
          ref={phoneRef}
          keyboardType="number-pad"
          maxLength={10}
          containerStyles={styles.input}
          value={values.phone}
          onChangeText={handleChange('phone')}
          onSubmitEditing={() => emailRef?.current?.focus()}
          onBlur={handleBlur('phone')}
          error={errors.phone}
          left={<TextInput.Affix text="+91" theme={secondaryTheme} />}
        />
        <RenderInput
          name="email"
          label={t('label_email')}
          ref={emailRef}
          containerStyles={styles.input}
          value={values.email}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          onSubmitEditing={() => bankNameRef?.current?.focus()}
          error={errors.email}
        />
        <RenderInput
          name="bank_name"
          label={t('label_bank_name')}
          ref={bankNameRef}
          containerStyles={styles.input}
          value={values.bank_name}
          onChangeText={handleChange('bank_name')}
          onBlur={handleBlur('bank_name')}
          onSubmitEditing={() => bankBranchRef?.current?.focus()}
          error={errors.bank_name}
        />
        <RenderInput
          name="bank_branch"
          label={t('label_branch')}
          ref={bankBranchRef}
          containerStyles={styles.input}
          value={values.bank_branch}
          onChangeText={handleChange('bank_branch')}
          onBlur={handleBlur('bank_branch')}
          onSubmitEditing={() => addressRef?.current?.focus()}
          error={errors.bank_branch}
        />
        <RenderTextBox
          name="bank_address"
          label={t('label_address')}
          numberOfLines={5}
          minHeight={120}
          ref={addressRef}
          containerStyles={styles.input}
          value={values.bank_address}
          onChangeText={handleChange('bank_address')}
          onBlur={handleBlur('bank_address')}
          onSubmitEditing={handleSubmit}
          error={errors.bank_address}
        />
      </View>
      <View style={styles.actionContainer}>
        <OpacityButton
          opacity={0.1}
          color={theme.colors.primary}
          style={styles.submitButton}
          onPress={handleSubmit}>
          <IconButton
            icon="share-variant"
            size={20}
            color={theme.colors.primary}
          />
          <BaseText style={styles.buttonText}>
            {'Share with bank person'}
          </BaseText>
        </OpacityButton>
      </View>
    </>
  );
}

function RenderFile({file, remove, handleFileRemove}) {
  const {file_name, name, file_reason, id} = file;
  return (
    <View style={styles.fileContainer}>
      <Image source={PdfIcon} style={styles.pdfIcon} />
      <View style={styles.fileContentContainer}>
        <View style={{flex: 0.8}}>
          <Text numberOfLines={1} theme={secondaryTheme}>
            {file_name || name}
          </Text>
          {file_reason ? (
            <Caption style={{lineHeight: 15}} theme={secondaryTheme}>
              {file_reason}
            </Caption>
          ) : null}
        </View>
        {remove ? (
          <IconButton
            icon="close-circle"
            size={20}
            color={'#FF5D5D'}
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
      onSubmit={async (values) => handleFileUpload(values)}>
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

function RenderFiles(props) {
  const {bankDetails, route} = props;
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

  const toggleDialog = () => setUploadDialog((v) => !v);

  const handleFileUpload = (values) => {
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
  const handleFileRemove = (file_id) => {
    removeBankFile({file_id, project_id, unit_id: unit.unitId}).then(() => {
      getBankDetails({project_id, unit_id: unit.unitId});
    });
  };

  const onChoose = (v) => {
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
      <Subheading style={{color: theme.colors.primary}}>
        BANK REQUIRED FILES
      </Subheading>
      <View style={styles.filesContainer}>
        {files &&
          files.map((file, index) => (
            <RenderFile
              key={index}
              {...{file, index, remove: true, handleFileRemove}}
            />
          ))}
      </View>

      <View style={styles.actionContainer}>
        <OpacityButton
          opacity={0.1}
          color={theme.colors.primary}
          style={styles.submitButton}
          onPress={() => openImagePicker({type: 'file', onChoose})}>
          <IconButton icon="upload" size={20} color={theme.colors.primary} />
          <BaseText style={styles.buttonText}>{'Upload'}</BaseText>
        </OpacityButton>
      </View>
    </View>
  );
}

function BankLoans(props) {
  const {route} = props;
  const {project_id, unit} = route?.params || {};

  const {bankDetails} = useSelector(({customer}) => customer);

  const {updateBankDetails} = useCustomerActions();

  const initialValues = React.useMemo(() => {
    if (bankDetails.details) {
      return _.pick(bankDetails.details, [
        'bank_branch',
        'bank_name',
        'email',
        'bank_person',
        'phone',
        'bank_address',
      ]);
    }
    return {};
  }, [bankDetails.details]);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headingRow}>
          <Subheading style={{color: theme.colors.primary, marginBottom: 10}}>
            BANK DETAILS
          </Subheading>
          <Button
            icon="format-list-bulleted"
            mode="text"
            onPress={() => console.log('Pressed')}>
            Activity
          </Button>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={initialValues}
          enableReinitialize
          validationSchema={schema}
          onSubmit={async (values) => {
            const data = {...values};

            data.project_id = project_id;
            data.unit_id = unit.unitId;

            updateBankDetails(data);
          }}>
          {(formikProps) => <RenderForm formikProps={formikProps} {...props} />}
        </Formik>
        <RenderFiles {...props} {...{bankDetails}} />
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputsContainer: {
    width: '100%',
    flex: 1,
  },
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
  filesContainer: {
    paddingTop: 10,
  },
  fileContainer: {
    flexDirection: 'row',
  },
  pdfIcon: {
    height: 40,
    width: 40,
  },
  fileContentContainer: {
    flexGrow: 1,
    paddingLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default withTheme(BankLoans);
