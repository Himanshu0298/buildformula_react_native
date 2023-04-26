import ActionButtons from 'components/Atoms/ActionButtons';
import RenderSelect from 'components/Atoms/RenderSelect';
import {useFormik} from 'formik';
import React, {useEffect, useMemo} from 'react';

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
import {cloneDeep, isEqual, isNumber, round} from 'lodash';
import {getShadow} from 'utils';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useAlert} from 'components/Atoms/Alert';

function AddMaterialDialog(props) {
  const {
    handleClose,
    edit,
    categoryList,
    wbs_id,
    handleSave,
    issueInitialValues,
  } = props;

  const {materialCategories, materialSubCategories} = useSelector(
    s => s.materialManagement,
  );

  const {commonData} = useSelector(s => s.project);
  const {units} = commonData;

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
    initialValues: issueInitialValues,
    onSubmit: handleSave,
  });

  const categoryOptions = useMemo(() => {
    const categories = [...new Set(categoryList?.map(i => i.category_id))];

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
  const {item, materialSubCategories, materialCategories} = props;

  const {material_category_id, material_sub_category_id, material_units_id} =
    item;

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
    <View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Category:</Caption>
        <Text style={styles.title}>
          {categoryTitle || material_category_id}
        </Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Sub Category:</Caption>
        <Text style={styles.title}>
          {subCategoryTitle || material_sub_category_id}
        </Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Unit:</Caption>
        <Text style={styles.title}>{unitTitle || material_units_id}</Text>
      </View>
    </View>
  );
};

function RMCCardListing(props) {
  const {
    id,
    item,
    index,
    rmcIssueData,
    navigation,
    materialCategories,
    materialSubCategories,
    editRmcDialog,
  } = props;

  const {requiredfor, grade, rmc_qty, select_grade, quantity} = item;
  return (
    <View style={styles.materialCardContainer}>
      <View style={styles.cardContainer}>
        <>
          <View>
            <View style={styles.buttonRmcContainer}>
              {!id ? (
                <View style={styles.editButton}>
                  <OpacityButton
                    color="#4872f4"
                    opacity={0.18}
                    style={styles.OpacityButton}
                    onPress={() => editRmcDialog(index, item)}>
                    <MaterialIcons name="edit" color="#4872f4" size={13} />
                  </OpacityButton>
                </View>
              ) : null}

              {/* <View>
                <OpacityButton
                  color="#FF5D5D"
                  opacity={0.18}
                  onPress={() => handleRMCDelete(index, item.id)}
                  style={styles.OpacityButton}>
                  <MaterialIcons name="delete" color="#FF5D5D" size={13} />
                </OpacityButton>
              </View> */}
            </View>
            <View style={styles.cardHeader}>
              <Text variant="labelSmall">{requiredfor}</Text>
            </View>
          </View>
          <Divider />
          <View style={styles.newDataRow}>
            <View style={styles.rmcDetail}>
              <Caption>Grade: </Caption>
              <Text>{grade || select_grade}</Text>
            </View>
            <View style={styles.rmcDetail}>
              <Caption>Qty: </Caption>
              <Text style={styles.title}>{rmc_qty || quantity}</Text>
            </View>
          </View>
          <Divider style={styles.rmcHeader} />
        </>

        <RMCCard
          item={item}
          navigation={navigation}
          rmcIssueData={rmcIssueData}
          materialCategories={materialCategories}
          materialSubCategories={materialSubCategories}
        />
      </View>
    </View>
  );
}

