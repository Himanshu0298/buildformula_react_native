import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Caption} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import {isEqual, round} from 'lodash';
import ActionButtons from 'components/Atoms/ActionButtons';
import {RenderError} from 'components/Atoms/RenderInput';
import {theme} from 'styles/theme';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import FileIcon from 'assets/images/file_icon.png';
import {getShadow} from 'utils';
import {useImagePicker} from 'hooks';
import {useAlert} from 'components/Atoms/Alert';
import useMaterialManagement from 'services/materialManagement';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import Header from '../../CommonComponents/Header';
import Pagination from '../../CommonComponents/Pagination';
import AddMaterialModal from './AddMaterial';

const schema = Yup.object().shape({
  // challan_material_image: Yup.mixed().required('File is required'),
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
          const challan_material_image = values.challan_material_image || [];
          challan_material_image.push(file);
          setFieldValue('challan_material_image', challan_material_image);
        }
      },
    });
  };
  const handleDamageUpload = () => {
    openImagePicker({
      type: 'file',
      onChoose: file => {
        if (file.uri) {
          const challan_material_damage_image =
            values.challan_material_damage_image || [];
          challan_material_damage_image.push(file);
          setFieldValue(
            'challan_material_damage_image',
            challan_material_damage_image,
          );
        }
      },
    });
  };

  const handleDelete = i => {
    values.challan_material_image?.splice(i, 1);
    setFieldValue('challan_material_image', values.challan_material_image);
  };
  const handleDamageDelete = i => {
    values.challan_material_damage_image?.splice(i, 1);
    setFieldValue(
      'challan_material_damage_image',
      values.challan_material_damage_image,
    );
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
            <RenderError error={errors.challan_material_image} />
          </View>
          {values.challan_material_image?.length ? (
            <RenderAttachments
              attachments={values.challan_material_image}
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
            <RenderError error={errors.challan_material_damage_image} />
          </View>
          {values.challan_material_damage_image?.length ? (
            <RenderDamageAttachments
              attachments={values.challan_material_damage_image}
              handleDelete={i => handleDamageDelete(i)}
            />
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

const RenderCard = props => {
  const {item, editDialog, index, handleDelete} = props;

  const {
    damage_qty,
    missing,
    material_quantity,
    rate,
    challan_total_amount,
    lom,
    delivery_challan_rate,
    damage,
  } = item || {};

  const {materialCategories, materialSubCategories, makeOfLists} = useSelector(
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

  // const makeOfListTitle = React.useMemo(() => {
  //   return makeOfLists?.find(i => i.id === item?.lom)?.title || 'NA';
  // }, [item?.lom, makeOfLists]);

  const makeOfList = React.useMemo(() => {
    return (
      makeOfLists?.find(i => String(i.id) === item.lomtitle)?.title || 'NA'
    );
  }, [item, makeOfLists]);

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
            onPress={() => editDialog(index)}>
            <MaterialIcons name="edit" color={theme.colors.primary} size={15} />
          </OpacityButton>
          <OpacityButton
            color={theme.colors.error}
            opacity={0.18}
            onPress={() => handleDelete(index)}
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
        <Text style={styles.companyName}>{makeOfList || lom}</Text>
      </View>
      <View style={styles.row}>
        <Caption>Fine Qty: </Caption>
        <Text>{material_quantity}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.damage}>Damage Qty :{damage || damage_qty} </Text>
      </View>
      <View style={styles.row}>
        <Caption>Missing Qty: </Caption>
        <Text>{missing}</Text>
      </View>
      <View style={styles.row}>
        <Caption>Rate: </Caption>
        <Text>{rate || delivery_challan_rate}</Text>
      </View>
      <View style={styles.row}>
        <Caption>Total Rate: </Caption>
        <Text>{challan_total_amount}</Text>
      </View>
    </View>
  );
};

const DirectGRNChallanMaterial = props => {
  const {navigation, route} = props;
  const {challan_id, edit, challan_number} = route?.params || {};

  const alert = useAlert();

  const {getPRMaterialCategories, addDirectGRNMaterialInfo} =
    useMaterialManagementActions();

  const {getDirectMaterialGRNDetails} = useMaterialManagement();

  const {selectedProject} = useSelector(s => s.project);
  const [directGRNDetails, setDirectGrnDetails] = useState(
    material_request_items || [],
  );
  const {material_request_items, challan_material_image = []} =
    directGRNDetails;

  const projectId = selectedProject.id;

  const [addDialog, setAddDialog] = React.useState(false);
  const [materials, setMaterials] = React.useState(
    material_request_items || [],
  );
  const [selectedMaterialIndex, setSelectedMaterialIndex] = React.useState();

  useEffect(() => {
    if (!isEqual(material_request_items, materials)) {
      setMaterials(material_request_items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [material_request_items]);

  useEffect(() => {
    getLoadData();
    getPRMaterialCategories({project_id: projectId});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLoadData = async () => {
    const {data: res} = await getDirectMaterialGRNDetails({
      project_id: projectId,
      grn_id: challan_id,
    });

    setDirectGrnDetails(res.data);
  };

  const toggleAddDialog = () => {
    setAddDialog(v => {
      if (v) setSelectedMaterialIndex();
      return !v;
    });
  };

  const onSubmit = async values => {
    const formData = new FormData();

    const {
      challan_material_image: challanImages,
      challan_material_damage_image,
    } = values;

    const materialData = materials.map(item => ({
      material_category_id: item.material_category_id,
      sub_material_id: item.material_sub_category_id,
      material_unit_id: item.material_units_id,
      damage: item.damage,
      lom: item.lom,
      missing: item.missing,
      quantity: item.material_quantity,
      rate: item.rate,
      total_amount: item.challan_total_amount,
    }));

    if (challanImages) {
      challanImages.map(item => {
        formData.append('upload_challan_image[]', item);
        return item;
      });
    }
    if (challan_material_damage_image) {
      challan_material_damage_image.map(item => {
        formData.append('upload_damage_challan_image[]', item);
        return item;
      });
    }
    formData.append('project_id', selectedProject.id);
    formData.append('challan_id', challan_id);
    formData.append('data', JSON.stringify(materialData));

    await addDirectGRNMaterialInfo(formData);
    navigation.navigate('MaterialGRNListing');
    navigation.navigate('VehicleInfo', {
      challan_id,
      edit,
      challan_number,
    });
  };

  const handleDelete = index => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        const _materials = [...materials];
        _materials?.splice(index, 1);
        setMaterials(_materials);
      },
    });
  };

  const handleSaveMaterial = values => {
    const _materials = [...materials];

    // const filteredMaterial = _materials.filter(e =>
    //   e.material_sub_category_id === values.material_sub_category_id
    //     ? (snackbar.showMessage({
    //         message: 'Cannot add same subcategory again',
    //         variant: 'error',
    //       }),
    //       e.material_sub_category_id !== values.material_sub_category_id)
    //     : _materials,
    // );

    values.challan_total_amount = round(
      Number(values.material_quantity) * Number(values.rate),
      2,
    );

    if (!isNaN(selectedMaterialIndex)) {
      _materials[selectedMaterialIndex] = values;
    } else {
      _materials.push(values);
    }
    setMaterials(_materials);
    toggleAddDialog();
  };

  const editDialog = index => {
    setSelectedMaterialIndex(index);
    toggleAddDialog();
  };

  return (
    <>
      <AddMaterialModal
        visible={addDialog}
        handleClose={toggleAddDialog}
        handleSave={handleSaveMaterial}
        material={materials?.[selectedMaterialIndex]}
      />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Header
            title={edit ? ' Edit Material Info' : 'Material Info'}
            {...props}
          />
          <Pagination title="Page 2 of 3" />
        </View>
        <ScrollView style={styles.bodyContainer}>
          {materials?.map((item, index) => {
            return (
              <RenderCard
                navigation={navigation}
                index={index}
                item={item}
                handleDelete={handleDelete}
                editDialog={editDialog}
              />
            );
          })}

          <OpacityButton
            onPress={toggleAddDialog}
            opacity={0.1}
            style={styles.uploadButton}
            color="#fff">
            <MaterialIcons name="add" color="#4872f4" size={17} />
            <Text style={{color: theme.colors.primary}}>Add Material</Text>
          </OpacityButton>
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{}}
            validationSchema={schema}
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
                  onCancel={() => navigation.navigate('MaterialGRNListing')}
                />
              </>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </>
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
    padding: 5,
    fontSize: 10,
    borderRadius: 10,
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
