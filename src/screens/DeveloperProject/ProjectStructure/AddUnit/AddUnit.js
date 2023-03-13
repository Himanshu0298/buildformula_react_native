import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useMemo, useEffect, useState, useRef} from 'react';
import {IconButton, Title} from 'react-native-paper';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import ActionButtons from 'components/Atoms/ActionButtons';
import Spinner from 'react-native-loading-spinner-overlay';

import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';

const schema = Yup.object().shape({
  projectName: Yup.string()
    .label('projectName')
    .required('Project Name is Required'),
  projectCategory: Yup.string()
    .label('projectCategory')
    .required('Category is Required'),
  selectTower: Yup.string().label('selectTower').required('Tower is Required'),
  selectFloor: Yup.string().label('selectFloor').required('Floor is Required'),
  unitNo: Yup.string().label('unitNo').required('Unit No is Required'),
});

const RenderForm = props => {
  const {
    formikProps,
    projectOptions,
    getTowers,
    categoryOptions,
    loadTowers,
    towerOptions,
    loadFloors,
    floorOptions,
  } = props;

  const {values, errors, handleChange, handleBlur, setFieldValue} = formikProps;

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
          onSelect={getTowers}
          error={errors.projectName}
        />
        <RenderSelect
          name="projectCategory"
          label="Project Category"
          value={values.projectCategory}
          options={categoryOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('projectCategory')}
          onSelect={loadTowers}
          error={errors.projectCategory}
        />
        <RenderSelect
          name="selectTower"
          label="Select Tower"
          value={values.selectTower}
          options={towerOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('selectTower')}
          onSelect={loadFloors}
          error={errors.selectTower}
        />
        <RenderSelect
          name="selectFloor"
          label="Select Floor"
          value={values.selectFloor}
          options={floorOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('selectFloor')}
          onSelect={value => {
            setFieldValue('selectFloor', value);
          }}
          error={errors.selectFloor}
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
          containerStyles={styles.inputStyles}
          label="Address"
          value={values.address}
          autoCapitalize="none"
          returnKeyType="next"
          editable={false}
          style={styles.readOnly}
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
      </View>
    </ScrollView>
  );
};

const AddUnit = props => {
  const {navigation} = props;
  const [towerOptions, setTowerOptions] = useState([]);
  const [towerId, setTowerId] = useState();

  const submitTypeRef = useRef();

  const {
    getUnitList,
    getProjectList,
    getProjectCategory,
    getTowerList,
    getFloorList,
    addUnit,
  } = useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {projectList, towerList, categoriesList, floorList, loading} =
    useSelector(s => s.projectStructure);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    await getProjectList({project_id: selectedProject.id});
    await getProjectCategory({project_id: selectedProject.id});
  };

  const projectOptions = useMemo(() => {
    return projectList
      ?.filter(i => i.status === 1)
      ?.map(i => ({label: i.project_name, value: i.id}));
  }, [projectList]);

  const getTowers = async value => {
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
    setTowerId(value);
    await getTowerList({project_id: selectedProject.id, id: value});
  };

  const categoryOptions = useMemo(() => {
    return categoriesList
      ?.filter(i => (i.status === 1 && i.id === 1) || i.id === 2 || i.id === 3)
      ?.map(i => ({label: i.title, value: i.id}));
  }, [categoriesList]);

  const loadTowers = async value => {
    formikProps.setFieldValue('projectCategory', value);
    return setTowerOptions(
      towerList?.map(i => ({label: i.label, value: i.tower})),
    );
  };

  const loadFloors = async value => {
    formikProps.setFieldValue('selectTower', value);
    const tempTower = towerList?.find(i => i.tower === value);

    await getFloorList({
      project_id: selectedProject.id,
      id: towerId,
      tower_id: tempTower.id,
    });
  };

  const floorOptions = useMemo(() => {
    return floorList?.map(i => ({label: i.floor, value: i.floor}));
  }, [floorList]);

  const onSubmit = async values => {
    const {projectName, projectCategory, selectTower, selectFloor, unitNo} =
      values;
    const res = await addUnit({
      id: projectName,
      project_id: selectedProject.id,
      project_type: projectCategory,
      project_tower: selectTower,
      project_floor: selectFloor,
      project_unit: unitNo,
    });

    await getUnitList({project_id: selectedProject.id});

    if (submitTypeRef.current === 'save') {
      navigation.goBack();
    } else if (submitTypeRef.current === 'details') {
      navigation.navigate('ProjectUnitDetails', {
        unitId: res.value.id,
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
    setFieldValue: true,
    initialValues: {
      projectName: '',
      builderName: '',
      selectTower: '',
      selectFloor: '',
      area: '',
    },
    onSubmit,
  });

  const {handleSubmit} = formikProps;

  return (
    <View style={styles.mainContainer}>
      <Spinner visible={loading} textContent="" />
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Title>Add Unit</Title>
      </View>
      <View style={styles.formContainer}>
        <RenderForm
          {...props}
          formikProps={formikProps}
          projectOptions={projectOptions}
          getTowers={getTowers}
          categoryOptions={categoryOptions}
          loadTowers={loadTowers}
          towerOptions={towerOptions}
          loadFloors={loadFloors}
          floorOptions={floorOptions}
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
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  formContainer: {
    flex: 1,
  },
});
