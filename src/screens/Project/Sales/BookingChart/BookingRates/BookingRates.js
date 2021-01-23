import React, {useMemo, useState, useEffect} from 'react';
import BaseText from 'components/Atoms/BaseText';
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
  Portal,
  Dialog,
} from 'react-native-paper';
import {secondaryTheme, theme} from 'styles/theme';
import {round} from 'utils';
import * as Yup from 'yup';
import _ from 'lodash';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderSelect from 'components/Atoms/RenderSelect';

const TYPES = ['super_buildup', 'buildup', 'carpet'];

const schema = Yup.object().shape({
  area_amount: Yup.number('Invalid').required('Required'),
  ...getTypesSchema(TYPES),
});

function getTypesSchema(types) {
  const typesSchema = {};

  types.map((type) => {
    typesSchema[`${type}_area`] = Yup.number('Invalid').required('Required');
    typesSchema[`${type}_unit`] = Yup.number('Invalid').required('Required');
    typesSchema[`${type}_rate`] = Yup.number('Invalid').required('Required');
  });
  return typesSchema;
}

function getType(key) {
  const splits = key.split('_');
  splits.splice(splits.length - 1, 1);
  return splits.join('_');
}

function RatesColumn(props) {
  const {t, formikProps, label, type: rateType, syncAmounts} = props;

  const {values, handleBlur, errors, setFieldValue} = formikProps;

  const handleAreaChange = (key, area) => {
    setFieldValue(key, round(area));

    const type = getType(key);

    const amount = values.area_amount;
    if (amount) {
      const rate = amount / area;
      setFieldValue(`${type}_rate`, round(rate));
    }
  };

  const handleRateChange = (key, rate) => {
    setFieldValue(key, round(rate));

    const type = getType(key);

    const area = values[`${type}_area`];
    let amount = values.area_amount;
    if (area) {
      amount = area * rate;
      setFieldValue('area_amount', round(amount));
      const otherTypes = TYPES.filter((v) => v !== type);

      syncAmounts(amount, otherTypes);
    }
  };

  return (
    <View
      style={[
        styles.rateInputContainer,
        {paddingHorizontal: rateType === 'buildup' ? 10 : 0},
      ]}>
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
  const {values, setFieldValue} = formikProps;

  const [chargeModal, setChargeModal] = useState(false);
  const [charge, setCharge] = useState({});
  const [chargeError, setChargeError] = useState({});

  const toggleChargeModal = () => {
    setChargeModal((v) => !v);
    setCharge({});
    setChargeError({});
  };

  const setValue = (id, value) => {
    const data = _.cloneDeep(charge);
    data[id] = value;
    setCharge(data);
  };

  const saveCharge = () => {
    const other_charges = _.cloneDeep(values.other_charges);

    if (!charge?.label?.trim()) {
      setChargeError({label: 'Required'});
      return;
    }
    if (!charge?.amount) {
      setChargeError({amount: 'Required'});
      return;
    }

    const index = other_charges.findIndex(
      (item) => item.label.toLowerCase() === charge.label.toLowerCase(),
    );

    if (index > -1) {
      setChargeError({label: 'Charge Already Added'});
      return;
    }

    charge.label.trim();
    charge.amount.trim();

    other_charges.push(charge);
    setFieldValue('other_charges', other_charges);

    toggleChargeModal();
  };

  const removeCharge = (index) => {
    const other_charges = _.cloneDeep(values.other_charges);
    other_charges.splice(index, 1);
    setFieldValue('other_charges', other_charges);
  };

  return (
    <>
      <Portal>
        <Dialog visible={chargeModal} onDismiss={toggleChargeModal}>
          <Dialog.Content>
            <Subheading theme={secondaryTheme}>Add a new Charge :</Subheading>
            <View style={styles.chargeInputContainer}>
              <View style={{flex: 1, paddingHorizontal: 5}}>
                <RenderInput
                  name={'label'}
                  label={t('label_charge')}
                  multiline={true}
                  value={charge.label}
                  contentContainerStyle={{flex: 1}}
                  onChangeText={(value) => setValue('label', value)}
                  placeholder={t('label_charge')}
                  error={chargeError.label}
                />
              </View>
              <View style={{flex: 1, paddingHorizontal: 5}}>
                <RenderInput
                  name={'amount'}
                  label={t('label_amount')}
                  keyboardType="number-pad"
                  value={charge.amount}
                  onChangeText={(value) => setValue('amount', value)}
                  placeholder={t('label_amount')}
                  error={chargeError.amount}
                  left={<TextInput.Affix theme={secondaryTheme} text="₹" />}
                />
              </View>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={saveCharge}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Subheading style={{color: theme.colors.primary, marginTop: 20}}>
        Other Charges
      </Subheading>
      {values.other_charges.map((item, i) => {
        return (
          <View key={i} style={styles.chargesContainer}>
            <RenderInput
              label={item.label}
              editable={false}
              containerStyles={styles.chargeInput}
              value={item.amount}
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
  const {formikProps, navigation} = props;
  const {t} = useTranslation();

  const {handleSubmit, values, setFieldValue} = formikProps;
  const handleCancel = () => navigation.goBack();

  useEffect(() => {
    let amount = 0;
    if (values.other_charges.length > 0) {
      amount = values.other_charges.reduce(
        (sum, charge) => sum + parseInt(charge.amount, 10) || 0,
        0,
      );
    }
    setFieldValue('other_charges_amount', amount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.other_charges]);

  const totalAmount = useMemo(() => {
    return (
      parseInt(values.other_charges_amount, 10) +
      parseInt(values.area_amount, 10)
    );
  }, [values.other_charges_amount, values.area_amount]);

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
              value={values.other_charges_amount}
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
              value={totalAmount || 0}
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

function BookingRates(props) {
  const {
    navigation,
    route: {params},
  } = props;

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{other_charges: []}}
      validationSchema={schema}
      onSubmit={async (values) => {
        navigation.navigate('BC_Step_Six', {...params, ...values});
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
  ratesContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rateInputContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rateInput: {
    marginTop: 5,
  },
  chargeInputContainer: {
    flexDirection: 'row',
    flexGrow: 1,
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

export default withTheme(BookingRates);
