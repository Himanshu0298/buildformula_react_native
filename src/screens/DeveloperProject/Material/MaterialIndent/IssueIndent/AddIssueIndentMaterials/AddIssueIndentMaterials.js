import {StyleSheet, View, SafeAreaView, Modal, ScrollView} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {Button, Caption, Subheading, Text} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAlert} from 'components/Atoms/Alert';
import ActionButtons from 'components/Atoms/ActionButtons';
import {getShadow, onlyInLeft} from 'utils';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderInput from 'components/Atoms/RenderInput';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {cloneDeep, isEqual, isNumber} from 'lodash';
import {Formik} from 'formik';
import {useSnackbar} from 'components/Atoms/Snackbar';
import Spinner from 'react-native-loading-spinner-overlay';

function AddMaterialDialog(props) {
  const {handleClose, edit, formikProps, categoryList, wbs_id} = props;

  const {materialCategories, materialSubCategories} = useSelector(
    s => s.materialManagement,
  );

  const {commonData} = useSelector(s => s.project);
  const {units} = commonData;

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formikProps;

  const categoryOptions = useMemo(() => {
    const categories = [...new Set(categoryList.map(i => i.category_id))];

    if (wbs_id) {
      return materialCategories
        ?.filter(i => categories.includes(i.id))
        ?.map(i => ({
          label: `${i.title}`,
          value: i.id,
        }));
    }
    return materialCategories?.map(i => ({
      label: `${i.title}`,
      value: i.id,
    }));
  }, [categoryList, materialCategories, wbs_id]);

  const subCategoryOptions = useMemo(() => {
    const subCategories = [
      ...new Set(categoryList.map(i => i.master_material_subcategory_id)),
    ];
    if (wbs_id) {
      return materialSubCategories
        ?.filter(i => subCategories.includes(i.id))
        ?.filter(i => i.category_id === values.material_category_id)
        ?.map(i => ({label: `${i.title}`, value: i.id}));
    }
    return materialSubCategories
      ?.filter(i => i.category_id === values.material_category_id)
      ?.map(i => ({label: `${i.title}`, value: i.id}));
  }, [
    categoryList,
    materialSubCategories,
    values.material_category_id,
    wbs_id,
  ]);

  const unitOptions = useMemo(() => {
    return units?.map(i => ({label: `${i.title}`, value: i.id}));
  }, [units]);

  const handleSubMaterialChange = value => {
    setFieldValue('material_sub_category_id', value);
    const unitId = materialSubCategories?.find(i => i.id === value)?.unit_id;
    if (unitId) {
      setFieldValue('material_units_id', unitId);
    }
  };

  return (
    <Modal {...props} onBackdropPress={handleClose}>
      <SafeAreaProvider>
        <SafeAreaView edges={['top']} style={styles.modelContainer}>
          <View style={styles.formContainer}>
            <View style={styles.formSubContainer}>
              <Subheading>{edit ? 'Edit Material' : 'Add Material'}</Subheading>
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

  const {
    subcategorytitle,
    materialcategrytitle,
    materialunitstitle,
    quantity,
    id,
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
      materialSubCategories?.find(i => i.id === item?.material_sub_category_id)
        ?.title || 'NA'
    );
  }, [item?.material_sub_category_id, materialSubCategories]);

  const unitTitle = React.useMemo(() => {
    return units?.find(i => i.id === item?.material_units_id)?.title || 'NA';
  }, [item?.material_units_id, units]);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Category:</Caption>
          <Text>{materialcategrytitle || categoryTitle}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {!id ? (
            <View style={styles.editButton}>
              <OpacityButton
                color="#4872f4"
                opacity={0.18}
                style={styles.OpacityButton}
                onPress={() => toggleEditDialog(index, item)}>
                <MaterialIcons name="edit" color="#4872f4" size={13} />
              </OpacityButton>
            </View>
          ) : null}

          <View>
            <OpacityButton
              color="#FF5D5D"
              opacity={0.18}
              onPress={() => handleDelete(index, item.id)}
              style={styles.OpacityButton}>
              <MaterialIcons name="delete" color="#FF5D5D" size={13} />
            </OpacityButton>
          </View>
        </View>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Sub Category:</Caption>
        <Text>{subcategorytitle || subCategoryTitle}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Unit:</Caption>
        <Text>{unitTitle || materialunitstitle}</Text>
      </View>

      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Quantity:</Caption>
        <Text>{quantity}</Text>
      </View>
    </View>
  );
}

