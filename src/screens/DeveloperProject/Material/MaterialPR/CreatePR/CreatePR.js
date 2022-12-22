import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import ActionButtons from 'components/Atoms/ActionButtons';
import {Subheading} from 'react-native-paper';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const schema = Yup.object().shape({
  subject: Yup.string().label('subject').required('Subject is Required'),
});

const CreatePR = props => {
  const {navigation, route} = props;

  const {id} = route?.params || {};

  const edit = Boolean(id);

  const {AddPR, getVendorList, getWorkSubWorkList, updatePR} =
    useMaterialManagementActions();

  const {loading, PRList, workOptions, vendorOptions} = useSelector(
    s => s.materialManagement,
  );

  const {selectedProject} = useSelector(s => s.project);
  const projectId = selectedProject.id;

  React.useEffect(() => {
    getVendorList({project_id: projectId});
    getWorkSubWorkList({project_id: projectId});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const constructorOptions = useMemo(() => {
    return vendorOptions?.map(i => ({
      label: `${i.contractor_name} - {${i.contractor_email}}`,
      value: i.id,
    }));
  }, [vendorOptions]);

  const workSubWorkOptions = useMemo(() => {
    return workOptions?.map(i => ({label: `{${i.title}}`, value: i.id}));
  }, [workOptions]);

  const initialValues = React.useMemo(() => {
    if (id) {
      const selected = PRList.find(i => i.id === id);
      const {
        subject,
        praposal_contractor_id: contractor_id,
        required_for,
        remarks,
      } = selected;
      return {
        subject,
        contractor_id,
        required_for,
        remarks,
      };
    }
    return {};
  }, [PRList, id]);

  const onSubmit = async values => {
    const data = {purchase_request_id: id, project_id: projectId, ...values};

    if (edit) {
      await updatePR(data);
      navigation.navigate('AddMaterialList', {id, edit});
    } else {
      const {value: res} = await AddPR(data);
      navigation.navigate('AddMaterialList', {id: res.id, edit});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Subheading style={styles.headerText}>
          {edit ? 'Edit PR' : 'Create PR'}
        </Subheading>
      </View>
      <Spinner visible={loading} textContent="" />
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
              <ScrollView>
                <RenderInput
                  name="subject"
                  label="Subject"
                  containerStyles={styles.inputStyles}
                  value={values.subject}
                  onChangeText={handleChange('subject')}
                  onBlur={handleBlur('subject')}
                  autoCapitalize="none"
                  returnKeyType="next"
                  error={errors.subject}
                />
                <RenderSelect
                  name="contractor_id"
                  label="Vendor Name"
                  value={values.contractor_id}
                  options={constructorOptions}
                  containerStyles={styles.inputStyles}
                  onBlur={handleBlur('contractor_id')}
                  onSelect={value => {
                    setFieldValue('contractor_id', value);
                  }}
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
                  error={errors.remarks}
                />
              </ScrollView>
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

export default CreatePR;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
  },
  headerContainer: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
  },
  inputStyles: {
    marginVertical: 8,
  },
  formContainer: {
    flex: 1,
  },
});
