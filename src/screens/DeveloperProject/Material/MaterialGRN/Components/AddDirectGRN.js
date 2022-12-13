import * as React from 'react';
import {Formik} from 'formik';
import {withTheme} from 'react-native-paper';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import * as Yup from 'yup';
import RenderInput, {RenderError} from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {theme} from 'styles/theme';
import FileIcon from 'assets/images/file_icon.png';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useImagePicker} from 'hooks';
import ActionButtons from 'components/Atoms/ActionButtons';
import {useAlert} from 'components/Atoms/Alert';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import Header from '../../CommonComponents/Header';
import Pagination from '../../CommonComponents/Pagination';

const schema = Yup.object().shape({
  challan: Yup.string('Required').required('Required'),
  attachments: Yup.mixed().required('File is required'),
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
  const alert = useAlert();
  const [company, setCompany] = React.useState('');

  const addCompany = () => {
    alert.show({
      title: 'Alert',
      message: 'Add Company',
      dismissable: false,
    });
  };

  if (company === 'Add Company') {
    addCompany();
  }

  const {
    formikProps,
    navigation,
    supplierOptions,
    companyOptions,
    vendorOptions,
  } = props;
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formikProps;

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

  const handleSubMaterialChange = value => {
    setFieldValue('company', value);
    const supplierName = vendorOptions.find(
      i => i.id === value,
    )?.contractor_name;
    if (supplierName) {
      setFieldValue('supplier', supplierName);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Header title="Challan Info" {...props} />
        <Pagination title="Page 1 of 3" />
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.dialogContent}>
          <View>
            <RenderSelect
              name="company"
              options={companyOptions}
              containerStyles={styles.input}
              value={values.company}
              label="Select Company"
              error={errors.company}
              onSelect={handleSubMaterialChange}
            />
            <RenderSelect
              name="supplier"
              disabled
              options={supplierOptions}
              containerStyles={styles.input}
              value={values.supplier}
              label="Select Supplier"
            />
            <RenderInput
              name="challan"
              label="Challan No"
              numberOfLines={3}
              containerStyles={styles.input}
              value={values.challan}
              onChangeText={handleChange('challan')}
              onBlur={handleBlur('challan')}
              error={errors.challan}
            />
            <RenderDatePicker
              name="delivery_date"
              label="Delivery Date"
              value={values.delivery_date}
              containerStyles={styles.input}
              onChange={value => {
                setFieldValue(
                  'delivery_date',
                  dayjs(value).format('YYYY-MM-DD'),
                );
              }}
              error={errors.delivery_date}
            />
            <View>
              <Text style={{color: theme.colors.primary}}>Attachment</Text>
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
      </KeyboardAwareScrollView>
      <ActionButtons
        onSubmit={handleSubmit}
        submitLabel="Next"
        cancelLabel="Previous"
        onCancel={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
}

const AddDirectGRN = props => {
  const {route, navigation} = props;
  const {id = 0} = route?.params || {};

  const edit = Boolean(id);

  const {addDirectGRN, getVendorList} = useMaterialManagementActions();
  const {selectedProject} = useSelector(s => s.project);

  const {vendorOptions} = useSelector(s => s.materialManagement);

  React.useEffect(() => {
    getVendorList({project_id: selectedProject.id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const supplierOptions = React.useMemo(() => {
    return vendorOptions?.map(i => ({
      label: `${i.contractor_name}`,
      value: i.id,
    }));
  }, [vendorOptions]);

  const companyOptions = React.useMemo(() => {
    return vendorOptions?.map(i => ({
      label: `${i.company_name} `,
      value: i.id,
    }));
  }, [vendorOptions]);

  const onSubmit = async values => {
    const formData = new FormData();

    formData.append('project_id', selectedProject.id);
    formData.append('challan_id', id);
    formData.append('challan_number', values.challan);
    formData.append('delivery_date', values.delivery_date);
    formData.append('company', values.company);
    formData.append('supplier', values.supplier);
    formData.append('file_upload', values.attachments);

    addDirectGRN(formData);
    navigation.navigate('GRNMaterial', {...values, challan_id: id});
  };

  // const navToStepTwo = values => {
  //   navigation.navigate('GRNMaterial', {
  //     ...values,
  //     ...route.params,
  //   });
  // };

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{attachments: []}}
      validationSchema={schema}
      onSubmit={onSubmit}>
      {formikProps => (
        <ChallanForm
          {...{formikProps}}
          {...props}
          supplierOptions={supplierOptions}
          companyOptions={companyOptions}
          vendorOptions={vendorOptions}
        />
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10,
  },
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
    position: 'relative',
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
});

export default withTheme(AddDirectGRN);
