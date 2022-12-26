import {
  StyleSheet,
  View,
  SafeAreaView,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {Caption, Subheading, Text} from 'react-native-paper';
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
              onPress={() => toggleEditDialog(index)}>
              <MaterialIcons name="edit" color="#4872f4" size={13} />
            </OpacityButton>
          </View>
          <View>
            <OpacityButton
              color="#FF5D5D"
              opacity={0.18}
              onPress={() => handleDelete(index)}
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

  const {indentDetails} = useSelector(s => s.materialManagement);

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

  const editDialog = index => {
    setSelectedMaterial(index);
    toggleAddDialog();
  };

  const handleDelete = index => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        const _materials = [...selectedMaterial];
        _materials?.splice(index, 1);
        setSelectedMaterial(_materials);
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Add Material</Text>
        </View>
        <View style={styles.bodyContent}>
          <TouchableOpacity style={styles.btnAddMore} onPress={toggleAddDialog}>
            <MaterialIcons name="add" color="#4872f4" size={17} />
            <Text style={styles.add}>Add Material</Text>
          </TouchableOpacity>

          <View style={styles.listContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {materials?.map((item, index) => {
                return (
                  <CardListing
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
            initialValues={{}}
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
    </SafeAreaView>
  );
}

export default AddMaterialIndentList;

const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
  },

  container: {
    flexGrow: 1,
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
  btnAddMore: {
    borderWidth: 0.4,
    borderColor: 'rgba(72, 114, 244, 1)',
    color: 'blue',
    padding: 19,
    marginTop: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  add: {
    color: '#4872f4',
  },

  buttonContainer: {
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center',
  },
  listContainer: {
    flexGrow: 1,
  },
  inputStyles: {
    marginVertical: 8,
  },

  formContainer: {
    flexGrow: 1,
    margin: 15,
    paddingVertical: 20,
  },
  formSubContainer: {
    flexGrow: 1,
  },

  OpacityButton: {
    borderRadius: 20,
    marginLeft: 10,
  },
});
