import ActionButtons from 'components/Atoms/ActionButtons';
import RenderSelect from 'components/Atoms/RenderSelect';
import {Formik, useFormik} from 'formik';
import React, {useEffect, useMemo} from 'react';
import * as Yup from 'yup';

import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {
  Caption,
  Divider,
  IconButton,
  Subheading,
  Text,
} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {theme} from 'styles/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import RenderInput from 'components/Atoms/RenderInput';
import {getUniqueOptions} from 'utils/constant';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {cloneDeep, isArray, isEqual, isNumber} from 'lodash';
import {getShadow, onlyInLeft} from 'utils';
import {useSnackbar} from 'components/Atoms/Snackbar';

function AddMaterialDialog(props) {
  const {
    handleClose,
    edit,
    categoryList,
    wbs_id,
    selectedMaterialIndex,
    materials,
    materialsItems,
    setMaterials,
  } = props;

  const {materialCategories, materialSubCategories} = useSelector(
    s => s.materialManagement,
  );

  const {commonData} = useSelector(s => s.project);
  const {units} = commonData;
  const snackbar = useSnackbar();

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
    handleClose();
  };

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
    initialValues: {},
    onSubmit: handleSaveMaterial,
  });

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

function IssueCardListing(props) {
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
        <View style={styles.buttonSubContainer}>
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

const RMCCard = props => {
  const {item} = props;

  const {
    materialcategrytitle,
    subcategorytitle,
    quantity,
    assigned_quantity,
    materialunitstitle,
  } = item;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Category:</Caption>
        <Text style={styles.title}>{materialcategrytitle}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Sub Category:</Caption>
        <Text style={styles.title}>{subcategorytitle}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Unit:</Caption>
        <Text style={styles.title}>{materialunitstitle}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Ask Qty:</Caption>
        <Text style={styles.title}>{quantity}</Text>
      </View>

      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Assigned Qty:</Caption>
        <Text style={styles.title}>{assigned_quantity}</Text>
      </View>
    </View>
  );
};

function RMCCardListing(props) {
  const {rmcItems, navigation, updateStatus} = props;
  console.log('===========> rmc_list', rmcItems);
  return (
    <View style={styles.materialCardContainer}>
      {rmcItems?.map(item => {
        return item
          ?.filter(workId => isArray(workId))
          ?.map(rmc_request => {
            const headerInfo = rmc_request?.find(e => e);

            const {requiredfor, grade, rmc_qty} = headerInfo;
            return (
              <View style={styles.cardContainer}>
                {item.find(e => e !== rmc_request.wbs_works_id) ? (
                  <>
                    <View style={styles.cardHeader}>
                      <Text variant="labelSmall">{requiredfor}</Text>
                    </View>

                    <Divider />
                    <View style={styles.newDataRow}>
                      <View style={styles.rmcDetail}>
                        <Caption>Grade: </Caption>
                        <Text>{grade}</Text>
                      </View>
                      <View style={styles.rmcDetail}>
                        <Caption>Qty: </Caption>
                        <Text>{rmc_qty}</Text>
                      </View>
                    </View>
                    <Divider style={styles.rmcHeader} />
                  </>
                ) : null}
                {rmc_request?.map(single_request => {
                  return (
                    <RMCCard
                      item={single_request}
                      navigation={navigation}
                      updateStatus={updateStatus}
                    />
                  );
                })}
              </View>
            );
          });
      })}
    </View>
  );
}

function AddRMCDialog(props) {
  const {handleClose, visible, rmcList, edit} = props;

  const rmcOptions = useMemo(() => {
    return getUniqueOptions(
      rmcList?.rmc_material?.map(i => ({
        label: i.grade,
        value: i.id,
      })),
    );
  }, [rmcList]);

  const onSubmit = values => {
    console.log('===========>values ', values);
  };

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
    initialValues: {},
    onSubmit,
  });

  return (
    <Modal {...props} onBackdropPress={handleClose} isVisible={visible}>
      <SafeAreaProvider>
        <SafeAreaView edges={['top']} style={styles.modelContainer}>
          <View style={styles.dataRow}>
            <IconButton
              icon="keyboard-backspace"
              size={16}
              color={theme.colors.primary}
              style={styles.backButton}
              onPress={handleClose}
            />
            <Subheading style={styles.headerText}>RMC Material</Subheading>
          </View>
          <View style={styles.formContainer}>
            <RenderSelect
              name="select_grade"
              label="Select Grade"
              value={values.select_grade}
              options={rmcOptions}
              containerStyles={styles.inputStyles}
              onBlur={handleBlur('select_grade')}
              onSelect={value => {
                setFieldValue('select_grade', value);
              }}
            />
            <RenderInput
              name="quantity"
              label="Quantity"
              containerStyles={styles.inputStyles}
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
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
}

