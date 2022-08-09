import React, {useEffect, useMemo, useState} from 'react';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  ScrollView,
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
  Caption,
  Text,
  Divider,
  IconButton,
} from 'react-native-paper';
import * as Yup from 'yup';
import _ from 'lodash';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import {round} from 'utils';
import dayjs from 'dayjs';
import useSalesActions from 'redux/actions/salesActions';
import Radio from 'components/Atoms/Radio';
import {useSelector} from 'react-redux';
import RenderHTML from 'react-native-render-html';
import Layout from 'utils/Layout';
import ActionButtons from 'components/Atoms/ActionButtons';
import CustomDialog from 'components/Atoms/CustomDialog';
import RichTextEditor from 'components/Atoms/RichTextEditor';
import {DOCUMENT_CHARGE_LIMIT} from 'utils/constant';
import {useSnackbar} from 'components/Atoms/Snackbar';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSalesLoading} from 'redux/selectors';
import CustomCheckbox from 'components/Atoms/CustomCheckbox';

const PAYMENT_METHODS = [
  {label: 'Full payment', value: 1},
  {label: 'Custom payment', value: 2},
  {label: 'Downpayment and Installment', value: 3},
];

const schema = Yup.object().shape({
  finalAmount: Yup.number('Invalid').required('Required'),
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
  loan_bank: Yup.string('Invalid').when('is_loan', {
    is: 'yes',
    then: Yup.string('Invalid').required('Required'),
  }),
  payment_type: Yup.string('Invalid').when('is_payment', {
    is: 'yes',
    then: Yup.string('Invalid').required('Required'),
  }),
  loan_amount: Yup.number('Invalid').when('is_loan', {
    is: 'yes',
    then: Yup.number('Invalid').required('Required'),
  }),
  document_start_date: Yup.string('Invalid').when(
    'documentCharge',
    (documentCharge, keySchema) =>
      Number(documentCharge) ? keySchema.required('Required') : keySchema,
  ),
  document_end_date: Yup.string('Invalid').when(
    'documentCharge',
    (documentCharge, keySchema) =>
      Number(documentCharge) ? keySchema.required('Required') : keySchema,
  ),
});

