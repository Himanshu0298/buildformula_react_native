import ActionButtons from 'components/Atoms/ActionButtons';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import RichTextEditor from 'components/Atoms/RichTextEditor';
import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Subheading} from 'react-native-paper';

function RenderForm(props) {
  const {navigation, formikProps} = props;

  const options = ['Science City Rd', 'Sola Rd', 'Bhadaj'];

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
        <RenderSelect
          name="sourceOfUnit"
          label="Source of unit"
          value={values.sourceOfUnit}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('sourceOfUnit')}
          onSelect={value => {
            setFieldValue('sourceOfUnit', value);
          }}
        />
        <RenderInput
          name="referenceName"
          label="Reference Name"
          containerStyles={styles.inputStyles}
          value={values.referenceName}
          onChangeText={handleChange('referenceName')}
          onBlur={handleBlur('referenceName')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.referenceName}
        />
        <RichTextEditor
          name="remark"
          placeholder="Remark"
          style={styles.inputStyles}
          value={values.remark}
          height={200}
          onChangeText={value => {
            setFieldValue('remark', value);
          }}
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

function ProjectStructureUnitDetails(props) {
  const {navigation} = props;

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
        <Subheading>Details</Subheading>
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
    flexGrow: 1,
  },
});

export default ProjectStructureUnitDetails;
