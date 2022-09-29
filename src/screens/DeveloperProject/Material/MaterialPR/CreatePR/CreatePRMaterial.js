import {StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';

import {Formik} from 'formik';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import ActionButtons from 'components/Atoms/ActionButtons';
import {Subheading} from 'react-native-paper';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

function AddPR(props) {
  const {formikProps} = props;

  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    errors,
    handleSubmit,
  } = formikProps;
}

function CreatePRMaterial(props) {
  const {navigation, material, id} = props;

  const {getPRMaterialList, createMaterialPR} = useMaterialManagementActions();

  const {loading, materialCategory, materialSubCategory} = useSelector(
    s => s.materialManagement,
  );

  const {selectedProject} = useSelector(s => s.project);

  const project_id = selectedProject.id;

  React.useEffect(() => {
    getPRMaterialList({
      project_id,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const categoryOptions = useMemo(() => {
    return materialCategory?.map(i => ({
      label: `${i.title}`,
      value: i.id,
    }));
  }, [materialCategory]);

  const subCategoryOptions = useMemo(() => {
    return materialSubCategory?.map(i => ({
      label: `${i.title}`,
      value: i.id,
    }));
  }, [materialSubCategory]);

  const onSubmit = async values => {
    const formData = new FormData();

    formData.append('project_id', project_id);
    formData.append('id', id);
    formData.append('category', values.category);
    formData.append('subCategory', values.subCategory);
    formData.append('material_unit_id', values.material_unit_id);
    formData.append('quantity', values.quantity);

    await createMaterialPR(formData);
    getPRMaterialList({project_id, id});
    navigation.navigate('AddMaterialList', {id});
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Subheading style={styles.headerText}>Add Material</Subheading>
        </View>
        <Spinner visible={loading} textContent="" />

        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          formikProps={props}
          initialValues={{}}
          onSubmit={onSubmit}>
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
          }) => {
            return (
              <View>
                <RenderSelect
                  name="category"
                  label="Category"
                  options={categoryOptions}
                  value={values.category}
                  containerStyles={styles.inputStyles}
                  onBlur={handleBlur('category')}
                  onSelect={value => {
                    setFieldValue('category', value);
                  }}
                />
                <RenderSelect
                  name="subCategory"
                  label="Sub Category"
                  options={subCategoryOptions}
                  value={values.subCategory}
                  containerStyles={styles.inputStyles}
                  onBlur={handleBlur('subCategory')}
                  onSelect={value => {
                    setFieldValue('subCategory', value);
                  }}
                />
                <RenderInput
                  name="material_unit_id"
                  label="Unit"
                  containerStyles={styles.inputStyles}
                  style={styles.unit}
                  error={errors.material_unit_id}
                  editable={false}
                />
                <RenderDatePicker
                  name="required_date"
                  label="Required Date"
                  value={values.required_date}
                  error={errors.required_date}
                  onChange={v => setFieldValue('required_date', v)}
                />
                <RenderInput
                  name="quantity"
                  label="Quantity"
                  containerStyles={styles.inputStyles}
                  maxLength={10}
                  value={values.quantity}
                  onChangeText={handleChange('quantity')}
                  onBlur={handleBlur('quantity')}
                  autoCapitalize="none"
                  returnKeyType="next"
                  error={errors.quantity}
                />

                <ActionButtons
                  cancelLabel="Cancel"
                  submitLabel="Save"
                  onCancel={navigation.goBack}
                  onSubmit={handleSubmit}
                />
              </View>
            );
          }}
        </Formik>
      </View>
    </View>
  );
}

export default CreatePRMaterial;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 12,
  },

  mainContainer: {
    padding: 5,
  },
  headerText: {
    fontSize: 18,
  },
  inputStyles: {
    marginVertical: 8,
  },
  unit: {
    backgroundColor: 'rgba(0, 0, 0, 0.1);',
  },

  headerContainer: {
    marginBottom: 10,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
});