function AddRMCDialog(props) {
  const {handleClose, visible, rmcList, edit, handleSave} = props;

  const rmcOptions = useMemo(() => {
    return getUniqueOptions(
      rmcList?.rmc_material?.map(i => ({
        label: i.grade,
        value: i.grade,
      })),
    );
  }, [rmcList]);

  const onSubmit = values => {
    handleSave(values);
    handleClose();
  };

  const initialValues = {
    select_grade: '',
    quantity: '',
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
    initialValues,
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

function MultiRender(props) {
  const {
    wbs,
    issueMaterials,
    edit,
    rmcMaterials,
    rmcIssueData,
    materialCategories,
    materialSubCategories,
    toggleAddRMCDialog,
    toggleAddIssueDialog,
    editDialog,
    handleDelete,
    editRmcDialog,
    handleRMCDelete,
  } = props;

  return (
    <View style={styles.wbsDataContainer}>
      <View style={styles.cardSubContainer}>
        <View style={styles.wbsIdContainer}>
          <Text style={styles.wbs}>{wbs.title} </Text>
        </View>
        <View style={styles.subContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            activeOpacity={0.5}
            onPress={() => toggleAddIssueDialog(wbs.id)}>
            <Text style={styles.textColor}>Issue Material</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonContainer}
            onPress={() => toggleAddRMCDialog(wbs.id)}>
            <Text style={styles.textColor}>Issue RMC</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardSubContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Issue Material</Text>
            </View>
            {issueMaterials?.length ? (
              issueMaterials?.map((item, index) => {
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
              })
            ) : (
              <View style={styles.noResultContainer}>
                <Text>No Materials Added</Text>
              </View>
            )}
          </ScrollView>
        </View>

        <View style={styles.cardSubContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}> RMC Issue Request</Text>
          </View>

          {rmcMaterials?.length ? (
            rmcMaterials?.map((item, index) => {
              return (
                <RMCCardListing
                  item={item}
                  index={index}
                  rmcIssueData={rmcIssueData}
                  materialCategories={materialCategories}
                  materialSubCategories={materialSubCategories}
                  editRmcDialog={editRmcDialog}
                  handleRMCDelete={handleRMCDelete}
                />
              );
            })
          ) : (
            <View style={styles.noResultContainer}>
              <Text>No Materials Added</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

function CreateWork(props) {
  const {navigation, edit, route} = props;

  const {id} = route?.params || {};

  const alert = useAlert();
  const snackbar = useSnackbar();

  const {
    getWorkSubWorkList,
    getRMCList,
    getPRMaterialCategories,
    deleteIndentItem,
    getIndentDetails,
    createWorkIssue,
  } = useMaterialManagementActions();

  const {
    workOptions,
    rmcList,
    categoryList,
    indentDetails,
    materialCategories,
    materialSubCategories,
  } = useSelector(s => s.materialManagement);

  const {selectedProject} = useSelector(s => s.project);
  const projectId = selectedProject.id;

  const {remark, requred_date, vendor_id} = indentDetails.material_indent || {};

  const materialsItems = indentDetails?.issue_list;

  const rmcItems = indentDetails?.rmc_list || [];

  const rmcIssueData = Object.entries(rmcItems)[0];

  const [addRmcDialog, setRmcDialog] = React.useState(false);
  const [addDialog, setAddDialog] = React.useState(false);
  const [selectedMaterialIndex, setSelectedMaterialIndex] = React.useState();
  const [selectedIssueIndex, setSelectedIssueIndex] = React.useState();
  const [selectedWBSId, setSelectedWBSId] = React.useState();
  const [wbsIds, setWbsIds] = React.useState();
  const [materials, setMaterials] = React.useState(
    cloneDeep(materialsItems) || [],
  );
  const [rmcMaterials, setRmcMaterials] = React.useState(
    cloneDeep(rmcIssueData) || [],
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
    if (!isEqual(rmcIssueData, rmcMaterials)) {
      setRmcMaterials(rmcIssueData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rmcIssueData]);

  const getDetails = async () => {
    await getIndentDetails({
      project_id: selectedProject.id,
      material_indent_id: id,
    });
  };

  const workSubWorkOptions = useMemo(() => {
    return workOptions?.map(i => ({label: i.title, value: i.id}));
  }, [workOptions]);

  const handleSave = async () => {
    const issuework = {};
    const rmc_work = {};
    wbsIds?.map(wbsId => {
      issuework[wbsId] = materials.filter(item => {
        if (item.requiredfor === wbsId) {
          const {
            material_category_id,
            material_sub_category_id,
            material_units_id,
            quantity,
          } = item;
          return {
            material_category_id,
            material_sub_category_id,
            material_units_id,
            quantity,
          };
        }
        return false;
      });

      rmc_work[wbsId] = rmcMaterials?.filter(item => {
        if (item.wbs_works_id === wbsId) {
          const {
            material_category_id,
            material_sub_category_id,
            material_units_id,
            quantity,
            indent_rmc_id,
            // rmc_qty: coefficient_qty,
          } = item;
          return {
            material_category_id,
            material_sub_category_id,
            material_units_id,
            quantity,
            indent_rmc_id,
            // coefficient_qty,
          };
        }
        return false;
      });

      return true;
    });

    const restData = {
      project_id: projectId,
      material_indent_id: id,
      issuework: [issuework],
      rmc_work: [rmc_work],
      remark,
      requred_date,
      vendor_id,
    };

    await createWorkIssue(restData);

    getDetails();
    navigation.navigate('MaterialIndent');
    navigation.navigate('IssueIndentPreview', {id});
  };

  const toggleAddRMCDialog = wbsWorkId => {
    setRmcDialog(v => {
      if (v) setSelectedIssueIndex();

      setSelectedWBSId(wbsWorkId);
      return !v;
    });
  };

  const toggleAddIssueDialog = wbsWorkId => {
    setAddDialog(v => {
      if (v) setSelectedMaterialIndex();

      setSelectedWBSId(wbsWorkId);
      return !v;
    });
  };

  const editDialog = index => {
    setSelectedMaterialIndex(index);
    toggleAddIssueDialog();
  };

  const editRmcDialog = index => {
    setSelectedIssueIndex(index);
    toggleAddRMCDialog();
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

  const handleRMCDelete = (index, itemId) => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        const _materials = [...rmcMaterials];
        _materials?.splice(index, 1);
        setRmcMaterials(_materials);
      },
    });
  };

  const handelSetRmc = values => {
    const {select_grade, quantity} = values;

    const data = rmcList?.rmc_material
      ?.filter(i => i.grade === select_grade)
      .map(item => {
        const {
          material_category_id,
          material_sub_category_id,
          material_units_id,
          coefficient_qty: rmc_qty,
          grade,
          rmc_id: indent_rmc_id,
        } = item;

        return {
          wbs_works_id: selectedWBSId,
          material_category_id,
          material_sub_category_id,
          material_units_id,
          quantity: round(quantity * rmc_qty, 2),
          grade,
          indent_rmc_id,
          rmc_qty,
        };
      });

    setRmcMaterials(data);
  };

  const handleSaveIssueMaterial = values => {
    if (!values.material_units_id) {
      snackbar.showMessage({
        message: 'This SubCategory have no unit , please select another one',
        variant: 'warning',
      });
      return;
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

      return;
    }

    const _materials = [...materials];

    const data = {...values, requiredfor: selectedWBSId};

    if (!isNaN(selectedMaterialIndex)) {
      _materials[selectedMaterialIndex] = data;
    } else {
      _materials.push(data);
    }

    setMaterials(_materials);
    toggleAddIssueDialog();
  };

  const issueInitialValues = useMemo(() => {
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

  return (
    <>
      {addRmcDialog ? (
        <AddRMCDialog
          handleClose={toggleAddRMCDialog}
          visible={addRmcDialog}
          rmcList={rmcList}
          addRmcDialog={addRmcDialog}
          selectedIssueIndex={selectedIssueIndex}
          rmcIssueData={rmcIssueData}
          handleSave={handelSetRmc}
        />
      ) : null}
      {addDialog ? (
        <AddMaterialDialog
          visible={addDialog}
          handleClose={toggleAddIssueDialog}
          edit={edit}
          categoryList={categoryList}
          handleSave={handleSaveIssueMaterial}
          issueInitialValues={issueInitialValues}
        />
      ) : null}
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <ScrollView>
              <View style={styles.formContainer}>
                <RenderSelect
                  multiselect
                  name="wbs_works_id"
                  label="Required For"
                  value={wbsIds}
                  options={workSubWorkOptions}
                  containerStyles={styles.inputStyles}
                  onSelect={setWbsIds}
                />

                {wbsIds?.map(wbsId => {
                  const wbs = workOptions.find(i => i.id === wbsId);

                  const filteredIssueMaterials = materials.filter(
                    i => i.requiredfor === wbsId,
                  );
                  const filteredRMCMaterials = rmcMaterials?.filter(
                    i => i.wbs_works_id === wbsId,
                  );

                  return (
                    <MultiRender
                      wbs={wbs}
                      edit={edit}
                      workOptions={workOptions}
                      issueMaterials={filteredIssueMaterials}
                      rmcMaterials={filteredRMCMaterials}
                      rmcIssueData={rmcIssueData}
                      materialCategories={materialCategories}
                      materialSubCategories={materialSubCategories}
                      handleDelete={handleDelete}
                      handleRMCDelete={handleRMCDelete}
                      editDialog={editDialog}
                      editRmcDialog={editRmcDialog}
                      toggleAddRMCDialog={toggleAddRMCDialog}
                      toggleAddIssueDialog={toggleAddIssueDialog}
                    />
                  );
                })}
              </View>
            </ScrollView>
            <ActionButtons
              cancelLabel="Cancel"
              submitLabel="Next"
              onCancel={navigation.goBack}
              onSubmit={handleSave}
            />
          </View>
        </View>
      </ScrollView>
    </>
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
  wbsDataContainer: {
    marginBottom: 20,
    marginTop: 10,
    flexGrow: 1,
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
  newDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noResultContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },

  buttonRmcContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },

  wbsIdContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
  },
  wbs: {
    padding: 2,
  },
});

export default CreateWork;
