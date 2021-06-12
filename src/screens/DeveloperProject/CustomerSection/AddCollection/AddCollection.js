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
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import Radio from 'components/Atoms/Radio';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import useCustomerActions from 'redux/actions/customerActions';
import dayjs from 'dayjs';

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

function RenderForm({formikProps, navigation, ...restProps}) {
  const {
    handleChange,
    handleSubmit,
    values,
    handleBlur,
    errors,
    setFieldValue,
  } = formikProps;

  const {t} = useTranslation();

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
              label={'Document charges'}
              value="documentcharges"
              checked={values.type === 'documentcharges'}
              onChange={v => setFieldValue('type', v)}
            />
            <Radio
              label={'Property Final Amount'}
              value="propertyfinalamount"
              checked={values.type === 'propertyfinalamount'}
              onChange={v => setFieldValue('type', v)}
            />
            <Radio
              label={'GST Amount'}
              value="gst"
              checked={values.type === 'gst'}
              onChange={v => setFieldValue('type', v)}
            />
          </View>
        </View>
        <RenderDatePicker
          name="date"
          label={t('label_date')}
          ref={dateRef}
          containerStyles={styles.input}
          value={values.date}
          onChange={v => setFieldValue('date', v)}
          error={errors.date}
        />
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
              label={t('label_branch')}
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
              label={'Check no / Transaction no'}
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
          <Text>Collection Type </Text>
          <View style={styles.radioContainer}>
            <Radio
              label={'Credit'}
              value="credit"
              checked={values.transaction_type === 'credit'}
              onChange={v => setFieldValue('transaction_type', v)}
            />
            <Radio
              label={'Debit'}
              value="debit"
              checked={values.transaction_type === 'debit'}
              onChange={v => setFieldValue('transaction_type', v)}
            />
          </View>
        </View>
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

function AddCollection(props) {
  const {navigation, route} = props;
  const {params} = route;
  const {unit, project_id} = params;

  const {addCollection, getAccountDetails} = useCustomerActions();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.titleContainer}>
          <Image source={backArrow} style={styles.backArrow} />
          <Subheading>Add collection</Subheading>
        </TouchableOpacity>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{type: 'documentcharges', transaction_type: 'credit'}}
          validationSchema={schema}
          onSubmit={async values => {
            const {type, date, ...restData} = values;

            const data = {
              project_id,
              unit_id: unit.unitId,
              collectiontype: type,
              transaction_date: dayjs(date).format('DD-MM-YYYY'),
              ...restData,
            };

            addCollection(data).then(() => {
              getAccountDetails({project_id, unit_id: unit.unitId});
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
    height: 23,
    width: 23,
    marginRight: 5,
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
    display: 'flex',
  },
  actionContainer: {
    marginTop: 25,
    paddingHorizontal: 10,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default withTheme(AddCollection);
