import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IconButton, Subheading, Switch, Title} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import ActionButtons from 'components/Atoms/ActionButtons';

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
  const options = ['Science City Rd', 'Sola Rd', 'Bhadaj'];

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
