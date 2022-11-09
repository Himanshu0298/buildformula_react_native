import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import ActionButtons from 'components/Atoms/ActionButtons';
import {Subheading} from 'react-native-paper';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';

// const schema = Yup.object().shape({
//   subject: Yup.string().label('subject').required('Subject is Required'),
// });

const CreateIssueIndent = props => {
  const {navigation} = props;

  const onSubmit = () => console.log('===========> ');

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Subheading style={styles.headerText}>Issue Request</Subheading>
      </View>
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        // validationSchema={schema}
        onSubmit={onSubmit}>
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
        }) => {
          return (
            <View style={styles.formContainer}>
              <View style={styles.formContainer}>
                <RenderSelect
                  name="contractor_id"
                  label="Requirement For Vendor"
                  value={values.contractor_id}
                  options={{}}
                  containerStyles={styles.inputStyles}
                  onBlur={handleBlur('contractor_id')}
                  onSelect={value => {
                    setFieldValue('contractor_id', value);
                  }}
                />

                <RenderDatePicker
                  name="start_date"
                  label="Required Date"
                  value={values.start_date}
                  error={errors.start_date}
                  onChange={() => console.log('date')}
                />
                <RenderSelect
                  name="required_for"
                  label="Required For"
                  value={values.required_for}
                  options={{}}
                  containerStyles={styles.inputStyles}
                  onBlur={handleBlur('required_for')}
                  onSelect={value => {
                    setFieldValue('required_for', value);
                  }}
                />
                <RenderTextBox
                  name="remarks"
                  blurOnSubmit={false}
                  numberOfLines={7}
                  label="Remark"
                  containerStyles={styles.inputStyles}
                  value={values.remarks}
                  onChangeText={handleChange('remarks')}
                  onBlur={handleBlur('remarks')}
                  onSubmitEditing={handleSubmit}
                />
              </View>
              <ActionButtons
                cancelLabel="Cancel"
                submitLabel="Next"
                onCancel={navigation.goBack}
                onSubmit={() => navigation.navigate('AddMaterialIndentList')}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default CreateIssueIndent;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexGrow: 1,
  },
  headerContainer: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
  },
  inputStyles: {
    marginVertical: 8,
  },
  formContainer: {
    flexGrow: 1,
  },
});
