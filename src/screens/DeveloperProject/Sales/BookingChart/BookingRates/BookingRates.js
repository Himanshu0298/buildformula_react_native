/* eslint-disable react-native/no-inline-styles */
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
import {theme} from 'styles/theme';
import ActionButtons from 'components/Atoms/ActionButtons';

const BASIC_TYPES = ['super_buildup', 'buildup', 'carpet'];
const CONSTRUCTION_TYPES = ['construction_super_buildup', 'construction_build'];

const schema = Yup.object().shape({
  area_amount: Yup.number('Invalid').required('Required'),
  carpet_unit: Yup.string('Invalid').required('Required'),
  ...getTypesSchema(BASIC_TYPES),
  construction_super_buildup_area: Yup.string('Invalid').when(
    'project_main_types',
    {
      is: 4,
      then: Yup.string('Invalid').required('Required'),
    },
  ),
  construction_super_buildup_rate: Yup.string('Invalid').when(
    'project_main_types',
    {
      is: 4,
      then: Yup.string('Invalid').required('Required'),
    },
  ),
  construction_build_area: Yup.string('Invalid').when('project_main_types', {
    is: 4,
    then: Yup.string('Invalid').required('Required'),
  }),
  construction_build_rate: Yup.string('Invalid').when('project_main_types', {
    is: 4,
    then: Yup.string('Invalid').required('Required'),
  }),
});

function RenderItems({row}) {
  return (
    <View>
      {row.map(({label, labelStyle, value}) => {
        return (
          <View key={label} style={styles.cell}>
            <Text style={labelStyle}>{label}:</Text>
            <Caption style={styles.renderItemsCaption}>{value}</Caption>
          </View>
        );
      })}
    </View>
  );
}
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
  const {
    t,
    formikProps,
    label,
    type: rateType,
    syncAmounts,
    types,
    amount,
    getTotal,
  } = props;

  const {values, handleBlur, errors, setFieldValue} = formikProps;

  const handleAreaChange = (key, area) => {
    setFieldValue(key, round(area));

    const type = getType(key);

    if (amount) {
      const rate = amount / area;
      setFieldValue(`${type}_rate`, round(rate));
    }
  };

  const handleRateChange = (key, rate) => {
    setFieldValue(key, round(rate));

    const type = getType(key);

    const area = values[`${type}_area`];
    if (area) {
      const total = getTotal(area, rate);
      const otherTypes = types.filter(v => v !== type);
      syncAmounts(total, otherTypes);
    }
  };

  return (
    <View style={styles.rateInputContainer}>
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
  const {t, formikProps, unitOptions, params} = props;
  const {project_main_types} = params;
  const {values, errors, setFieldValue} = formikProps;

  const isBunglow = project_main_types === 4 || project_main_types === 5;

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

  const getTotal = (area, rate) => {
    const total = area * rate;
    setFieldValue('area_amount', round(total));
    return total;
  };

  return (
    <>
      <View style={styles.ratesContainer}>
        <RatesColumn
          {...props}
          label={isBunglow ? 'Netplot' : 'Super Buildup'}
          type="super_buildup"
          types={BASIC_TYPES}
          amount={values.area_amount}
          getTotal={getTotal}
          syncAmounts={syncAmounts}
        />
        <RatesColumn
          {...props}
          label={isBunglow ? 'Un-divied' : 'Buildup'}
          type="buildup"
          types={BASIC_TYPES}
          getTotal={getTotal}
          amount={values.area_amount}
          syncAmounts={syncAmounts}
        />
        <RatesColumn
          {...props}
          types={BASIC_TYPES}
          getTotal={getTotal}
          label={isBunglow ? 'Super Build-up' : 'Carpet'}
          type="carpet"
          amount={values.area_amount}
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
        <View style={styles.bungalowContainer}>
          <Subheading style={styles.bungalow}>
            {isBunglow ? 'Total Land Amount' : 'Total Basic Amount'}
          </Subheading>
          <View style={styles.landAmountSection}>
            <RenderItems
              row={[
                {
                  label: isBunglow ? 'Netplot' : 'Super Buildup',
                  value: `Rs.${values.area_amount || 0}`,
                },
                {
                  label: isBunglow ? 'Super Build-up' : 'Carpet',
                  value: `Rs.${values.area_amount || 0}`,
                },
              ]}
            />
            <RenderItems
              row={[
                {
                  label: isBunglow ? 'Un-divied' : 'Buildup',
                  value: `Rs.${values.area_amount || 0}`,
                },
              ]}
            />
          </View>
        </View>
      </View>
    </>
  );
}

