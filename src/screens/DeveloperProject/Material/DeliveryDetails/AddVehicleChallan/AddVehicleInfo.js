import React from 'react';
import {Formik} from 'formik';
import {withTheme} from 'react-native-paper';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as Yup from 'yup';
import RenderInput, {RenderError} from 'components/Atoms/RenderInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {theme} from 'styles/theme';
import FileIcon from 'assets/images/file_icon.png';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useImagePicker} from 'hooks';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import {useSelector} from 'react-redux';
import ActionButtons from 'components/Atoms/ActionButtons';
import TextInputMask from 'react-native-text-input-mask';
import Spinner from 'react-native-loading-spinner-overlay';
import {StackActions} from '@react-navigation/native';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import Header from '../../CommonComponents/Header';
import Pagination from '../../CommonComponents/Pagination';

const schema = Yup.object().shape({
  driverName: Yup.string('Required').required('Required'),
  vehicleNo: Yup.string('Required').required('Required'),
  // vehicleAttachments: Yup.mixed().required('File is required'),
});

const RenderAttachments = props => {
  const {attachments, handleDelete} = props;

  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.renderFileContainer}>
          <Text style={styles.attachmentFileHeader}>Attachments</Text>
        </View>
        {attachments?.map((attachment, i) => {
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
                onPress={() => handleDelete(i)}>
                <MaterialIcon
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

function ChallanForm(props) {
  const {formikProps, navigation} = props;
  const {
    values,
    handleSubmit,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
  } = formikProps;

  const {openImagePicker} = useImagePicker();

  const handleUpload = () => {
    openImagePicker({
      type: 'file',
      onChoose: file => {
        if (file.uri) {
          const attachments = values.vehicleAttachments || [];
          attachments.push(file);
          setFieldValue('vehicleAttachments', attachments);
        }
      },
    });
  };

  const handleDelete = i => {
    values.vehicleAttachments.splice(i, 1);
    setFieldValue('vehicleAttachments', values.vehicleAttachments);
  };

  const handleUploadDamage = () => {
    openImagePicker({
      type: 'file',
      onChoose: file => {
        if (file.uri) {
          const attachments = values.vehicleInvoiceAttachments || [];
          attachments.push(file);
          setFieldValue('vehicleInvoiceAttachments', attachments);
        }
      },
    });
  };

  const handleDeleteDamage = i => {
    values.vehicleInvoiceAttachments.splice(i, 1);
    setFieldValue(
      'vehicleInvoiceAttachments',
      values.vehicleInvoiceAttachments,
    );
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Header title="Vehicle Info " {...props} />
        <Pagination title="Page 3 of 3" />
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.dialogContent}>
          <View>
            <RenderInput
              name="driverName"
              label="Driver Name"
              containerStyles={styles.input}
              value={values.driverName}
              onChangeText={handleChange('driverName')}
              onBlur={handleBlur('driverName')}
              error={errors.driverName}
            />
            <RenderInput
              name="vehicleNo"
              label="Vehicle No"
              containerStyles={styles.input}
              value={values.vehicleNo}
              onBlur={handleBlur('vehicleNo')}
              onChangeText={handleChange('vehicleNo')}
              error={errors.vehicleNo}
              render={inputProps => (
                <TextInputMask {...inputProps} mask="[AA]-[00]-[AA]-[0000]" />
              )}
            />
            <RenderTextBox
              name="remark"
              label="Challan Remark"
              containerStyles={styles.input}
              value={values.remark}
              onChangeText={handleChange('remark')}
              numberOfLines={4}
              onBlur={handleBlur('remark')}
              error={errors.remark}
            />

            <View>
              <Text style={{color: theme.colors.primary}}>
                Upload Vehicle Image
              </Text>
              <OpacityButton
                onPress={handleUpload}
                opacity={0.1}
                style={styles.uploadButton}
                color="#fff">
                <Text style={{color: theme.colors.primary}}>Upload File</Text>
              </OpacityButton>
              <RenderError error={errors.vehicleAttachments} />
            </View>
            {values.vehicleAttachments?.length ? (
              <RenderAttachments
                attachments={values.vehicleAttachments}
                handleDelete={i => handleDelete(i)}
              />
            ) : null}

            <View>
              <Text style={{color: theme.colors.red}}>
                Upload Invoice Image
              </Text>
              <OpacityButton
                onPress={handleUploadDamage}
                opacity={0.1}
                style={styles.uploadInvoiceButton}
                color="#fff">
                <Text style={{color: theme.colors.red}}>Upload File</Text>
              </OpacityButton>
              <RenderError error={errors.vehicleInvoiceAttachments} />
            </View>
            {values.vehicleInvoiceAttachments?.length ? (
              <RenderAttachments
                attachments={values.vehicleInvoiceAttachments}
                handleDelete={i => handleDeleteDamage(i)}
              />
            ) : null}
          </View>
          <ActionButtons
            onSubmit={handleSubmit}
            submitLabel="Save"
            onCancel={() => navigation.goBack()}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const AddVehicleInfo = props => {
  const {navigation, route} = props;

  const {
    attachments,
    damageAttachments,
    materialAttachments,
    challan,
    materials,
    material_order_no: orderNumber,
    item: vehicleInfo,
    delivery_date,
  } = route?.params || {};

  console.log('===========>route?.params ', route?.params);

  const edit = Boolean(vehicleInfo);

  const {loading} = useSelector(s => s.materialManagement);
  const {selectedProject} = useSelector(s => s.project);

  const {addMaterialChallan, getMaterialChallanList} =
    useMaterialManagementActions();

  React.useEffect(() => {
    loadData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = () => {
    return getMaterialChallanList({
      project_id: selectedProject.id,
      material_order_no: orderNumber,
    });
  };

  const initialValues = React.useMemo(() => {
    const {
      vehicle_number,
      driver_challan_file,
      driver_name,
      challan_remark,
      ...restData
    } = vehicleInfo || {};
    return {
      vehicleNo: vehicle_number,
      attachments: driver_challan_file || [],
      driverName: driver_name,
      remark: challan_remark,
      ...restData,
    };
  }, [vehicleInfo]);

  const handleSubmit = async values => {
    const formData = new FormData();

    const materialData = materials.map(i => ({
      material_requests_items_id: i.id,
      approved_quantity: i.quantity,
      damaged_quantity: i.damaged,
    }));

    attachments.map(item => {
      formData.append('challan_images[]', item);
      return item;
    });
    damageAttachments?.map(item => {
      formData.append('damageMaterial_images[]', item);
      return item;
    });
    materialAttachments?.map(item => {
      formData.append('material_images[]', item);
      return item;
    });
    values?.vehicleAttachments?.map(item => {
      formData.append('vehicle_images[]', item);
      return item;
    });
    values?.vehicleInvoiceAttachments?.map(item => {
      formData.append('upload_invoice_file[]', item);
      return item;
    });

    formData.append('project_id', selectedProject.id);
    formData.append('material_order_no', orderNumber);
    formData.append('challan_no', challan);
    formData.append('delivery_date', delivery_date);
    formData.append('driver_name', values.driverName);
    formData.append('materials', JSON.stringify(materialData));
    formData.append('vehicle_number', values.vehicleNo);
    formData.append('challan_remark', values.remark);
    formData.append('edit_challan_id', 0);
    await addMaterialChallan(formData);
    loadData();
    navigation.dispatch(StackActions.pop(4));
  };

  return (
    <>
      <Spinner visible={loading} textContent="" />
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialValues}
        enableReinitialize
        validationSchema={schema}
        onSubmit={handleSubmit}>
        {formikProps => <ChallanForm {...{formikProps}} {...props} />}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  dialogContent: {
    paddingHorizontal: 15,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  input: {
    marginVertical: 10,
  },
  headerContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  uploadButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.primary,
    padding: 10,
    marginVertical: 10,
  },
  uploadInvoiceButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.red,
    padding: 10,
    marginVertical: 10,
  },
  cardContainer: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
    marginVertical: 7,
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
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
  },

  renderFileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  contentContainerStyle: {
    flexGrow: 1,
  },

  damageAttachment: {
    color: theme.colors.red,
    marginTop: 10,
  },
});

export default withTheme(AddVehicleInfo);
