import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import ActionButtons from 'components/Atoms/ActionButtons';
import {Title} from 'react-native-paper';

const schema = Yup.object().shape({
  subject: Yup.string().label('subject').required('Subject is Required'),
});

const onSubmit = () => {
  console.log('Create PR');
};

const options = ['A', 'B', 'C'];

const CreatePR = props => {
  const {navigation} = props;
  return (
    <View style={{flexGrow: 1, paddingTop: 50}}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Create PR</Text>
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
          {({values, errors, handleChange, handleBlur, handleSubmit}) => {
            return (
              <View style={{flexGrow: 1}}>
                <RenderInput
                  name="subject"
                  label="Subject"
                  containerStyles={styles.inputStyles}
                  maxLength={10}
                  value={values.subject}
                  onChangeText={handleChange('subject')}
                  onBlur={handleBlur('subject')}
                  autoCapitalize="none"
                  returnKeyType="next"
                  error={errors.subject}
                />
                <RenderSelect
                  name="vendorName"
                  label="Vendor Name"
                  options={options}
                  containerStyles={styles.inputStyles}
                  onBlur={handleBlur('vendorName')}
                  onSelect={() => {
                    console.log('Select Box');
                  }}
                />
                <RenderSelect
                  name="requiredFor"
                  label="Required For"
                  options={options}
                  containerStyles={styles.inputStyles}
                  onBlur={handleBlur('requiredFor')}
                  onSelect={() => {
                    console.log('Select Box');
                  }}
                />
                <RenderTextBox
                  name="remark"
                  blurOnSubmit={false}
                  numberOfLines={7}
                  label="Remark"
                  containerStyles={styles.inputStyles}
                  value={values.remark}
                  onChangeText={handleChange('remark')}
                  onBlur={handleBlur('remark')}
                  onSubmitEditing={handleSubmit}
                />
                <View style={styles.btnContainer}>
                  <ActionButtons
                    style={{justifyContent: 'flex-end'}}
                    cancelLabel="Cancel"
                    submitLabel="Next"
                    onCancel={navigation.goBack}
                    onSubmit={() => navigation.navigate('AddMaterialList')}
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      </View>
    </View>
  );
};

export default CreatePR;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 5,
    flexGrow: 1,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '400',
  },
  inputStyles: {
    marginVertical: 8,
  },
  btnContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
});