function CreateWork(props) {
  const {navigation, edit, route} = props;

  const {id} = route?.params || {};

  const {
    getWorkSubWorkList,
    getRMCList,
    getPRMaterialCategories,
    deleteIndentItem,
    getIndentDetails,
    addMaterialIssueRequest,
  } = useMaterialManagementActions();
  const {
    workOptions,
    rmcList,
    categoryList,
    indentDetails,
    materialSubCategories,
  } = useSelector(s => s.materialManagement);
  const {selectedProject} = useSelector(s => s.project);
  const projectId = selectedProject.id;

  const materialsItems = indentDetails?.issue_list;
  const rmcItems = indentDetails.rmc_list;

  const [addRmcDialog, setRmcDialog] = React.useState(false);
  const [addDialog, setAddDialog] = React.useState(false);
  const [selectedMaterialIndex, setSelectedMaterialIndex] = React.useState();
  const [materials, setMaterials] = React.useState(
    cloneDeep(materialsItems) || [],
  );
  const [rmcMaterials, setRmcMaterials] = React.useState(
    cloneDeep(rmcItems) || [],
  );

  React.useEffect(() => {
    getWorkSubWorkList({project_id: projectId});
    getRMCList({project_id: projectId});
    getPRMaterialCategories({project_id: projectId});
    getDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isEqual(materialsItems, materials)) {
      setMaterials(materialsItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialsItems]);

  useEffect(() => {
    if (!isEqual(rmcItems, rmcMaterials)) {
      setRmcMaterials(rmcItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rmcItems]);

  const getDetails = async () => {
    await getIndentDetails({
      project_id: selectedProject.id,
      material_indent_id: id,
    });
  };

  const workSubWorkOptions = useMemo(() => {
    return workOptions?.map(i => ({label: `{${i.title}}`, value: i.id}));
  }, [workOptions]);

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

  const toggleAddRMcDialog = () => setRmcDialog(v => !v);

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
        } else {
          const _materials = [...materials];
          _materials?.splice(index, 1);
          setMaterials(_materials);
        }
      },
    });
  };
  return (
    <View style={styles.container}>
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialValues}
        onSubmit={handleSave}>
        {formikProps => {
          const {values, handleBlur, setFieldValue} = formikProps;

          return (
            <View style={styles.formContainer}>
              <ScrollView>
                <View style={styles.formContainer}>
                  <RenderSelect
                    multiselect
                    name="wbs_works_id"
                    label="Required For"
                    value={values.wbs_works_id}
                    options={workSubWorkOptions}
                    containerStyles={styles.inputStyles}
                    onBlur={handleBlur('wbs_works_id')}
                    onSelect={value => {
                      setFieldValue('wbs_works_id', value);
                    }}
                  />
                  {values.wbs_works_id ? (
                    <View style={styles.subContainer}>
                      <TouchableOpacity
                        style={styles.buttonContainer}
                        activeOpacity={0.5}
                        onPress={toggleAddDialog}>
                        <Text style={styles.textColor}>Issue Material</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonContainer}
                        onPress={toggleAddRMcDialog}>
                        <Text style={styles.textColor}>Issue RMC</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  {materials?.length ? (
                    <View style={styles.cardSubContainer}>
                      <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.titleContainer}>
                          <Text style={styles.title}>Issue Material</Text>
                        </View>
                        {materials?.map((item, index) => {
                          return (
                            <IssueCardListing
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
                  ) : null}

                  <View style={styles.cardSubContainer}>
                    <View style={styles.titleContainer}>
                      <Text style={styles.title}> RMC Issue Request</Text>
                    </View>
                    <RMCCardListing rmcItems={rmcItems} />
                  </View>

                  <AddRMCDialog
                    handleClose={toggleAddRMcDialog}
                    visible={addRmcDialog}
                    rmcList={rmcList}
                    formikProps={formikProps}
                    addRmcDialog={addRmcDialog}
                  />
                  <AddMaterialDialog
                    visible={addDialog}
                    handleClose={toggleAddDialog}
                    formikProps={formikProps}
                    edit={edit}
                    categoryList={categoryList}
                    setMaterials={setMaterials}
                    materials={materials}
                    selectedMaterialIndex={selectedMaterialIndex}
                    materialsItems={materialsItems}
                  />
                </View>
              </ScrollView>
              <ActionButtons
                cancelLabel="Cancel"
                submitLabel="Next"
                onCancel={navigation.goBack}
                onSubmit={handleSave}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
  inputStyles: {
    marginVertical: 8,
  },
  modelContainer: {
    margin: 10,
    flexGrow: 1,
  },
  formContainer: {
    flexGrow: 1,
  },
  subContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#4872f4',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    width: '48%',
    textAlign: 'centre',
  },
  textColor: {
    color: '#EDF1FD',
  },

  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    marginVertical: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 12,
    ...getShadow(5),
  },

  cardSubContainer: {
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 12,
    ...getShadow(2),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lightData: {
    fontSize: 13,
  },
  buttonSubContainer: {
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center',
  },
  OpacityButton: {
    borderRadius: 20,
    marginLeft: 10,
  },

  titleContainer: {
    marginVertical: 5,
  },
  title: {
    color: '#4872f4',
  },
});

export default CreateWork;
