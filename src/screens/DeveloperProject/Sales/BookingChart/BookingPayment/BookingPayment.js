import React, {useEffect, useMemo, useRef} from 'react';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Subheading,
  TextInput,
  withTheme,
  Button,
  Caption,
  Text,
  Divider,
} from 'react-native-paper';
import {theme} from 'styles/theme';
import * as Yup from 'yup';
import _ from 'lodash';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import {round} from 'utils';
import dayjs from 'dayjs';
import useSalesActions from 'redux/actions/salesActions';
import Radio from 'components/Atoms/Radio';
import {useSelector} from 'react-redux';
import RenderTextBox from 'components/Atoms/RenderTextbox';

const PAYMENT_METHODS = [
  {label: 'Full payment', value: 1},
  {label: 'Custom payment', value: 2},
  {label: 'Downpayment and Installment', value: 3},
];

const schema = Yup.object().shape({
  start_date: Yup.string('Invalid').when('payment_type', {
    is: 1,
    then: Yup.string('Invalid').required('Required'),
  }),
  end_date: Yup.string('Invalid').when('payment_type', {
    is: 1,
    then: Yup.string('Invalid').required('Required'),
  }),
  installment_count: Yup.number('Invalid').when('payment_type', {
    is: 3,
    then: Yup.number('Invalid').required('Required'),
  }),
  installment_start_date: Yup.string('Invalid').when('payment_type', {
    is: 3,
    then: Yup.string('Invalid').required('Required'),
  }),
  installment_interval_days: Yup.number('Invalid').when('payment_type', {
    is: 3,
    then: Yup.number('Invalid').required('Required'),
  }),
  first_big_amount_percent: Yup.number('Invalid').when('payment_type', {
    is: 3,
    then: Yup.number('Invalid').required('Required'),
  }),
  first_big_amount: Yup.number('Invalid').when('payment_type', {
    is: 3,
    then: Yup.number('Invalid').required('Required'),
  }),
  first_big_amount_start_date: Yup.string('Invalid').when('payment_type', {
    is: 3,
    then: Yup.string('Invalid').required('Required'),
  }),
  first_big_amount_end_date: Yup.string('Invalid').when('payment_type', {
    is: 3,
    then: Yup.string('Invalid').required('Required'),
  }),
  loan_bank: Yup.string('Invalid').when('loan', {
    is: 'yes',
    then: Yup.string('Invalid').required('Required'),
  }),
  loan_amount: Yup.number('Invalid').when('loan', {
    is: 'yes',
    then: Yup.number('Invalid').required('Required'),
  }),
  document_start_date: Yup.string('Invalid').when(
    'isDocumentCharge',
    (isDocumentCharge, keySchema) =>
      isDocumentCharge ? keySchema.required('Required') : keySchema,
  ),
  document_end_date: Yup.string('Invalid').when(
    'isDocumentCharge',
    (isDocumentCharge, keySchema) =>
      isDocumentCharge ? keySchema.required('Required') : keySchema,
  ),
});

export function RenderInstallments(props) {
  const {
    installment_count,
    installment_start_date,
    installment_interval_days,
    finalAmount,
    big_installment_amount,
  } = props;

  const installments = useMemo(() => {
    if (
      installment_count &&
      installment_start_date &&
      installment_interval_days
    ) {
      return new Array(Number(installment_count))
        .fill(0)
        .map((item, index) => ({
          date: dayjs(installment_start_date).add(
            installment_interval_days * index,
            'days',
          ),
          amount: round(
            (finalAmount - (big_installment_amount || 0)) / installment_count,
          ),
        }));
    }

    return [];
  }, [
    installment_count,
    installment_start_date,
    installment_interval_days,
    finalAmount,
    big_installment_amount,
  ]);

  if (installments.length) {
    return (
      <>
        <Caption style={{color: theme.colors.primary, marginTop: 15}}>
          Installments
        </Caption>
        <View style={styles.installmentTitleRow}>
          <Caption style={{color: theme.colors.primary}}>No.</Caption>
          <Caption style={{color: theme.colors.primary}}>
            Installment Date
          </Caption>
          <Caption style={{color: theme.colors.primary}}>
            Installment Amount
          </Caption>
        </View>
        {installments.map((installment, index) => {
          return (
            <View key={index} style={styles.installmentRow}>
              <Subheading>{index + 1}</Subheading>
              <View style={{flex: 0.4}}>
                <RenderInput
                  value={dayjs(installment.date).format('DD/MM/YYYY')}
                  disabled={true}
                />
              </View>
              <View style={{flex: 0.4}}>
                <RenderInput
                  value={installment.amount}
                  disabled={true}
                  left={<TextInput.Affix text="₹" />}
                />
              </View>
            </View>
          );
        })}
      </>
    );
  }

  return <View />;
}

