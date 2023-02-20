import ActionButtons from 'components/Atoms/ActionButtons';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import RichTextEditor from 'components/Atoms/RichTextEditor';
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
          name="surveyPrice"
          label="Enter Survey Price"
          containerStyles={styles.inputStyles}
          value={values.surveyPrice}
          onChangeText={handleChange('surveyPrice')}
          onBlur={handleBlur('surveyPrice')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.surveyPrice}
        />
        <RenderInput
          name="tpPrice"
          label="TP Price"
          containerStyles={styles.inputStyles}
          value={values.tpPrice}
          onChangeText={handleChange('tpPrice')}
          onBlur={handleBlur('tpPrice')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.tpPrice}
        />
        <RenderInput
          name="remark"
          label="Remark"
          containerStyles={styles.inputStyles}
          value={values.remark}
          onChangeText={handleChange('remark')}
          onBlur={handleBlur('remark')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.remark}
        />
        <RenderInput
          name="commission"
          label="Commission"
          containerStyles={styles.inputStyles}
          value={values.commission}
          onChangeText={handleChange('commission')}
          onBlur={handleBlur('commission')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.commission}
        />
      </View>
      <ActionButtons
        cancelLabel="Cancel"
        submitLabel="Save"
        onCancel={navigation.goBack}
        onSubmit={handleSubmit}
      />
    </View>
  );
}

function UnitPricing(props) {
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
          onPress={navigation.goBack}
        />
        <Subheading>Pricing</Subheading>
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
    margin: 10,
    flex: 1,
  },
  inputStyles: {
    marginVertical: 8,
  },

  formContainer: {
    flexGrow: 1,
  },

  formSubContainer: {
    marginBottom: 90,
    flexGrow: 1,
  },
});
export default UnitPricing;
