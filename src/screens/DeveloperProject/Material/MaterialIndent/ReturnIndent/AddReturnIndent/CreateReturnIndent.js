import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import ActionButtons from 'components/Atoms/ActionButtons';
import {Subheading} from 'react-native-paper';

// const schema = Yup.object().shape({
//   subject: Yup.string().label('subject').required('Subject is Required'),
// });

function CreateReturnIndent(props) {
  const {navigation} = props;

  const onSubmit = () => console.log('===========> ');

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Subheading style={styles.headerText}>Return Request</Subheading>
      </View>
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        // validationSchema={schema}
        onSubmit={onSubmit}>
        {({values, handleChange, handleBlur, setFieldValue, handleSubmit}) => {
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

                <RenderTextBox
                  name="remarks"
                  blurOnSubmit={false}
                  numberOfLines={10}
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
                onSubmit={() => navigation.navigate('AddReturnMaterialList')}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
}

export default CreateReturnIndent;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexGrow: 1,
    padding: 15,
  },
  headerContainer: {
    marginTop: 30,
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
