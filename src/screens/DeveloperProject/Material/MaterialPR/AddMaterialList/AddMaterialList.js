/* eslint-disable no-unused-expressions */
/* eslint-disable react-native/no-inline-styles */
import {Modal, ScrollView, StyleSheet, View, SafeAreaView} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {Button, Caption, Portal, Subheading, Text} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionButtons from 'components/Atoms/ActionButtons';
import {getShadow} from 'utils';
import {useSelector} from 'react-redux';
import {useFormik} from 'formik';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderInput from 'components/Atoms/RenderInput';
import dayjs from 'dayjs';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import {useAlert} from 'components/Atoms/Alert';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

export function AddMaterialDialog(props) {
  const {handleClose, material, handleSave} = props;

  const edit = Boolean(material?.id);

  const {materialCategories, materialSubCategories} = useSelector(
    s => s.materialManagement,
  );

  const {getPRMaterialCategories} = useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const projectId = selectedProject.id;

  const {commonData} = useSelector(s => s.project);
  const {units} = commonData;

  const initialValues = useMemo(() => {
    if (material) {
      const {
        material_category_id,
        material_sub_category_id,
        sub_material_id,
        material_unit_id,
        material_dates,
        required_date,
        material_quantity,
        quantity,
      } = material;

      const selectedSubCategory = materialSubCategories.find(
        i => i.id === sub_material_id,
      );

      return {
        material_category_id,
        sub_material_id: material_sub_category_id || sub_material_id,
        material_unit_id: material_unit_id || selectedSubCategory?.unit_id,
        required_date: material_dates || required_date,
        quantity: material_quantity || quantity,
      };
    }
    return {};
  }, [materialSubCategories, material]);

  useEffect(() => {
    getPRMaterialCategories({project_id: projectId});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    values,
    errors,
    handleChange,
    setFieldValue,
    handleSubmit,
    handleBlur,
  } = useFormik({
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues,
    onSubmit: handleSave,
  });

  const categoryOptions = useMemo(() => {
    return materialCategories?.map(i => ({
      label: `${i.title}`,
      value: i.id,
    }));
  }, [materialCategories]);

  const subCategoryOptions = useMemo(() => {
    return materialSubCategories
      ?.filter(i => i.category_id === values?.material_category_id)
      ?.map(i => ({label: `${i.title}`, value: i.id}));
  }, [materialSubCategories, values?.material_category_id]);

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
    <Modal {...props} onBackdropPress={handleClose}>
      <Portal.Host>
        <ActionSheetProvider>
          <SafeAreaProvider>
            <SafeAreaView edges={['top']} style={{flexGrow: 1}}>
              <View style={styles.formContainer}>
                <Subheading>
                  {edit ? 'Edit Material' : 'Add Material'}
                </Subheading>
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
            </SafeAreaView>
          </SafeAreaProvider>
        </ActionSheetProvider>
      </Portal.Host>
    </Modal>
  );
}

function CardListing(props) {
  const {item, toggleEditDialog, handleDelete, index} = props;

  const {
    materialunitstitle,
    subcategorytitle,
    material_dates,
    material_quantity,
    required_date,
    quantity,
  } = item;

  const {materialCategories, materialSubCategories} = useSelector(
    s => s.materialManagement,
  );

  const {commonData} = useSelector(s => s.project);
  const {units} = commonData;

  const categoryTitle = React.useMemo(() => {
    return (
      materialCategories?.find(i => i.id === item?.material_category_id)
        ?.title || 'NA'
    );
  }, [item?.material_category_id, materialCategories]);

  const subCategoryTitle = React.useMemo(() => {
    return (
      materialSubCategories?.find(i => i.id === item?.sub_material_id)?.title ||
      item?.subcategorytitle
    );
  }, [item?.sub_material_id, item?.subcategorytitle, materialSubCategories]);

  const unitTitle = React.useMemo(() => {
    return (
      units?.find(i => i.id === item?.material_unit_id)?.title ||
      item?.materialunitstitle
    );
  }, [item?.material_unit_id, item?.materialunitstitle, units]);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Category:</Caption>
          <Text>{categoryTitle}</Text>
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
              style={styles.deleteButton}>
              <MaterialIcons name="delete" color="#FF5D5D" size={13} />
            </OpacityButton>
          </View>
        </View>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Sub Category:</Caption>
        <Text>{subCategoryTitle || subcategorytitle}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Unit:</Caption>
        <Text>{unitTitle || materialunitstitle}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Required date:</Caption>
        <Text>{required_date || material_dates}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Quantity:</Caption>
        <Text>{quantity || material_quantity}</Text>
      </View>
    </View>
  );
}

function AddMaterialList(props) {
  const {navigation, route} = props;
  const {id, edit} = route?.params || {};

  const alert = useAlert();

  const getPRDetails = () => {
    getPRMaterialDetails({
      project_id: selectedProject.id,
      purchase_request_id: id,
    });
  };

  const {PRDetails} = useSelector(s => s.materialManagement);

  const materialItems = PRDetails?.materialItems;

  const [addDialog, setAddDialog] = React.useState(false);
  const [selectedMaterialIndex, setSelectedMaterialIndex] = React.useState();
  const [materials, setMaterials] = React.useState(materialItems || []);

  const {getPRMaterialDetails, createMaterialPR} =
    useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);

  useEffect(() => {
    getPRDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleAddDialog = () => setAddDialog(v => !v);

  const handleDelete = index => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        const _materials = [...materials];
        _materials?.splice(index, 1);
        setMaterials(_materials);
        getPRDetails();
      },
    });
  };

  const handleSave = async () => {
    const restData = {
      purchase_request_id: id,
      project_id: selectedProject.id,
      material_data: materials,
    };
    await createMaterialPR(restData);
    await getPRDetails();
    navigation.navigate('PRPreview', {id});
  };

  const handleSaveMaterial = values => {
    const _materials = [...materials];
    if (!isNaN(selectedMaterialIndex)) {
      _materials[selectedMaterialIndex] = values;
    } else {
      _materials.push(values);
    }
    setMaterials(_materials);
    toggleAddDialog();
  };

  const toggleEditDialog = index => {
    setSelectedMaterialIndex(index);
    toggleAddDialog();
  };

  return (
    <>
      {addDialog ? (
        <AddMaterialDialog
          {...props}
          visible={addDialog}
          handleClose={toggleAddDialog}
          material={materials?.[selectedMaterialIndex]}
          handleSave={handleSaveMaterial}
        />
      ) : null}
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
                    item={item}
                    index={index}
                    toggleEditDialog={toggleEditDialog}
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
          onSubmit={handleSave}
        />
      </View>
    </>
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
    margin: 10,
    justifyContent: 'space-between',
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
