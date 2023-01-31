import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {IconButton, Subheading, Switch, Title} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput, {RenderError} from 'components/Atoms/RenderInput';
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
});

const RenderForm = props => {
  const {areaOptions, navigation, formikProps, areaList} = props;
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formikProps;

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

  const onToggleStatus = () => setFieldValue('active', !values.active);
  const onTogglePremium = () => setFieldValue('premium', !values.premium);

  return (
    <ScrollView
      style={styles.formSubContainer}
      showsVerticalScrollIndicator={false}>
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
        <RenderError />
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
          value={values.state}
          autoCapitalize="none"
          returnKeyType="next"
          editable={false}
          style={styles.readOnly}
        />
        <RenderInput
          containerStyles={styles.inputStyles}
          label="Country"
          value={values.country}
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
        <View style={styles.extraDetailsRow}>
          <Subheading>Status</Subheading>
          <View style={styles.extraDetailsSwitchWrap}>
            <Switch
              value={Boolean(values.active)}
              onValueChange={onToggleStatus}
              color="#77E675"
              style={{
                transform: [{scaleX: 0.8}, {scaleY: 0.8}],
              }}
            />
            {values.active ? <Text style={styles.switch}>Active</Text> : null}
          </View>
        </View>
        <View style={styles.extraDetailsRow}>
          <Subheading>Premium Project</Subheading>
          <View style={styles.extraDetailsSwitchWrap}>
            <Switch
              value={Boolean(values.premium)}
              onValueChange={onTogglePremium}
              color="#77E675"
              style={{
                transform: [{scaleX: 0.8}, {scaleY: 0.8}],
              }}
            />
            {values.premium ? <Text style={styles.switch}>Yes</Text> : null}
          </View>
        </View>
        <View style={styles.filterBTN}>
          <ActionButtons
            cancelLabel="cancel"
            submitLabel="Save"
            onCancel={navigation.goBack}
            onSubmit={handleSubmit}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const UpdateProjectDetails = props => {
  const {navigation, route} = props;

  const {projectId: id} = route?.params || {};

  const {updateProjectDetails, getAreaList, getProjectDetails, getProjectList} =
    useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);

  const {areaList, projectDetails} = useSelector(s => s.projectStructure);

  const areaOptions = useMemo(() => {
    return areaList
      ?.filter(i => i.status === 1)
      ?.map(i => ({label: i.area, value: i.id}));
  }, [areaList]);

  React.useEffect(() => {
    getData();
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => getAreaList({project_id: selectedProject.id});
  const getDetails = async () => {
    await getProjectDetails({project_id: selectedProject.id, id});
  };

  const getList = async () => {
    await getProjectList({project_id: selectedProject.id});
  };

  const initialValues = React.useMemo(() => {
    const {
      area,
      project_name: projectName,
      developer_name: builderName,
      city,
      state,
      pincode,
      country,
      status: active,
      premium_project: premium,
    } = projectDetails || {};

    const areaId = area && areaOptions?.find(i => i.label === area)?.value;

    return {
      projectName,
      area: areaId,
      builderName,
      city,
      state,
      pincode,
      country,
      active,
      premium,
    };
  }, [areaOptions, projectDetails]);

  const onSubmit = async values => {
    const data = {
      project_id: selectedProject.id,
      id,
      project_name: values.projectName,
      developer_name: values.builderName,
      area: values.area,
      status: values.active ? 1 : 0,
      premium_project: values.premium ? 1 : 0,
    };
    await updateProjectDetails(data);
    getDetails();
    getList();
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
        <Title>Project Details</Title>
      </View>
      <View style={styles.formContainer}>
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={initialValues || {}}
          validationSchema={schema}
          onSubmit={onSubmit}>
          {formikProps => (
            <RenderForm
              formikProps={formikProps}
              {...props}
              areaOptions={areaOptions}
              areaList={areaList}
            />
          )}
        </Formik>
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
    paddingHorizontal: 10,
    flex: 1,
  },
  inputStyles: {
    marginVertical: 8,
  },
  readOnly: {
    backgroundColor: '#EAECF1',
  },
  filterBTN: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  formContainer: {
    flex: 1,
  },
  extraDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },
  extraDetailsSwitchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    marginVertical: 5,
  },
  switch: {
    color: '#07CA03',
    marginLeft: 10,
    width: 60,
  },

  formSubContainer: {
    marginBottom: 30,
  },
});

export default UpdateProjectDetails;
