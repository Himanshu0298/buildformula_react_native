import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import ActionButtons from 'components/Atoms/ActionButtons';
import {Subheading} from 'react-native-paper';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';

const schema = Yup.object().shape({
  subject: Yup.string().label('subject').required('Subject is Required'),
});

const onSubmit = () => {
  console.log('Create PR');
};

const options = ['A', 'B', 'C'];

function CreatePI(props) {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Subheading style={styles.headerText}>Create PI </Subheading>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{
            subject: '',
            vendorName: '',
            requiredFor: '',
            Remark: '',
          }}
          validationSchema={schema}
          onSubmit={onSubmit}>
          {({values, errors, handleChange, handleBlur}) => {
            return (
              <View>
                <RenderInput
                  name="inquiryNumber"
                  label="Inquiry Number"
                  containerStyles={styles.inputStyles}
                  style={styles.input}
                  maxLength={10}
                  value={values.subject}
                  onChangeText={handleChange('inquiryNumber')}
                  onBlur={handleBlur('inquiryNumber')}
                  autoCapitalize="none"
                  returnKeyType="next"
                  error={errors.inquiryNumber}
                />
                <RenderInput
                  name="prId"
                  label="PR ID"
                  containerStyles={styles.inputStyles}
                  style={styles.input}
                  onBlur={handleBlur('prId')}
                  value={values.subject}
                  onChangeText={handleChange('prId')}
                  autoCapitalize="none"
                  returnKeyType="next"
                  error={errors.prId}
                />
                <RenderDatePicker
                  name="inquiry_date"
                  label="Inquiry Date"
                  containerStyles={styles.inputStyles}
                  value={values.inquiry_date}
                  error={errors.inquiry_date}
                  onChange={() => console.log('date')}
                />
                <RenderDatePicker
                  name="validity_date"
                  label="validity Date"
                  containerStyles={styles.inputStyles}
                  value={values.validity_date}
                  error={errors.validity_date}
                  onChange={() => console.log('date')}
                />

                <RenderSelect
                  name="contactPerson"
                  label="Contact Person"
                  options={options}
                  containerStyles={styles.inputStyles}
                  onBlur={handleBlur('contactPerson')}
                  onSelect={() => {
                    console.log('Select Box');
                  }}
                />
                <RenderInput
                  name="contactPersonNub"
                  label="Contact person Number"
                  containerStyles={styles.inputStyles}
                  style={styles.input}
                  onBlur={handleBlur('contactPersonNub')}
                  value={values.subject}
                  onChangeText={handleChange('contactPersonNub')}
                  autoCapitalize="none"
                  returnKeyType="next"
                  error={errors.contactPersonNub}
                />
              </View>
            );
          }}
        </Formik>
      </View>
      <View style={styles.btnContainer}>
        <ActionButtons
          style={styles.actionButton}
          cancelLabel="Cancel"
          submitLabel="Next"
          onCancel={navigation.goBack}
          onSubmit={() => navigation.navigate('AddPIMaterial')}
        />
      </View>
    </View>
  );
}

export default CreatePI;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 10,
  },
  mainContainer: {
    padding: 5,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
  actionButton: {
    justifyContent: 'flex-end',
  },
});
