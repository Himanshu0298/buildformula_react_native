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
          name="superBuildUpArea"
          label="Super Buildup Area"
          containerStyles={styles.inputStyles}
          value={values.superBuildUpArea}
          onChangeText={handleChange('superBuildUpArea')}
          onBlur={handleBlur('superBuildUpArea')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.superBuildUpArea}
        />
        <RenderInput
          name="buildUpArea"
          label="Buildup Area"
          containerStyles={styles.inputStyles}
          value={values.buildUpArea}
          onChangeText={handleChange('buildUpArea')}
          onBlur={handleBlur('buildUpArea')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.buildUpArea}
        />
        <RenderInput
          name="carpetArea"
          label="Carpet Area"
          containerStyles={styles.inputStyles}
          value={values.carpetArea}
          onChangeText={handleChange('carpetArea')}
          onBlur={handleBlur('carpetArea')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.carpetArea}
        />
        <RenderInput
          name="washArea"
          label="Wash Area"
          containerStyles={styles.inputStyles}
          value={values.washArea}
          onChangeText={handleChange('washArea')}
          onBlur={handleBlur('washArea')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.washArea}
        />
        <RenderInput
          name="balconyArea"
          label="Balcony Area"
          containerStyles={styles.inputStyles}
          value={values.balconyArea}
          onChangeText={handleChange('balconyArea')}
          onBlur={handleBlur('balconyArea')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.balconyArea}
        />
        <RenderInput
          name="totalArea"
          label="Total Area"
          containerStyles={styles.inputStyles}
          value={values.totalArea}
          onChangeText={handleChange('totalArea')}
          onBlur={handleBlur('totalArea')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.totalArea}
        />
        <RenderInput
          name="northArea"
          label="North Area"
          containerStyles={styles.inputStyles}
          value={values.northArea}
          onChangeText={handleChange('northArea')}
          onBlur={handleBlur('northArea')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.northArea}
        />
        <RenderInput
          name="southArea"
          label="South Area"
          containerStyles={styles.inputStyles}
          value={values.southArea}
          onChangeText={handleChange('southArea')}
          onBlur={handleBlur('southArea')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.southArea}
        />
        <RenderInput
          name="eastArea"
          label="East Area"
          containerStyles={styles.inputStyles}
          value={values.eastArea}
          onChangeText={handleChange('eastArea')}
          onBlur={handleBlur('eastArea')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.eastArea}
        />
        <RenderInput
          name="westArea"
          label="West Area"
          containerStyles={styles.inputStyles}
          value={values.westArea}
          onChangeText={handleChange('westArea')}
          onBlur={handleBlur('westArea')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.westArea}
        />
        <RenderInput
          name="openTerraceArea"
          label="Open terrace Area"
          containerStyles={styles.inputStyles}
          value={values.openTerraceArea}
          onChangeText={handleChange('openTerraceArea')}
          onBlur={handleBlur('openTerraceArea')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.openTerraceArea}
        />
        <RenderInput
          name="undividedLand"
          label="Undivided Land"
          containerStyles={styles.inputStyles}
          value={values.undividedLand}
          onChangeText={handleChange('undividedLand')}
          onBlur={handleBlur('undividedLand')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.undividedLand}
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

function UnitAreaSheet(props) {
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
        <Subheading>Area Sheet</Subheading>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
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
      </ScrollView>
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
export default UnitAreaSheet;
