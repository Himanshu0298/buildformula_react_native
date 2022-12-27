/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, SafeAreaView, Modal, ScrollView} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {Button, Caption, Subheading, Text} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAlert} from 'components/Atoms/Alert';
import ActionButtons from 'components/Atoms/ActionButtons';
import {getShadow} from 'utils';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderInput from 'components/Atoms/RenderInput';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function AddMaterialDialog(props) {
  const {formikProps, handleClose, edit} = props;

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formikProps;

  const {materialCategory, materialSubCategory} = useSelector(
    s => s.materialManagement,
  );

  const {commonData} = useSelector(s => s.project);
  const {units} = commonData;

  const categoryOptions = useMemo(() => {
    return materialCategory?.map(i => ({
      label: `${i.title}`,
      value: i.id,
    }));
  }, [materialCategory]);

  const subCategoryOptions = useMemo(() => {
    return materialSubCategory
      .filter(i => i.category_id === values.material_category_id)
      ?.map(i => ({label: `${i.title}`, value: i.id}));
  }, [materialSubCategory, values.material_category_id]);

  const unitOptions = useMemo(() => {
    return units?.map(i => ({label: `${i.title}`, value: i.id}));
  }, [units]);

  const handleSubMaterialChange = value => {
    setFieldValue('material_sub_category_id', value);
    const unitId = materialSubCategory.find(i => i.id === value)?.unit_id;
    if (unitId) {
      setFieldValue('material_units_id', unitId);
    }
  };

  return (
    <Modal {...props} onBackdropPress={handleClose}>
      <SafeAreaProvider>
        <SafeAreaView edges={['top']}>
          <View style={styles.formContainer}>
            <Subheading>{edit ? 'Edit Material' : 'Add Material'}</Subheading>
            <View style={styles.formSubContainer}>
              <RenderSelect
                name="material_category_id"
                label="Category"
                options={categoryOptions}
                value={values.material_category_id}
                containerStyles={styles.inputStyles}
                onBlur={handleBlur('material_category_id')}
                onSelect={value => {
                  setFieldValue('material_category_id', value);
                }}
              />

              <RenderSelect
                name="material_sub_category_id"
                label="Sub Category"
                options={subCategoryOptions}
                value={values.material_sub_category_id}
                containerStyles={styles.inputStyles}
                onBlur={handleBlur('material_sub_category_id')}
                onSelect={handleSubMaterialChange}
              />

              <RenderSelect
                name="material_units_id"
                label="Unit"
                disabled
                containerStyles={styles.inputStyles}
                options={unitOptions}
                value={values.material_units_id}
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
            </View>
            <ActionButtons
              cancelLabel="Cancel"
              submitLabel={edit ? ' Update' : 'Save'}
              onCancel={handleClose}
              onSubmit={handleSubmit}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
}

function CardListing(props) {
  const {item, toggleEditDialog, handleDelete, index} = props;

  const {materialcategrytitle, materialunitstitle, subcategorytitle, quantity} =
    item;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Category:</Caption>
          <Text>{materialcategrytitle}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.editButton}>
            <OpacityButton
              color="#4872f4"
              opacity={0.18}
              style={styles.OpacityButton}
              onPress={toggleEditDialog}>
              <MaterialIcons name="edit" color="#4872f4" size={13} />
            </OpacityButton>
          </View>
          <View>
            <OpacityButton
              color="#FF5D5D"
              opacity={0.18}
              onPress={() => handleDelete(index, item)}
              style={styles.OpacityButton}>
              <MaterialIcons name="delete" color="#FF5D5D" size={13} />
            </OpacityButton>
          </View>
        </View>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Sub Category:</Caption>
        <Text>{subcategorytitle}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Unit:</Caption>
        <Text>{materialunitstitle}</Text>
      </View>

      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Quantity:</Caption>
        <Text>{quantity}</Text>
      </View>
    </View>
  );
}

