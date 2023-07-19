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
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {cloneDeep, isNumber, round} from 'lodash';
import {getShadow} from 'utils';
import * as Yup from 'yup';

import {useSnackbar} from 'components/Atoms/Snackbar';
import {useAlert} from 'components/Atoms/Alert';
import {getUniqueOptions} from 'utils/constant';

const NO_WBS_ID = 0;

const schema = Yup.object().shape({
  quantity: Yup.number().label('quantity').required('required'),
});

function AddMaterialDialog(props) {
  const {
    handleClose,
    edit,
    categoryList,
    handleSave,
    issueInitialValues,
    wbsIds,
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

  const categoryWorkOptions = useMemo(() => {
    const categories = [...new Set(categoryList?.map(i => i.category_id))];

    return materialCategories
      ?.filter(i => categories.includes(i.id))
      ?.map(i => ({
        label: `${i.title}`,
        value: i.id,
      }));
  }, [categoryList, materialCategories]);

  const categoryOptions = useMemo(() => {
    return materialCategories?.map(i => ({
      label: `${i.title}`,
      value: i.id,
    }));
  }, [materialCategories]);

  const subCategoryWorkOptions = useMemo(() => {
    const subCategories = [
      ...new Set(categoryList.map(i => i.master_material_subcategory_id)),
    ];

    return materialSubCategories
      ?.filter(i => subCategories.includes(i.id))
      ?.filter(i => i.category_id === values.material_category_id)
      ?.map(i => ({label: `${i.title}`, value: i.id}));
  }, [categoryList, materialSubCategories, values.material_category_id]);

  const subCategoryOptions = useMemo(() => {
    return materialSubCategories
      ?.filter(i => i.category_id === values.material_category_id)
      ?.map(i => ({label: `${i.title}`, value: i.id}));
  }, [materialSubCategories, values.material_category_id]);

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
                options={wbsIds?.length ? categoryWorkOptions : categoryOptions}
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
                options={
                  wbsIds?.length ? subCategoryWorkOptions : subCategoryOptions
                }
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
  const {item, toggleEditDialog, handleDelete, index, wbs} = props;

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
                onPress={() => toggleEditDialog(index, wbs)}>
                <MaterialIcons name="edit" color="#4872f4" size={13} />
              </OpacityButton>
            </View>
          ) : null}

          <View>
            <OpacityButton
              color="#FF5D5D"
              opacity={0.18}
              onPress={() => handleDelete(wbs, index, item.id)}
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
    navigation,
    materialCategories,
    materialSubCategories,
    editRmcDialog,
    wbs,
  } = props;

  const {grade, rmc_qty, select_grade, quantity} = item;
  return (
    <View style={styles.materialCardContainer}>
      <View style={styles.cardContainer}>
        <>
          <View>
            <View style={styles.buttonRmcContainer}>
              {id ? (
                <View style={styles.editButton}>
                  <OpacityButton
                    color="#4872f4"
                    opacity={0.18}
                    style={styles.OpacityButton}
                    onPress={() => editRmcDialog(index, wbs)}>
                    <MaterialIcons name="edit" color="#4872f4" size={13} />
                  </OpacityButton>
                </View>
              ) : null}
            </View>
          </View>
          <Divider />
          <View style={styles.newDataRow}>
            <View style={styles.rmcDetail}>
              <Caption>Grade: </Caption>
              <Text>{grade || select_grade || ''}</Text>
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
    validationSchema: schema,
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
    materialCategories,
    materialSubCategories,
    toggleAddRMCDialog,
    toggleAddIssueDialog,
    editDialog,
    handleDelete,
    editRmcDialog,
    handleIndentRequestDelete,
  } = props;

  const rmc_delete_data = rmcMaterials?.find(e => e) || {};
  const issue_delete_data = issueMaterials?.find(e => e) || {};

  return (
    <View style={styles.wbsDataContainer}>
      <View style={styles.cardSubContainer}>
        {wbs?.title ? (
          <View style={styles.wbsIdContainer}>
            <Text style={styles.wbs}>{wbs?.title} </Text>
          </View>
        ) : null}
        <View style={styles.subContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            activeOpacity={0.5}
            onPress={() => toggleAddIssueDialog(wbs?.id)}>
            <Text style={styles.textColor}>Issue Material</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonContainer}
            onPress={() => toggleAddRMCDialog(wbs?.id)}>
            <Text style={styles.textColor}>Issue RMC</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardSubContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.listHeader}>
              <Text style={styles.title}>Issue Material</Text>
              {edit && issueMaterials?.length ? (
                <View>
                  <OpacityButton
                    color="#FF5D5D"
                    opacity={0.18}
                    onPress={() => handleIndentRequestDelete(issue_delete_data)}
                    style={[styles.OpacityButton, {width: 32, height: 32}]}>
                    <MaterialIcons name="delete" color="#FF5D5D" size={13} />
                  </OpacityButton>
                </View>
              ) : null}
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
                    wbs={wbs?.id}
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
          <View style={styles.listHeader}>
            <Text style={styles.title}> RMC Issue Request</Text>
            {edit && rmcMaterials?.length ? (
              <View>
                <OpacityButton
                  color="#FF5D5D"
                  opacity={0.18}
                  onPress={() => handleIndentRequestDelete(rmc_delete_data)}
                  style={[styles.OpacityButton, {width: 32, height: 32}]}>
                  <MaterialIcons name="delete" color="#FF5D5D" size={13} />
                </OpacityButton>
              </View>
            ) : null}
          </View>

          {rmcMaterials?.length ? (
            rmcMaterials?.map((item, index) => {
              return (
                <RMCCardListing
                  item={item}
                  index={index}
                  materialCategories={materialCategories}
                  materialSubCategories={materialSubCategories}
                  editRmcDialog={editRmcDialog}
                  wbs={wbs?.id}
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
  const {navigation, route} = props;

  const {id, edit} = route?.params || {};

  const alert = useAlert();
  const snackbar = useSnackbar();

  const {
    getWorkSubWorkList,
    getRMCList,
    getPRMaterialCategories,
    deleteIndentItem,
    deleteIndentRequest,
    getIndentDetails,
    createWorkIssue,
    getMaterialIndentCategoryList,
  } = useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const projectId = selectedProject.id;
  const wbsIdCheck = selectedProject.afm_wbs_id;

  const {
    workOptions,
    rmcList,
    indentDetails,
    materialCategories,
    materialSubCategories,
    categoryList,
  } = useSelector(s => s.materialManagement);

  const {remark, requred_date, vendor_id} =
    indentDetails?.material_indent || {};

  const [addRmcDialog, setRmcDialog] = React.useState(false);
  const [addDialog, setAddDialog] = React.useState(false);
  const [selectedMaterialIndex, setSelectedMaterialIndex] = React.useState();
  const [selectedIssueIndex, setSelectedIssueIndex] = React.useState();
  const [selectedWBSId, setSelectedWBSId] = React.useState();
  const [wbsIds, setWbsIds] = React.useState([NO_WBS_ID]);
  const [materials, setMaterials] = React.useState([]);
  const [rmcMaterials, setRmcMaterials] = React.useState([]);

  React.useEffect(() => {
    getWorkSubWorkList({project_id: projectId});
    getRMCList({project_id: projectId});
    getDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (wbsIds.length) {
      if (materials[NO_WBS_ID]) {
        const _materials = {...materials};
        delete _materials[NO_WBS_ID];
        setMaterials(_materials);
      }
      if (rmcMaterials[NO_WBS_ID]) {
        const _rmcMaterials = {...rmcMaterials};
        delete rmcMaterials[NO_WBS_ID];
        setRmcMaterials(_rmcMaterials);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wbsIds.length]);

  React.useEffect(() => {
    if (selectedWBSId) {
      getMaterialIndentCategoryList({
        project_id: projectId,
        wbs_works_id: [selectedWBSId],
      });
    } else if (selectedWBSId === NO_WBS_ID) {
      getPRMaterialCategories({project_id: projectId});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWBSId]);

  useEffect(() => {
    if (indentDetails) {
      const {issue_list = {}, rmc_list = {}} = indentDetails;
      const computedWbsIds = [
        ...new Set([...Object.keys(issue_list), ...Object.keys(rmc_list)]),
      ];

      setMaterials(cloneDeep(issue_list || {}));
      setRmcMaterials(cloneDeep(rmc_list || {}));
      setWbsIds(computedWbsIds);
    }
  }, [indentDetails]);

  const getDetails = async () => {
    return getIndentDetails({
      project_id: selectedProject.id,
      material_indent_id: id,
    });
  };

  const workSubWorkOptions = useMemo(() => {
    return workOptions?.map(i => ({label: i.title, value: i.id}));
  }, [workOptions]);

  const handleSave = async () => {
    const parsedRmcMaterials = rmcMaterials.map(item => {
      const {rmc_qty: coefficient_qty, ...rest} = item;
      return {
        ...rest,
        coefficient_qty,
      };
    });

    const restData = {
      project_id: projectId,
      material_indent_id: id,
      issuework: [materials],
      rmc_work: [parsedRmcMaterials],
      remark,
      requred_date,
      vendor_id,
    };

    if (wbsIdCheck === 'yes') {
      if (wbsIds?.length) {
        await createWorkIssue(restData);
      } else {
        snackbar.showMessage({
          message: 'Please add item in Required for dropdown',
          variant: 'error',
        });
        return;
      }
    }

    await createWorkIssue(restData);

    getDetails();
    navigation.navigate('MaterialIndent');
    navigation.navigate('IssueIndentPreview', {id});
  };

  const handleIndentRequestDelete = async delete_data => {
    const {type, wbs_works_id} = delete_data;
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: async () => {
        await deleteIndentRequest({
          project_id: projectId,
          material_indent_id: id,
          wbs_works_id,
          type,
        });
        getDetails();
      },
    });
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

  const editDialog = (index, wbs) => {
    setSelectedMaterialIndex(index);

    toggleAddIssueDialog(wbs);
  };

  const editRmcDialog = (index, wbsId) => {
    setSelectedIssueIndex(index);
    toggleAddRMCDialog(wbsId);
  };

  const handleDelete = (wbsId, index, itemId) => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: async () => {
        if (itemId) {
          await deleteIndentItem({
            project_id: selectedProject.id,
            material_indent_details_id: itemId,
          });
          getDetails();
        } else {
          const _materials = [...materials];
          _materials[wbsId]?.splice(index, 1);
          setMaterials(_materials);
        }
      },
    });
  };

  const handelSetRmc = values => {
    const {select_grade, quantity} = values;

    const wbsRmcMaterials = rmcMaterials[selectedWBSId] || [];

    const filtered =
      wbsRmcMaterials?.filter(
        i => i.grade !== select_grade || i.wbs_works_id !== selectedWBSId,
      ) || [];

    const data = rmcList?.rmc_material
      ?.filter(i => i.grade === select_grade)
      .map(item => {
        const {coefficient_qty: rmc_qty, rmc_id: indent_rmc_id, ...rest} = item;

        return {
          ...rest,
          wbs_works_id: selectedWBSId,
          quantity: round(quantity * rmc_qty, 2),
          indent_rmc_id,
          rmc_qty,
        };
      });

    rmcMaterials[selectedWBSId] = [...filtered, ...data];

    setRmcMaterials(rmcMaterials);
  };

  const handleSaveIssueMaterial = values => {
    if (!values.material_units_id) {
      snackbar.showMessage({
        message: 'This SubCategory have no unit , please select another one',
        variant: 'warning',
      });
      return;
    }

    const wbsMaterials = materials[selectedWBSId] || [];

    const data = {...values, wbs_works_id: selectedWBSId};

    if (!isNaN(selectedMaterialIndex)) {
      wbsMaterials[selectedMaterialIndex] = data;
    } else {
      wbsMaterials.push(data);
    }

    materials[selectedWBSId] = wbsMaterials;

    setMaterials(materials);
    toggleAddIssueDialog();
  };

  const getWbsOption = wbsId => {
    if (wbsId === NO_WBS_ID) return {id: 0};
    return workOptions?.find(i => Number(i.id) === Number(wbsId));
  };

  const issueInitialValues = useMemo(() => {
    if (isNumber(selectedMaterialIndex)) {
      const {
        material_category_id,
        material_sub_category_id,
        material_units_id,
        quantity,
        wbs_works_id,
      } = materials[selectedWBSId][selectedMaterialIndex];

      const selectedSubCategory = materialSubCategories?.find(
        i => i.id === material_sub_category_id,
      );

      return {
        material_category_id,
        material_sub_category_id,
        material_units_id: material_units_id || selectedSubCategory?.unit_id,
        quantity,
        wbs_works_id,
      };
    }

    return {};
  }, [materialSubCategories, materials, selectedMaterialIndex, selectedWBSId]);

  const parsedWbsIds = useMemo(() => {
    return wbsIds?.length ? wbsIds : [NO_WBS_ID];
  }, [wbsIds]);

  return (
    <>
      {addRmcDialog ? (
        <AddRMCDialog
          visible={addRmcDialog}
          rmcList={rmcList}
          addRmcDialog={addRmcDialog}
          selectedIssueIndex={selectedIssueIndex}
          handleSave={handelSetRmc}
          handleClose={toggleAddRMCDialog}
        />
      ) : null}

      {addDialog ? (
        <AddMaterialDialog
          visible={addDialog}
          edit={edit}
          wbsIds={wbsIds}
          categoryList={categoryList}
          issueInitialValues={issueInitialValues}
          handleSave={handleSaveIssueMaterial}
          handleClose={toggleAddIssueDialog}
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

                {!parsedWbsIds.length ? (
                  <View>
                    <View style={styles.subContainer}>
                      <TouchableOpacity
                        style={styles.buttonContainer}
                        activeOpacity={0.5}
                        onPress={() => toggleAddIssueDialog(NO_WBS_ID)}>
                        <Text style={styles.textColor}>Issue Material</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonContainer}
                        onPress={() => toggleAddRMCDialog(NO_WBS_ID)}>
                        <Text style={styles.textColor}>Issue RMC</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}

                {parsedWbsIds?.map(wbsId => {
                  return (
                    <MultiRender
                      wbs={getWbsOption(wbsId)}
                      edit={edit}
                      workOptions={workOptions}
                      issueMaterials={materials[wbsId]}
                      rmcMaterials={rmcMaterials[wbsId]}
                      materialCategories={materialCategories}
                      materialSubCategories={materialSubCategories}
                      handleDelete={handleDelete}
                      handleIndentRequestDelete={handleIndentRequestDelete}
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
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CreateWork;
