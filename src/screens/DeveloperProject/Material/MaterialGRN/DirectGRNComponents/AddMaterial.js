import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {Formik} from 'formik';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import InputSearchDropdown from 'components/Atoms/InputSearchDropdown';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import Header from '../../CommonComponents/Header';

const schema = Yup.object().shape({
  category: Yup.string('Required').required('Required'),
});

const lomOptions = [
  {label: 'Test1', value: 'Test1'},
  {label: 'Test2', value: 'Test2'},
  {label: 'Test3', value: 'Test3'},
  {label: 'Test4', value: 'Test4'},
  {label: 'Test5', value: 'Test5'},
];

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

  const {materialCategories, materialSubCategories} = useSelector(
    s => s.materialManagement,
  );

  const {commonData} = useSelector(s => s.project);
  const {units} = commonData;

  const categoryOptions = useMemo(() => {
    return materialCategories?.map(i => ({label: `${i.title}`, value: i.id}));
  }, [materialCategories]);

  const subCategoryOptions = useMemo(() => {
    return materialSubCategories
      .filter(i => i.category_id === values.category)
      ?.map(i => ({label: `${i.title}`, value: i.id}));
  }, [materialSubCategories, values.category]);

  const unitOptions = useMemo(() => {
    return units?.map(i => ({label: `${i.title}`, value: i.id}));
  }, [units]);

  const handleSubMaterialChange = value => {
    setFieldValue('sub_material_id', value);
    const unitId = materialSubCategories?.find(i => i.id === value)?.unit_id;
    if (unitId) {
      setFieldValue('material_unit_id', unitId);
    }
  };

  return (
    <View style={styles.formContainer}>
      <RenderSelect
        name="category"
        label="Category"
        containerStyles={styles.input}
        options={categoryOptions}
        value={values.category}
        onSelect={value => {
          setFieldValue('category', value);
        }}
        error={errors.category}
      />
      <RenderSelect
        name="sub_material_id"
        label="Subcategory"
        containerStyles={styles.input}
        options={subCategoryOptions}
        value={values.sub_material_id}
        onSelect={handleSubMaterialChange}
        error={errors.sub_material_id}
      />
      <RenderSelect
        name="material_unit_id"
        disabled
        label="Unit"
        containerStyles={styles.input}
        options={unitOptions}
        value={values.material_unit_id}
      />

      <InputSearchDropdown
        placeholder="List of Makes"
        options={lomOptions}
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
        name="fineQty"
        label="Fine Quantity"
        containerStyles={styles.input}
        maxLength={10}
        value={values.fineQty}
        onChangeText={handleChange('fineQty')}
        onBlur={handleBlur('fineQty')}
        autoCapitalize="none"
        returnKeyType="next"
        error={errors.fineQty}
      />

      <RenderInput
        name="missing_qty"
        label="Missing Qty"
        containerStyles={styles.input}
        value={values.missing_qty}
        onChangeText={handleChange('missing_qty')}
        onBlur={handleBlur('missing_qty')}
        error={errors.missing_qty}
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
  const {toggleDialog, visible, handleSave, material_request_items, id} = props;

  const {getPRMaterialCategories} = useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const projectId = selectedProject.id;
  const {directGRNDetails} = useSelector(s => s.materialManagement);

  const {directGRNMaterialDetails = []} = directGRNDetails;

  const initialValues = React.useMemo(() => {
    const {
      category,
      sub_material_id,
      material_unit_id,
      master_list_of_makes_id,
      damage_qty,
      fineQty,
      missing_qty,
    } = material_request_items || [];
    return {
      category,
      sub_material_id,
      material_unit_id,
      master_list_of_makes_id,
      damage_qty,
      fineQty,
      missing_qty,
      ...material_request_items,
    };
  }, [material_request_items]);

  useEffect(() => {
    getPRMaterialCategories({project_id: projectId});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={toggleDialog}
      style={styles.modal}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.mainContainer} edges={['top']}>
          <ScrollView>
            <Header title="Material Info" {...props} />
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={handleSave}>
              {formikProps => (
                <MaterialForm
                  {...{formikProps}}
                  handleClose={toggleDialog}
                  directGRNMaterialDetails={directGRNMaterialDetails}
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
  search: {
    marginVertical: 20,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-start',
  },
});
