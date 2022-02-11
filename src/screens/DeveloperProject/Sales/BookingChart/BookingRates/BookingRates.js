import React, {useMemo, useState, useEffect} from 'react';
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
  Text,
  Divider,
} from 'react-native-paper';
import {round} from 'utils';
import * as Yup from 'yup';
import _ from 'lodash';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderSelect from 'components/Atoms/RenderSelect';
import {useSelector} from 'react-redux';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {DOCUMENT_CHARGE_LIMIT} from 'utils/constant';

const TYPES = ['super_buildup', 'buildup', 'carpet'];

const schema = Yup.object().shape({
  area_amount: Yup.number('Invalid').required('Required'),
  carpet_unit: Yup.string('Invalid').required('Required'),
  ...getTypesSchema(TYPES),
});

function getTypesSchema(types) {
  const typesSchema = {};

  types.map(type => {
    typesSchema[`${type}_area`] = Yup.number('Invalid').required('Required');
    typesSchema[`${type}_rate`] = Yup.number('Invalid').required('Required');
    return type;
  });
  return typesSchema;
}

function getType(key) {
  const splits = key.split('_');
  splits.splice(splits.length - 1, 1);
  return splits.join('_');
}

function RatesColumn(props) {
  const {t, formikProps, theme, label, type: rateType, syncAmounts} = props;

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
      const otherTypes = TYPES.filter(v => v !== type);

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
        multiline
        value={values[`${rateType}_area`]}
        onChangeText={value => handleAreaChange(`${rateType}_area`, value)}
        onBlur={handleBlur(`${rateType}_area`)}
        error={errors[`${rateType}_area`]}
      />
      <RenderInput
        name={`${rateType}_rate`}
        label={t('label_rate')}
        keyboardType="number-pad"
        multiline
        containerStyles={styles.rateInput}
        value={values[`${rateType}_rate`]}
        onChangeText={value => handleRateChange(`${rateType}_rate`, value)}
        onBlur={handleBlur(`${rateType}_rate`)}
        error={errors[`${rateType}_rate`]}
      />
    </View>
  );
}

