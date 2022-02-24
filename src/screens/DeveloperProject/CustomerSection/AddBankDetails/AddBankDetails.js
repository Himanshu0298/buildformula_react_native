import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {
  Subheading,
  withTheme,
  Button,
  TextInput,
  Text,
} from 'react-native-paper';
import backArrow from 'assets/images/back_arrow.png';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import useCustomerActions from 'redux/actions/customerActions';
import _ from 'lodash';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import FileSelector from 'components/Atoms/FileSelector';
import {theme} from 'styles/theme';
import Spinner from 'react-native-loading-spinner-overlay';

const schema = Yup.object().shape({
  bank_name: Yup.string().trim().required('Required'),
  bank_branch: Yup.string().trim().required('Required'),
  bank_address: Yup.string().trim().required('Required'),
  loan_approval_letter: Yup.object().required('Required'),
  loan_amount: Yup.string().required('Required'),
  number_of_installment: Yup.string().required('Required'),
  installment_amount: Yup.string().required('Required'),
});

function RenderForm({navigation, formikProps}) {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formikProps;

  const {t} = useTranslation();

  const bankNameRef = React.useRef();
  const bankBranchRef = React.useRef();
  const addressRef = React.useRef();
  const installmentCountRef = React.useRef();
  const installmentAmountRef = React.useRef();
  const loanAmountRef = React.useRef();

  return (
    <>
      <View style={styles.inputsContainer}>
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
        <FileSelector
          name="loan_approval_letter"
          label={t('label_loan_approval_letter')}
          containerStyles={styles.input}
          value={values.loan_approval_letter}
          onChoose={v => setFieldValue('loan_approval_letter', v)}
          error={errors.loan_approval_letter}
        />
        <RenderInput
          name="loan_amount"
          label={t('label_loan_amount')}
          ref={loanAmountRef}
          keyboardType="decimal-pad"
          left={<TextInput.Affix text="₹" />}
          containerStyles={styles.input}
          value={values.loan_amount}
          onChangeText={handleChange('loan_amount')}
          onBlur={handleBlur('loan_amount')}
          onSubmitEditing={() => installmentCountRef?.current?.focus()}
          error={errors.loan_amount}
        />
        <Text style={styles.installmentHeading}>Installment</Text>
        <RenderInput
          name="number_of_installment"
          label={t('label_number_of_installments')}
          keyboardType="decimal-pad"
          ref={installmentCountRef}
          containerStyles={styles.input}
          value={values.number_of_installment}
          onChangeText={handleChange('number_of_installment')}
          onBlur={handleBlur('number_of_installment')}
          onSubmitEditing={() => installmentAmountRef?.current?.focus()}
          error={errors.number_of_installment}
        />
        <RenderInput
          name="installment_amount"
          label={t('label_installment_amount')}
          keyboardType="decimal-pad"
          ref={installmentAmountRef}
          left={<TextInput.Affix text="₹" />}
          containerStyles={styles.input}
          value={values.installment_amount}
          onChangeText={handleChange('installment_amount')}
          onBlur={handleBlur('installment_amount')}
          onSubmitEditing={handleSubmit}
          error={errors.installment_amount}
        />
      </View>
      <View style={styles.actionContainer}>
        <Button
          style={{width: '40%'}}
          contentStyle={{padding: 1}}
          theme={{roundness: 15}}
          onPress={navigation.goBack}>
          Cancel
        </Button>
        <Button
          style={{width: '40%'}}
          mode="contained"
          contentStyle={{padding: 1}}
          theme={{roundness: 15}}
          onPress={handleSubmit}>
          Save
        </Button>
      </View>
    </>
  );
}

function AddBankDetails(props) {
  const {route, navigation} = props;
  const {unit} = route?.params || {};
  const {t} = useTranslation();

  const {bankDetails, loading} = useSelector(({customer}) => customer);
  const {selectedProject} = useSelector(s => s.project);

  const {updateBankDetails, getBankDetails} = useCustomerActions();

  const initialValues = React.useMemo(() => {
    if (bankDetails.details) {
      return _.pickBy(bankDetails.details, _.identity);
    }
    return {};
  }, [bankDetails.details]);

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={styles.titleContainer}>
            <Image source={backArrow} style={styles.backArrow} />
            <Subheading>{t('title_finalized_bank_details')}</Subheading>
          </TouchableOpacity>
        </View>
        {console.log('bank details')}
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={initialValues}
          enableReinitialize
          validationSchema={schema}
          onSubmit={async values => {
            const formData = new FormData();

            formData.append('project_id', selectedProject.id);
            formData.append('unit_id', unit.unit_id);
            formData.append('bank_name', values.bank_name);
            formData.append('bank_branch', values.bank_branch);
            formData.append('bank_address', values.bank_address);
            formData.append('loan_amount', values.loan_amount);
            formData.append(
              'loan_approval_letter',
              values.loan_approval_letter,
            );
            formData.append(
              'number_of_installment',
              values.number_of_installment,
            );
            formData.append('installment_amount', values.installment_amount);

            updateBankDetails(formData).then(() => {
              getBankDetails({
                project_id: selectedProject.id,
                unit_id: unit.unit_id,
              });
              navigation.goBack();
            });
          }}>
          {formikProps => <RenderForm formikProps={formikProps} {...props} />}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  backArrow: {
    height: 25,
    width: 25,
    marginRight: 5,
  },
  inputsContainer: {
    width: '100%',
    flex: 1,
    paddingTop: 5,
  },
  input: {
    paddingVertical: 7,
  },
  installmentHeading: {
    color: theme.colors.primary,
    marginTop: 15,
    marginBottom: 5,
  },
  actionContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default withTheme(AddBankDetails);
