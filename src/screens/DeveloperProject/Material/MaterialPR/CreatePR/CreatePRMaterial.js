import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {Formik} from 'formik';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import ActionButtons from 'components/Atoms/ActionButtons';

const onSubmit = () => {
  console.log('Create PR');
};

const options = ['A', 'B', 'C'];

const CreatePRMaterial = props => {
  const {navigation} = props;
  return (
    <View style={{flexGrow: 1, paddingTop: 50}}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Add Material</Text>
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
          onSubmit={onSubmit}>
          {({values, errors, handleChange, handleBlur, handleSubmit}) => {
            return (
              <View>
                <RenderSelect
                  name="category"
                  label="Category"
                  options={options}
                  containerStyles={styles.inputStyles}
                  onBlur={handleBlur('category')}
                  onSelect={() => {
                    console.log('Select Box');
                  }}
                />
                <RenderSelect
                  name="subCategory"
                  label="Sub Category"
                  options={options}
                  containerStyles={styles.inputStyles}
                  onBlur={handleBlur('subCategory')}
                  onSelect={() => {
                    console.log('Select Box');
                  }}
                />
                <RenderInput
                  name="unit"
                  label="Unit"
                  containerStyles={styles.inputStyles}
                  style={{backgroundColor: 'rgba(0, 0, 0, 0.1);'}}
                  error={errors.subject}
                  editable={false}
                />
                <RenderDatePicker
                  name="start_date"
                  label="Required Date"
                  value={values.start_date}
                  error={errors.start_date}
                  onChange={() => console.log('date')}
                />
                <RenderInput
                  name="qty"
                  label="Quantity"
                  containerStyles={styles.inputStyles}
                  maxLength={10}
                  value={values.subject}
                  onChangeText={handleChange('qty')}
                  onBlur={handleBlur('qty')}
                  autoCapitalize="none"
                  returnKeyType="next"
                  error={errors.subject}
                />
              </View>
            );
          }}
        </Formik>
      </View>
      <View style={styles.btnContainer}>
        <ActionButtons
          cancelLabel="Cancel"
          submitLabel="Save"
          onCancel={navigation.goBack}
          onSubmit={() => navigation.navigate('AddMaterialList')}
        />
      </View>
    </View>
  );
};

export default CreatePRMaterial;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '400',
  },
  inputStyles: {
    marginVertical: 8,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
});
