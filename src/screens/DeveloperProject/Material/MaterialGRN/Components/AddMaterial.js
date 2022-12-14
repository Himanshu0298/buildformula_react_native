import {StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {Formik} from 'formik';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import Header from '../../CommonComponents/Header';

const schema = Yup.object().shape({
  category: Yup.string('Required').required('Required'),
});

function MaterialForm(props) {
  const {formikProps, navigation, directGRNMaterialDetails} = props;
  const {
    values,
    errors,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = formikProps;

  const {materialCategory, materialSubCategory} = useSelector(
    s => s.materialManagement,
  );

  const {commonData} = useSelector(s => s.project);
  const {units} = commonData;

  const lom =
    directGRNMaterialDetails?.directGRNMaterialDetails?.material_request_items;

  const categoryOptions = useMemo(() => {
    return materialCategory?.map(i => ({
      label: `${i.title}`,
      value: i.id,
    }));
  }, [materialCategory]);

  const lomOptions = useMemo(() => {
    return lom?.map(i => ({
      label: `${i.title}`,
      value: i.id,
    }));
  }, [lom]);

  const subCategoryOptions = useMemo(() => {
    return materialSubCategory
      ?.filter(i => i.category_id === values.material_category_id)
      ?.map(i => ({label: `${i.title}`, value: i.id}));
  }, [materialSubCategory, values.material_category_id]);

  const unitOptions = useMemo(() => {
    return units?.map(i => ({label: `${i.title}`, value: i.id}));
  }, [units]);

  const handleSubMaterialChange = value => {
    setFieldValue('sub_material_id', value);
    const unitId = materialSubCategory.find(i => i.id === value)?.unit_id;
    if (unitId) {
      setFieldValue('material_unit_id', unitId);
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
        error={errors.material_category_id}
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
      <RenderSelect
        name="lom"
        label="List of Makes"
        containerStyles={styles.input}
        options={lomOptions}
        value={values.lom}
        onSelect={value => {
          setFieldValue('lom', value);
        }}
        error={errors.lom}
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
        onSubmit={handleSubmit}
        onCancel={navigation.goBack}
      />
    </View>
  );
}

const AddMaterial = props => {
  const {navigation, route, edit} = props;
  const {directGRNMaterialDetails, challan_id} = route?.params || {};

  const {addDirectGRNSecond, getPRMaterialCategories} =
    useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const projectId = selectedProject.id;

  useEffect(() => {
    getPRMaterialCategories({project_id: projectId});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async values => {
    const restData = {
      project_id: projectId,
      challan_id,
      data: [values],
    };
    if (edit) {
      await addDirectGRNSecond({
        ...restData,
        // material_purchase_request_items_id: selectedMaterial.id,
      });
    } else {
      await addDirectGRNSecond(restData);
      navigation.navigate('GRNMaterial');
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title="Material Info" {...props} />
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{attachments: []}}
        validationSchema={schema}
        onSubmit={handleSave}>
        {formikProps => (
          <MaterialForm
            {...{formikProps}}
            {...props}
            directGRNMaterialDetails={directGRNMaterialDetails}
          />
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default AddMaterial;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexGrow: 1,
    margin: 10,
  },
  formContainer: {
    flex: 1,
    flexGrow: 1,
    margin: 10,
  },
  input: {
    paddingVertical: 7,
  },
});
