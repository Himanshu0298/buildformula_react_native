import {StyleSheet, View} from 'react-native';
import React from 'react';
import {IconButton, Title} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import ActionButtons from 'components/Atoms/ActionButtons';

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
  const {options, navigation, formikProps} = props;
  const {values, errors, handleChange, handleBlur, setFieldValue} = formikProps;

  return (
    <View style={styles.formContainer}>
      <View style={styles.formSubContainer}>
        <RenderInput
          name="area"
          label="Area Name"
          containerStyles={styles.inputStyles}
          value={values.area}
          onChangeText={handleChange('area')}
          onBlur={handleBlur('area')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.area}
        />
        <RenderInput
          name="pincode"
          label="Pin Code"
          containerStyles={styles.inputStyles}
          value={values.pincode}
          onChangeText={handleChange('pincode')}
          onBlur={handleBlur('pincode')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.pincode}
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
          name="country"
          label="Country"
          value={values.country}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('country')}
          onSelect={value => {
            setFieldValue('country', value);
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
      </View>

      <ActionButtons
        cancelLabel="Cancel"
        submitLabel="Save"
        onCancel={navigation.goBack}
        onSubmit={navigation.goBack}
      />
    </View>
  );
};

const AddArea = props => {
  const {navigation} = props;
  const onSubmit = values => {
    console.log(values);
  };
  const options = [];
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
        <Title>Add Area</Title>
      </View>
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
          <RenderForm formikProps={formikProps} {...props} options={options} />
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  mainContainer: {
    marginHorizontal: 10,
    flex: 1,
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
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
});

export default AddArea;
