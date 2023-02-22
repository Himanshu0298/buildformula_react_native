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
          name="netLandArea"
          label="Net Land Area"
          containerStyles={styles.inputStyles}
          value={values.netLandArea}
          onChangeText={handleChange('netLandArea')}
          onBlur={handleBlur('netLandArea')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.netLandArea}
        />
        <RenderInput
          name="undividedLandArea"
          label="Undivided Land Area"
          containerStyles={styles.inputStyles}
          value={values.undividedLandArea}
          onChangeText={handleChange('undividedLandArea')}
          onBlur={handleBlur('undividedLandArea')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.undividedLandArea}
        />
        <RenderInput
          name="superBuildupArea"
          label="Super Buildup Area"
          containerStyles={styles.inputStyles}
          value={values.superBuildupArea}
          onChangeText={handleChange('superBuildupArea')}
          onBlur={handleBlur('superBuildupArea')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.superBuildupArea}
        />
        <RenderInput
          name="constructionBuildupArea"
          label="Construction Buildup Area"
          containerStyles={styles.inputStyles}
          value={values.constructionBuildupArea}
          onChangeText={handleChange('constructionBuildupArea')}
          onBlur={handleBlur('constructionBuildupArea')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.constructionBuildupArea}
        />
        <RenderInput
          name="constructionSuperBuildupArea"
          label="Construction Super Buildup Area"
          containerStyles={styles.inputStyles}
          value={values.constructionSuperBuildupArea}
          onChangeText={handleChange('constructionSuperBuildupArea')}
          onBlur={handleBlur('constructionSuperBuildupArea')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.constructionSuperBuildupArea}
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
