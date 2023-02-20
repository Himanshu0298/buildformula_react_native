import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconButton, Subheading, Switch} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderSelectMultiple from 'components/Atoms/RenderSelectMultiple';

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
        <RenderInput
          name="propertyName"
          label="Property Name"
          containerStyles={styles.inputStyles}
          value={values.propertyName}
          onChangeText={handleChange('propertyName')}
          onBlur={handleBlur('propertyName')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.propertyName}
        />
        <RenderSelect
          name="propertyFor"
          label="Property For"
          value={values.propertyFor}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('propertyFor')}
          onSelect={value => {
            setFieldValue('propertyFor', value);
          }}
        />
        <RenderSelect
          name="area"
          label="Area"
          value={values.area}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('area')}
          onSelect={value => {
            setFieldValue('area', value);
          }}
        />
        <RenderSelect
          name="address"
          label="Address"
          value={values.address}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('address')}
          onSelect={value => {
            setFieldValue('address', value);
          }}
        />
        <RenderSelect
          name="city"
          label="City"
          value={values.city}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('city')}
          onSelect={value => {
            setFieldValue('city', value);
          }}
        />
        <RenderSelect
          name="state"
          label="State"
          value={values.state}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('state')}
          onSelect={value => {
            setFieldValue('state', value);
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
        <RenderSelect
          name="zone"
          label="Zone"
          value={values.zone}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('zone')}
          onSelect={value => {
            setFieldValue('zone', value);
          }}
        />
        <RenderSelect
          name="sourceType"
          label="Source Type"
          value={values.sourceType}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('sourceType')}
          onSelect={value => {
            setFieldValue('sourceType', value);
          }}
        />
        <RenderSelectMultiple
          name="configurtion"
          label="Configuration"
          options={options}
          value={values.configurtion}
          containerStyles={styles.inputStyles}
          error={errors.configurtion}
          onSelect={v => {
            setFieldValue('configurtion', v);
          }}
        />

        <View style={styles.extraDetailsRow}>
          <Subheading>Hot Property</Subheading>
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
            cancelLabel="Add Details"
            submitLabel="Save"
            onCancel={() => navigation.navigate('IndustrialDetails')}
            onSubmit={handleSubmit}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const UnitDetails = props => {
  const {navigation} = props;

  const options = ['Science City Rd', 'Sola Rd', 'Bhadaj'];

  const onSubmit = values => {
    console.log(values);
  };

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

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
        <Subheading>Industrial Unit Add</Subheading>
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
