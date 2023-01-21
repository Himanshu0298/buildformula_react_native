import ActionButtons from 'components/Atoms/ActionButtons';
import RenderSelect from 'components/Atoms/RenderSelect';
import {Formik} from 'formik';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Subheading} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useProjectStructureActions from 'redux/actions/projectStructureActions';

const RenderForm = props => {
  const {
    navigation,
    formikProps,
    moduleOptions,
    subModuleOptions,
    fieldOptions,
  } = props;
  const {values, handleBlur, setFieldValue, handleSubmit} = formikProps;

  return (
    <View style={styles.formContainer}>
      <View style={styles.formSubContainer}>
        <RenderSelect
          name="module"
          label="Module"
          value={values.module}
          options={moduleOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('module')}
          onSelect={value => {
            setFieldValue('module', value);
          }}
        />
        <RenderSelect
          name="subModule"
          label="SubModule"
          value={values.subModule}
          options={subModuleOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('subModule')}
          onSelect={value => {
            setFieldValue('subModule', value);
          }}
        />
        <RenderSelect
          name="selectField"
          label="Select Field "
          value={values.selectField}
          options={fieldOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('selectField')}
          onSelect={value => {
            setFieldValue('selectField', value);
          }}
        />
      </View>

      <ActionButtons
        cancelLabel="Cancel"
        submitLabel="Search"
        onSubmit={handleSubmit}
        onCancel={navigation.goBack}
      />
    </View>
  );
};

function SearchPickUpList(props) {
  const {navigation} = props;

  const {getModuleList, getSubModuleList, getFieldList} =
    useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);

  const {moduleList, subModuleList, fieldList} = useSelector(
    s => s.projectStructure,
  );

  React.useEffect(() => {
    getModule();
    getSubModule();
    getField();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moduleOptions = useMemo(() => {
    return moduleList?.map(i => ({
      label: i.title,
      value: i.id,
    }));
  }, [moduleList]);

  const moduleId = useMemo(() => {
    return moduleList?.find(i => i.id)?.id;
  }, [moduleList]);

  const subModuleId = useMemo(() => {
    return moduleList?.find(i => i.id)?.id;
  }, [moduleList]);

  const subModuleOptions = useMemo(() => {
    return subModuleList?.map(i => ({
      label: i.title,
      value: i.id,
    }));
  }, [subModuleList]);

  const fieldOptions = useMemo(() => {
    return fieldList?.map(i => ({
      label: i.title,
      value: i.id,
    }));
  }, [fieldList]);

  const getModule = async () => {
    await getModuleList({project_id: selectedProject.id});
  };

  const getSubModule = async () => {
    await getSubModuleList({
      project_id: selectedProject.id,
      module_id: moduleId,
    });
  };

  const getField = async () => {
    await getFieldList({
      project_id: selectedProject.id,
      submodule_id: subModuleId,
    });
  };
  const onSubmit = values => {
    const fieldId = values.selectField;

    navigation.navigate('PickUpListing', {fieldId});
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
        <Subheading>PickUp List</Subheading>
      </View>

      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        onSubmit={onSubmit}>
        {formikProps => (
          <RenderForm
            formikProps={formikProps}
            {...props}
            moduleOptions={moduleOptions}
            subModuleOptions={subModuleOptions}
            fieldOptions={fieldOptions}
          />
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
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

export default SearchPickUpList;
