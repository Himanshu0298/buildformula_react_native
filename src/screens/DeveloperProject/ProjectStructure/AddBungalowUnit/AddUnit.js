import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useRef, useEffect, useMemo} from 'react';
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
});

const RenderForm = props => {
  const {handleProjectSelection, formikProps, projectOptions} = props;
  const {values, errors, handleChange, handleBlur} = formikProps;

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <RenderSelect
          name="projectName"
          label="Project Name"
          value={values.projectName}
          options={projectOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('projectName')}
          onSelect={handleProjectSelection}
        />
        <RenderInput
          name="unitNo"
          label="Enter Unit no."
          containerStyles={styles.inputStyles}
          value={values.unitNo}
          onChangeText={handleChange('unitNo')}
          onBlur={handleBlur('unitNo')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.unitNo}
        />
        <RenderInput
          name="address"
          containerStyles={styles.inputStyles}
          label="Address"
          value={values.address}
          autoCapitalize="none"
          returnKeyType="next"
          editable={false}
          style={styles.readOnly}
        />
        <RenderInput
          name="city"
          containerStyles={styles.inputStyles}
          label="City"
          value={values.city}
          autoCapitalize="none"
          returnKeyType="next"
          editable={false}
          style={styles.readOnly}
        />
        <RenderInput
          name="state"
          containerStyles={styles.inputStyles}
          label="State"
          value={values.state}
          autoCapitalize="none"
          returnKeyType="next"
          editable={false}
          style={styles.readOnly}
        />
        <RenderInput
          name="country"
          containerStyles={styles.inputStyles}
          label="Country"
          value={values.country}
          autoCapitalize="none"
          returnKeyType="next"
          editable={false}
          style={styles.readOnly}
        />
        <RenderInput
          name="pincode"
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

const AddUnit = props => {
  const {navigation} = props;

  const submitTypeRef = useRef();

  const {getProjectList, addBungalow, getUnitList} =
    useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {projectList} = useSelector(s => s.projectStructure);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    await getProjectList({project_id: selectedProject.id});
  };

  const projectOptions = useMemo(() => {
    return projectList
      ?.filter(i => i.status === 1)
      ?.map(i => ({label: i.project_name, value: i.id}));
  }, [projectList]);

  const handleProjectSelection = async value => {
    formikProps.setFieldValue('projectName', value);

    const option = projectList.find(i => {
      return i.id === value;
    });

    if (option) {
      formikProps.setFieldValue('address', option.area);
      formikProps.setFieldValue('city', option.city);
      formikProps.setFieldValue('state', option.state);
      formikProps.setFieldValue('country', option.country);
      formikProps.setFieldValue('pincode', option.pincode);
    }
  };

  const onSubmit = async values => {
    const {projectName, projectCategory, selectTower, selectFloor, unitNo} =
      values;
    const res = await addBungalow({
      id: projectName,
      project_id: selectedProject.id,
      project_type: projectCategory,
      project_tower: selectTower,
      project_floor: selectFloor,
      project_unit: unitNo,
    });

    getUnitList({project_id: selectedProject.id});

    if (submitTypeRef.current === 'save') {
      navigation.goBack();
    } else if (submitTypeRef.current === 'details') {
      // navigation.navigate('ProjectUnitDetails', {
      //   projectId: res.value.id,
      // });
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
    setFieldValue: true,
    initialValues: {
      projectName: '',
      builderName: '',
      area: '',
    },
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
          onPress={() => navigation.goBack()}
        />
        <Title>Add Unit </Title>
      </View>
      <View style={styles.formContainer}>
        <RenderForm
          formikProps={formikProps}
          {...props}
          handleProjectSelection={handleProjectSelection}
          projectOptions={projectOptions}
        />
      </View>
      <View style={styles.filterBTN}>
        <ActionButtons
          cancelLabel="Add Details"
          submitLabel="Save"
          onCancel={() => onSave('details')}
          onSubmit={() => onSave('save')}
        />
      </View>
    </View>
  );
};

export default AddUnit;

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
    // flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
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
  switchtxt: {
    color: '#07CA03',
    marginLeft: 10,
    width: 60,
  },
});
