import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useMemo, useRef} from 'react';
import {IconButton, Title} from 'react-native-paper';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import ActionButtons from 'components/Atoms/ActionButtons';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';

const schema = Yup.object().shape({
  projectName: Yup.string()
    .label('projectName')
    .required('Project Name is Required'),
  builderName: Yup.string()
    .label('builderName')
    .required('Builder Name is Required'),
  area: Yup.string().label('area').required('Area is Required'),
});

const RenderForm = props => {
  const {areaOptions, formikProps, areaList, navigation} = props;
  const {values, errors, handleChange, handleBlur, setFieldValue} = formikProps;
  const handleAreaSelect = value => {
    setFieldValue('area', value);
    const option = areaList.find(i => i.id === value);
    if (option) {
      setFieldValue('city', option.city);
      setFieldValue('pincode', option.pincode);
      setFieldValue('state', option.state);
      setFieldValue('country', option.country);
    }
  };

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <RenderInput
          name="projectName"
          label="Project Name"
          containerStyles={styles.inputStyles}
          value={values.projectName}
          onChangeText={handleChange('projectName')}
          onBlur={handleBlur('projectName')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.projectName}
        />
        <RenderInput
          name="builderName"
          label="Builder Name"
          containerStyles={styles.inputStyles}
          value={values.builderName}
          onChangeText={handleChange('builderName')}
          onBlur={handleBlur('builderName')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.builderName}
        />
        <RenderSelect
          name="area"
          label="Select Area"
          value={values.area}
          options={areaOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('area')}
          onSelect={handleAreaSelect}
        />

        <RenderInput
          containerStyles={styles.inputStyles}
          label="City"
          value={values.city}
          autoCapitalize="none"
          returnKeyType="next"
          editable={false}
          style={styles.readOnly}
        />
        <RenderInput
          containerStyles={styles.inputStyles}
          label="State"
          value={values?.state}
          autoCapitalize="none"
          returnKeyType="next"
          editable={false}
          style={styles.readOnly}
        />
        <RenderInput
          containerStyles={styles.inputStyles}
          label="Country"
          value={values?.country}
          autoCapitalize="none"
          returnKeyType="next"
          editable={false}
          style={styles.readOnly}
        />
        <RenderInput
          containerStyles={styles.inputStyles}
          label="Pincode"
          value={values.pincode}
          autoCapitalize="none"
          returnKeyType="next"
          editable={false}
          style={styles.readOnly}
        />
      </View>
    </ScrollView>
  );
};

const AddProject = props => {
  const {navigation} = props;

  // const {id} = route?.params || {};

  const submitTypeRef = useRef();

  const {addProject, getAreaList} = useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);

  const {areaList} = useSelector(s => s.projectStructure);

  const areaOptions = useMemo(() => {
    return areaList?.map(i => ({label: i.area, value: i.id}));
  }, [areaList]);

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => getAreaList({project_id: selectedProject.id});

  const onSubmit = async values => {
    const restData = {
      project_id: selectedProject.id,
      project_name: values.projectName,
      developer_name: values.builderName,
      area: values.area,
    };
    const res = await addProject(restData);

    if (submitTypeRef.current === 'save') {
      navigation.goBack();
    } else if (submitTypeRef.current === 'details') {
      navigation.navigate('ProjectStructureDetails', {
        projectId: res.value.id,
      });
    }

    return res;
  };

  const onSave = async type => {
    submitTypeRef.current = type;
    handleSubmit();
  };

  const formikProps = useFormik({
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: schema,
    initialValues: {},
    onSubmit,
  });

  const {handleSubmit} = formikProps;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={navigation.goBack}
        />
        <Title>Add Project</Title>
      </View>
      <View style={styles.formContainer}>
        <RenderForm
          {...props}
          formikProps={formikProps}
          areaOptions={areaOptions}
          areaList={areaList}
        />
        <View style={styles.filterBTN}>
          <ActionButtons
            cancelLabel="Add Details"
            submitLabel="Save"
            onCancel={() => onSave('details')}
            onSubmit={() => onSave('save')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
  mainContainer: {
    flex: 1,
    margin: 10,
  },
  inputStyles: {
    marginVertical: 8,
  },
  readOnly: {
    backgroundColor: '#EAECF1',
  },
  filterBTN: {
    justifyContent: 'flex-end',
  },
  formContainer: {
    flex: 1,
  },

  scrollView: {
    marginBottom: 30,
  },
});

export default AddProject;
