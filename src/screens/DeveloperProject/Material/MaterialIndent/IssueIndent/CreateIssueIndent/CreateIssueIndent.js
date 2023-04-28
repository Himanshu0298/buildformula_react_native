import {StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import Header from 'screens/DeveloperProject/Material/CommonComponents/Header';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';

const schema = Yup.object().shape({
  vendor_id: Yup.string().label('vendor_id').required('Vendor is Required'),
  requred_date: Yup.string().label('requred_date').required('Date is Required'),
});

const CreateIssueIndent = props => {
  const {navigation, route} = props;

  const {id, indentDetails} = route.params || {};

  const details = indentDetails?.material_indent;

  const edit = Boolean(id);

  const wbs_id = 0;

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

  const initialValues = React.useMemo(() => {
    if (edit) {
      const {vendor_id, requred_date, wbs_works_id, remark} = details;
      return {
        vendor_id,
        requred_date,
        wbs_works_id,
        remark,
      };
    }
    return {};
  }, [details, edit]);

  const onSubmit = async values => {
    const data = {
      material_indent_id: id,
      project_id: projectId,
      wbs_works_id: values.wbs_works_id || wbs_id,
      ...values,
    };

    const {value} = await addIssueRequest(data);
    navigation.navigate('CreateWork', {
      edit,
      id: value.indent_id,
      wbs_id: values.wbs_works_id,
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
        initialValues={initialValues}
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
                  disabled={!!edit}
                  onChange={value => {
                    setFieldValue(
                      'requred_date',
                      dayjs(value).format('YYYY-MM-DD'),
                    );
                  }}
                  error={errors.requred_date}
                />

                <RenderTextBox
                  name="remark"
                  blurOnSubmit={false}
                  numberOfLines={7}
                  label="Remark"
                  containerStyles={styles.inputStyles}
                  value={values.remark}
                  onChangeText={handleChange('remark')}
                  onBlur={handleBlur('remark')}
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
