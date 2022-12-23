import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {Formik} from 'formik';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import InputSearchDropdown from 'components/Atoms/InputSearchDropdown';
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

  const [lomSearchText, setLomSearchText] = useState('');

  const setSelectedLom = v => setFieldValue('master_list_of_makes_id', v);

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

      <InputSearchDropdown
        placeholder="List of Makes"
        options={listOfMakesOptions}
        icon={<View />}
        searchQuery={lomSearchText}
        selected={values.master_list_of_makes_id}
        style={styles.search}
        onSelect={setSelectedLom}
        onChangeText={setLomSearchText}
      />

      <RenderInput
        name="damage_qty"
        label="Damage Qty"
        containerStyles={styles.input}
        value={values.damage_qty}
        onChangeText={handleChange('damage_qty')}
        onBlur={handleBlur('damage_qty')}
        error={errors.damage_qty}
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
      />

      <RenderInput
        name="missing"
        label="Missing Qty"
        containerStyles={styles.input}
        value={values.missing}
        onChangeText={handleChange('missing')}
        onBlur={handleBlur('missing')}
        error={errors.missing}
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
        material_sub_category_id: sub_material_id,
        material_units_id: material_unit_id,
        damage: damage_qty,
        missing_qty,
        fineQty,
        master_list_of_makes_id,
      } = material;

      const selectedSubCategory = materialSubCategories.find(
        i => i.id === sub_material_id,
      );

      return {
        material_category_id,
        sub_material_id,
        material_units_id: material_unit_id || selectedSubCategory?.unit_id,
        damage_qty,
        missing_qty,
        fineQty,
        master_list_of_makes_id,
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
                <MaterialForm {...{formikProps}} handleClose={handleClose} />
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
  search: {
    marginVertical: 20,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-start',
  },
});
