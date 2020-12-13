import React, {useMemo} from 'react';
import BaseText from 'components/BaseText';
import RenderInput from 'components/RenderInput';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  Platform,
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
} from 'react-native-paper';
import {secondaryTheme, theme} from 'styles/theme';
import * as Yup from 'yup';
import _ from 'lodash';
import OpacityButton from 'components/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderSelect from 'components/RenderSelect';
import RenderDatePicker from 'components/RenderDatePicker';
import {round} from 'utils';
import dayjs from 'dayjs';

const PAYMENT_METHODS = [
  {
    label: 'Full payment',
    value: 1,
  },
  {
    label: 'Custom payment',
    value: 2,
  },
  {
    label: '1st Big Amount and Installment',
    value: 3,
  },
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
  other_charges_date: Yup.string('Invalid').when(
    'charges',
    (charges, keySchema) =>
      charges.length > 0 ? keySchema.required('Required') : keySchema,
  ),
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
});

function RenderOneBigInstallmentPaymentForm(props) {
  const {formikProps, t} = props;
  const {values, setFieldValue, handleChange, errors} = formikProps;

  const handlePercentChange = (percent) => {
    percent = parseFloat(percent);
    percent = round(percent > 100 ? 100 : percent);

    const amount = round(values.area_amount * (percent / 100));

    setFieldValue('first_big_amount_percent', percent);
    setFieldValue('first_big_amount', amount);
  };

  const handleAmountChange = (amount) => {
    amount = parseFloat(amount);
    amount = round(amount > values.area_amount ? values.area_amount : amount);

    const percent = round((amount / values.area_amount) * 100);

    setFieldValue('first_big_amount_percent', percent);
    setFieldValue('first_big_amount', amount);
  };

  const installments = useMemo(() => {
    const {
      installment_count,
      installment_start_date,
      installment_interval_days,
      area_amount,
      big_installment,
    } = values;
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
            (area_amount - (big_installment.amount || 0)) / installment_count,
          ),
        }));
    }

    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    values.installment_count,
    values.installment_start_date,
    values.installment_interval_days,
    values.area_amount,
    values.big_installment,
  ]);

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
                keyboardType="number-pad"
                value={values.first_big_amount_percent}
                onChangeText={(value) => handlePercentChange(value)}
                placeholder={'%'}
                error={errors.first_big_amount_percent}
                left={
                  <TextInput.Icon
                    name="minus"
                    theme={secondaryTheme}
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
                    theme={secondaryTheme}
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
                placeholder={t('label_amount')}
                left={<TextInput.Affix theme={secondaryTheme} text="₹" />}
                error={errors.first_big_amount}
                onChangeText={(value) => handleAmountChange(value)}
              />
            </View>
          </View>
          <View style={styles.inputRowContainer}>
            <View style={styles.dateInputContainer}>
              <RenderDatePicker
                name="first_big_amount_start_date"
                label={t('label_start_date')}
                value={values.first_big_amount_start_date}
                placeholder={t('label_start_date')}
                error={errors.first_big_amount_start_date}
                onChange={(value) => {
                  setFieldValue('first_big_amount_start_date', value);
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <RenderDatePicker
                name="first_big_amount_end_date"
                label={t('label_end_date')}
                value={values.first_big_amount_end_date}
                placeholder={t('label_end_date')}
                error={errors.first_big_amount_end_date}
                onChange={(value) => {
                  setFieldValue('first_big_amount_end_date', value);
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
        value={values.installments_count}
        placeholder={t('label_no_of_installments')}
        error={errors.installment_count}
        onChangeText={handleChange('installment_count')}
      />
      <View style={styles.installmentDetailsRow}>
        <View style={{flex: 1, paddingRight: 10}}>
          <RenderDatePicker
            name="installment_start_date"
            label={t('label_start_date')}
            value={values.installment_start_date}
            placeholder={t('label_start_date')}
            error={errors.installment_start_date}
            onChange={(value) => {
              setFieldValue('installment_start_date', value);
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <RenderInput
            name={'installment_interval_days'}
            label={t('label_interval_days')}
            keyboardType="number-pad"
            value={values.installment_interval_days}
            placeholder={t('label_interval_days')}
            error={errors.installment_interval_days}
            onChangeText={handleChange('installment_interval_days')}
          />
        </View>
      </View>
      {installments.length > 0 ? (
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
              <View style={styles.installmentRow}>
                <Subheading theme={secondaryTheme}>{index + 1}</Subheading>
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
                    left={<TextInput.Affix theme={secondaryTheme} text="₹" />}
                  />
                </View>
              </View>
            );
          })}
        </>
      ) : null}
    </>
  );
}

function RenderCustomPaymentForm(props) {
  const {formikProps, t} = props;
  const {values, setFieldValue, errors} = formikProps;

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

  const handlePercentChange = (index, percent) => {
    let custom_payments = _.cloneDeep(values.custom_payments);
    custom_payments.splice(index, 1);
    percent = parseFloat(percent);

    const addedPercent = custom_payments.reduce(
      (sum, item) => sum + item.percent || 0,
      0,
    );

    const remainingPercent = 100 - addedPercent;
    percent = percent > remainingPercent ? remainingPercent : percent;

    const amount = values.area_amount * (percent / 100);

    setAmountData(index, {percent: round(percent), amount: round(amount)});
  };

  const handleAmountChange = (index, amount) => {
    let custom_payments = _.cloneDeep(values.custom_payments);
    custom_payments.splice(index, 1);

    const addedAmount = custom_payments.reduce(
      (sum, payment) => sum + payment.amount,
      0,
    );

    const remainingAmount = values.area_amount - addedAmount;
    amount = amount > remainingAmount ? remainingAmount : amount;

    const percent = round((amount / values.area_amount) * 100);

    setAmountData(index, {percent: round(percent), amount: round(amount)});
  };

  const addNewPayment = () => {
    const custom_payments = _.cloneDeep(values.custom_payments || []);
    custom_payments.push({});
    setFieldValue('custom_payments', custom_payments);
  };

  const removePayment = (index) => {
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
          <>
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
                      keyboardType="number-pad"
                      value={percent}
                      onChangeText={(value) =>
                        handlePercentChange(index, value)
                      }
                      placeholder={'%'}
                      left={
                        <TextInput.Icon
                          name="minus"
                          theme={secondaryTheme}
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
                          theme={secondaryTheme}
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
                      placeholder={t('label_amount')}
                      left={<TextInput.Affix theme={secondaryTheme} text="₹" />}
                      onChangeText={(value) => handleAmountChange(index, value)}
                    />
                  </View>
                </View>
                <View style={{marginTop: 5}}>
                  <RenderDatePicker
                    name="date"
                    label={t('label_date')}
                    value={date}
                    placeholder={t('label_date')}
                    onChange={(value) => {
                      setValue(index, 'date', value);
                    }}
                  />
                </View>
                <View style={{marginTop: 5, marginBottom: 10}}>
                  <RenderInput
                    name="remark"
                    multiline
                    label={t('label_remark')}
                    value={remark}
                    placeholder={t('label_remark')}
                    onChangeText={(value) => {
                      setValue(index, 'remark', value);
                    }}
                  />
                </View>
              </View>
              {values.custom_payments.length > 1 ? (
                <OpacityButton
                  color={'#FF5D5D'}
                  opacity={0.1}
                  onPress={() => removePayment(index)}>
                  <MaterialIcons name={'close'} color={'#FF5D5D'} size={19} />
                </OpacityButton>
              ) : null}
            </View>
          </>
        );
      })}
      <TouchableOpacity style={styles.chargesButton} onPress={addNewPayment}>
        <Caption style={{color: theme.colors.primary}}>+ Create more</Caption>
      </TouchableOpacity>
    </>
  );
}

