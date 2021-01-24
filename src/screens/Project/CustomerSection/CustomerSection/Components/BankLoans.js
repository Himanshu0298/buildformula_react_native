import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  IconButton,
  Subheading,
  TextInput,
  withTheme,
  Text,
  Caption,
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

const schema = Yup.object().shape({
  bank_person: Yup.string().trim().required('Required'),
  phone: Yup.string().trim().required('Required'),
  email: Yup.string().email('Invalid').trim().required('Required'),
  bank_name: Yup.string().trim().required('Required'),
  bank_branch: Yup.string().trim().required('Required'),
  bank_address: Yup.string().trim().required('Required'),
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

function RenderFiles({bankDetails = {}, handleFileUpload, handleFileRemove}) {
  const {files} = bankDetails;
  return (
    <View style={styles.fileHeading}>
      <Subheading style={{color: theme.colors.primary, marginBottom: 10}}>
        BANK REQUIRED FILES
      </Subheading>
      {files &&
        files.map((file, index) => {
          const {file_name, file_reason} = file;
          return (
            <View key={index} style={styles.fileContainer}>
              <View style={styles.pdfIcon}>
                <Text>PDF</Text>
              </View>
              <View style={styles.fileContentContainer}>
                <View>
                  <Text theme={secondaryTheme}>{file_name}</Text>
                  <Caption theme={secondaryTheme}>{file_reason}</Caption>
                </View>
                <IconButton
                  icon="close-circle"
                  size={20}
                  color={'#FF5D5D'}
                  onPress={handleFileRemove}
                />
              </View>
            </View>
          );
        })}
      <View style={styles.actionContainer}>
        <OpacityButton
          opacity={0.1}
          color={theme.colors.primary}
          style={styles.submitButton}
          onPress={handleFileUpload}>
          <IconButton icon="upload" size={20} color={theme.colors.primary} />
          <BaseText style={styles.buttonText}>{'Upload'}</BaseText>
        </OpacityButton>
      </View>
    </View>
  );
}

function BankLoans(props) {
  const {
    route: {params},
  } = props;
  const {project_id, unit} = params || {};

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

  const handleFileUpload = () => {};
  const handleFileRemove = () => {};

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
        <RenderFiles {...{bankDetails, handleFileUpload, handleFileRemove}} />
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
    marginVertical: 20,
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pdfIcon: {
    height: 40,
    width: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5D5D',
    marginRight: 10,
  },
  fileContentContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default withTheme(BankLoans);
