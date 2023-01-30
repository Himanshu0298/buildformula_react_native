import ActionButtons from 'components/Atoms/ActionButtons';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import {Formik} from 'formik';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {IconButton, Subheading} from 'react-native-paper';

function RenderForm(props) {
  const {navigation, formikProps, options} = props;
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
          name="surveyNumber"
          label="Enter Survey Number"
          containerStyles={styles.inputStyles}
          value={values.surveyNumber}
          onChangeText={handleChange('surveyNumber')}
          onBlur={handleBlur('surveyNumber')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.surveyNumber}
        />
        <RenderSelect
          name="plotSize"
          label="Plot/ Land Size"
          value={values.plotSize}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('plotSize')}
          onSelect={value => {
            setFieldValue('plotSize', value);
          }}
        />
        <RenderSelect
          name="measurement"
          label="Meassurement"
          value={values.measurement}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('measurement')}
          onSelect={value => {
            setFieldValue('measurement', value);
          }}
        />
      </View>
      <View style={{justifyContent: 'flex-end'}}>
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

function SurveyDetails(props) {
  const {navigation} = props;

  const onSubmit = values => {
    console.log(values);
  };

  const options = ['Science City Rd', 'Sola Rd', 'Bhadaj'];
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
        <Subheading>Survey Details</Subheading>
      </View>
      <View style={styles.formContainer}>
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{}}
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
export default SurveyDetails;