function RenderRates(props) {
  const {t, formikProps, unitOptions} = props;
  const {values, handleBlur, errors, setFieldValue} = formikProps;

  const syncAmounts = (amount, types) => {
    types.map(type => {
      const area = values[`${type}_area`];
      if (area) {
        const rate = amount / area;
        setFieldValue(`${type}_rate`, round(rate));
      }
      return type;
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
          label="Super Buildup"
          type="super_buildup"
          syncAmounts={syncAmounts}
        />
        <RatesColumn
          {...props}
          label="Buildup"
          type="buildup"
          syncAmounts={syncAmounts}
        />
        <RatesColumn
          {...props}
          label="Carpet"
          type="carpet"
          syncAmounts={syncAmounts}
        />
      </View>
      <View>
        <RenderSelect
          name="carpet_unit"
          label={t('label_unit')}
          options={unitOptions}
          containerStyles={styles.rateInput}
          value={values.carpet_unit}
          error={errors.carpet_unit}
          onSelect={value => {
            setFieldValue('carpet_unit', value);
          }}
        />
        <RenderInput
          name="area_amount"
          label={t('label_amount')}
          keyboardType="number-pad"
          containerStyles={styles.rateInput}
          value={values.area_amount}
          onChangeText={value => handleAmountChange('area_amount', value)}
          onBlur={handleBlur('area_amount')}
          error={errors.area_amount}
          left={<TextInput.Affix text="₹" />}
        />
      </View>
    </>
  );
}

function RenderCharges({theme, formikProps, t}) {
  const {values, setFieldValue} = formikProps;

  const snackbar = useSnackbar();

  const {commonData} = useSelector(s => s.project);

  const [chargeModal, setChargeModal] = useState(false);
  const [charge, setCharge] = useState({});
  const [chargeError, setChargeError] = useState({});

  const otherChargeOptions = useMemo(() => {
    return commonData?.other_charges
      ?.filter(i => i.items.length)
      ?.map(i => ({label: i.title, value: i.id}));
  }, [commonData?.other_charges]);

  const toggleChargeModal = () => {
    setChargeModal(v => !v);
    setCharge({});
    setChargeError({});
  };

  const setValue = (id, value) => {
    const data = _.cloneDeep(charge);
    data[id] = value;
    setCharge(data);
  };

  const onSelectOtherCharge = value => {
    const selectedCharge = commonData?.other_charges?.find(i => i.id === value);
    const {items} = selectedCharge;

    const other_charges = _.cloneDeep(values.other_charges);

    const isAdded = items.every(item =>
      other_charges.find(i => {
        return i.id === item.id && i.label === item.title;
      }),
    );

    if (isAdded) {
      snackbar.showMessage({
        message: 'Charge Already Added',
        variant: 'warning',
      });
      return;
    }

    items.map(i => {
      other_charges.push({label: i.title, amount: i.amount, id: i.id});
      return i;
    });

    setFieldValue('other_charges', other_charges);
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
      item => item.label.toLowerCase() === charge.label.toLowerCase(),
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

  const removeCharge = index => {
    const other_charges = _.cloneDeep(values.other_charges);
    other_charges.splice(index, 1);
    setFieldValue('other_charges', other_charges);
  };

  return (
    <>
      <Portal>
        <Dialog visible={chargeModal} onDismiss={toggleChargeModal}>
          <Dialog.Content>
            <Subheading>Add a new Charge :</Subheading>
            <View style={styles.chargeInputContainer}>
              <View style={{flex: 1, paddingHorizontal: 5}}>
                <RenderInput
                  name="label"
                  label={t('label_charge')}
                  multiline
                  value={charge.label}
                  contentContainerStyle={{flex: 1}}
                  onChangeText={value => setValue('label', value)}
                  error={chargeError.label}
                />
              </View>
              <View style={{flex: 1, paddingHorizontal: 5}}>
                <RenderInput
                  name="amount"
                  label={t('label_amount')}
                  keyboardType="number-pad"
                  value={charge.amount}
                  onChangeText={value => setValue('amount', value)}
                  error={chargeError.amount}
                  left={<TextInput.Affix text="₹" />}
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
      <RenderSelect
        name="other_charges"
        label="Select Other Charges"
        options={otherChargeOptions}
        containerStyles={styles.rateInput}
        onSelect={onSelectOtherCharge}
      />
      {values.other_charges.map((item, i) => {
        return (
          <View key={i} style={styles.chargesContainer}>
            <RenderInput
              label={item.label}
              editable={false}
              containerStyles={styles.chargeInput}
              value={item.amount}
              left={<TextInput.Affix text="₹" />}
            />
            <OpacityButton
              color={theme.colors.red}
              opacity={0.1}
              style={{marginLeft: 15, borderRadius: 20}}
              onPress={() => removeCharge(i)}>
              <MaterialIcons name="close" color={theme.colors.red} size={19} />
            </OpacityButton>
          </View>
        );
      })}
      <TouchableOpacity
        style={[styles.chargesButton, {borderColor: theme.colors.primary}]}
        onPress={toggleChargeModal}>
        <Caption style={{color: theme.colors.primary}}>+ Create more</Caption>
      </TouchableOpacity>
    </>
  );
}

function RenderRow(props) {
  const {label, value, valueStyle} = props;
  return (
    <View style={styles.rowBetween}>
      <Caption>{label}</Caption>
      <Caption style={[{fontWeight: 'bold'}, valueStyle]}>{value}</Caption>
    </View>
  );
}

function FormContent(props) {
  const {theme, formikProps, navigation} = props;
  const {handleChange, handleSubmit, values, setFieldValue} = formikProps;

  const {t} = useTranslation();
  const snackbar = useSnackbar();

  const {unitOptions} = useSelector(s => s.project);

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

  useEffect(() => {
    let {document_start = 0, document_end = 0} = values;
    const documentCharge = Number(`${document_start}.${document_end}`);

    if (documentCharge > DOCUMENT_CHARGE_LIMIT) {
      snackbar.showMessage({
        message: 'Document charges cannot be more than ₹20,000',
        variant: 'warning',
      });

      document_start = '20000';
      document_end = '00000';

      setFieldValue('document_start', document_start);
      setFieldValue('document_end', document_end);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.document_start, values.document_end]);

  const totalAmount = useMemo(() => {
    return (
      parseInt(values.other_charges_amount || 0, 10) +
      parseInt(values.area_amount || 0, 10)
    );
  }, [values.other_charges_amount, values.area_amount]);

  useEffect(() => {
    const finalAmount = totalAmount - parseInt(values.discount_amount || 0, 10);
    setFieldValue('finalAmount', finalAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalAmount, values.discount_amount]);

  const handleCancel = () => navigation.goBack();

  const handleDiscount = v => {
    if (v > totalAmount) {
      snackbar.showMessage({
        message: 'Discount amount cannot be more than total amount',
        variant: 'warning',
      });

      v = totalAmount;
    }

    setFieldValue('discount_amount', v);

    const value = v.toString();
    let documentStart = 0;
    let documentEnd = 0;

    if (value) {
      documentStart =
        value.length > 5 ? value.slice(0, value.length - 5) : '00000';
      documentEnd = value.slice(-5);
    }

    const documentCharge = Number(`${documentStart}.${documentEnd}`);

    if (documentCharge > DOCUMENT_CHARGE_LIMIT) {
      documentStart = '20000';
      documentEnd = '00000';
    }
    setFieldValue('document_start', documentStart);
    setFieldValue('document_end', documentEnd);
  };

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
          <Caption>Enter all Area first for auto adjustment</Caption>
          <RenderRates {...props} {...{t, formikProps, unitOptions}} />
          <RenderCharges {...props} t={t} {...{t, formikProps}} />

          <View style={styles.discountSection}>
            <RenderInput
              value={values.discount_amount}
              keyboardType="number-pad"
              onChangeText={handleDiscount}
              label="Discount amount"
              left={<TextInput.Affix text="₹" />}
            />
            <View style={{marginTop: 10}}>
              <Subheading style={{marginLeft: 5}}>
                Documentation charges
              </Subheading>
              <View style={styles.documentationInputContainer}>
                <RenderInput
                  value={values.document_start}
                  containerStyles={{width: '45%'}}
                  keyboardType="number-pad"
                  placeholder="Start"
                  onChangeText={handleChange('document_start')}
                  left={<TextInput.Affix text="₹" />}
                />
                <View style={styles.dot} />
                <RenderInput
                  value={values.document_end}
                  containerStyles={{width: '45%'}}
                  keyboardType="number-pad"
                  placeholder="End"
                  onChangeText={handleChange('document_end')}
                  left={<TextInput.Affix text="₹" />}
                />
              </View>
              <View style={styles.documentHelper}>
                <Caption>
                  Note: Documentation charges will be collected first to confirm
                  your booking
                </Caption>
              </View>
            </View>
          </View>

          <View style={[styles.totalContainer, {marginTop: 20}]}>
            <Subheading
              style={{color: theme.colors.primary, fontWeight: '700'}}>
              Final amount
            </Subheading>

            <View style={styles.finalAmountBox}>
              <Text style={{marginBottom: 10}}>Booking Rate</Text>
              <RenderRow
                label="Booking Rate"
                value={`₹ ${values.area_amount || 0} `}
              />
              <RenderRow
                label="Total other charges"
                value={`₹ ${values.other_charges_amount || 0} `}
              />
              <Divider style={styles.divider} />
              <RenderRow
                label="Total amount"
                value={`₹ ${totalAmount || 0} `}
              />
              <RenderRow
                label="Discount"
                value={`₹ ${values.discount_amount || 0} `}
              />
              <Divider style={styles.divider} />
              <RenderRow
                label="Property Final amount"
                value={`₹ ${values.finalAmount || 0} `}
                valueStyle={{color: theme.colors.primary}}
              />
            </View>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <Button
            style={styles.actionButton}
            contentStyle={styles.buttonLabel}
            theme={{roundness: 15}}
            onPress={handleCancel}>
            Back
          </Button>
          <Button
            style={styles.actionButton}
            mode="contained"
            contentStyle={styles.buttonLabel}
            theme={{roundness: 15}}
            onPress={handleSubmit}>
            Next
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

function BookingRates(props) {
  const {navigation, route} = props;
  const {params} = route || {};

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{other_charges: []}}
      validationSchema={schema}
      onSubmit={async values => {
        navigation.navigate('BC_Step_Eight', {...params, ...values});
      }}>
      {formikProps => <FormContent {...props} formikProps={formikProps} />}
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
    marginVertical: 15,
  },
  discountSection: {
    padding: 15,
    backgroundColor: 'rgba(255, 92, 22, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 92, 22, 1)',
    borderRadius: 10,
    marginTop: 30,
  },
  documentationInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  dot: {
    borderRadius: 50,
    height: 5,
    width: 5,
    backgroundColor: '#000',
    marginBottom: 3,
  },
  actionContainer: {
    marginTop: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  documentHelper: {
    marginTop: 10,
    paddingLeft: 10,
  },
  finalAmountBox: {
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.3)',
  },
  rowBetween: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  divider: {
    height: 1,
    marginVertical: 7,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonLabel: {
    padding: 3,
  },
});

export default withTheme(BookingRates);
