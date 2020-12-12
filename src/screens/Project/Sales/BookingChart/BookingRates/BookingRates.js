import React, {useMemo, useState} from 'react';
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
  Portal,
  Dialog,
} from 'react-native-paper';
import {secondaryTheme, theme} from 'styles/theme';
import {round} from 'utils';
import * as Yup from 'yup';
import _ from 'lodash';
import OpacityButton from 'components/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderSelect from 'components/RenderSelect';

const schema = Yup.object().shape({
  first_name: Yup.string('Invalid').required('Required'),
  last_name: Yup.string('Invalid').required('Required'),
  email: Yup.string('Invalid').email('Invalid').required('Required'),
  phone: Yup.number('Invalid').required('Required'),
  occupation: Yup.string('Invalid').required('Required'),
  current_locality: Yup.string('Invalid').required('Required'),
  budget_from: Yup.number('Invalid').required('Required'),
  budget_to: Yup.number('Invalid').required('Required'),
  follow_up_date: Yup.date('Invalid').required('Required'),
  follow_up_time: Yup.date('Invalid').required('Required'),
  assign_to: Yup.string('Invalid').required('Required'),
  inquiry_for: Yup.string('Invalid').required('Required'),
});

const TYPES = ['super_buildup', 'buildup', 'carpet'];

function getType(key) {
  const splits = key.split('_');
  splits.splice(splits.length - 1, 1);
  return splits.join('_');
}

function RatesColumn(props) {
  const {t, formikProps, label, type: rateType, syncAmounts} = props;

  const {values, handleBlur, errors, setFieldValue} = formikProps;

  const handleAreaChange = (key, area) => {
    setFieldValue(key, area);

    const type = getType(key);

    const amount = values.area_amount;
    if (amount) {
      const rate = amount / area;
      setFieldValue(`${type}_rate`, round(rate));
    }
  };

  const handleRateChange = (key, rate) => {
    setFieldValue(key, rate);

    const type = getType(key);

    let area = values[`${type}_area`];
    let amount = values.area_amount;
    if (area) {
      amount = area * rate;
      setFieldValue('area_amount', round(amount));
      const otherTypes = TYPES.filter((v) => v !== type);

      syncAmounts(amount, otherTypes);
    }
  };

  return (
    <View style={styles.rateInputContainer}>
      <Caption style={{color: theme.colors.primary}}>{label}</Caption>
      <RenderInput
        name={`${rateType}_area`}
        label={t('label_area')}
        keyboardType="number-pad"
        multiline={true}
        value={values[`${rateType}_area`]}
        onChangeText={(value) => handleAreaChange(`${rateType}_area`, value)}
        onBlur={handleBlur(`${rateType}_area`)}
        placeholder={t('label_area')}
        error={errors[`${rateType}_area`]}
      />
      <RenderSelect
        name={`${rateType}_unit`}
        label={t('label_unit')}
        options={[
          {
            label: 'SQM',
            value: 1,
          },
        ]}
        containerStyles={styles.rateInput}
        value={values[`${rateType}_unit`]}
        placeholder={t('label_unit')}
        error={errors[`${rateType}_unit`]}
        onSelect={(value) => {
          setFieldValue(`${rateType}_unit`, value);
        }}
      />
      <RenderInput
        name={`${rateType}_rate`}
        label={t('label_rate')}
        keyboardType="number-pad"
        multiline={true}
        containerStyles={styles.rateInput}
        value={values[`${rateType}_rate`]}
        onChangeText={(value) => handleRateChange(`${rateType}_rate`, value)}
        onBlur={handleBlur(`${rateType}_rate`)}
        placeholder={t('label_rate')}
        error={errors[`${rateType}_rate`]}
      />
    </View>
  );
}

function RenderRates(props) {
  const {t, formikProps} = props;
  const {values, handleBlur, errors, setFieldValue} = formikProps;

  const syncAmounts = (amount, types) => {
    types.map((type) => {
      const area = values[`${type}_area`];
      if (area) {
        const rate = amount / area;
        setFieldValue(`${type}_rate`, round(rate));
      }
    });
  };

  const handleAmountChange = (key, amount) => {
    setFieldValue(key, amount);
    syncAmounts(amount, TYPES);
  };

  return (
    <>
      <View style={styles.ratesContainer}>
        <RatesColumn
          {...props}
          label={'Super Buildup'}
          type="super_buildup"
          syncAmounts={syncAmounts}
        />
        <RatesColumn
          {...props}
          label={'Buildup'}
          type="buildup"
          syncAmounts={syncAmounts}
        />
        <RatesColumn
          {...props}
          label={'Carpet'}
          type="carpet"
          syncAmounts={syncAmounts}
        />
      </View>
      <View>
        <RenderInput
          name={'area_amount'}
          label={t('label_amount')}
          keyboardType="number-pad"
          containerStyles={styles.rateInput}
          value={values.area_amount}
          onChangeText={(value) => handleAmountChange('area_amount', value)}
          onBlur={handleBlur('area_amount')}
          placeholder={t('label_amount')}
          error={errors.area_amount}
          left={<TextInput.Affix theme={secondaryTheme} text="₹" />}
        />
      </View>
    </>
  );
}

