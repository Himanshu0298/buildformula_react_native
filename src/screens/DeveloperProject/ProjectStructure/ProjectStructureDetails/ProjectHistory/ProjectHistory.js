import {StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import {IconButton, Title} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import dayjs from 'dayjs';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const RenderForm = props => {
  const {masterList, navigation, formikProps} = props;
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formikProps;

  const {
    project_structure_project_type,
    project_structure_restricted_user,
    project_structure_project_status,
    project_structure_project_quality,
  } = masterList;

  const typeOptions = useMemo(() => {
    return project_structure_project_type?.map(i => ({
      label: i.title,
      value: i.id,
    }));
  }, [project_structure_project_type]);

  const restrictedOptions = useMemo(() => {
    return project_structure_restricted_user?.map(i => ({
      label: i.title,
      value: i.id,
    }));
  }, [project_structure_restricted_user]);

  const statusOptions = useMemo(() => {
    return project_structure_project_status?.map(i => ({
      label: i.title,
      value: i.id,
    }));
  }, [project_structure_project_status]);

  const qualityOptions = useMemo(() => {
    return project_structure_project_quality?.map(i => ({
      label: i.title,
      value: i.id,
    }));
  }, [project_structure_project_quality]);

  return (
    <View style={styles.formContainer}>
      <View style={styles.formSubContainer}>
        <RenderDatePicker
          name="possesion_year"
          label="Project Possession Year"
          value={values.possesion_year}
          containerStyles={styles.input}
          onChange={value => {
            setFieldValue('possesion_year', dayjs(value).format('YYYY-MM-DD'));
          }}
          error={errors.possesion_year}
        />
        <RenderInput
          name="rera_no"
          label="RERA No"
          containerStyles={styles.inputStyles}
          value={values.rera_no}
          onChangeText={handleChange('rera_no')}
          onBlur={handleBlur('rera_no')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.rera_no}
        />
        <RenderSelect
          name="project_type"
          label="Project Type"
          value={values.project_type}
          options={typeOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('project_type')}
          onSelect={value => {
            setFieldValue('project_type', value);
          }}
        />
        <RenderSelect
          name="restricted_user"
          label="Restricted User"
          value={values.restricted_user}
          options={restrictedOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('restricted_user')}
          onSelect={value => {
            setFieldValue('restricted_user', value);
          }}
        />
        <RenderSelect
          name="project_status"
          label="Project Status"
          value={values.project_status}
          options={statusOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('project_status')}
          onSelect={value => {
            setFieldValue('project_status', value);
          }}
        />
        <RenderSelect
          name="project_quality"
          label="Project Quality"
          value={values.project_quality}
          options={qualityOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('project_quality')}
          onSelect={value => {
            setFieldValue('project_quality', value);
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
};

const ProjectHistory = props => {
  const {navigation, route} = props;

  const {projectId: id} = route?.params || {};

  const {
    getProjectMasterList,
    updateProjectHistory,
    getProjectList,
    getProjectDetails,
  } = useProjectStructureActions();

  const {projectDetails, loading} = useSelector(s => s.projectStructure);

  React.useEffect(() => {
    getData();
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDetails = () =>
    getProjectDetails({project_id: selectedProject.id, id});

  const {selectedProject} = useSelector(s => s.project);
  const {masterList} = useSelector(s => s.projectStructure);

  const getData = () => getProjectMasterList({project_id: selectedProject.id});

  const getList = async () => {
    await getProjectList({project_id: selectedProject.id});
  };

  const initialValues = React.useMemo(() => {
    const {
      possesion_year,
      rera_no,
      project_type,
      restricted_user,
      project_status,
      project_quality,
    } = projectDetails || {};
    return {
      possesion_year,
      rera_no,
      project_type,
      restricted_user,
      project_status,
      project_quality,
    };
  }, [projectDetails]);

  const onSubmit = values => {
    const data = {
      project_id: selectedProject.id,
      id,
      possesion_year: values.possesion_year,
      rera_no: values.rera_no,
      project_type: values.project_type,
      restricted_user: values.restricted_user,
      project_status: values.project_status,
      project_quality: values.project_quality,
    };
    updateProjectHistory(data);
    getDetails();
    getList();
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
        <Title>Project History</Title>
      </View>
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialValues || {}}
        // validationSchema={schema}
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
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  mainContainer: {
    marginHorizontal: 10,
    flex: 1,
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
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
});

export default ProjectHistory;