export function RenderInstallments(props) {
  const {theme, installments} = props;

  if (installments?.length) {
    return (
      <>
        <Caption
          style={[styles.installmentHeading, {color: theme.colors.primary}]}>
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
            <View key={index?.toString()} style={styles.installmentRow}>
              <Subheading>{index + 1}</Subheading>
              <View style={styles.installmentValue}>
                <RenderInput
                  value={dayjs(installment.date).format('DD/MM/YYYY')}
                  disabled
                />
              </View>
              <View style={styles.installmentValue}>
                <RenderInput
                  value={installment.amount}
                  disabled
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
  const {formikProps, t, theme} = props;
  const {values, setFieldValue, handleChange, errors} = formikProps;
  const {
    installment_count,
    installment_start_date,
    installment_interval_days,
    finalAmount,
    big_installment_amount,
    first_big_amount,
    first_big_amount_percent,
    first_big_amount_start_date,
    first_big_amount_end_date,
  } = values;

  const snackbar = useSnackbar();

  useEffect(() => {
    if (
      installment_count &&
      installment_start_date &&
      installment_interval_days
    ) {
      const installments = new Array(Number(installment_count))
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

      setFieldValue('installments', installments);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    installment_count,
    installment_start_date,
    installment_interval_days,
    finalAmount,
    big_installment_amount,
  ]);

  const calculateAmount = percent => {
    percent = parseFloat(percent);
    percent = round(percent > 100 ? 100 : percent);
    const amount = round(finalAmount * (percent / 100));

    setFieldValue('first_big_amount_percent', percent);
    setFieldValue('first_big_amount', amount);
  };

  const handlePercentChange = percent => {
    if (!finalAmount) {
      snackbar.showMessage({
        message: 'Please provide final amount',
        variant: 'warning',
      });
      return;
    }

    setFieldValue('first_big_amount_percent', percent);
    calculateAmount(percent);
  };

  const calcPercentage = amount => {
    amount = parseFloat(amount);
    amount = round(amount > finalAmount ? finalAmount : amount);

    const percent = round((amount / finalAmount) * 100);

    setFieldValue('first_big_amount_percent', percent);
    setFieldValue('first_big_amount', amount);
  };

  const handleAmountChange = amount => {
    if (!finalAmount) {
      snackbar.showMessage({
        message: 'Please provide final amount',
        variant: 'warning',
      });
      return;
    }

    setFieldValue('first_big_amount', amount);
    calcPercentage(amount);
  };

  return (
    <>
      <Caption
        style={[styles.bigInstallmentTitle, {color: theme.colors.primary}]}>
        1st BIG Installment
      </Caption>
      <View style={styles.customPaymentContainer}>
        <View style={styles.customInputsContainer}>
          <View style={styles.customPaymentRowContainer}>
            <View style={styles.dateInputContainer}>
              <RenderInput
                name="first_big_amount_percent"
                label="%"
                keyboardType="decimal-pad"
                value={first_big_amount_percent}
                onChangeText={handlePercentChange}
                error={errors.first_big_amount_percent}
                left={
                  <TextInput.Icon
                    name="minus"
                    color={theme.colors.error}
                    onPress={() => {
                      handlePercentChange(
                        first_big_amount_percent > 0
                          ? first_big_amount_percent - 1
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
                      handlePercentChange((first_big_amount_percent || 0) + 1);
                    }}
                  />
                }
              />
            </View>
            <View style={styles.flexInput}>
              <RenderInput
                name="first_big_amount"
                label={t('label_amount')}
                keyboardType="number-pad"
                value={first_big_amount}
                left={<TextInput.Affix text="₹" />}
                error={errors.first_big_amount}
                onChangeText={handleAmountChange}
              />
            </View>
          </View>
          <View style={styles.inputRowContainer}>
            <View style={styles.dateInputContainer}>
              <RenderDatePicker
                name="first_big_amount_start_date"
                label={t('label_start_date')}
                value={first_big_amount_start_date}
                error={errors.first_big_amount_start_date}
                onChange={value => {
                  setFieldValue(
                    'first_big_amount_start_date',
                    dayjs(value).format('YYYY-MM-DD'),
                  );
                }}
              />
            </View>
            <View style={styles.flexInput}>
              <RenderDatePicker
                name="first_big_amount_end_date"
                label={t('label_end_date')}
                value={first_big_amount_end_date}
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
        style={[styles.otherDetailsTitle, {color: theme.colors.primary}]}>
        Other Installment Details
      </Caption>
      <RenderInput
        name="installment_count"
        label={t('label_no_of_installments')}
        keyboardType="number-pad"
        value={installment_count}
        error={errors.installment_count}
        onChangeText={handleChange('installment_count')}
      />
      <View style={styles.installmentDetailsRow}>
        <View style={styles.dateInputContainer}>
          <RenderDatePicker
            name="installment_start_date"
            label={t('label_start_date')}
            value={installment_start_date}
            error={errors.installment_start_date}
            onChange={value => {
              setFieldValue(
                'installment_start_date',
                dayjs(value).format('YYYY-MM-DD'),
              );
            }}
          />
        </View>
        <View style={styles.flexInput}>
          <RenderInput
            name="installment_interval_days"
            label={t('label_interval_days')}
            keyboardType="number-pad"
            value={installment_interval_days}
            error={errors.installment_interval_days}
            onChangeText={handleChange('installment_interval_days')}
          />
        </View>
      </View>
      <RenderInstallments {...props} {...values} />
    </>
  );
}

function RenderCustomPaymentForm(props) {
  const {theme, formikProps, t} = props;
  const {values, setFieldValue, errors} = formikProps;
  const {colors} = theme;

  const snackbar = useSnackbar();

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
    if (!values.finalAmount) {
      snackbar.showMessage({
        message: 'Please provide final amount',
        variant: 'warning',
      });
      return;
    }

    setAmountData(index, {percent});
    calculateAmount(index, percent);
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
    if (!values.finalAmount) {
      snackbar.showMessage({
        message: 'Please provide final amount',
        variant: 'warning',
      });
      return;
    }

    setAmountData(index, {amount: round(amount)});
    calcPercentage(index, amount);
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
      <Caption style={[styles.otherDetailsTitle, {color: colors.primary}]}>
        Payments
      </Caption>

      {errors.payment ? (
        <Caption style={{color: colors.error}}>{errors.payment}</Caption>
      ) : null}
      {values.custom_payments.map(({percent, amount, date, remark}, index) => {
        return (
          <View key={index?.toString()}>
            {values.custom_payments.length > 1 ? (
              <Caption
                style={[styles.paymentFormContainer, {color: colors.primary}]}>
                {`Installment No. ${index + 1}`}
              </Caption>
            ) : null}
            <View key={index?.toString()} style={styles.customPaymentContainer}>
              <View style={styles.customInputsContainer}>
                <View style={styles.customPaymentRowContainer}>
                  <View style={styles.dateInputContainer}>
                    <RenderInput
                      name="percent"
                      label="%"
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
                  <View style={styles.customInputsContainer}>
                    <RenderInput
                      name="amount"
                      label={t('label_amount')}
                      keyboardType="number-pad"
                      value={amount}
                      left={<TextInput.Affix text="₹" />}
                      onChangeText={value => handleAmountChange(index, value)}
                    />
                  </View>
                </View>
                <View style={styles.rateInput}>
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
                <View style={styles.customRemarkContainer}>
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
                  style={styles.removePaymentButton}
                  onPress={() => removePayment(index)}>
                  <MaterialIcons
                    name="close"
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
        <TouchableOpacity
          style={[styles.chargesButton, {borderColor: theme.colors.primary}]}
          onPress={addNewPayment}>
          <Caption style={{color: theme.colors.primary}}>+ Create more</Caption>
        </TouchableOpacity>
      ) : null}
    </>
  );
}

function RenderDocumentChargesPayment(props) {
  const {route, theme, formikProps, t} = props;
  const {withRate} = route?.params || {};
  const {values, errors, setFieldValue, handleChange, handleBlur} = formikProps;

  return (
    <>
      <Caption style={[styles.headingLabel, {color: theme.colors.primary}]}>
        Document Charges
      </Caption>
      <View style={styles.docChargesSection}>
        <RenderInput
          name="documentCharge"
          label={t('label_documentation_charges')}
          onChangeText={handleChange('documentCharge')}
          onBlur={handleBlur('documentCharge')}
          value={values.documentCharge}
          editable={!withRate}
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
          <View style={styles.customInputsContainer}>
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

function ConditionsDialog(props) {
  const {title, value, handleSubmit} = props;

  const [text, setText] = useState(value);

  return (
    <CustomDialog
      {...props}
      title={title}
      submitForm={() => handleSubmit(text)}>
      <RichTextEditor
        style={styles.textEditor}
        height={200}
        placeholder="Input Test here..."
        value={text}
        onChangeText={setText}
      />
    </CustomDialog>
  );
}

function RenderPaymentForm(props) {
  const {theme, formikProps, route, t} = props;
  const {withRate} = route?.params || {};
  const {values, errors, handleChange, setFieldValue, handleBlur} = formikProps;

  const {commonData} = useSelector(s => s.project);

  const [conditionsDialog, setConditionsDialog] = useState(false);

  const TCOptions = useMemo(() => {
    return commonData?.booking_TandC?.map(i => ({label: i.title, value: i.id}));
  }, [commonData?.booking_TandC]);

  useEffect(() => {
    const terms = commonData?.booking_TandC?.find(
      i => i.id === values.termsAndConditions,
    );
    if (terms?.description) {
      setFieldValue('termsDescription', terms?.description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commonData?.booking_TandC, values.termsAndConditions]);

  const toggleConditionsDialog = () => setConditionsDialog(v => !v);

  return (
    <View style={styles.paymentFormContainer}>
      {conditionsDialog ? (
        <ConditionsDialog
          open={conditionsDialog}
          value={values.termsDescription}
          title="Update Terms"
          handleClose={toggleConditionsDialog}
          handleSubmit={v => {
            setFieldValue('termsDescription', v);
            toggleConditionsDialog();
          }}
        />
      ) : null}
      {values.isDocumentCharge ? (
        <RenderDocumentChargesPayment {...props} />
      ) : null}
      <RenderInput
        label={t('label_final_amount')}
        value={values.finalAmount}
        editable={!withRate}
        error={errors.finalAmount}
        onChangeText={handleChange('finalAmount')}
        onBlur={handleBlur('finalAmount')}
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
              onChange={v => {
                setFieldValue('start_date', dayjs(v).format('YYYY-MM-DD'));
              }}
            />
          </View>
          <View style={styles.flexInput}>
            <RenderDatePicker
              name="end_date"
              label={t('label_end_date')}
              value={values.end_date}
              error={errors.end_date}
              onChange={v => {
                setFieldValue('end_date', dayjs(v).format('YYYY-MM-DD'));
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

      <RenderSelect
        name="termsAndConditions"
        label="Terms and conditions"
        options={TCOptions}
        style={styles.paymentFormContainer}
        value={values.termsAndConditions}
        error={errors.termsAndConditions}
        onSelect={value => setFieldValue('termsAndConditions', value)}
      />

      {values.termsDescription ? (
        <View style={styles.termsBox}>
          <ScrollView nestedScrollEnabled>
            <RenderHTML
              source={{html: values.termsDescription}}
              contentWidth={Layout.window.width}
            />
          </ScrollView>
          <OpacityButton
            color={theme.colors.primary}
            opacity={1}
            style={styles.conditionsButton}
            onPress={toggleConditionsDialog}>
            <MaterialCommunityIcons
              name="pencil"
              color={theme.colors.white}
              size={16}
            />
          </OpacityButton>
        </View>
      ) : null}
    </View>
  );
}

function FormContent(props) {
  const {theme, formikProps, bankList, navigation} = props;

  const {handleSubmit, values, errors, setFieldValue, handleChange, resetForm} =
    formikProps;

  const {t} = useTranslation();
  const handleCancel = () => navigation.goBack();

  useEffect(() => {
    resetForm();
    setFieldValue('payment_type', values.payment_type);
    setFieldValue('documentCharge', values.documentCharge);
    setFieldValue('finalAmount', values.finalAmount);
    setFieldValue('document_start_date', values.document_start_date);
    setFieldValue('document_end_date', values.document_end_date);
    setFieldValue('is_loan', values.is_loan);
    setFieldValue('payment_type', values.payment_type);
    setFieldValue('loan_bank', values.loan_bank);
    setFieldValue('loan_amount', values.loan_amount);
    setFieldValue('loan_remark', values.loan_remark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.payment_type]);

  useEffect(() => {
    resetForm();
    setFieldValue('finalAmount', values.finalAmount);
    setFieldValue('payment_type', values.payment_type);
    setFieldValue('documentCharge', values.documentCharge);
    setFieldValue('document_start_date', values.document_start_date);
    setFieldValue('document_end_date', values.document_end_date);
    setFieldValue('is_loan', values.is_loan);
    setFieldValue('payment_type', values.payment_type);
    setFieldValue('loan_bank', values.loan_bank);
    setFieldValue('loan_amount', values.loan_amount);
    setFieldValue('loan_remark', values.loan_remark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.finalAmount]);

  const snackbar = useSnackbar();

  useEffect(() => {
    if (values.documentCharge > DOCUMENT_CHARGE_LIMIT) {
      snackbar.showMessage({
        message: 'Document charges cannot be more than ₹20,000',
        variant: 'warning',
      });

      setFieldValue('documentCharge', DOCUMENT_CHARGE_LIMIT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.documentCharge]);

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={30}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.headingContainer}
            onPress={navigation.goBack}>
            <IconButton
              icon="keyboard-backspace"
              color={theme.colors.primary}
            />
            <Subheading style={{color: theme.colors.primary}}>
              3. Payment Installment
            </Subheading>
          </TouchableOpacity>

          <View style={styles.radioRow}>
            <Text>Do you wish to take a loan?</Text>
            <View style={styles.radioContainer}>
              <Radio
                label="Yes"
                value="yes"
                checked={values.is_loan === 'yes'}
                onChange={value => setFieldValue('is_loan', value)}
              />
              <Radio
                label="No"
                value="no"
                color={theme.colors.error}
                checked={values.is_loan === 'no'}
                onChange={value => setFieldValue('is_loan', value)}
              />
            </View>
          </View>

          <View style={styles.radioRow}>
            <Text>Payment Method?</Text>
            <View style={styles.radioContainer}>
              <Radio
                label="Yes"
                value="yes"
                checked={Boolean(values.payment_type)}
                onChange={() => setFieldValue('payment_type', 1)}
              />
              <Radio
                label="No"
                value="no"
                color={theme.colors.error}
                checked={!values.payment_type}
                onChange={() => setFieldValue('payment_type', 0)}
              />
            </View>
          </View>

          {values.is_loan === 'yes' ? (
            <View style={styles.loadInputs}>
              <View style={styles.otherChargesContainer}>
                <View style={styles.dateInputContainer}>
                  <RenderSelect
                    name="loan_bank"
                    label={t('label_choose_bank')}
                    options={bankList}
                    value={values.loan_bank}
                    truncateLength={15}
                    error={errors.loan_bank}
                    onSelect={value => {
                      formikProps.setFieldValue('loan_bank', value);
                    }}
                  />
                </View>
                <View style={styles.customInputsContainer}>
                  <RenderInput
                    name="loan_amount"
                    label={t('label_amount')}
                    keyboardType="number-pad"
                    value={values.loan_amount}
                    left={<TextInput.Affix text="₹" />}
                    onChangeText={handleChange('loan_amount')}
                  />
                </View>
              </View>
              <View style={styles.rateInput}>
                <RenderInput
                  name="loan_remark"
                  label={t('label_remark')}
                  value={values.loan_remark}
                  onChangeText={handleChange('loan_remark')}
                />
              </View>
              <Divider style={styles.loanDivider} />
            </View>
          ) : null}

          {values.payment_type === 1 ? (
            <>
              <RenderSelect
                name="payment_type"
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
              <RenderPaymentForm {...props} {...{formikProps, t}} />
            </>
          ) : null}
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.checkBox}>
            <CustomCheckbox
              label="Save with OTP"
              checked={values.booking_confirm_via_otp === 'yes'}
              onChange={() => {
                setFieldValue(
                  'booking_confirm_via_otp',
                  values.booking_confirm_via_otp === 'yes' ? 'no' : 'yes',
                );
              }}
            />
          </View>

          <ActionButtons
            cancelLabel="Back"
            submitLabel="Save"
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            style={styles.actionButtons}
          />
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

function BookingPayments(props) {
  const {navigation, route = {}} = props;
  const {params = {}} = route;
  const {
    withRate,
    document_start,
    document_end,
    user_id_info,
    customer_phone,
    unit_id,
  } = params;

  const {createBooking, getBankList, getBookingFormOTPStatus} =
    useSalesActions();
  const loading = useSalesLoading();

  const [paymentMethod, setPaymentMethod] = useState(false);
  const {visitors} = useSelector(s => s.project);
  const {bankList, bookingOTPStatus} = useSelector(s => s.sales);
  const {booking_confirm_otp_status} = bookingOTPStatus || {};
  console.log('-------->bankList', bankList);

  const {selectedProject} = useSelector(s => s.project);
  const projectId = selectedProject.id;

  const visitorDetails = useMemo(() => {
    return visitors.find(visitor => visitor.id === user_id_info);
  }, [user_id_info, visitors]);

  useEffect(() => {
    getBankList();
    getBookingFormOTPStatus({project_id: projectId});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues = useMemo(() => {
    const documentCharge = withRate ? `${document_start}.${document_end}` : '';
    const isDocumentCharge = withRate ? Number(documentCharge) : true;

    return {
      payment_type: 1,
      custom_payments: [{}],
      is_loan: 'no',
      is_payment: 'no',
      documentCharge,
      isDocumentCharge,
      ...route?.params,
    };
  }, [document_end, document_start, route?.params, withRate]);

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
        return null;
      });

      const totalPercent = values.custom_payments.reduce(
        (sum, i) => sum + parseFloat(i.percent),
        0,
      );

      if (totalPercent !== 100) {
        errors.payment = 'Sum of all payments does not match Final amount';
      }
    }

    return errors;
  };

  const onSubmit = async values => {
    const data = {...values};

    if (values.payment_type !== 2) {
      delete data.custom_payments;
    }

    data.main_total_amount = data.finalAmount;
    if (values.payment_type === 1) {
      data.full_basic_amount = data.finalAmount;
    }

    if (values.project_main_types === 4) {
      data.area_for_super_buildup__bunglow =
        values.construction_super_buildup_area;
      data.rate_super_buildup_bunglow = values.construction_super_buildup_rate;
      data.area_for_buildup_bunglow = values.construction_build_area;
      data.rate_for_buildup_bunglow = values.construction_build_rate;
      data.total_super_buildup_construction_amount = values.total_construction;
      data.total_buildup_construction_amount = values.total_construction;
    }

    if (values.installments?.length) {
      data.installments = values.installments.map(i => ({
        installment_date: i.date.format('DD-MM-YYYY'),
        installment_amount: i.amount,
      }));
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
          data.installment_payment_documentation_charges = data.documentCharge;
          data.installment_payment_documentation_charges_start_date =
            data.document_start_date;
          data.installment_payment_documentation_charges_end_date =
            data.document_end_date;
          break;
        default:
      }
    }

    if (data.payment_type === 1) {
      data.full_payment_remark = data.termsDescription;
    } else if (data.payment_type === 2) {
      data.custom_payment_remark = data.termsDescription;
    } else if (data.payment_type === 3) {
      data.installment_payment_remarks = data.termsDescription;
    }

    delete data.broker;
    delete data.documentCharge;
    delete data.isDocumentCharge;
    delete data.document_start;
    delete data.document_end;
    delete data.document_start_date;
    delete data.document_end_date;
    delete data.finalAmount;
    delete data.termsDescription;
    delete data.termsAndConditions;
    delete data.construction_super_buildup_area;
    delete data.construction_super_buildup_rate;
    delete data.construction_build_area;
    delete data.construction_build_rate;
    delete data.total_construction;

    const result = await createBooking(data);

    if (values.booking_confirm_via_otp === 'yes') {
      navigation.navigate('BookingOtp', {
        fromBooking: true,
        bookingID: result.value.id,
        userPhone: customer_phone || visitorDetails?.phone,
        unit_id,
      });
    } else {
      navigation.popToTop();
    }
  };

  return (
    <>
      <Spinner visible={loading} textContent="" />
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        validate={paymentMethod ? validate : undefined}
        initialValues={initialValues}
        validationSchema={paymentMethod ? schema : undefined}
        onSubmit={onSubmit}>
        {formikProps => (
          <FormContent
            {...props}
            {...{formikProps, bankList, paymentMethod, setPaymentMethod}}
          />
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  headingContainer: {
    marginLeft: -10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentFormContainer: {
    marginTop: 10,
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
  headingLabel: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 14,
  },
  chargesButton: {
    borderWidth: StyleSheet.hairlineWidth,
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
  termsBox: {
    position: 'relative',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 10,
    marginTop: 10,
    maxHeight: 200,
  },
  loanDivider: {
    marginTop: 25,
    marginBottom: 20,
  },
  bigInstallmentTitle: {
    marginTop: 20,
    marginBottom: -10,
    fontSize: 14,
  },
  conditionsButton: {
    padding: 5,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  textEditor: {
    flexGrow: 1,
    margin: 10,
  },
  installmentHeading: {
    marginTop: 15,
  },
  installmentValue: {
    flex: 0.4,
  },
  flexInput: {
    flex: 1,
  },
  otherDetailsTitle: {
    marginTop: 15,
    fontSize: 14,
  },
  removePaymentButton: {
    marginLeft: 15,
    borderRadius: 20,
  },
  customRemarkContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 25,
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  actionButtons: {marginTop: 5},
});

export default withTheme(BookingPayments);
