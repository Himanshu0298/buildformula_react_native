import {StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';

import {IconButton, Text, Title} from 'react-native-paper';
import {Formik} from 'formik';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import ActionButtons from 'components/Atoms/ActionButtons';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';

const schema = Yup.object().shape({
  total_no_of_towers: Yup.number('Invalid').typeError('please enter number'),
  total_no_of_units: Yup.number('Invalid').typeError('please enter number'),
  total_no_of_bunglows: Yup.number('Invalid').typeError('please enter number'),
  total_no_of_plots: Yup.number('Invalid').typeError('please enter number'),
});

function RenderForm(props) {
  const {navigation, formikProps, masterList} = props;
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formikProps;

  const {master_bhks, project_structure_project_category} = masterList || [];

  const bhkOptions = useMemo(() => {
    return master_bhks?.map(i => ({
      label: i?.bhk_title,
      value: i?.bhk_title,
    }));
  }, [master_bhks]);

  const categoryOptions = useMemo(() => {
    return project_structure_project_category?.map(i => ({
      label: i?.title,
      value: i?.title,
    }));
  }, [project_structure_project_category]);

  // const apartment = values.project_category === 'Apartment';

  // const shop = values.project_category === 'Shop';

  // const offices = values.project_category === 'Offices';

  return (
    <View style={styles.formContainer}>
      <View style={styles.formSubContainer}>
        <RenderSelect
          name="project_category"
          label="Project Category"
          value={values.project_category}
          options={categoryOptions}
          multiselect
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('project_category')}
          onSelect={value => {
            setFieldValue('project_category', value);
          }}
        />

        <RenderInput
          name="total_no_of_towers"
          label="Total Number of Towers"
          containerStyles={styles.inputStyles}
          value={values.total_no_of_towers}
          onChangeText={handleChange('total_no_of_towers')}
          onBlur={handleBlur('total_no_of_towers')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.total_no_of_towers}
        />
        <RenderInput
          name="total_no_of_units"
          label="Total Number of Unit"
          containerStyles={styles.inputStyles}
          value={values.total_no_of_units}
          onChangeText={handleChange('total_no_of_units')}
          onBlur={handleBlur('total_no_of_units')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.total_no_of_units}
        />

        <RenderInput
          name="total_no_of_bunglows"
          label="Total Number of  Banglow"
          containerStyles={styles.inputStyles}
          value={values.total_no_of_bunglows}
          onChangeText={handleChange('total_no_of_bunglows')}
          onBlur={handleBlur('total_no_of_bunglows')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.total_no_of_bunglows}
        />

        <RenderInput
          name="total_no_of_plots"
          label="Total Number of Plots"
          containerStyles={styles.inputStyles}
          value={values.total_no_of_plots}
          onChangeText={handleChange('total_no_of_plots')}
          onBlur={handleBlur('total_no_of_plots')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.total_no_of_plots}
        />

        <Text> BHK Configuration</Text>
        <RenderSelect
          name="bhk_configuration"
          label="Configuration"
          options={bhkOptions}
          multiselect
          value={values.bhk_configuration}
          containerStyles={styles.inputStyles}
          error={errors.bhk_configuration}
          onSelect={value => {
            setFieldValue('bhk_configuration', value);
          }}
        />
      </View>

      <ActionButtons
        cancelLabel="Cancel"
        submitLabel="Save"
        onCancel={navigation.goBack}
        onSubmit={handleSubmit}
      />
    </View>
  );
}

function ProjectStructure(props) {
  const {navigation, route} = props;

  const {projectId} = route?.params || {};

  const {updateProjectStructure, getProjectMasterList, getProjectDetails} =
    useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {masterList, projectDetails, loading} = useSelector(
    s => s.projectStructure,
  );

  React.useEffect(() => {
    getData();
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => getProjectMasterList({project_id: selectedProject.id});

  const getDetails = async () => {
    await getProjectDetails({project_id: selectedProject.id, id: projectId});
  };

  const initialValues = React.useMemo(() => {
    const {
      project_category_title: project_category,
      total_no_of_towers,
      total_no_of_units,
      total_no_of_bunglows,
      total_no_of_plots,
      bhk_configuration,
    } = projectDetails || {};

    const category =
      typeof project_category === 'number'
        ? [project_category]
        : project_category;

    return {
      total_no_of_towers,
      total_no_of_units,
      total_no_of_bunglows,
      total_no_of_plots,
      project_category: category,
      bhk_configuration: bhk_configuration.split('  '),
    };
  }, [projectDetails]);

  const onSubmit = values => {
    const arrString = values?.bhk_configuration?.join('  ') || undefined;

    const arrCategory = values?.project_category?.join(',') || undefined;

    const data = {
      project_id: selectedProject.id,
      id: projectId,
      project_category: [arrCategory],
      total_no_of_towers: values.total_no_of_towers,
      total_no_of_units: values.total_no_of_units,
      total_no_of_bunglows: values.total_no_of_bunglows,
      total_no_of_plots: values.total_no_of_plots,
      bhk_configuration: arrString,
    };
    updateProjectStructure(data);
    getDetails();
    navigation.goBack();
  };

  return (
    <View style={styles.mainContainer}>
      <Spinner visible={loading} />
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Title> Project Structure</Title>
      </View>

      <Formik
        enableReinitialize
        validateOnBlur={false}
        validationSchema={schema}
        validateOnChange={false}
        initialValues={initialValues || {}}
        onSubmit={onSubmit}>
        {formikProps => (
          <RenderForm
            formikProps={formikProps}
            {...props}
            masterList={masterList}
          />
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  mainContainer: {
    margin: 10,
    flex: 1,
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
  inputStyles: {
    marginVertical: 8,
  },

  formContainer: {
    flexGrow: 1,
    margin: 5,
  },
  formSubContainer: {
    flexGrow: 1,
  },
});

export default ProjectStructure;
