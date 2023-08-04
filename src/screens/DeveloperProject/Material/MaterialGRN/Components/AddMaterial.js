import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {round} from 'lodash';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import Header from '../../CommonComponents/Header';

const schema = Yup.object().shape({
  material_category_id: Yup.string('Required').required('Required'),
});

function MaterialForm(props) {
  const {formikProps, handleClose} = props;
  const {
    values,
    errors,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = formikProps;

  const {materialCategories, materialSubCategories, makeOfLists} = useSelector(
    s => s.materialManagement,
  );

  const {commonData} = useSelector(s => s.project);
  const {units} = commonData;

  const categoryOptions = useMemo(() => {
    return materialCategories?.map(i => ({label: `${i.title}`, value: i.id}));
  }, [materialCategories]);

  const subCategoryOptions = useMemo(() => {
    return materialSubCategories
      .filter(i => i.category_id === values.material_category_id)
      ?.map(i => ({label: `${i.title}`, value: i.id}));
  }, [materialSubCategories, values.material_category_id]);

  const unitOptions = useMemo(() => {
    return units?.map(i => ({label: `${i.title}`, value: i.id}));
  }, [units]);

  const listOfMakesOptions = useMemo(() => {
    return makeOfLists?.map(i => ({label: `${i.title}`, value: i.id}));
  }, [makeOfLists]);

  useEffect(() => {
    const totalAmount = round(
      Number(values.material_quantity) * Number(values.rate),
      2,
    );
    if (!isNaN(totalAmount)) setFieldValue('total_amount', totalAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.material_quantity, values.rate]);

  const handleSubMaterialChange = value => {
    setFieldValue('material_sub_category_id', value);
    const unitId = materialSubCategories?.find(i => i.id === value)?.unit_id;
    if (unitId) {
      setFieldValue('material_units_id', unitId);
    }
  };

  return (
    <View style={styles.formContainer}>
      <RenderSelect
        name="material_category_id"
        label="Category"
        containerStyles={styles.input}
        options={categoryOptions}
        value={values.material_category_id}
        onSelect={value => {
          setFieldValue('material_category_id', value);
        }}
        error={errors.category}
      />
      <RenderSelect
        name="material_sub_category_id"
        label="Subcategory"
        containerStyles={styles.input}
        options={subCategoryOptions}
        value={values.material_sub_category_id}
        onSelect={handleSubMaterialChange}
        error={errors.material_sub_category_id}
      />
      <RenderSelect
        name="material_units_id"
        disabled
        label="Unit"
        containerStyles={styles.input}
        options={unitOptions}
        value={values.material_units_id}
      />

      <RenderSelect
        name="lom"
        label="List of Makes"
        creatable
        value={values.lom}
        options={listOfMakesOptions}
        containerStyles={styles.inputStyles}
        onBlur={handleBlur('lom')}
        onSelect={value => {
          setFieldValue('lom', value);
        }}
      />

      <RenderInput
        name="material_quantity"
        label="Fine Quantity"
        containerStyles={styles.input}
        value={values.material_quantity}
        onChangeText={handleChange('material_quantity')}
        onBlur={handleBlur('material_quantity')}
        autoCapitalize="none"
        returnKeyType="next"
        error={errors.material_quantity}
        keyboardType="phone-pad"
      />
      <RenderInput
        name="damage"
        label="Damage Qty"
        containerStyles={styles.input}
        value={values.damage}
        onChangeText={handleChange('damage')}
        onBlur={handleBlur('damage')}
        error={errors.damage}
      />

      <RenderInput
        name="missing"
        label="Missing Qty"
        containerStyles={styles.input}
        value={values.missing}
        onChangeText={handleChange('missing')}
        onBlur={handleBlur('missing')}
        error={errors.missing}
        keyboardType="phone-pad"
      />
      <RenderInput
        name="rate"
        label="Rate"
        containerStyles={styles.input}
        value={values.rate}
        onChangeText={handleChange('rate')}
        onBlur={handleBlur('rate')}
        error={errors.rate}
        keyboardType="phone-pad"
      />
      <RenderInput
        name="total_amount"
        label="Total Amount"
        disabled
        containerStyles={styles.input}
        value={values.total_amount}
      />

      <ActionButtons
        cancelLabel="Cancel"
        submitLabel="Save"
        onSubmit={() => handleSubmit(values)}
        onCancel={handleClose}
      />
    </View>
  );
}

function AddMaterialDialog(props) {
  const {material, visible, handleSave, handleClose} = props;

  const {materialSubCategories} = useSelector(s => s.materialManagement);

  const initialValues = useMemo(() => {
    if (material) {
      const {
        material_category_id,
        material_sub_category_id,
        material_units_id,
        lom,
        material_quantity,
        damage: damage_qty,
        missing,
        fineQty,
        rate,
        total_amount,
      } = material;

      const selectedSubCategory = materialSubCategories.find(
        i => i.id === material_sub_category_id,
      );

      return {
        material_category_id,
        material_sub_category_id,
        material_units_id: material_units_id || selectedSubCategory?.unit_id,
        lom,
        material_quantity,
        damage_qty,
        missing,
        fineQty,
        rate,
        total_amount,
      };
    }
    return {};
  }, [materialSubCategories, material]);

  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={handleClose}
      style={styles.modal}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.mainContainer} edges={['top']}>
          <ScrollView>
            <Header title="Material Info" onPressBack={handleClose} />
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={initialValues}
              validationSchema={schema}
              enableReinitialize
              onSubmit={handleSave}>
              {formikProps => (
                <MaterialForm
                  formikProps={formikProps}
                  handleClose={handleClose}
                />
              )}
            </Formik>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
}

export default AddMaterialDialog;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  formContainer: {
    flexGrow: 1,
    margin: 15,
    paddingVertical: 20,
  },
  input: {
    paddingVertical: 7,
  },

  modal: {
    margin: 0,
    justifyContent: 'flex-start',
  },
});