function AddIssueIndentMaterials(props) {
  const {navigation, route} = props;

  const {id, edit, wbs_id} = route?.params || {};

  const alert = useAlert();

  const snackbar = useSnackbar();

  const {
    getPRMaterialCategories,
    getIndentDetails,
    addMaterialIssueRequest,
    getMaterialIndentCategoryList,
    deleteIndentItem,
  } = useMaterialManagementActions();

  const {indentDetails, materialSubCategories, categoryList, loading} =
    useSelector(s => s.materialManagement);

  const materialsItems = indentDetails?.material_indent_details;

  const {selectedProject} = useSelector(s => s.project);
  const projectId = selectedProject.id;

  const [addDialog, setAddDialog] = React.useState(false);
  const [selectedMaterialIndex, setSelectedMaterialIndex] = React.useState();
  const [materials, setMaterials] = React.useState(
    cloneDeep(materialsItems) || [],
  );

  useEffect(() => {
    getPRMaterialCategories({project_id: projectId});
    getCategory();
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategory = () => {
    getMaterialIndentCategoryList({
      project_id: projectId,
      wbs_works_id: wbs_id,
    });
  };

  const getDetails = async () => {
    await getIndentDetails({
      project_id: selectedProject.id,
      material_indent_id: id,
    });
  };

  useEffect(() => {
    if (!isEqual(materialsItems, materials)) {
      setMaterials(materialsItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialsItems]);

  const initialValues = useMemo(() => {
    if (isNumber(selectedMaterialIndex)) {
      const {
        material_category_id,
        material_sub_category_id,
        material_units_id,
        quantity,
      } = materials[selectedMaterialIndex];

      const selectedSubCategory = materialSubCategories?.find(
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
  }, [materialSubCategories, materials, selectedMaterialIndex]);

  const handleSave = async () => {
    const updatedMaterials = onlyInLeft(
      materials,
      materialsItems,
      (l, r) =>
        l.material_indent_id === r.material_indent_id &&
        l.material_category_id === r.material_category_id &&
        l.material_sub_category_id === r.material_sub_category_id &&
        l.material_units_id === r.material_units_id &&
        l.quantity === r.quantity,
    );

    updatedMaterials?.map(async ele => {
      const restData = {
        project_id: projectId,
        material_indent_id: id,
        material_category_id: ele?.material_category_id,
        material_sub_category_id: ele?.material_sub_category_id,
        material_units_id: ele?.material_units_id,
        quantity: ele?.quantity,
      };
      await addMaterialIssueRequest(restData);
    });

    getDetails();
    navigation.navigate('MaterialIndent');
    navigation.navigate('IssueIndentPreview', {id});
  };

  const handleSaveMaterial = async values => {
    const _materials = [...materials];

    if (!values.material_units_id) {
      snackbar.showMessage({
        message: 'This SubCategory have no unit , please select another one',
        variant: 'warning',
      });
    } else if (!isNaN(selectedMaterialIndex)) {
      _materials[selectedMaterialIndex] = values;
    } else {
      _materials.push(values);
    }
    const subCategoryMaterial = materials?.find(
      i => i.material_sub_category_id === values.material_sub_category_id,
    );

    const subCategoriesMaterial = materialsItems?.find(
      i => i.material_sub_category_id === values.material_sub_category_id,
    );

    if (subCategoryMaterial || subCategoriesMaterial) {
      snackbar.showMessage({
        message: 'This SubCategory already in use, please select another one',
        variant: 'warning',
      });
    }

    setMaterials(_materials);

    toggleAddDialog();
  };

  const toggleAddDialog = () => {
    setAddDialog(v => {
      if (v) setSelectedMaterialIndex();
      return !v;
    });
  };

  const editDialog = index => {
    setSelectedMaterialIndex(index);
    toggleAddDialog();
  };

  const handleDelete = (index, itemId) => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        if (itemId) {
          deleteIndentItem({
            project_id: selectedProject.id,
            material_indent_details_id: itemId,
          });
          getDetails();
          getDetails();
        } else {
          const _materials = [...materials];
          _materials?.splice(index, 1);
          setMaterials(_materials);
        }
      },
    });
  };

  return (
    <>
      {addDialog ? (
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={initialValues}
          onSubmit={handleSaveMaterial}>
          {formikProps => (
            <AddMaterialDialog
              visible={addDialog}
              handleClose={toggleAddDialog}
              formikProps={formikProps}
              edit={edit}
              wbs_id={wbs_id}
              categoryList={categoryList}
            />
          )}
        </Formik>
      ) : null}
      <View style={styles.container}>
        <Spinner visible={loading} />
        <View style={styles.subContainer}>
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
              contentStyle={styles.addButton}>
              Add Material
            </Button>
          </View>

          <View style={styles.cardSubContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {materials?.map((item, index) => {
                return (
                  <CardListing
                    key={item?.id?.toString()}
                    item={item}
                    index={index}
                    toggleEditDialog={editDialog}
                    handleDelete={handleDelete}
                    edit={edit}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>

        <ActionButtons
          cancelLabel="Cancel"
          submitLabel="Next"
          onCancel={() => navigation.navigate('MaterialIndent')}
          onSubmit={handleSave}
        />
      </View>
    </>
  );
}

export default AddIssueIndentMaterials;

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
    flexGrow: 1,
    margin: 15,
    justifyContent: 'space-between',
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
  modelContainer: {
    flexGrow: 1,
  },
  addButton: {
    paddingVertical: 10,
    borderColor: '#4872f4',
  },
  cardSubContainer: {
    flexGrow: 1,
    flex: 1,
  },
  subContainer: {
    flexGrow: 1,
  },
});
