import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Title} from 'react-native-paper';

const schema = Yup.object().shape({
  inquiry_date: Yup.string()
    .label('Inquiry Date')
    .required('Inquiry Date is Required'),
  validity_date: Yup.string()
    .label('Inquiry Date')
    .required('Validity Date is Required'),
});

const onSubmit = () => {
  console.log('Create PI');
};

const options = ['A', 'B', 'C'];

const CreatePI = props => {
  const {navigation, route} = props;
  const {PO_Type} = route.params;
  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <View style={styles.mainContainer}>
        <Title>Create PI</Title>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{
            inquiry_date: '',
            validity_date: '',
            contactPerson: '',
            contactPersonNum: '',
          }}
          validationSchema={schema}
          onSubmit={onSubmit}>
          {({values, errors, handleChange, handleBlur, handleSubmit}) => {
            return (
              <View style={{flexGrow: 1}}>
                <RenderInput
                  name="inquiryNo"
                  label="Inquiry No"
                  containerStyles={styles.inputStyles}
                  style={{backgroundColor: 'rgba(0, 0, 0, 0.1);'}}
                  editable={false}
                />

                {PO_Type === 'FROMPO' ? (
                  <RenderInput
                    name="prID"
                    label="PR ID"
                    containerStyles={styles.inputStyles}
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.1);'}}
                    editable={false}
                  />
                ) : null}

                <RenderDatePicker
                  name="validity_date"
                  style={styles.inputStyles}
                  label="Inquiry Date"
                  value={values.validity_date}
                  error={errors.validity_date}
                  onChange={() => console.log('date')}
                />

                <RenderDatePicker
                  name="validity_date"
                  style={styles.inputStyles}
                  label="Validity Date"
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
                  name="contactPersonNum"
                  label="Contact Person Number"
                  containerStyles={styles.inputStyles}
                  style={{backgroundColor: 'rgba(0, 0, 0, 0.1);'}}
                  editable={false}
                />

                <View style={styles.btnContainer}>
                  <ActionButtons
                    style={{justifyContent: 'flex-end'}}
                    cancelLabel="Cancel"
                    submitLabel="Next"
                    onCancel={navigation.goBack}
                    onSubmit={() => navigation.navigate('PIMaterialList')}
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default CreatePI;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 5,
    flexGrow: 1,
  },
  inputStyles: {
    marginVertical: 8,
  },
  btnContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});