function RenderOneBigInstallmentPaymentForm(props) {
  const {formikProps, t} = props;
  const {values, setFieldValue, handleChange, errors} = formikProps;

  const timeout = useRef();

  const calculateAmount = percent => {
    percent = parseFloat(percent);
    percent = round(percent > 100 ? 100 : percent);
    const amount = round(values.finalAmount * (percent / 100));

    setFieldValue('first_big_amount_percent', percent);
    setFieldValue('first_big_amount', amount);
  };

  const handlePercentChange = percent => {
    setFieldValue('first_big_amount_percent', percent);

    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => calculateAmount(percent), 1500);
  };

  const calcPercentage = amount => {
    amount = parseFloat(amount);
    amount = round(amount > values.finalAmount ? values.finalAmount : amount);

    const percent = round((amount / values.finalAmount) * 100);

    setFieldValue('first_big_amount_percent', percent);
    setFieldValue('first_big_amount', amount);
  };

  const handleAmountChange = amount => {
    setFieldValue('first_big_amount', amount);

    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => calcPercentage(amount), 1500);
  };

  return (
    <>
      <Caption
        style={{
          color: theme.colors.primary,
          marginTop: 20,
          marginBottom: -10,
          fontSize: 14,
        }}>
        1st BIG Installment
      </Caption>
      <View style={styles.customPaymentContainer}>
        <View style={styles.customInputsContainer}>
          <View style={styles.customPaymentRowContainer}>
            <View style={styles.percentInputContainer}>
              <RenderInput
                name={'first_big_amount_percent'}
                label={'%'}
                keyboardType="decimal-pad"
                value={values.first_big_amount_percent}
                onChangeText={handlePercentChange}
                error={errors.first_big_amount_percent}
                left={
                  <TextInput.Icon
                    name="minus"
                    color={theme.colors.error}
                    onPress={() => {
                      handlePercentChange(
                        values.first_big_amount_percent > 0
                          ? values.first_big_amount_percent - 1
                          : 0,
                      );
                    }}
                  />
                }
                right={
                  <TextInput.Icon
                    name="plus"
                    color={theme.colors.primary}
                    onPress={() => {
                      handlePercentChange(
                        (values.first_big_amount_percent || 0) + 1,
                      );
                    }}
                  />
                }
              />
            </View>
            <View style={{flex: 1}}>
              <RenderInput
                name={'first_big_amount'}
                label={t('label_amount')}
                keyboardType="number-pad"
                value={values.first_big_amount}
                left={<TextInput.Affix text="₹" />}
                error={errors.first_big_amount}
                onChangeText={value => handleAmountChange(value)}
              />
            </View>
          </View>
          <View style={styles.inputRowContainer}>
            <View style={styles.dateInputContainer}>
              <RenderDatePicker
                name="first_big_amount_start_date"
                label={t('label_start_date')}
                value={values.first_big_amount_start_date}
                error={errors.first_big_amount_start_date}
                onChange={value => {
                  setFieldValue(
                    'first_big_amount_start_date',
                    dayjs(value).format('YYYY-MM-DD'),
                  );
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <RenderDatePicker
                name="first_big_amount_end_date"
                label={t('label_end_date')}
                value={values.first_big_amount_end_date}
                error={errors.first_big_amount_end_date}
                onChange={value => {
                  setFieldValue(
                    'first_big_amount_end_date',
                    dayjs(value).format('YYYY-MM-DD'),
                  );
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <Caption
        style={{color: theme.colors.primary, marginTop: 15, fontSize: 14}}>
        Other Installment Details
      </Caption>
      <RenderInput
        name={'installment_count'}
        label={t('label_no_of_installments')}
        keyboardType="number-pad"
        value={values.installment_count}
        error={errors.installment_count}
        onChangeText={handleChange('installment_count')}
      />
      <View style={styles.installmentDetailsRow}>
        <View style={{flex: 1, paddingRight: 10}}>
          <RenderDatePicker
            name="installment_start_date"
            label={t('label_start_date')}
            value={values.installment_start_date}
            error={errors.installment_start_date}
            onChange={value => {
              setFieldValue(
                'installment_start_date',
                dayjs(value).format('YYYY-MM-DD'),
              );
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <RenderInput
            name={'installment_interval_days'}
            label={t('label_interval_days')}
            keyboardType="number-pad"
            value={values.installment_interval_days}
            error={errors.installment_interval_days}
            onChangeText={handleChange('installment_interval_days')}
          />
        </View>
      </View>
      <RenderInstallments {...values} />
    </>
  );
}

function RenderCustomPaymentForm(props) {
  const {formikProps, t} = props;
  const {values, setFieldValue, errors} = formikProps;

  const timeout = useRef();

  const totalPercent = useMemo(() => {
    return values.custom_payments.reduce((sum, i) => sum + i.percent || 0, 0);
  }, [values.custom_payments]);

  const setValue = (index, id, value) => {
    const custom_payments = _.cloneDeep(values.custom_payments);
    custom_payments[index] = custom_payments[index] || {};
    custom_payments[index][id] = value;
    setFieldValue('custom_payments', custom_payments);
  };

  const setAmountData = (index, data) => {
    const custom_payments = _.cloneDeep(values.custom_payments);
    custom_payments[index] = custom_payments[index] || {};
    custom_payments[index] = {...custom_payments[index], ...data};
    setFieldValue('custom_payments', custom_payments);
  };

  const calculateAmount = (index, percent) => {
    const custom_payments = _.cloneDeep(values.custom_payments);
    custom_payments.splice(index, 1);
    percent = parseFloat(percent);

    const addedPercent = custom_payments.reduce(
      (sum, i) => sum + i.percent || 0,
      0,
    );

    const remainingPercent = 100 - addedPercent;
    percent = percent > remainingPercent ? remainingPercent : percent;

    const amount = values.finalAmount * (percent / 100);

    setAmountData(index, {percent: round(percent), amount: round(amount)});
  };

  const handlePercentChange = (index, percent) => {
    setAmountData(index, {percent});
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => calculateAmount(index, percent), 2000);
  };

  const calcPercentage = (index, amount) => {
    const custom_payments = _.cloneDeep(values.custom_payments);
    custom_payments.splice(index, 1);

    const addedAmount = custom_payments.reduce((sum, i) => sum + i.amount, 0);

    const remainingAmount = values.finalAmount - addedAmount;
    amount = amount > remainingAmount ? remainingAmount : amount;

    const percent = round((amount / values.finalAmount) * 100);
    setAmountData(index, {percent: round(percent), amount: round(amount)});
  };

  const handleAmountChange = (index, amount) => {
    setAmountData(index, {amount: round(amount)});
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => calcPercentage(index, amount), 1500);
  };

  const addNewPayment = () => {
    const custom_payments = _.cloneDeep(values.custom_payments || []);
    custom_payments.push({});
    setFieldValue('custom_payments', custom_payments);
  };

  const removePayment = index => {
    const custom_payments = _.cloneDeep(values.custom_payments);
    custom_payments.splice(index, 1);
    setFieldValue('custom_payments', custom_payments);
  };

  return (
    <>
      <Caption
        style={{color: theme.colors.primary, marginTop: 15, fontSize: 14}}>
        Payments
      </Caption>

      {errors.payment ? (
        <Caption style={{color: theme.colors.error}}>{errors.payment}</Caption>
      ) : null}
      {values.custom_payments.map(({percent, amount, date, remark}, index) => {
        return (
          <View key={index}>
            {values.custom_payments.length > 1 ? (
              <Caption style={{color: theme.colors.primary, marginTop: 10}}>
                {`Installment No. ${index + 1}`}
              </Caption>
            ) : null}
            <View key={index} style={styles.customPaymentContainer}>
              <View style={styles.customInputsContainer}>
                <View style={styles.customPaymentRowContainer}>
                  <View style={styles.percentInputContainer}>
                    <RenderInput
                      name={'percent'}
                      label={'%'}
                      keyboardType="decimal-pad"
                      value={percent}
                      onChangeText={value => handlePercentChange(index, value)}
                      left={
                        <TextInput.Icon
                          name="minus"
                          color={theme.colors.error}
                          onPress={() => {
                            handlePercentChange(
                              index,
                              percent > 0 ? percent - 1 : 0,
                            );
                          }}
                        />
                      }
                      right={
                        <TextInput.Icon
                          name="plus"
                          color={theme.colors.primary}
                          onPress={() => {
                            handlePercentChange(index, (percent || 0) + 1);
                          }}
                        />
                      }
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <RenderInput
                      name={'amount'}
                      label={t('label_amount')}
                      keyboardType="number-pad"
                      value={amount}
                      left={<TextInput.Affix text="₹" />}
                      onChangeText={value => handleAmountChange(index, value)}
                    />
                  </View>
                </View>
                <View style={{marginTop: 5}}>
                  <RenderDatePicker
                    name="date"
                    label={t('label_date')}
                    value={date}
                    onChange={value => {
                      setValue(
                        index,
                        'date',
                        dayjs(value).format('YYYY-MM-DD'),
                      );
                    }}
                  />
                </View>
                <View style={{marginTop: 5, marginBottom: 10}}>
                  <RenderInput
                    name="remark"
                    multiline
                    label={t('label_remark')}
                    value={remark}
                    onChangeText={value => {
                      setValue(index, 'remark', value);
                    }}
                  />
                </View>
              </View>
              {values.custom_payments.length > 1 ? (
                <OpacityButton
                  color={theme.colors.red}
                  opacity={0.1}
                  style={{marginLeft: 15, borderRadius: 20}}
                  onPress={() => removePayment(index)}>
                  <MaterialIcons
                    name={'close'}
                    color={theme.colors.red}
                    size={19}
                  />
                </OpacityButton>
              ) : null}
            </View>
          </View>
        );
      })}
      {totalPercent !== 100 ? (
        <TouchableOpacity style={styles.chargesButton} onPress={addNewPayment}>
          <Caption style={{color: theme.colors.primary}}>+ Create more</Caption>
        </TouchableOpacity>
      ) : null}
    </>
  );
}

function RenderDocumentChargesPayment(props) {
  const {formikProps, t} = props;
  const {values, setFieldValue, errors} = formikProps;

  return (
    <>
      <Caption style={[styles.headingLabel, {color: theme.colors.primary}]}>
        Document Charges payment
      </Caption>
      <View style={styles.docChargesSection}>
        <RenderInput
          name={'documentation_charges'}
          label={t('label_documentation_charges')}
          value={values.documentCharge}
          editable={false}
          left={<TextInput.Affix text="₹" />}
        />
        <View style={styles.inputRowContainer}>
          <View style={styles.dateInputContainer}>
            <RenderDatePicker
              name="document_start_date"
              label={t('label_start_date')}
              value={values.document_start_date}
              error={errors.document_start_date}
              onChange={date => {
                setFieldValue(
                  'document_start_date',
                  dayjs(date).format('YYYY-MM-DD'),
                );
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <RenderDatePicker
              name="document_end_date"
              label={t('label_end_date')}
              value={values.document_end_date}
              error={errors.document_end_date}
              onChange={date => {
                setFieldValue(
                  'document_end_date',
                  dayjs(date).format('YYYY-MM-DD'),
                );
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
}

function RenderPaymentForm(props) {
  const {formikProps, t} = props;
  const {values, errors, handleChange, setFieldValue, handleBlur} = formikProps;

  return (
    <View style={{marginTop: 10}}>
      {values.isDocumentCharge ? (
        <RenderDocumentChargesPayment {...props} />
      ) : null}
      <RenderInput
        label={t('label_final_amount')}
        value={values.finalAmount}
        editable={false}
        error={errors.finalAmount}
        left={<TextInput.Affix text="₹" />}
      />
      {values.payment_type === 1 ? (
        <View style={styles.inputRowContainer}>
          <View style={styles.dateInputContainer}>
            <RenderDatePicker
              name="start_date"
              label={t('label_start_date')}
              value={values.start_date}
              error={errors.start_date}
              onChange={date => {
                setFieldValue('start_date', dayjs(date).format('YYYY-MM-DD'));
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <RenderDatePicker
              name="end_date"
              label={t('label_end_date')}
              value={values.end_date}
              error={errors.end_date}
              onChange={date => {
                setFieldValue('end_date', dayjs(date).format('YYYY-MM-DD'));
              }}
            />
          </View>
        </View>
      ) : null}

      {values.payment_type === 2 ? (
        <RenderCustomPaymentForm {...props} />
      ) : null}

      {values.payment_type === 3 ? (
        <RenderOneBigInstallmentPaymentForm {...props} />
      ) : null}

      <Caption
        style={[styles.otherChargesLabel, {color: theme.colors.primary}]}>
        Remark
      </Caption>
      <RenderTextBox
        name="payment_remark"
        numberOfLines={5}
        minHeight={120}
        label={t('label_remark')}
        containerStyles={styles.input}
        value={values.payment_remark}
        onChangeText={handleChange('payment_remark')}
        onBlur={handleBlur('payment_remark')}
        returnKeyType="done"
        error={errors.payment_remark}
      />
    </View>
  );
}

function FormContent(props) {
  const {formikProps, bankList, navigation} = props;
  const {t} = useTranslation();

  const {
    handleSubmit,
    values,
    errors,
    setFieldValue,
    handleChange,
  } = formikProps;

  const handleCancel = () => navigation.goBack();

  return (
    <TouchableWithoutFeedback
      style={{flexGrow: 1}}
      onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={30}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, paddingVertical: 10}}>
        <View style={styles.container}>
          <Subheading style={{color: theme.colors.primary}}>
            3. Payment Installment
          </Subheading>

          <View style={styles.radioRow}>
            <Text>Do you wish to take a loan?</Text>
            <View style={styles.radioContainer}>
              <Radio
                label={'Yes'}
                value="yes"
                checked={values.loan === 'yes'}
                onChange={value => setFieldValue('loan', value)}
              />
              <Radio
                label={'No'}
                value="no"
                color={theme.colors.error}
                checked={values.loan === 'no'}
                onChange={value => setFieldValue('loan', value)}
              />
            </View>
          </View>

          {values.loan === 'yes' ? (
            <View style={styles.loadInputs}>
              <View style={styles.otherChargesContainer}>
                <View style={styles.dateInputContainer}>
                  <RenderSelect
                    name={'loan_bank'}
                    label={t('label_choose_bank')}
                    options={bankList}
                    value={values.loan_bank}
                    error={errors.loan_bank}
                    onSelect={value => {
                      formikProps.setFieldValue('loan_bank', value);
                    }}
                  />
                </View>
                <View style={{flex: 1}}>
                  <RenderInput
                    name={'loan_amount'}
                    label={t('label_amount')}
                    keyboardType="number-pad"
                    value={values.loan_amount}
                    left={<TextInput.Affix text="₹" />}
                    onChangeText={handleChange('loan_amount')}
                  />
                </View>
              </View>
              <View style={{marginTop: 5}}>
                <RenderInput
                  name="loan_remark"
                  multiline
                  label={t('label_remark')}
                  value={values.loan_remark}
                  onChangeText={handleChange('loan_remark')}
                />
              </View>
              <Divider style={{marginTop: 25, marginBottom: 20}} />
            </View>
          ) : null}

          <RenderSelect
            name={'payment_type'}
            label={t('label_payment_method')}
            options={PAYMENT_METHODS}
            containerStyles={styles.rateInput}
            value={values.payment_type}
            error={errors.payment_type}
            onSelect={value => {
              formikProps.setFieldValue('payment_type', value);
              formikProps.setErrors({});
            }}
          />
          <RenderPaymentForm formikProps={formikProps} t={t} />
        </View>
        <View style={styles.actionContainer}>
          <Button
            style={{flex: 1, marginHorizontal: 5}}
            contentStyle={{padding: 3}}
            theme={{roundness: 15}}
            onPress={handleCancel}>
            {'Back'}
          </Button>
          <Button
            style={{flex: 1, marginHorizontal: 5}}
            mode="contained"
            contentStyle={{padding: 3}}
            theme={{roundness: 15}}
            onPress={handleSubmit}>
            {'Save'}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

function BookingPayments(props) {
  const {navigation, route = {}} = props;
  const {params = {}} = route;
  const {project_id, unit_id} = params;

  const {createBooking, getBankList} = useSalesActions();

  const {bankList} = useSelector(state => state.sales);

  useEffect(() => {
    getBankList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues = useMemo(() => {
    const documentCharge = `${params.document_start}.${params.document_end}`;
    const isDocumentCharge = Number(documentCharge);

    return {
      payment_type: 1,
      custom_payments: [{}],
      loan: 'no',
      documentCharge,
      isDocumentCharge,
      ...params,
    };
  }, [params]);

  const validate = values => {
    const errors = {};
    if (values.payment_type === 2) {
      values.custom_payments.map(({percent, amount, date}, index) => {
        if (!(percent && amount && date)) {
          if (values.custom_payments.length === 1) {
            errors.payment = `Missing payment ${
              !percent ? 'percent' : !amount ? 'amount' : 'date'
            }`;
          } else {
            errors.payment = `Missing payment ${
              !percent ? 'percent' : !amount ? 'amount' : 'date'
            } for Installment No. ${index + 1}`;
          }
        }
      });

      const totalPercent = values.custom_payments.reduce(
        (sum, i) => sum + parseFloat(i.percent),
        0,
      );

      if (totalPercent !== 100) {
        errors.payment = 'Sum of all payments does not match Basic amount';
      }
    }

    return errors;
  };

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      validate={validate}
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async values => {
        console.log('-----> unit_id', unit_id);
        console.log('-----> project_id', project_id);
        const data = {...values, project_id, unit_id};

        if (values.payment_type !== 2) {
          delete data.custom_payments;
        }

        if (data.isDocumentCharge) {
          data.basic_amount_document_charge_start = data.document_start;
          data.basic_amount_document_charge_end = data.document_end;

          switch (values.payment_type) {
            case 1:
              data.full_payment_documentation_charges = data.documentCharge;
              data.full_payment_documentation_charges_start_date =
                data.document_start_date;
              data.full_payment_documentation_charges_end_date =
                data.document_end_date;
              break;
            case 2:
              data.custom_payment_documentation_charges = data.documentCharge;
              data.custom_payment_documentation_charges_start_date =
                data.document_start_date;
              data.custom_payment_documentation_charges_end_date =
                data.document_end_date;
              break;
            case 3:
              data.installment_payment_documentation_charges =
                data.documentCharge;
              data.installment_payment_documentation_charges_start_date =
                data.document_start_date;
              data.installment_payment_documentation_charges_end_date =
                data.document_end_date;
              break;
          }
        }

        delete data.loan;
        delete data.broker;
        delete data.documentCharge;
        delete data.isDocumentCharge;
        delete data.document_start;
        delete data.document_end;
        delete data.document_start_date;
        delete data.document_end_date;
        delete data.finalAmount;

        createBooking(data).then(() => navigation.popToTop());
      }}>
      {formikProps => <FormContent {...props} {...{formikProps, bankList}} />}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  radioRow: {
    marginVertical: 10,
  },
  radioContainer: {
    flexDirection: 'row',
  },
  docChargesSection: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: 'rgba(255, 92, 22, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 92, 22, 1)',
    borderRadius: 10,
  },
  loadInputs: {},
  rateInput: {
    marginTop: 5,
  },
  otherChargesLabel: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 14,
  },
  headingLabel: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 14,
  },
  chargesButton: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.primary,
    paddingVertical: 10,
    marginTop: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
  },
  inputRowContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  customPaymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customInputsContainer: {
    flex: 1,
  },
  customPaymentRowContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dateInputContainer: {
    flex: 1,
    paddingRight: 10,
  },
  percentInputContainer: {
    flex: 1,
    paddingRight: 10,
  },
  otherChargesContainer: {
    flexDirection: 'row',
  },
  installmentDetailsRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  installmentTitleRow: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  installmentRow: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default withTheme(BookingPayments);
