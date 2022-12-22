import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import ActionButtons from 'components/Atoms/ActionButtons';
import {Caption} from 'react-native-paper';
import {RenderError} from 'components/Atoms/RenderInput';
import {theme} from 'styles/theme';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import FileIcon from 'assets/images/file_icon.png';
import {getShadow} from 'utils';
import {useImagePicker} from 'hooks';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import {isEqual} from 'lodash';
import {useAlert} from 'components/Atoms/Alert';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import Header from '../../CommonComponents/Header';
import Pagination from '../../CommonComponents/Pagination';
import AddMaterialModal from './AddMaterial';

const schema = Yup.object().shape({
  challan: Yup.number('Required').required('Required'),
  // attachments: Yup.mixed().required('File is required'),
});

const RenderAttachments = props => {
  const {attachments, handleDelete} = props;

  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.renderFileContainer}>
          <Text style={styles.attachmentFileHeader}>Attachments</Text>
        </View>
        {attachments?.map((attachment, index) => {
          return (
            <View key={attachment.name}>
              <View style={styles.sectionContainer}>
                <Image source={FileIcon} style={styles.fileIcon} />
                <View>
                  <Text
                    style={(styles.verticalFlex, styles.text)}
                    numberOfLines={1}>
                    {attachment.name}
                  </Text>
                </View>
              </View>
              <OpacityButton
                opacity={0.1}
                color={theme.colors.error}
                style={styles.closeButton}
                onPress={() => handleDelete(index)}>
                <MaterialIcons
                  name="close"
                  color={theme.colors.error}
                  size={17}
                />
              </OpacityButton>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const RenderDamageAttachments = props => {
  const {attachments, handleDelete} = props;

  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.renderFileContainer}>
          <Text style={styles.attachmentFileHeader}>Attachments</Text>
        </View>
        {attachments?.map((attachment, index) => {
          return (
            <View key={attachment.name}>
              <View style={styles.sectionContainer}>
                <Image source={FileIcon} style={styles.fileIcon} />
                <View>
                  <Text
                    style={(styles.verticalFlex, styles.text)}
                    numberOfLines={1}>
                    {attachment.name}
                  </Text>
                </View>
              </View>
              <OpacityButton
                opacity={0.1}
                color={theme.colors.error}
                style={styles.closeButton}
                onPress={() => handleDelete(index)}>
                <MaterialIcons
                  name="close"
                  color={theme.colors.error}
                  size={17}
                />
              </OpacityButton>
            </View>
          );
        })}
      </View>
    </View>
  );
};

function UploadForm(props) {
  const {formikProps} = props;
  const {values, errors, setFieldValue} = formikProps;

  const {openImagePicker} = useImagePicker();

  const handleUpload = () => {
    openImagePicker({
      type: 'file',
      onChoose: file => {
        if (file.uri) {
          const attachments = values.attachments || [];
          attachments.push(file);
          setFieldValue('attachments', attachments);
        }
      },
    });
  };
  const handleDamageUpload = () => {
    openImagePicker({
      type: 'file',
      onChoose: file => {
        if (file.uri) {
          const attachments = values.damageAttachments || [];
          attachments.push(file);
          setFieldValue('damageAttachments', attachments);
        }
      },
    });
  };

  const handleDelete = i => {
    values.attachments?.splice(i, 1);
    setFieldValue('attachments', values.attachments);
  };
  const handleDamageDelete = i => {
    values.damageAttachments?.splice(i, 1);
    setFieldValue('damageAttachments', values.damageAttachments);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.dialogContent}>
        <View>
          <View>
            <Text style={{color: theme.colors.primary}}>
              Upload Material Image
            </Text>
            <OpacityButton
              onPress={handleUpload}
              opacity={0.1}
              style={styles.uploadButton}
              color="#fff">
              <Text style={{color: theme.colors.primary}}>Upload File</Text>
            </OpacityButton>
            <RenderError error={errors.attachments} />
          </View>
          {values.attachments?.length ? (
            <RenderAttachments
              attachments={values.attachments}
              handleDelete={i => handleDelete(i)}
            />
          ) : null}
        </View>
      </View>

      <View style={styles.dialogContent}>
        <View>
          <View>
            <Text style={{color: theme.colors.red}}>
              Upload Damage Material Image
            </Text>
            <OpacityButton
              onPress={handleDamageUpload}
              opacity={0.1}
              style={styles.uploadButton}
              color="#fff">
              <Text style={{color: theme.colors.red}}>Upload File</Text>
            </OpacityButton>
            <RenderError error={errors.damageAttachments} />
          </View>
          {values.damageAttachments?.length ? (
            <RenderDamageAttachments
              attachments={values.damageAttachments}
              handleDelete={i => handleDamageDelete(i)}
            />
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

const RenderCard = props => {
  const {item, toggleEditDialog, handleDelete} = props;

  const {master_list_of_makes_id, damage_qty, missing_qty, fineQty, id} =
    item || {};

  const {materialCategories, materialSubCategories} = useSelector(
    s => s.materialManagement,
  );

  const {commonData} = useSelector(s => s.project);
  const {units} = commonData;

  const categoryTitle = React.useMemo(() => {
    return (
      materialCategories?.find(i => i.id === item?.category)?.title || 'NA'
    );
  }, [item?.category, materialCategories]);

  const subCategoryTitle = React.useMemo(() => {
    return (
      materialSubCategories?.find(i => i.id === item?.sub_material_id)?.title ||
      'NA'
    );
  }, [item?.sub_material_id, materialSubCategories]);

  const unitTitle = React.useMemo(() => {
    return units?.find(i => i.id === item?.material_unit_id)?.title || 'NA';
  }, [item?.material_unit_id, units]);

  return (
    <View style={styles.materialContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.row}>
          <Caption>Category: </Caption>
          <Text>{categoryTitle}</Text>
        </View>
        <View style={styles.btnContainer}>
          <OpacityButton
            color={theme.colors.primary}
            opacity={0.18}
            style={styles.OpacityButton}
            onPress={() => toggleEditDialog(id)}>
            <MaterialIcons name="edit" color={theme.colors.primary} size={15} />
          </OpacityButton>
          <OpacityButton
            color={theme.colors.error}
            opacity={0.18}
            onPress={handleDelete}
            style={styles.OpacityButton}>
            <MaterialIcons name="delete" color={theme.colors.error} size={15} />
          </OpacityButton>
        </View>
      </View>

      <View style={styles.row}>
        <Caption>Sub Category: </Caption>
        <Text>{subCategoryTitle}</Text>
      </View>
      <View style={styles.row}>
        <Caption>Unit: </Caption>
        <Text>{unitTitle}</Text>
      </View>
      <View style={styles.row}>
        <Caption>List of Makes: </Caption>
        <Text style={styles.companyName}>{master_list_of_makes_id}</Text>
      </View>
      <View style={styles.row}>
        <Caption>Fine Qty: </Caption>
        <Text>{fineQty}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.damage}>Damage Qty :{damage_qty} </Text>
      </View>
      <View style={styles.row}>
        <Caption>Missing Qty: </Caption>
        <Text>{missing_qty}</Text>
      </View>
    </View>
  );
};

const DirectGRNChallanMaterial = props => {
  const {navigation, route} = props;
  const {challan_id, id, edit, challan_number} = route?.params || {};

  const alert = useAlert();

  const {
    getPRMaterialCategories,
    getDirectMaterialGRNDetails,
    addDirectGRNMaterialInfo,
    deleteDirectMaterialGRN,
  } = useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const {directGRNDetails, materialSubCategories} = useSelector(
    s => s.materialManagement,
  );

  const {material_request_items, challan_material_image = []} =
    directGRNDetails;

  const [materialRequestItem, setMaterialRequestItem] = useState(
    material_request_items || [],
  );

  const projectId = selectedProject.id;

  const [addDialog, setAddDialog] = React.useState(false);
  const [materials, setMaterials] = React.useState(
    material_request_items || [],
  );

  const [selectedMaterial, setSelectedMaterial] = React.useState(
    material_request_items || [],
  );

  useEffect(() => {
    if (!isEqual(materialRequestItem, materials)) {
      setMaterials(materialRequestItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialRequestItem]);

  useEffect(() => {
    getLoadData();
    getPRMaterialCategories({project_id: projectId});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLoadData = () => {
    if (id) {
      getDirectMaterialGRNDetails({project_id: projectId, grn_id: challan_id});
    }
  };

  const toggleAddDialog = () => setAddDialog(v => !v);

  const initialValues = useMemo(() => {
    if (selectedMaterial) {
      const {
        material_category_id: categoryTitle,
        material_sub_category_id: subCategoryTitle,
        material_units_id: unitTitle,
        damage: damage_qty,
        missing_qty,
        fineQty,
        master_list_of_makes_id,
      } = selectedMaterial;

      const selectedSubCategory = materialSubCategories.find(
        i => i.id === subCategoryTitle,
      );

      return {
        categoryTitle,
        subCategoryTitle,
        material_units_id: unitTitle || selectedSubCategory?.unit_id,
        damage_qty,
        missing_qty,
        fineQty,
        master_list_of_makes_id,
      };
    }
    return {};
  }, [materialSubCategories, selectedMaterial]);

  const onSubmit = async values => {
    const formData = new FormData();

    const materialData = materials.map((item, i) => ({
      categoryTitle: item.category,
      subCategoryTitle: item.sub_material_id,
      material_requests_items_id: selectedMaterial.id,
      damage_qty: item.damage_qty,
      master_list_of_makes_id: item.master_list_of_makes_id,
      missing_qty: item.missing_qty,
      fineQty: item.fineQty,
    }));
    formData.append('project_id', selectedProject.id);
    formData.append('challan_id', challan_id);
    formData.append('data', JSON.stringify(materialData));

    await addDirectGRNMaterialInfo(formData);
    navigation.navigate('VehicleInfo', {
      challan_id,
      edit,
      challan_number,
    });
  };

  const handleDelete = item => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteDirectMaterialGRN({
          challan_id: item.id,
          project_id: selectedProject.id,
        });
        getLoadData();
      },
    });
  };

  const handleAddMaterial = values => {
    toggleAddDialog();
    const _materials = [...materials];
    _materials.push(values);
    setMaterials(_materials);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Header
          title={edit ? ' Edit Material Info' : 'Material Info'}
          {...props}
        />
        <Pagination title="Page 2 of 3" />
      </View>
      <ScrollView style={styles.bodyContainer}>
        {materials?.length
          ? materials?.map(item => {
              return (
                <RenderCard
                  navigation={navigation}
                  item={item}
                  toggleEditDialog={() => {
                    setSelectedMaterial(item);
                    toggleAddDialog();
                  }}
                  handleDelete={handleDelete}
                />
              );
            })
          : null}

        <OpacityButton
          onPress={toggleAddDialog}
          opacity={0.1}
          style={styles.uploadButton}
          color="#fff">
          <MaterialIcons name="add" color="#4872f4" size={17} />
          <Text style={{color: theme.colors.primary}}>Add Material</Text>
        </OpacityButton>

        <AddMaterialModal
          {...props}
          visible={addDialog}
          toggleDialog={toggleAddDialog}
          handleClose={toggleAddDialog}
          edit={edit}
          handleSave={handleAddMaterial}
          material_request_items={material_request_items}
        />

        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={initialValues}
          // validationSchema={schema}
          onSubmit={onSubmit}>
          {formikProps => (
            <>
              <UploadForm
                {...{formikProps}}
                {...props}
                challan_material_image={challan_material_image}
              />
              <ActionButtons
                onSubmit={formikProps.handleSubmit}
                submitLabel="Next"
                cancelLabel="Previous"
                onCancel={() => navigation.goBack()}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DirectGRNChallanMaterial;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10,
  },
  bodyContainer: {
    padding: 10,
    flex: 1,
  },
  headerContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    borderRadius: 5,
    marginVertical: 7,
    marginHorizontal: 7,
    flexGrow: 1,
    position: 'relative',
  },
  verticalFlex: {
    flexDirection: 'column',
  },
  text: {
    color: '#080707',
    paddingHorizontal: 10,
    fontSize: 14,
    alignItems: 'center',
    maxWidth: 170,
    flex: 1,
  },
  materialContainer: {
    ...getShadow(2),
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  renderFileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  btnContainer: {
    flexDirection: 'row',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  OpacityButton: {
    borderRadius: 20,
    marginLeft: 10,
  },
  companyName: {
    backgroundColor: theme.colors.primary,
    color: '#fff',
    padding: 2,
  },
  damage: {
    color: theme.colors.red,
  },
  uploadButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.primary,
    padding: 10,
    marginVertical: 10,
  },
  closeButton: {
    borderRadius: 50,
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  attachmentFileHeader: {
    color: '#000',
    fontSize: 15,
  },
  dialogContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  cardContainer: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
    marginVertical: 7,
  },
});
