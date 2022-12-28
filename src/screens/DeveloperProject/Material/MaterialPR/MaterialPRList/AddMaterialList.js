/* eslint-disable no-unused-expressions */
/* eslint-disable react-native/no-inline-styles */
import {Modal, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {Button, Caption, Portal, Subheading, Text} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionButtons from 'components/Atoms/ActionButtons';
import {getShadow} from 'utils';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderInput from 'components/Atoms/RenderInput';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import dayjs from 'dayjs';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import {useAlert} from 'components/Atoms/Alert';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';

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

  const {materialCategories, materialSubCategories} = useSelector(
    s => s.materialManagement,
  );

  const {commonData} = useSelector(s => s.project);
  const {units} = commonData;

  const categoryOptions = useMemo(() => {
    return materialCategories?.map(i => ({
      label: `${i.title}`,
      value: i.id,
    }));
  }, [materialCategories]);

  const subCategoryOptions = useMemo(() => {
    return materialSubCategories
      .filter(i => i.category_id === values.material_category_id)
      ?.map(i => ({label: `${i.title}`, value: i.id}));
  }, [materialSubCategories, values.material_category_id]);

  const unitOptions = useMemo(() => {
    return units?.map(i => ({label: `${i.title}`, value: i.id}));
  }, [units]);

  const handleSubMaterialChange = value => {
    setFieldValue('sub_material_id', value);
    const unitId = materialSubCategories.find(i => i.id === value)?.unit_id;
    if (unitId) {
      setFieldValue('material_unit_id', unitId);
    }
  };

  return (
    <Portal>
      <Modal {...props} onBackdropPress={handleClose}>
        <Portal.Host>
          <ActionSheetProvider>
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
                  name="sub_material_id"
                  label="Sub Category"
                  options={subCategoryOptions}
                  value={values.sub_material_id}
                  containerStyles={styles.inputStyles}
                  onBlur={handleBlur('sub_material_id')}
                  onSelect={handleSubMaterialChange}
                />

                <RenderSelect
                  name="material_unit_id"
                  label="Unit"
                  disabled
                  containerStyles={styles.inputStyles}
                  options={unitOptions}
                  value={values.material_unit_id}
                />

                <RenderDatePicker
                  name="required_date"
                  label="Required Date"
                  value={values.required_date}
                  error={errors.required_date}
                  onChange={v => {
                    setFieldValue(
                      'required_date',
                      dayjs(v).format('YYYY-MM-DD'),
                    );
                  }}
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
          </ActionSheetProvider>
        </Portal.Host>
      </Modal>
    </Portal>
  );
}

function CardListing(props) {
  const {item, toggleEditDialog, handleDelete} = props;

  const {
    materialcategrytitle,
    subcategorytitle,
    materialunitstitle,
    created,
    material_quantity,
  } = item;
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
              onPress={() => toggleEditDialog(item.id)}>
              <MaterialIcons name="edit" color="#4872f4" size={13} />
            </OpacityButton>
          </View>
          <View>
            <OpacityButton
              color="#FF5D5D"
              opacity={0.18}
              onPress={() => handleDelete(item)}
              style={styles.deleteButton}>
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
        <Caption style={styles.lightData}>Required date:</Caption>
        <Text>{created}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Quantity:</Caption>
        <Text>{material_quantity}</Text>
      </View>
    </View>
  );
}

function AddMaterialList(props) {
  const {navigation, route} = props;
  const {id, edit} = route?.params || {};

  const alert = useAlert();

  const {
    createMaterialPR,
    updateMaterialPR,
    deleteMaterialPRItem,
    getPRMaterialCategories,
    getPRMaterialDetails,
  } = useMaterialManagementActions();

  const {PRDetails, materialSubCategories} = useSelector(
    s => s.materialManagement,
  );

  const {selectedProject} = useSelector(s => s.project);
  const projectId = selectedProject.id;

  const [addDialog, setAddDialog] = React.useState(false);
  const [selectedMaterial, setSelectedMaterial] = React.useState();

  useEffect(() => {
    getPRMaterialCategories({project_id: projectId});
    getPRDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues = useMemo(() => {
    if (selectedMaterial) {
      const {
        material_category_id,
        material_sub_category_id: sub_material_id,
        material_units_id,
        created: required_date,
        material_quantity: quantity,
      } = selectedMaterial;

      const selectedSubCategory = materialSubCategories.find(
        i => i.id === sub_material_id,
      );

      return {
        material_category_id,
        sub_material_id,
        material_units_id: material_units_id || selectedSubCategory?.unit_id,
        required_date,
        quantity,
      };
    }
    return {};
  }, [materialSubCategories, selectedMaterial]);

  const getPRDetails = () => {
    getPRMaterialDetails({project_id: projectId, purchase_request_id: id});
  };

  const toggleAddDialog = () => setAddDialog(v => !v);

  const handleSave = async values => {
    const restData = {
      project_id: projectId,
      purchase_request_id: id,
      material_data: [values],
    };
    if (edit) {
      await updateMaterialPR({
        ...restData,
        material_purchase_request_items_id: selectedMaterial.id,
      });
    } else {
      await createMaterialPR(restData);
    }
    getPRDetails();
    toggleAddDialog();
  };

  const handleDelete = item => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: async () => {
        const deleteData = {
          purchase_request_id: id,
          material_purchase_request_items_id: item.id,
          project_id: projectId,
        };
        await deleteMaterialPRItem(deleteData);
        getPRDetails();
      },
    });
  };

  const navToPreview = () => navigation.navigate('PRPreview', {id});

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
            {PRDetails?.materialItems?.map(item => {
              return (
                <CardListing
                  key={item.id.toString()}
                  item={item}
                  toggleEditDialog={() => {
                    setSelectedMaterial(item);
                    toggleAddDialog();
                  }}
                  handleDelete={handleDelete}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>

      <ActionButtons
        cancelLabel="Previous"
        submitLabel={edit ? 'Update' : 'Save'}
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
              {...props}
              visible={addDialog}
              toggleDialog={toggleAddDialog}
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

export default AddMaterialList;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 10,
  },
  formSubContainer: {
    flexGrow: 1,
  },

  formContainer: {
    flexGrow: 1,
    margin: 15,
    paddingVertical: 20,
  },

  headerText: {
    fontSize: 18,
  },

  editButton: {
    marginRight: 10,
  },

  deleteButton: {
    borderRadius: 20,
  },

  bodyContent: {
    marginVertical: 10,
    // height: dynamicHeight,
  },
  cardContainer: {
    marginTop: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 12,
    ...getShadow(2),
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lightData: {
    fontSize: 13,
  },

  OpacityButton: {
    borderRadius: 20,
    marginLeft: 10,
  },

  inputStyles: {
    marginVertical: 8,
  },

  headerContainer: {
    marginBottom: 10,
  },
});