function AddMaterialIndentList(props) {
  const {navigation, route} = props;

  const {id, edit} = route?.params || {};

  const alert = useAlert();

  const {getPRMaterialCategories, getIndentDetails, addMaterialIssueRequest} =
    useMaterialManagementActions();

  const [addDialog, setAddDialog] = React.useState(false);
  const [selectedMaterial, setSelectedMaterial] = React.useState();

  const {indentDetails, materialSubCategory} = useSelector(
    s => s.materialManagement,
  );

  const materials = indentDetails?.material_indent_details;

  const {selectedProject} = useSelector(s => s.project);
  const projectId = selectedProject.id;

  useEffect(() => {
    getPRMaterialCategories({project_id: projectId});
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDetails = () =>
    getIndentDetails({
      project_id: selectedProject.id,
      material_indent_id: id,
    });

  const initialValues = useMemo(() => {
    if (selectedMaterial) {
      const {
        material_category_id,
        material_sub_category_id,
        material_units_id,
        quantity,
      } = selectedMaterial;

      const selectedSubCategory = materialSubCategory?.find(
        i => i.id === material_sub_category_id,
      );

      return {
        material_category_id,
        material_sub_category_id,
        material_units_id: material_units_id || selectedSubCategory?.unit_id,
        quantity,
      };
    }
    return {};
  }, [materialSubCategory, selectedMaterial]);

  const handleSave = async values => {
    const restData = {
      project_id: projectId,
      material_indent_id: id,
      material_category_id: values.material_category_id,
      material_sub_category_id: values.material_sub_category_id,
      material_units_id: values.material_units_id,
      quantity: values.quantity,
    };
    await addMaterialIssueRequest(restData);
    getDetails();
    toggleAddDialog();
  };

  const toggleAddDialog = () => setAddDialog(v => !v);

  const navToPreview = () => navigation.navigate('IssueIndentPreview', {id});

  const editDialog = item => {
    setSelectedMaterial(item);
    toggleAddDialog();
  };

  const handleDelete = (index, item) => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        const _materials = [...materials];
        _materials?.splice(index, 1);
        setSelectedMaterial(_materials);
        // getDetails();
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={{flexGrow: 1}}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {edit ? ' Edit Material' : 'Add Material'}
          </Text>
        </View>
        <View style={styles.bodyContent}>
          <Button
            icon="plus"
            mode="outlined"
            onPress={toggleAddDialog}
            contentStyle={{paddingVertical: 10, borderColor: '#4872f4'}}>
            Add Material
          </Button>
        </View>

        <View style={{flexGrow: 1, flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {materials?.map((item, index) => {
              return (
                <CardListing
                  key={item.id.toString()}
                  item={item}
                  index={index}
                  toggleEditDialog={editDialog}
                  handleDelete={handleDelete}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>

      <ActionButtons
        cancelLabel="Previous"
        submitLabel="Next"
        onCancel={navigation.goBack}
        onSubmit={navToPreview}
      />

      {addDialog ? (
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={initialValues}
          onSubmit={handleSave}>
          {formikProps => (
            <AddMaterialDialog
              visible={addDialog}
              handleClose={toggleAddDialog}
              formikProps={formikProps}
              edit={edit}
            />
          )}
        </Formik>
      ) : null}
    </View>
  );
}

export default AddMaterialIndentList;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 10,
  },
  headerText: {
    fontSize: 18,
  },
  bodyContent: {
    marginVertical: 10,
  },
  cardContainer: {
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 12,
    ...getShadow(2),
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lightData: {
    fontSize: 13,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center',
  },

  inputStyles: {
    marginVertical: 8,
  },

  formContainer: {
    margin: 10,
  },
  formSubContainer: {
    flexGrow: 1,
  },

  OpacityButton: {
    borderRadius: 20,
    marginLeft: 10,
  },
  headerContainer: {
    marginBottom: 10,
  },
});