function ConstructionRate(props) {
  const {formikProps} = props;
  const {values, setFieldValue} = formikProps;

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

  const getTotal = (area, rate) => {
    const total = area * rate;
    setFieldValue('total_construction', round(total));

    return total;
  };

  return (
    <View>
      <Subheading style={styles.otherCharges}>Construction Rate</Subheading>
      <View style={styles.ratesContainer}>
        <RatesColumn
          {...props}
          label="Super Build-up"
          type="construction_super_buildup"
          types={CONSTRUCTION_TYPES}
          amount={values.total_construction}
          getTotal={getTotal}
          syncAmounts={syncAmounts}
        />
        <RatesColumn
          {...props}
          label="Build-up"
          type="construction_build"
          types={CONSTRUCTION_TYPES}
          getTotal={getTotal}
          amount={values.total_construction}
          syncAmounts={syncAmounts}
        />
      </View>
      <View style={styles.totalConstruction}>
        <Subheading style={styles.bungalow}>
          Total Construction Amount
        </Subheading>
        <View style={styles.landAmountSection}>
          <RenderItems
            row={[
              {
                label: 'As Super Buildup',
                value: `Rs.${values.total_construction || 0}`,
              },
            ]}
          />
          <RenderItems
            row={[
              {
                label: 'As Build',
                value: `Rs.${values.total_construction || 0}`,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

function RenderCharges({formikProps, t}) {
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
              <View style={styles.formContainer}>
                <RenderInput
                  name="label"
                  label={t('label_charge')}
                  multiline
                  value={charge.label}
                  contentContainerStyle={styles.labelContainer}
                  onChangeText={value => setValue('label', value)}
                  error={chargeError.label}
                />
              </View>
              <View style={styles.formContainer}>
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
      <Subheading style={styles.otherCharges}>Other Charges</Subheading>
      <RenderSelect
        name="other_charges"
        label="Select Other Charges"
        options={otherChargeOptions}
        containerStyles={styles.rateInput}
        onSelect={onSelectOtherCharge}
      />
      {values.other_charges.map((item, i) => {
        return (
          <View key={item} style={styles.chargesContainer}>
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
              style={styles.closeIcon}
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
  const {formikProps, params, navigation} = props;
  const {handleChange, handleSubmit, values, setFieldValue} = formikProps;
  const {project_main_types} = params;

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
      parseInt(values.area_amount || 0, 10) +
      parseInt(values.total_construction || 0, 10)
    );
  }, [
    values.other_charges_amount,
    values.area_amount,
    values.total_construction,
  ]);

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
      style={styles.container}
      onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={30}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Subheading style={{color: theme.colors.primary}}>
            2. Booking Rate
          </Subheading>
          <Caption>Enter all Area first for auto adjustment</Caption>
          <RenderRates {...props} {...{t, unitOptions}} />
          {project_main_types === 4 ? (
            <ConstructionRate {...props} {...{t, unitOptions}} />
          ) : null}

          <RenderCharges {...props} t={t} {...{t}} />

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
                  containerStyles={styles.containerStyle}
                  keyboardType="number-pad"
                  placeholder="Start"
                  onChangeText={handleChange('document_start')}
                  left={<TextInput.Affix text="₹" />}
                />
                <View style={styles.dot} />
                <RenderInput
                  value={values.document_end}
                  containerStyles={styles.containerStyle}
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
            <Subheading style={styles.finalAmount}>Final amount</Subheading>

            <View style={styles.finalAmountBox}>
              <Text style={{marginBottom: 10}}>Booking Rate</Text>
              <RenderRow
                label="Booking Rate"
                value={`₹ ${values.area_amount || 0} `}
              />
              {project_main_types === 4 ? (
                <RenderRow
                  label="Total Construction charges"
                  value={`₹ ${values.total_construction || 0} `}
                />
              ) : null}
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
        <ActionButtons
          cancelLabel="Back"
          submitLabel="Next"
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
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
      initialValues={{other_charges: [], ...params}}
      validationSchema={schema}
      onSubmit={async values => {
        navigation.navigate('BC_Step_Eight', {...values});
      }}>
      {formikProps => <FormContent {...props} {...{params, formikProps}} />}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 10,
  },

  ratesContainer: {
    marginHorizontal: -5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  landAmountSection: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  totalConstruction: {
    marginTop: 20,
    paddingVertical: 5,
  },
  rateInputContainer: {
    flex: 1,
    marginHorizontal: 5,
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
  scrollView: {
    flexGrow: 1,
    margin: 10,
    paddingBottom: 30,
  },
  containerStyle: {
    width: '45%',
  },

  otherCharges: {
    color: theme.colors.primary,
    marginTop: 20,
  },
  bungalow: {
    color: theme.colors.primary,
    fontWeight: '100',
  },
  renderItemsCaption: {
    flexShrink: 1,
  },
  bungalowContainer: {
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  labelContainer: {
    flex: 1,
  },
  closeIcon: {
    marginLeft: 15,
    borderRadius: 20,
  },
  finalAmount: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
});

export default withTheme(BookingRates);
