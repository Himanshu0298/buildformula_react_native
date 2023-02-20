import ActionButtons from 'components/Atoms/ActionButtons';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {IconButton, Subheading} from 'react-native-paper';

function RenderForm(props) {
  const {navigation, formikProps} = props;
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formikProps;

  return (
    <View style={styles.formContainer}>
      <View style={styles.formSubContainer}>
        <RenderInput
          name="tpNumber"
          label="Enter TP Number"
          containerStyles={styles.inputStyles}
          value={values.tpNumber}
          onChangeText={handleChange('tpNumber')}
          onBlur={handleBlur('tpNumber')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.tpNumber}
        />
        <RenderInput
          name="fpNumber"
          label="Enter FP Number"
          containerStyles={styles.inputStyles}
          value={values.fpNumber}
          onChangeText={handleChange('fpNumber')}
          onBlur={handleBlur('fpNumber')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.fpNumber}
        />
        <RenderInput
          name="plotDetails"
          label="Plot / Land Details"
          containerStyles={styles.inputStyles}
          value={values.plotDetails}
          onChangeText={handleChange('plotDetails')}
          onBlur={handleBlur('plotDetails')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.plotDetails}
        />
        <RenderInput
          name="measurement"
          label="Measurement"
          containerStyles={styles.inputStyles}
          value={values.measurement}
          onChangeText={handleChange('measurement')}
          onBlur={handleBlur('measurement')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.measurement}
        />
      </View>
      <View>
        <ActionButtons
          cancelLabel="Cancel"
          submitLabel="Save"
          onCancel={navigation.goBack}
          onSubmit={handleSubmit}
        />
      </View>
    </View>
  );
}

function TPDetails(props) {
  const {navigation} = props;

  const onSubmit = values => {
    console.log(values);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={15}
          color="#4872f4"
          style={styles.backIcon}
          onPress={navigation.goBack}
        />
        <Subheading>TP Details</Subheading>
      </View>
      <View style={styles.formContainer}>
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{}}
          onSubmit={onSubmit}>
          {formikProps => <RenderForm formikProps={formikProps} {...props} />}
        </Formik>
      </View>
    </View>
  );
}

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
  formContainer: {
    flexGrow: 1,
  },

  formSubContainer: {
    margin: 10,
    flexGrow: 1,
  },
});
export default TPDetails;
