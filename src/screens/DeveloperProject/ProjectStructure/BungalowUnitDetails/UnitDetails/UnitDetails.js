import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {IconButton, Subheading, Switch} from 'react-native-paper';
import {Formik} from 'formik';
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
  unitType: Yup.string().label('unitType').required('unitType is Required'),
});

const RenderForm = props => {
  const {
    navigation,
    formikProps,
    unitForOptions,
    unitTypeOptions,
    unitSpecificTypeOptions,
    unitBHKOptions,
    unitStatusOptions,
  } = props;

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formikProps;

  const onTogglePrime = () =>
    setFieldValue('premium_location', !values.premium_location);
  const onToggleBroker = () =>
    setFieldValue('share_with_broker', !values.share_with_broker);

  return (
    <ScrollView style={{marginBottom: 30}} showsVerticalScrollIndicator={false}>
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
          editable={false}
          style={styles.readOnly}
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
        <RenderSelect
          name="unitFor"
          label="Unit For"
          value={values.unitFor}
          options={unitForOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('unitFor')}
          onSelect={value => {
            setFieldValue('unitFor', value);
          }}
        />
        <RenderSelect
          name="unitType"
          label="Unit Type"
          value={values.unitType}
          options={unitTypeOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('unitType')}
          onSelect={value => {
            setFieldValue('unitType', value);
          }}
        />
        <RenderSelect
          name="specificType"
          label="Specific Type"
          value={values.specificType}
          options={unitSpecificTypeOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('specificType')}
          onSelect={value => {
            setFieldValue('specificType', value);
          }}
        />
        <RenderSelect
          name="noOfBhk"
          label="No of BHK"
          value={values.noOfBhk}
          options={unitBHKOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('noOfBhk')}
          onSelect={value => {
            setFieldValue('noOfBhk', value);
          }}
        />
        <RenderSelect
          name="status"
          label="Status"
          value={values.status}
          options={unitStatusOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('status')}
          onSelect={value => {
            setFieldValue('status', value);
          }}
        />
        <View style={styles.extraDetailsRow}>
          <Subheading>Prime Location</Subheading>
          <View style={styles.extraDetailsSwitchWrap}>
            <Switch
              value={Boolean(values.premium_location)}
              onValueChange={onTogglePrime}
              color="#07CA03"
            />
            {values.premium_location ? (
              <Text style={styles.switchtxt}>Yes</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.extraDetailsRow}>
          <Subheading>Share with other broker</Subheading>
          <View style={styles.extraDetailsSwitchWrap}>
            <Switch
              value={Boolean(values.share_with_broker)}
              onValueChange={onToggleBroker}
              color="#07CA03"
            />
            {values.share_with_broker ? (
              <Text style={styles.switchtxt}>Yes</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.filterBTN}>
          <ActionButtons
            cancelLabel="Cancel"
            submitLabel="Save"
            onCancel={navigation.goBack}
            onSubmit={handleSubmit}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const UnitDetails = props => {
  const {navigation, route} = props;
  const {unitId} = route.params;

  const {updateBungalow, getUnitList} = useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {projectList, unitList, masterList} = useSelector(
    s => s.projectStructure,
  );

  const selectedUnit = unitList?.find(i => i.id === unitId);

  const selected_project = projectList?.find(
    i => i.project_id === selectedUnit.project_id,
  );

  const unitForOptions = useMemo(() => {
    return masterList.project_structure_unit_for
      ?.filter(i => i.status === 1)
      ?.map(i => ({label: i.title, value: i.id}));
  }, [masterList]);

  const unitTypeOptions = useMemo(() => {
    return masterList.project_structure_project_type
      ?.filter(i => i.status === 1)
      ?.map(i => ({label: i.title, value: i.id}));
  }, [masterList]);

  const unitSpecificTypeOptions = useMemo(() => {
    return masterList.project_structure_specific_type
      ?.filter(i => i.status === 1)
      ?.map(i => ({label: i.title, value: i.id}));
  }, [masterList]);

  const unitBHKOptions = useMemo(() => {
    return masterList.master_bhks
      ?.filter(i => i.status === 1)
      ?.map(i => ({label: i.bhk_title, value: i.id}));
  }, [masterList]);

  const unitStatusOptions = useMemo(() => {
    return masterList.project_structure_project_status
      ?.filter(i => i.status === 1)
      ?.map(i => ({label: i.title, value: i.id}));
  }, [masterList]);

  const onSubmit = async values => {
    const {
      noOfBhk,
      premium_location,
      share_with_broker,
      specificType,
      status,
      unitFor,
      unitNo,
      unitType,
    } = values;

    await updateBungalow({
      id: selectedUnit.project_list_id,
      project_id: selectedUnit.project_id,
      project_unit: unitNo,
      unit_type: unitType,
      unit_for: unitFor,
      specific_type: specificType,
      no_of_bhk: noOfBhk,
      status,
      premium_location,
      share_with_broker,
      unit_id: unitId,
    });

    getUnitList({project_id: selectedProject.id});

    navigation.navigate('UnitList');
  };

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
        <Subheading>Unit Details</Subheading>
      </View>
      <View style={styles.formContainer}>
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{
            projectName: selectedUnit.project_name,
            unitNo: selectedUnit.project_unit,
            address: selected_project.area,
            city: selected_project.city,
            state: selected_project.state,
            country: selected_project.country,
            pincode: selected_project.pincode,
            premium_location: selectedUnit.premium_location || 0,
            share_with_broker: selectedUnit.share_with_broker || 0,
            status: selectedUnit.status,
            noOfBhk: selectedUnit.no_of_bhk,
            specificType: selectedUnit.specific_type,
            unitType: selectedUnit.unit_type_id,
            unitFor: selectedUnit.unit_for,
          }}
          validationSchema={schema}
          onSubmit={onSubmit}>
          {formikProps => (
            <RenderForm
              formikProps={formikProps}
              {...props}
              selectedUnit={selectedUnit}
              masterList={masterList}
              unitForOptions={unitForOptions}
              unitTypeOptions={unitTypeOptions}
              unitSpecificTypeOptions={unitSpecificTypeOptions}
              unitBHKOptions={unitBHKOptions}
              unitStatusOptions={unitStatusOptions}
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
  switchtxt: {
    color: '#07CA03',
    marginLeft: 10,
    width: 60,
  },
});
export default UnitDetails;
