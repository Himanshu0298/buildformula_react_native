import {StyleSheet, View, Text, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {theme} from 'styles/theme';
import ActionButtons from 'components/Atoms/ActionButtons';
import TextInputMask from 'react-native-text-input-mask';
import FileIcon from 'assets/images/file_icon.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderInput, {RenderError} from 'components/Atoms/RenderInput';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import {useImagePicker} from 'hooks';
import {ScrollView} from 'react-native-gesture-handler';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../../CommonComponents/Header';
import Pagination from '../../CommonComponents/Pagination';

const schema = Yup.object().shape({
  driver_name: Yup.string('Required').required('Required'),
  vehicleNo: Yup.string('Required').required('Required'),
});

const RenderDamageAttachments = props => {
  const {attachments, handleDelete} = props;

  return (
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
  );
};

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

function VehicleForm(props) {
  const {formikProps} = props;
  const {values, errors, setFieldValue, handleBlur, handleChange} = formikProps;

  const {openImagePicker} = useImagePicker();

  const handleUpload = () => {
    openImagePicker({
      type: 'file',
      onChoose: file => {
        const attachments = values.attachments || [];
        attachments.push(file);
        setFieldValue('attachments', attachments);
      },
    });
  };

  const handleDelete = i => {
    values.attachments.splice(i, 1);
    setFieldValue('attachments', values.attachments);
  };

  const handleUploadInvoiceImages = () => {
    openImagePicker({
      type: 'file',
      onChoose: file => {
        const attachments = values.invoiceAttachments || [];
        attachments.push(file);
        setFieldValue('invoiceAttachments', attachments);
      },
    });
  };

  const handleDeleteInvoiceImages = i => {
    values.invoiceAttachments.splice(i, 1);
    setFieldValue('invoiceAttachments', values.invoiceAttachments);
  };

  return (
    <ScrollView style={styles.formContainer}>
      <RenderInput
        name="driver_name"
        label="Driver Name"
        containerStyles={styles.input}
        value={values.driver_name}
        onChangeText={handleChange('driver_name')}
        onBlur={handleBlur('driver_name')}
        error={errors.driver_name}
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
        numberOfLines={4}
        onChangeText={handleChange('remark')}
        onBlur={handleBlur('remark')}
        error={errors.remark}
      />
      <View style={styles.dialogContent}>
        <View>
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
            <Text style={{color: theme.colors.primary}}>
              Upload Invoice Image
            </Text>
            <OpacityButton
              onPress={handleUploadInvoiceImages}
              opacity={0.1}
              style={styles.uploadButton}
              color="#fff">
              <Text style={{color: theme.colors.primary}}>Upload File</Text>
            </OpacityButton>
            <RenderError error={errors.invoiceAttachments} />
          </View>
          {values.invoiceAttachments?.length ? (
            <RenderDamageAttachments
              attachments={values.invoiceAttachments}
              handleDelete={i => handleDeleteInvoiceImages(i)}
            />
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}

const VehicleInfo = props => {
  const {navigation, route} = props;

  const {challan_number, challan_id, id, edit} = route?.params || {};

  const {addDirectGRNVehicleInfo} = useMaterialManagementActions();

  const {loading, directGRNDetails} = useSelector(s => s.materialManagement);
  const {selectedProject} = useSelector(s => s.project);

  const initialValues = React.useMemo(() => {
    if (edit) {
      const {
        driver_name,
        vehicle_number,
        challan_remark,
        challan_file,
        ...restData
      } = directGRNDetails.challanInfo;
      return {
        driver_name,
        vehicleNo: vehicle_number,
        remark: challan_remark,
        challan_file,
        ...restData,
        ...directGRNDetails.challanInfo,
      };
    }
    return {};
  }, [directGRNDetails.challanInfo, edit]);

  const handleSubmit = async values => {
    const formData = new FormData();

    formData.append('project_id', selectedProject.id);
    formData.append('challan_id', challan_id);
    formData.append('challan_no', challan_number);
    formData.append('driver_name', values.driver_name);
    formData.append('vehicle_number', values.vehicleNo);
    formData.append('challan_remark', values.remark);
    formData.append('edit_challan_id', challan_id);

    await addDirectGRNVehicleInfo(formData);
    navigation.navigate('DirectGRNPreview', {challan_id: id});
  };

  return (
    <>
      <Spinner visible={loading} textContent="" />

      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Header
            title={edit ? ' Edit Vehicle Info' : 'Vehicle Info'}
            {...props}
          />
          <Pagination title="Page 3 of 3" />
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}>
          {formikProps => (
            <>
              <VehicleForm {...props} formikProps={formikProps} edit={edit} />
              <ActionButtons
                cancelLabel="Preview"
                submitLabel="Save"
                onSubmit={formikProps.handleSubmit}
                onCancel={navigation.goBack}
              />
            </>
          )}
        </Formik>
      </SafeAreaView>
    </>
  );
};

export default VehicleInfo;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  formContainer: {
    flex: 1,
    flexGrow: 1,
  },
  input: {
    paddingVertical: 7,
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
  renderFileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  cardContainer: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
    marginVertical: 7,
  },
});
