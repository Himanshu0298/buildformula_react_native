import {StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import {Formik} from 'formik';
import {IconButton, Title} from 'react-native-paper';
import RichTextEditor from 'components/Atoms/RichTextEditor';
import ActionButtons from 'components/Atoms/ActionButtons';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';
import RenderSelect from 'components/Atoms/RenderSelect';

function RenderForm(props) {
  const {formikProps, navigation, masterList} = props;

  const {values, errors, setFieldValue, handleSubmit} = formikProps;

  const {master_bhks} = masterList;

  const bhkOptions = useMemo(() => {
    return master_bhks?.map(i => ({
      label: i.bhk_title,
      value: i.bhk_title,
    }));
  }, [master_bhks]);

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputsContainer}>
        <RenderSelect
          name="configurtion"
          label="Configuration"
          options={bhkOptions}
          multiselect
          value={values.configurtion}
          containerStyles={styles.inputStyles}
          error={errors.configurtion}
          onSelect={v => {
            setFieldValue('configurtion', v);
          }}
        />
        <RichTextEditor
          name="description"
          placeholder="Description "
          value={values.description}
          height={200}
          style={styles.inputStyles}
          onChangeText={value => setFieldValue('description', value)}
          error={errors.description}
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

function ProjectBrief(props) {
  const {navigation, route} = props;

  const {projectId: id} = route?.params || {};

  const {updateProjectBrief, getProjectMasterList, getProjectDetails} =
    useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {projectDetails, masterList} = useSelector(s => s.projectStructure);

  React.useEffect(() => {
    getProjectMasterList({project_id: selectedProject.id});
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = async () => {
    await getProjectDetails({project_id: selectedProject.id, id});
  };

  const initialValues = React.useMemo(() => {
    const {description, configurtion} = projectDetails;

    return {
      description,
      configurtion: configurtion.split(','),
    };
  }, [projectDetails]);

  const onSubmit = values => {
    const arrString = values?.configurtion?.join('') || undefined;

    const data = {
      project_id: selectedProject.id,
      id,
      configurtion: arrString,
      description: values.description,
    };
    updateProjectBrief(data);
    getData();

    navigation.goBack();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Title> Project Brief</Title>
      </View>
      <Formik
        enableReinitialize
        validateOnBlur={false}
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
    flexGrow: 1,
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
  },

  inputsContainer: {
    width: '100%',
    flex: 1,
    paddingTop: 5,
  },
});

export default ProjectBrief;
