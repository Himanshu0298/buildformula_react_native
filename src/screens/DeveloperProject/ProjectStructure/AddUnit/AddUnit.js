import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useMemo, useEffect, useState} from 'react';
import {IconButton, Title} from 'react-native-paper';
import {Formik, useFormik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import ActionButtons from 'components/Atoms/ActionButtons';

import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';

// =======> User will be redirected to this page from ProjectStructureDetails screen also <==========

const schema = Yup.object().shape({
  projectName: Yup.string()
    .label('projectName')
    .required('Project Name is Required'),
  builderName: Yup.string()
    .label('builderName')
    .required('Builder Name is Required'),
  area: Yup.string().label('area').required('Area is Required'),
});

const AddressData = {
  'Science City Rd': {
    address: 'SATYAMEV EMINENCE',
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    pincode: 380013,
  },
  'Sola Rd': {
    address: 'Vraj Valencia',
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    pincode: 380060,
  },
  Bhadaj: {
    address: 'Tri',
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    pincode: 380020,
  },
};

const RenderForm = props => {
  const {
    options,
    navigation,
    formikProps,
    projectOptions,
    getTowers,
    categoryOptions,
    loadTowers,
    towerOptions,
    loadFloors,
    floorOptions,
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
    <ScrollView style={{marginBottom: 30}} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <RenderSelect
          name="projectName"
          label="Project Name"
          value={values.projectName}
          options={projectOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('projectName')}
          onSelect={getTowers}
        />
        <RenderSelect
          name="projectCategory"
          label="Project Category"
          value={values.projectCategory}
          options={categoryOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('projectCategory')}
          onSelect={loadTowers}
        />
        <RenderSelect
          name="selectTower"
          label="Select Tower"
          value={values.selectTower}
          options={towerOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('selectTower')}
          onSelect={loadFloors}
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
        <RenderSelect
          name="area"
          label="Select Area"
          value={values.area}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('area')}
          onSelect={value => {
            setFieldValue('area', value);
          }}
        />
        <RenderInput
          containerStyles={styles.inputStyles}
          label="Address"
          value={AddressData[values.area]?.address}
          autoCapitalize="none"
          returnKeyType="next"
          editable={false}
          style={styles.readOnly}
        />
        <RenderInput
          containerStyles={styles.inputStyles}
          label="City"
          value={AddressData[values.area]?.city}
          autoCapitalize="none"
          returnKeyType="next"
          editable={false}
          style={styles.readOnly}
        />
        <RenderInput
          containerStyles={styles.inputStyles}
          label="State"
          value={AddressData[values.area]?.state}
          autoCapitalize="none"
          returnKeyType="next"
          editable={false}
          style={styles.readOnly}
        />
        <RenderInput
          containerStyles={styles.inputStyles}
          label="Country"
          value={AddressData[values.area]?.country}
          autoCapitalize="none"
          returnKeyType="next"
          editable={false}
          style={styles.readOnly}
        />
        <RenderInput
          containerStyles={styles.inputStyles}
          label="Pincode"
          value={AddressData[values.area]?.pincode}
          autoCapitalize="none"
          returnKeyType="next"
          editable={false}
          style={styles.readOnly}
        />

        <View style={styles.filterBTN}>
          <ActionButtons
            cancelLabel="Add Details"
            submitLabel="Save"
            onCancel={() => navigation.navigate('ProjectUnitDetails')}
            onSubmit={handleSubmit}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const AddUnit = props => {
  const {navigation} = props;
  const [towerOptions, setTowerOptions] = useState([]);
  const [towerId, setTowerId] = useState();

  const {getProjectList, getProjectCategory, getTowerList, getFloorList} =
    useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {projectList, towerList, categoriesList, floorList} = useSelector(
    s => s.projectStructure,
  );

  const formikProps = useFormik({
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: schema,
    initialValues: {
      projectName: '',
      builderName: '',
      selectTower: '',
      selectFloor: '',
      area: '',
    },
    setFieldValue: true,
    onSubmit,
  });

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
    setTowerId(value);
    await getTowerList({project_id: selectedProject.id, id: value});
  };

  const categoryOptions = useMemo(() => {
    return categoriesList
      ?.filter(i => i.status === 1)
      ?.map(i => ({label: i.title, value: i.id}));
  }, [categoriesList]);

  const loadTowers = async value => {
    formikProps.setFieldValue('projectCategory', value);
    return value === 1
      ? setTowerOptions(towerList?.map(i => ({label: i.label, value: i.id})))
      : undefined;
  };

  const loadFloors = async value => {
    formikProps.setFieldValue('selectTower', value);
    await getFloorList({
      project_id: selectedProject.id,
      id: towerId,
      tower_id: value,
    });
  };

  const floorOptions = useMemo(() => {
    return floorList?.map(i => ({label: i.floor, value: i.id}));
  }, [floorList]);

  const onSubmit = values => {
    console.log(values);
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
        <Title>Add Unit</Title>
      </View>
      <View style={styles.formContainer}>
        <Formik>
          {() => (
            <RenderForm
              formikProps={formikProps}
              {...props}
              projectList={projectList}
              towerList={towerList}
              categoriesList={categoriesList}
              floorList={floorList}
              selectedProject={selectedProject}
              projectOptions={projectOptions}
              getTowers={getTowers}
              categoryOptions={categoryOptions}
              loadTowers={loadTowers}
              loadFloors={loadFloors}
              towerOptions={towerOptions}
              floorOptions={floorOptions}
            />
          )}
        </Formik>
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
    flex: 1,
    justifyContent: 'flex-end',
  },
  formContainer: {
    flex: 1,
  },
});