function RenderPaymentForm(props) {
  const {formikProps, t} = props;
  const {values, errors, handleChange, setFieldValue, handleBlur} = formikProps;
  console.log('-----> errors', errors);
  const totalCharge = useMemo(() => {
    return values.charges.reduce(
      (sum, charge) => sum + parseInt(charge.amount, 10) || 0,
      0,
    );
  }, [values.charges]);
  return (
    <View style={{marginTop: 10}}>
      <RenderInput
        name={'basic_amount'}
        label={t('label_basic_amount')}
        keyboardType="number-pad"
        value={values.area_amount}
        disabled={true}
        onChangeText={handleChange('basic_amount')}
        placeholder={t('label_basic_amount')}
        error={errors.basic_amount}
        left={<TextInput.Affix theme={secondaryTheme} text="₹" />}
      />
      {values.payment_type === 1 ? (
        <View style={styles.inputRowContainer}>
          <View style={styles.dateInputContainer}>
            <RenderDatePicker
              name="start_date"
              label={t('label_start_date')}
              value={values.start_date}
              placeholder={t('label_start_date')}
              error={errors.start_date}
              onChange={(date) => {
                setFieldValue('start_date', date);
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <RenderDatePicker
              name="end_date"
              label={t('label_end_date')}
              value={values.end_date}
              placeholder={t('label_end_date')}
              error={errors.end_date}
              onChange={(date) => {
                setFieldValue('end_date', date);
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
        style={{
          color: theme.colors.primary,
          marginTop: 15,
          marginBottom: 5,
          fontSize: 14,
        }}>
        Other Charges payment
      </Caption>

      <View style={styles.otherChargesContainer}>
        <View style={styles.dateInputContainer}>
          <RenderInput
            name={'other_charges_amount'}
            label={t('label_total_other_charges')}
            value={totalCharge}
            disabled={true}
            placeholder={t('label_total_other_charges')}
            left={<TextInput.Affix theme={secondaryTheme} text="₹" />}
          />
        </View>
        <View style={{flex: 1}}>
          <RenderDatePicker
            name="other_charges_date"
            label={t('label_date')}
            value={values.other_charges_date}
            placeholder={t('label_date')}
            error={errors.other_charges_date}
            onChange={(date) => {
              setFieldValue('other_charges_date', date);
            }}
          />
        </View>
      </View>
      <Caption
        style={{
          color: theme.colors.primary,
          marginTop: 15,
          fontSize: 14,
        }}>
        Remark
      </Caption>
      <RenderInput
        name="remark"
        multiline
        numberOfLines={Platform.OS === 'ios' ? null : 5}
        minHeight={Platform.OS === 'ios' && 4 ? 20 * 6 : null}
        label={t('label_remark')}
        containerStyles={styles.input}
        value={values.remark}
        onChangeText={handleChange('remark')}
        onBlur={handleBlur('remark')}
        returnKeyType="done"
        placeholder={t('label_remark')}
        error={errors.remark}
      />
    </View>
  );
}

function FormContent(props) {
  const {formikProps, navigation} = props;
  const {t} = useTranslation();

  const {handleSubmit, values, errors} = formikProps;

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

          <RenderSelect
            name={'payment_type'}
            label={t('label_payment_method')}
            options={PAYMENT_METHODS}
            containerStyles={styles.rateInput}
            value={values.payment_type}
            placeholder={t('label_payment_method')}
            error={errors.payment_type}
            onSelect={(value) => {
              formikProps.setFieldValue('payment_type', value);
              formikProps.setErrors({});
            }}
          />
          <RenderPaymentForm formikProps={formikProps} t={t} />
        </View>
        <View style={styles.actionContainer}>
          <Button
            style={styles.button}
            contentStyle={{padding: 5}}
            theme={{roundness: 15}}
            onPress={handleCancel}>
            <BaseText style={styles.cancelText}>{'Back'}</BaseText>
          </Button>
          <Button
            style={{flex: 1}}
            mode="contained"
            contentStyle={{padding: 5}}
            theme={{roundness: 15}}
            onPress={handleSubmit}>
            <BaseText style={styles.buttonText}>{'Save'}</BaseText>
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

function BookingPayments(props) {
  const {
    navigation,
    route: {params},
  } = props;

  const validate = (values) => {
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
        (sum, {percent}) => sum + percent,
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
      initialValues={{
        payment_type: 3,
        custom_payments: [{}],
        ...params,
      }}
      validationSchema={schema}
      onSubmit={async (values) => {
        // navigation.navigate('BC_Step_Six', {...params, ...values});
      }}>
      {(formikProps) => <FormContent {...props} formikProps={formikProps} />}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  rateInput: {
    marginTop: 5,
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
    flex: 0.6,
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
  cancelText: {
    fontSize: 18,
    color: theme.colors.primary,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default withTheme(BookingPayments);
