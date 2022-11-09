import {StyleSheet, View} from 'react-native';
import React from 'react';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {IconButton, Subheading} from 'react-native-paper';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';

import Spinner from 'react-native-loading-spinner-overlay';
import {useSalesLoading} from 'redux/selectors';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';

const schema = Yup.object().shape({
  transaction_date: Yup.string()
    .label('transaction_date')
    .required('Transaction Date is Required'),
  payment_amount: Yup.string()
    .label('payment_amount')
    .required('Amount is Required'),
  remarks: Yup.string().label('remarks').required('Remark is Required'),
});

const COLLECTION_OPTIONS = [
  {label: 'credit', value: 'CR'},
  {label: 'debit', value: 'DR'},
];

const PAYMENT_MODE_OPTIONS = [
  'DD',
  'NetBanking',
  'Cheque',
  'RTGS',
  'NEFT',
  'Cash',
  'UPI',
  'Debit Card',
];

const AddBrokerPaymentDetails = props => {
  const {navigation, route} = props;
  const {projectBookingId, brokerId, id} = route?.params || {};

  const loading = useSalesLoading();

  const edit = Boolean(id);

  const {selectedProject} = useSelector(s => s.project);
  const {brokageDealDetails} = useSelector(s => s.sales);

  const brokerPaymentList = brokageDealDetails?.broker_payments_list;
  const [broker_payments_list] = brokerPaymentList;

  const projectId = selectedProject.id;

  const {addBrokeragePayment, updateBrokeragePayment, getBrokerageDealDetails} =
    useSalesActions();

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () =>
    getBrokerageDealDetails({
      project_id: projectId,
      broker_id: brokerId,
      project_bookings_id: projectBookingId,
    });

  const initialValues = React.useMemo(() => {
    if (edit) {
      const {
        project_id: project_booking_id,
        project_bookings_id,
        broker_id,
        transaction,
        payment_amount,
        transaction_date,
        payment_mode,
        bank_branch,
        transaction_number,
        remarks,
      } = broker_payments_list;

      return {
        project_booking_id,
        project_bookings_id,
        transaction,
        broker_id,
        payment_amount,
        transaction_date,
        payment_mode,
        bank_branch,
        transaction_number,
        remarks,
      };
    }
    return {};
  }, [edit, broker_payments_list]);

  const handleSave = async values => {
    const data = {
      project_id: projectId,
      broker_id: brokerId,
      project_bookings_id: projectBookingId,
      transaction: values.transaction,
      payment_mode: values.payment_mode,
      transaction_date: values.transaction_date,
      payment_amount: values.payment_amount,
      bank_branch: values.bank_branch,
      transaction_number: values.transaction_number,
      remarks: values.remarks,
    };
    if (edit) {
      await updateBrokeragePayment({
        ...data,
        broker_payments_id: id,
      });
    } else {
      await addBrokeragePayment(data);
    }
    getData();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ProjectHeader {...props} />
      <View style={styles.inputContainer}>
        <IconButton
          icon="keyboard-backspace"
          size={25}
          color="#4872f4"
          style={styles.button}
          onPress={() => navigation.goBack()}
        />
        <Subheading style={styles.headerText}>
          {edit ? 'Edit Brokerage' : 'Add Brokerage'}
        </Subheading>
      </View>
      <Spinner visible={loading} textContent="" />
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSave}>
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
        }) => {
          return (
            <View>
              <View style={styles.mainContainer}>
                <RenderInput
                  name="bank_branch"
                  label="Bank Branch"
                  containerStyles={styles.inputStyles}
                  value={values.bank_branch}
                  onChangeText={handleChange('bank_branch')}
                  onBlur={handleBlur('bank_branch')}
                  error={errors.bank_branch}
                />
                <RenderInput
                  name="transaction_number"
                  label="Check no / Transaction no"
                  containerStyles={styles.inputStyles}
                  value={values.transaction_number}
                  onChangeText={handleChange('transaction_number')}
                  onBlur={handleBlur('transaction_number')}
                  error={errors.transaction_number}
                />
                <RenderDatePicker
                  name="transaction_date"
                  label="Transaction Date"
                  containerStyles={styles.inputStyles}
                  value={values.transaction_date}
                  onChange={v => setFieldValue('transaction_date', v)}
                  error={errors.transaction_date}
                />
                <RenderInput
                  name="payment_amount"
                  label="Amount"
                  containerStyles={styles.inputStyles}
                  value={values.payment_amount}
                  onChangeText={handleChange('payment_amount')}
                  onBlur={handleBlur('payment_amount')}
                  error={errors.payment_amount}
                />
                <RenderSelect
                  name="transaction"
                  label="Collection Type"
                  value={values.transaction}
                  options={COLLECTION_OPTIONS}
                  containerStyles={styles.inputStyles}
                  onBlur={handleBlur('transaction')}
                  onSelect={value => {
                    setFieldValue('transaction', value);
                  }}
                />
                <RenderSelect
                  name="payment_mode"
                  label="Payment Mode"
                  value={values.payment_mode}
                  options={PAYMENT_MODE_OPTIONS}
                  containerStyles={styles.inputStyles}
                  onBlur={handleBlur('payment_mode')}
                  onSelect={value => {
                    setFieldValue('payment_mode', value);
                  }}
                />
                <RenderTextBox
                  name="remarks"
                  blurOnSubmit={false}
                  numberOfLines={7}
                  label="Remark"
                  containerStyles={styles.inputStyles}
                  value={values.remarks}
                  onChangeText={handleChange('remarks')}
                  onSubmitEditing={handleSubmit}
                  onBlur={handleBlur('remarks')}
                />
              </View>
              <ActionButtons
                cancelLabel="Cancel"
                submitLabel={edit ? 'Update' : 'Save'}
                onCancel={navigation.goBack}
                onSubmit={handleSubmit}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default AddBrokerPaymentDetails;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 15,
  },
  mainContainer: {
    paddingTop: 15,
  },

  headerText: {
    fontSize: 19,
    color: '#4872f4',
    paddingVertical: 10,
    paddingLeft: 5,
  },
  inputStyles: {
    marginVertical: 8,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
  },
});
