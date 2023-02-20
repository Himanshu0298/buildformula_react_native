import ActionButtons from 'components/Atoms/ActionButtons';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import RichTextEditor from 'components/Atoms/RichTextEditor';
import {Formik} from 'formik';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
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
        <RichTextEditor
          name="gcp"
          placeholder="gcp"
          style={styles.inputStyles}
          value={values.gcp}
          height={200}
          onChangeText={value => {
            setFieldValue('gcp', value);
          }}
        />
        <RichTextEditor
          name="ec_noc"
          placeholder="EC/ Noc"
          style={styles.inputStyles}
          value={values.ec_noc}
          height={200}
          onChangeText={value => {
            setFieldValue('ec_noc', value);
          }}
        />
        <RichTextEditor
          name="bail_membership"
          placeholder="BAIL Membership"
          style={styles.inputStyles}
          value={values.bail_membership}
          height={200}
          onChangeText={value => {
            setFieldValue('bail_membership', value);
          }}
        />
        <RichTextEditor
          name="discharge"
          placeholder="Discharge"
          style={styles.inputStyles}
          value={values.discharge}
          height={200}
          onChangeText={value => {
            setFieldValue('discharge', value);
          }}
        />
        <RichTextEditor
          name="guj_gas"
          placeholder="Gujarat Gas"
          style={styles.inputStyles}
          value={values.guj_gas}
          height={200}
          onChangeText={value => {
            setFieldValue('guj_gas', value);
          }}
        />
        <RichTextEditor
          name="power"
          placeholder="Power"
          style={styles.inputStyles}
          value={values.power}
          height={200}
          onChangeText={value => {
            setFieldValue('power', value);
          }}
        />
        <RichTextEditor
          name="water"
          placeholder="Water"
          style={styles.inputStyles}
          value={values.water}
          height={200}
          onChangeText={value => {
            setFieldValue('water', value);
          }}
        />
        <RichTextEditor
          name="machinery"
          placeholder="Machinery"
          style={styles.inputStyles}
          value={values.machinery}
          height={200}
          onChangeText={value => {
            setFieldValue('machinery', value);
          }}
        />
        <RichTextEditor
          name="etl_cept_nltl"
          placeholder="ETL/ CEPT/ NLTL"
          style={styles.inputStyles}
          value={values.etl_cept_nltl}
          height={200}
          onChangeText={value => {
            setFieldValue('etl_cept_nltl', value);
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
        <Subheading>Industrial Details Info</Subheading>
      </View>
      <ScrollView style={styles.formContainer}>
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{}}
          onSubmit={onSubmit}>
          {formikProps => <RenderForm formikProps={formikProps} {...props} />}
        </Formik>
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
