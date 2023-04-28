import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import * as Yup from 'yup';

import {Title} from 'react-native-paper';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderInput from 'components/Atoms/RenderInput';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {PHONE_REGEX} from 'utils/constant';
import Spinner from 'react-native-loading-spinner-overlay';

const schema = Yup.object().shape({
  contact_person_name: Yup.string()
    .label('name')
    .required('Please enter name '),
  contact_person_number: Yup.string()
    .label('phone')
    .required('required')
    .matches(PHONE_REGEX, 'Phone number is not valid')
    .min(10, 'to short')
    .max(10, 'to long'),
});

function RenderForm(props) {
  const {navigation, formikProps} = props;

  const {values, errors, handleChange, handleBlur, handleSubmit, loading} =
    formikProps;

  return (
    <SafeAreaProvider style={styles.formContainer}>
      <Spinner visible={loading} textContent="" />
      <SafeAreaView style={styles.formSubContainer}>
        <Title>Add Security/ Caretaker Info</Title>
        <View style={styles.formContainer}>
          <RenderInput
            name="contact_person_name"
            label="Enter Full Name"
            containerStyles={styles.inputStyles}
            value={values.contact_person_name}
            onChangeText={handleChange('contact_person_name')}
            onBlur={handleBlur('contact_person_name')}
            autoCapitalize="none"
            returnKeyType="next"
            error={errors.contact_person_name}
          />
          <RenderInput
            name="contact_person_number"
            label="Enter Phone Number"
            containerStyles={styles.inputStyles}
            value={values.contact_person_number}
            maxLength={10}
            onChangeText={handleChange('contact_person_number')}
            onBlur={handleBlur('contact_person_number')}
            returnKeyType="next"
            error={errors.contact_person_number}
          />
        </View>

        <ActionButtons
          cancelLabel="Cancel"
          submitLabel="Save"
          onCancel={navigation.goBack}
          onSubmit={handleSubmit}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function AddProjectSecurity(props) {
  const {navigation, route} = props;

  const {projectId, item} = route?.params || {};

  const securityId = item?.id;

  const id = securityId;

  const {
    getProjectDetails,
    addProjectSecurity,
    updateProjectSecurity,
    getProjectList,
  } = useProjectStructureActions();

  const {selectedProject, loading} = useSelector(s => s.project);

  const initialValues = React.useMemo(() => {
    const {contact_person_name, contact_person_number, ...restData} =
      item || {};
    return {
      contact_person_number,
      contact_person_name,
      ...restData,
    };
  }, [item]);

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    await getProjectDetails({project_id: selectedProject.id, id: projectId});
  };

  const getList = async () => {
    await getProjectList({project_id: selectedProject.id});
  };

  const onSubmit = async values => {
    const data = {
      project_id: selectedProject.id,
      id: projectId,
      contact_person_name: values.contact_person_name,
      contact_person_number: values.contact_person_number,
    };

    // if (id) {
    //   await updateProjectSecurity({security_id: id, ...data});
    // } else {
    //   await addProjectSecurity(data);
    // }

    if (id) {
      await updateProjectSecurity({security_id: id, ...data});
    } else {
      await addProjectSecurity(data);
    }
    getData();
    getList();
    navigation.goBack();
  };
  return (
    <Formik
      enableReinitialize
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}>
      {formikProps => (
        <RenderForm
          {...props}
          formikProps={formikProps}
          navigation={navigation}
          loading={loading}
        />
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  inputStyles: {
    marginVertical: 8,
  },
  formContainer: {
    flexGrow: 1,
  },
  formSubContainer: {
    margin: 10,
    flexGrow: 1,
  },
});

export default AddProjectSecurity;