function RenderCharges({formikProps, t}) {
  const {values, errors, handleBlur, setFieldValue} = formikProps;

  const [chargeModal, setChargeModal] = useState(false);
  const [chargeLabel, setChargeLabel] = useState('');
  const [chargeError, setChargeError] = useState();

  const toggleChargeModal = () => {
    setChargeModal((v) => !v);
    setChargeLabel();
    setChargeError();
  };

  const handleAmountChange = (index, amount) => {
    const charges = _.cloneDeep(values.charges);

    charges[index].amount = amount;
    setFieldValue('charges', charges);
  };

  const saveCharge = () => {
    const charges = _.cloneDeep(values.charges);

    let index = charges.findIndex(
      (charge) => charge.charge.toLowerCase() === chargeLabel.toLowerCase(),
    );

    if (index > -1) {
      setChargeError('Charge Already Added');
      return;
    }

    if (chargeLabel) {
      charges.push({charge: chargeLabel});
      setFieldValue('charges', charges);
    }
    toggleChargeModal();
  };

  const removeCharge = (index) => {
    const charges = _.cloneDeep(values.charges);
    charges.splice(index, 1);
    setFieldValue('charges', charges);
  };

  return (
    <>
      <Portal>
        <Dialog visible={chargeModal} onDismiss={toggleChargeModal}>
          <Dialog.Content>
            <Subheading theme={secondaryTheme}>Add a new Charge :</Subheading>
            <RenderInput
              name={'charge'}
              label={t('label_charge')}
              multiline={true}
              value={chargeLabel}
              onChangeText={(value) => setChargeLabel(value)}
              placeholder={t('label_charge')}
              error={chargeError}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={saveCharge}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Subheading style={{color: theme.colors.primary, marginTop: 20}}>
        Other Charges
      </Subheading>
      {values.charges.map((charge, i) => {
        return (
          <View style={styles.chargesContainer}>
            <RenderInput
              name={'charge'}
              label={charge.charge}
              keyboardType="number-pad"
              containerStyles={styles.chargeInput}
              multiline={true}
              value={charge.amount}
              onChangeText={(value) => handleAmountChange(i, value)}
              onBlur={handleBlur('charge')}
              placeholder={charge.charge}
              error={errors.charge}
              left={<TextInput.Affix theme={secondaryTheme} text="₹" />}
            />
            <OpacityButton
              color={'#FF5D5D'}
              opacity={0.1}
              onPress={() => removeCharge(i)}>
              <MaterialIcons name={'close'} color={'#FF5D5D'} size={19} />
            </OpacityButton>
          </View>
        );
      })}
      <TouchableOpacity
        style={styles.chargesButton}
        onPress={toggleChargeModal}>
        <Caption style={{color: theme.colors.primary}}>+ Create more</Caption>
      </TouchableOpacity>
    </>
  );
}

function FormContent(props) {
  const {theme, formikProps, navigation} = props;
  const {t} = useTranslation();

  const {handleSubmit, values} = formikProps;

  const handleCancel = () => navigation.goBack();

  const totalCharge = useMemo(() => {
    return values.charges.reduce(
      (sum, charge) => sum + parseInt(charge.amount, 10) || 0,
      0,
    );
  }, [values.charges]);

  const totalAmount = useMemo(() => {
    return (
      parseInt(totalCharge, 10) + parseInt(values.super_buildup_amount, 10)
    );
  }, [totalCharge, values.super_buildup_amount]);

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
            2. Booking Rate
          </Subheading>
          <Caption theme={secondaryTheme}>
            Enter all Area first for auto adjustment
          </Caption>

          <RenderRates formikProps={formikProps} t={t} />

          <RenderCharges t={t} formikProps={formikProps} />
          <View style={styles.totalContainer}>
            <Subheading theme={secondaryTheme}>Total other charges</Subheading>
            <RenderInput
              disabled={true}
              value={totalCharge}
              containerStyles={{width: '50%'}}
              placeholder={'Total charges'}
              left={<TextInput.Affix theme={secondaryTheme} text="₹" />}
            />
          </View>
          <Subheading style={{color: theme.colors.primary}}>
            Total amount + Other charges
          </Subheading>
          <View style={styles.totalContainer}>
            <Subheading theme={secondaryTheme}>Total amount</Subheading>
            <RenderInput
              disabled={true}
              value={totalAmount}
              containerStyles={{width: '50%'}}
              placeholder={'Total amount'}
              left={<TextInput.Affix theme={secondaryTheme} text="₹" />}
            />
          </View>
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
            <BaseText style={styles.buttonText}>{'Next'}</BaseText>
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

function BookingDetails(props) {
  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{charges: []}}
      validationSchema={schema}
      onSubmit={async (values) => {}}>
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
  ratesContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rateInputContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
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
  chargesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chargeInput: {
    marginVertical: 5,
    width: '85%',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
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

export default withTheme(BookingDetails);
