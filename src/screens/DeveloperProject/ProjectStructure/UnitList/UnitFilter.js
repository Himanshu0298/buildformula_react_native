import {StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {IconButton, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderInput from 'components/Atoms/RenderInput';
import Spinner from 'react-native-loading-spinner-overlay';

import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';

// const schema = Yup.object().shape({
//   projectName: Yup.string().label('projectName').required('Filter is Required'),
// });

const RenderForm = props => {
  const {
    options,
    navigation,
    formikProps,
    projectOptions,
    categoryOptions,
    towerOptions,
  } = props;
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formikProps;
  return (
    <View style={styles.formContainer}>
      <RenderSelect
        multiselect
        name="projectName"
        label="Project Name"
        value={values.projectName}
        options={projectOptions}
        containerStyles={styles.inputStyles}
        onBlur={handleBlur('projectName')}
        onSelect={value => {
          setFieldValue('projectName', value);
        }}
      />
      <RenderSelect
        multiselect
        name="categories"
        label="Categories"
        value={values.categories}
        options={categoryOptions}
        containerStyles={styles.inputStyles}
        onBlur={handleBlur('categories')}
        onSelect={value => {
          setFieldValue('categories', value);
        }}
      />
      <RenderSelect
        multiselect
        name="tower"
        label="Tower"
        value={values.tower}
        options={towerOptions}
        containerStyles={styles.inputStyles}
        onBlur={handleBlur('tower')}
        onSelect={value => {
          setFieldValue('tower', value);
        }}
      />
      {/* <RenderInput
        name="projectName"
        label="Project Name"
        containerStyles={styles.inputStyles}
        value={values.projectName}
        onChangeText={handleChange('projectName')}
        onBlur={handleBlur('projectName')}
        autoCapitalize="none"
        returnKeyType="next"
        error={errors.projectName}
      /> */}
      <RenderSelect
        name="filterOption1"
        label="Filter Options"
        value={values.filterOption1}
        options={options}
        containerStyles={styles.inputStyles}
        onBlur={handleBlur('filterOption1')}
        onSelect={value => {
          setFieldValue('filterOption1', value);
        }}
      />
      <RenderSelect
        name="filterOption2"
        label="Filter Options"
        value={values.filterOption2}
        options={options}
        containerStyles={styles.inputStyles}
        onBlur={handleBlur('filterOption2')}
        onSelect={value => {
          setFieldValue('filterOption2', value);
        }}
      />
      <View style={styles.filterBTN}>
        <ActionButtons
          cancelLabel="Cancel"
          submitLabel="Apply"
          onCancel={navigation.goBack}
          onSubmit={handleSubmit}
        />
      </View>
    </View>
  );
};

const UnitFilter = props => {
  const {navigation} = props;

  const {getProjectList, getUnitList} = useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {
    projectList = [],
    unitList = [],
    loading,
  } = useSelector(s => s.projectStructure);

  const loadData = async () => {
    const projectId = 0;

    await Promise.all([
      getProjectList({project_id: selectedProject.id}),
      getUnitList({project_id: selectedProject.id, id: projectId}),
    ]);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectOptions = useMemo(() => {
    return projectList
      ?.filter(i => i.status === 1)
      ?.map(i => ({label: i.project_name, value: i.id}));
  }, [projectList]);

  const categoryOptions = useMemo(() => {
    const catData = unitList?.map(i => i.unit_category);
    return [...new Set(catData)];
  }, [unitList]);

  const towerOptions = useMemo(() => {
    return unitList?.map(i => ({
      label: i.tower_name,
      value: i.project_tower,
    }));
    // return [...new Set(towerData)];
  }, [unitList]);

  const options = ['1', '2', '3', '4', '5'];
  const onSubmit = values => {
    console.log(values);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Spinner visible={loading} textContent="" />
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Title>Unit Filter's</Title>
      </View>
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          projectName: '',
          categories: '',
          tower: '',
        }}
        // validationSchema={schema}
        onSubmit={onSubmit}>
        {formikProps => (
          <RenderForm
            formikProps={formikProps}
            {...props}
            options={options}
            projectOptions={projectOptions}
            categoryOptions={categoryOptions}
            towerOptions={towerOptions}
          />
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default UnitFilter;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
  inputStyles: {
    marginVertical: 8,
  },
  formContainer: {
    flex: 1,
  },
  filterBTN: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
