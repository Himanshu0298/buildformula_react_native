import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconButton, Subheading, Switch} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import ActionButtons from 'components/Atoms/ActionButtons';

import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

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
  const {options, navigation, formikProps} = props;
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formikProps;

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <ScrollView style={{marginBottom: 30}} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <RenderSelect
          name="projectName"
          label="Project Name"
          value={values.projectName}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('projectName')}
          onSelect={value => {
            setFieldValue('projectName', value);
          }}
        />
        <RenderSelect
          name="projectCategory"
          label="Project Category"
          value={values.projectCategory}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('projectCategory')}
          onSelect={value => {
            setFieldValue('projectCategory', value);
          }}
        />
        <RenderSelect
          name="selectTower"
          label="Select Tower"
          value={values.selectTower}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('selectTower')}
          onSelect={value => {
            setFieldValue('selectTower', value);
          }}
        />
        <RenderSelect
          name="selectFloor"
          label="Select Floor"
          value={values.selectFloor}
          options={options}
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
        <RenderSelect
          name="unitFor"
          label="Unit For"
          value={values.unitFor}
          options={options}
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
          options={options}
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
          options={options}
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
          options={options}
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
          options={options}
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
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              color="#07CA03"
            />
            {isSwitchOn ? <Text style={styles.switchtxt}>Yes</Text> : null}
          </View>
        </View>
        <View style={styles.extraDetailsRow}>
          <Subheading>Share with other broker</Subheading>
          <View style={styles.extraDetailsSwitchWrap}>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              color="#07CA03"
            />
            {isSwitchOn ? <Text style={styles.switchtxt}>Yes</Text> : null}
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

  const {unitId} = route.params || {};

  const {getUnitList} = useProjectStructureActions();
  const {selectedProject} = useSelector(s => s.project);
  const {unitList = [], loading} = useSelector(s => s.projectStructure);

  const options = ['Science City Rd', 'Sola Rd', 'Bhadaj'];

  const onSubmit = values => {
    console.log(values);
  };

  useEffect(() => {
    getUnitList({project_id: selectedProject.id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedUnit = unitList?.find(i => i.id === unitId);
  console.log(
    '🚀 ~ file: UnitDetails.js:279 ~ UnitDetails ~ selectedUnit:',
    selectedUnit.id,
  );

  return (
    <View style={styles.mainContainer}>
      <Spinner visible={loading} textContent="" />

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
            projectName: '',
            builderName: '',
            area: '',
          }}
          validationSchema={schema}
          onSubmit={onSubmit}>
          {formikProps => (
            <RenderForm
              formikProps={formikProps}
              {...props}
              options={options}
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
