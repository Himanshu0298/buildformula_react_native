import React, {useMemo} from 'react';
import {StyleSheet, View, SafeAreaView, Modal} from 'react-native';

import {Title} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderInput from 'components/Atoms/RenderInput';
import ActionButtons from 'components/Atoms/ActionButtons';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';

function RenderForm(props) {
  const {navigation, formikProps, contactTypeOptions} = props;

  const {
    values,
    errors,
    handleChange,
    setFieldValue,
    handleSubmit,
    handleBlur,
  } = formikProps;

  return (
    <SafeAreaProvider style={{flexGrow: 1}}>
      <SafeAreaView style={{margin: 10, flexGrow: 1}}>
        <Title> Add Owner</Title>
        <View style={{flexGrow: 1}}>
          <RenderSelect
            name="contact_type"
            label="Contact Type"
            value={values?.contact_type}
            options={contactTypeOptions}
            containerStyles={styles.inputStyles}
            onBlur={handleBlur('contact_type')}
            onSelect={value => {
              setFieldValue('contact_type', value);
            }}
          />
          <RenderInput
            name="name"
            label="Name"
            containerStyles={styles.inputStyles}
            value={values?.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            autoCapitalize="none"
            returnKeyType="next"
            error={errors.name}
          />
          <RenderInput
            name="phone_number"
            label="Enter Phone Number"
            containerStyles={styles.inputStyles}
            value={values?.phone_number}
            maxLength={10}
            onChangeText={handleChange('phone_number')}
            onBlur={handleBlur('phone_number')}
            returnKeyType="next"
            error={errors.phone_number}
          />
          <RenderInput
            name="email"
            label="Enter Email"
            containerStyles={styles.inputStyles}
            value={values?.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            autoCapitalize="none"
            returnKeyType="next"
            error={errors.email}
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

function AddProjectOwner(props) {
  const {navigation, route} = props;

  const {projectId, item, ownerId} = route?.params || {};

  const id = ownerId || 0;

  const {getProjectDetails, addProjectOwner, getProjectMasterList} =
    useProjectStructureActions();
  const {masterList} = useSelector(s => s.projectStructure);

  const {project_structure_contact_type: contactType} = masterList;

  const {selectedProject} = useSelector(s => s.project);

  React.useEffect(() => {
    getData();
    getProjectMasterList({project_id: selectedProject.id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    await getProjectDetails({project_id: selectedProject.id, id: projectId});
  };

  const contactTypeOptions = useMemo(() => {
    return contactType?.map(i => ({
      label: i.title,
      value: i.id,
    }));
  }, [contactType]);

  const initialValues = React.useMemo(() => {
    const {email, name, phone_number, title, ...restData} = item || {};
    return {
      name,
      email,
      phone_number,
      title,
      ...restData,
    };
  }, [item]);

  const onSubmit = async values => {
    const data = {
      project_id: selectedProject.id,
      id: projectId,
      contact_type: values.contact_type,
      name: values.name,
      phone_number: values.phone_number,
      email: values.email,
      owner_id: id,
    };

    await addProjectOwner(data);

    getData();
    navigation.navigate('ProjectOwner');
  };

  return (
    <Formik
      enableReinitialize
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={initialValues}
      onSubmit={onSubmit}>
      {formikProps => (
        <RenderForm
          {...props}
          formikProps={formikProps}
          navigation={navigation}
          contactTypeOptions={contactTypeOptions}
        />
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  inputStyles: {
    marginVertical: 8,
  },
});

export default AddProjectOwner;
