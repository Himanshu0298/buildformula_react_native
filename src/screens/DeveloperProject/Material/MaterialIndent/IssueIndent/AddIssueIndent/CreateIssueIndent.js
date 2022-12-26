import {StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import dayjs from 'dayjs';
import Header from 'screens/DeveloperProject/Material/CommonComponents/Header';

const schema = Yup.object().shape({
  vendor_id: Yup.string().label('vendor_id').required('Vendor is Required'),
  requred_date: Yup.string().label('requred_date').required('Date is Required'),
});

const CreateIssueIndent = props => {
  const {navigation, id} = props;

  const edit = Boolean(id);

  const {getVendorList, getWorkSubWorkList, addIssueRequest} =
    useMaterialManagementActions();

  const {vendorOptions, workOptions} = useSelector(s => s.materialManagement);

  const {selectedProject} = useSelector(s => s.project);
  const projectId = selectedProject.id;

  React.useEffect(() => {
    getVendorList({project_id: projectId});
    getWorkSubWorkList({project_id: projectId});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const constructorOptions = useMemo(() => {
    return vendorOptions?.map(i => ({
      label: `${i.contractor_name} - [${i.contractor_email}]`,
      value: i.id,
    }));
  }, [vendorOptions]);

  const workSubWorkOptions = useMemo(() => {
    return workOptions?.map(i => ({label: `{${i.title}}`, value: i.id}));
  }, [workOptions]);

  const onSubmit = async values => {
    const data = {material_indent_id: id, project_id: projectId, ...values};

    const {value} = await addIssueRequest(data);
    navigation.navigate('AddMaterialIndentList', {
      edit,
      id: value.indent_id,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header title="Issue Request" {...props} />
      </View>
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        validationSchema={schema}
        onSubmit={onSubmit}>
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
        }) => {
          return (
            <View style={styles.formContainer}>
              <View style={styles.formContainer}>
                <RenderSelect
                  name="vendor_id"
                  label="Requirement For Vendor"
                  value={values.vendor_id}
                  options={constructorOptions}
                  containerStyles={styles.inputStyles}
                  onBlur={handleBlur('vendor_id')}
                  onSelect={value => {
                    setFieldValue('vendor_id', value);
                  }}
                />

                <RenderDatePicker
                  name="requred_date"
                  label="Required Date"
                  value={values.requred_date}
                  containerStyles={styles.input}
                  onChange={value => {
                    setFieldValue(
                      'requred_date',
                      dayjs(value).format('YYYY-MM-DD'),
                    );
                  }}
                  error={errors.requred_date}
                />
                <RenderSelect
                  name="required_for"
                  label="Required For"
                  value={values.required_for}
                  options={workSubWorkOptions}
                  containerStyles={styles.inputStyles}
                  onBlur={handleBlur('required_for')}
                  onSelect={value => {
                    setFieldValue('required_for', value);
                  }}
                />
                <RenderTextBox
                  name="remarks"
                  blurOnSubmit={false}
                  numberOfLines={7}
                  label="Remark"
                  containerStyles={styles.inputStyles}
                  value={values.remarks}
                  onChangeText={handleChange('remarks')}
                  onBlur={handleBlur('remarks')}
                  onSubmitEditing={handleSubmit}
                />
              </View>
              <ActionButtons
                cancelLabel="Cancel"
                submitLabel="Next"
                onCancel={navigation.goBack}
                onSubmit={handleSubmit}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default CreateIssueIndent;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexGrow: 1,
  },
  headerContainer: {
    marginBottom: 10,
  },
  inputStyles: {
    marginVertical: 8,
  },
  formContainer: {
    flexGrow: 1,
  },
});
