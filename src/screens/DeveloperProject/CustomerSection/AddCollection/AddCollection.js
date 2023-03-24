import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {withTheme, TextInput, Text} from 'react-native-paper';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import Radio from 'components/Atoms/Radio';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import useCustomerActions from 'redux/actions/customerActions';
import dayjs from 'dayjs';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderSelect from 'components/Atoms/RenderSelect';
import ScreenTitle from 'components/Atoms/ScreenTitle';

const schema = Yup.object().shape({
  date: Yup.string('Invalid').required('Required'),
  bank_name: Yup.string('Invalid').when('type', (type, keySchema) =>
    type !== 'documentcharges' ? keySchema.required('Required') : keySchema,
  ),
  bank_branch: Yup.string('Invalid').when('type', (type, keySchema) =>
    type !== 'documentcharges' ? keySchema.required('Required') : keySchema,
  ),
  transaction_number: Yup.string('Invalid').when('type', (type, keySchema) =>
    type !== 'documentcharges' ? keySchema.required('Required') : keySchema,
  ),
  amount: Yup.number('Invalid').required('Required'),
});

function RenderForm(props) {
  const {formikProps, edit, navigation} = props;
  const {
    handleChange,
    handleSubmit,
    values,
    handleBlur,
    errors,
    setFieldValue,
  } = formikProps;

  const {t} = useTranslation();

  const {payment_mode} = useSelector(s => s.project.commonData);

  const paymentOptions = React.useMemo(() => {
    return payment_mode.map(item => ({label: item.title, value: item.value}));
  }, [payment_mode]);

  const dateRef = React.useRef();
  const bankRef = React.useRef();
  const branchRef = React.useRef();
  const transRef = React.useRef();
  const amountRef = React.useRef();
  const remarkRef = React.useRef();

  return (
    <>
      <View style={styles.inputsContainer}>
        <View style={styles.collectionTypes}>
          <Text>Collection Type </Text>
          <View>
            <Radio
              label="Document charges"
              value="documentcharges"
              checked={values.type === 'documentcharges'}
              onChange={v => setFieldValue('type', v)}
            />
            <Radio
              label="Property Final Amount"
              value="propertyfinalamount"
              checked={values.type === 'propertyfinalamount'}
              onChange={v => setFieldValue('type', v)}
            />
            <Radio
              label="GST Amount"
              value="gst"
              checked={values.type === 'gst'}
              onChange={v => setFieldValue('type', v)}
            />
          </View>
        </View>
        <View style={styles.transDateRow}>
          <RenderDatePicker
            name="date"
            label={t('label_transaction_date')}
            ref={dateRef}
            containerStyles={styles.input}
            value={values.date}
            onChange={v => setFieldValue('date', v)}
            error={errors.date}
          />
        </View>

        {values.type !== 'documentcharges' ? (
          <>
            <RenderInput
              name="bank_name"
              label={t('label_bank_name')}
              ref={bankRef}
              containerStyles={styles.input}
              value={values.bank_name}
              onChangeText={handleChange('bank_name')}
              onSubmitEditing={() => branchRef?.current?.focus()}
              onBlur={handleBlur('bank_name')}
              error={errors.bank_name}
            />
            <RenderInput
              name="bank_branch"
              label={t('label_bank_branch')}
              ref={branchRef}
              containerStyles={styles.input}
              value={values.bank_branch}
              onChangeText={handleChange('bank_branch')}
              onBlur={handleBlur('bank_branch')}
              onSubmitEditing={() => transRef?.current?.focus()}
              error={errors.bank_branch}
            />
            <RenderInput
              name="transaction_number"
              label="Check no / Transaction no"
              ref={transRef}
              containerStyles={styles.input}
              value={values.transaction_number}
              onChangeText={handleChange('transaction_number')}
              onBlur={handleBlur('transaction_number')}
              error={errors.transaction_number}
            />
          </>
        ) : null}

        <View style={styles.radioRow}>
          <View style={styles.radioContainer}>
            <Radio
              label="Credit"
              value="credit"
              checked={values.transaction_type === 'credit'}
              onChange={v => setFieldValue('transaction_type', v)}
            />
            <Radio
              label="Debit"
              value="debit"
              checked={values.transaction_type === 'debit'}
              onChange={v => setFieldValue('transaction_type', v)}
            />
          </View>
        </View>
        <View style={styles.transDateRow}>
          <RenderInput
            name="amount"
            label={t('label_amount')}
            ref={amountRef}
            keyboardType="number-pad"
            containerStyles={styles.input}
            value={values.amount}
            onChangeText={handleChange('amount')}
            onSubmitEditing={() => remarkRef?.current?.focus()}
            onBlur={handleBlur('amount')}
            error={errors.amount}
            left={<TextInput.Affix text="₹" />}
          />
        </View>
        <View>
          <RenderSelect
            label="Payment Mode"
            options={paymentOptions}
            style={styles.paymentFormContainer}
            value={values.payment_mode}
            error={errors.payment_mode}
            onSelect={value => setFieldValue('payment_mode', value)}
          />
        </View>

        <View style={styles.radioRow}>
          <RenderTextBox
            name="remark"
            label={t('label_remark')}
            ref={remarkRef}
            containerStyles={styles.input}
            value={values.remark}
            onChangeText={handleChange('remark')}
            numberOfLines={4}
          />
        </View>
      </View>
      <ActionButtons
        cancelLabel="Cancel"
        submitLabel={edit ? 'Update' : 'Save'}
        onCancel={navigation.goBack}
        onSubmit={handleSubmit}
      />
    </>
  );
}

function AddCollection(props) {
  const {navigation, route} = props;
  const {unit, project_id, collection} = route?.params || {};

  const edit = Boolean(collection);

  const {addCollection, updateCollection, getAccountDetails} =
    useCustomerActions();

  const {loading} = useSelector(s => s.customer);

  const initialValues = React.useMemo(() => {
    if (edit) {
      const {collectiontype, transaction_date, id, user_id, ...restData} =
        collection;

      return {type: collectiontype, date: transaction_date, ...restData};
    }
    return {type: 'documentcharges', transaction_type: 'credit'};
  }, [edit, collection]);

  const onSubmit = async values => {
    const {type, date, ...restData} = values;

    const data = {
      project_id,
      unit_id: unit?.id,
      collectiontype: type,
      transaction_date: dayjs(date).format('DD-MM-YYYY'),
      ...restData,
    };

    if (edit) {
      await updateCollection({...data, collection_id: collection.id});
    } else {
      await addCollection(data);
    }

    getAccountDetails({project_id, unit_id: unit?.id});
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <ScreenTitle title={`${edit ? 'Update' : 'Add'} collection`} backIcon />
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSubmit}>
          {formikProps => <RenderForm {...props} {...{formikProps, edit}} />}
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
  inputsContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  collectionTypes: {
    marginTop: 10,
  },
  input: {
    paddingVertical: 7,
  },
  radioRow: {
    marginTop: 20,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
  },
  transDateRow: {
    marginTop: 10,
  },
  paymentFormContainer: {
    marginTop: 10,
  },
});

export default withTheme(AddCollection);
