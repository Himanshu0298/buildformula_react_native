import {StyleSheet, View} from 'react-native';
import React from 'react';

import {Formik} from 'formik';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import ActionButtons from 'components/Atoms/ActionButtons';

import {Subheading} from 'react-native-paper';
import RenderSelectMultiple from 'components/Atoms/RenderSelectMultiple';

const makesOptions = ['A 2022', 'A 123', 'A 654', 'A 869'];

const onSubmit = () => {
  console.log('Create PR');
};

const options = ['A', 'B', 'C'];

function CreatePIMaterial(props) {
  const {navigation, material} = props;

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Subheading style={styles.headerText}>
            {material ? 'Edit Material' : 'Add Material'}
          </Subheading>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          formikProps={props}
          initialValues={{
            subject: '',
            vendorName: '',
            requiredFor: '',
            Remark: '',
          }}
          onSubmit={onSubmit}>
          {({values, errors, handleChange, handleBlur, setFieldValue}) => {
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
                  style={styles.input}
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
                <RenderSelectMultiple
                  name="listOfMakes"
                  label="List of Makes"
                  options={makesOptions}
                  value={values.listOfMakes}
                  containerStyles={styles.inputStyles}
                  error={errors.listOfMakes}
                  onSelect={v => {
                    setFieldValue('listOfMakes', v);
                  }}
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
          onSubmit={() => navigation.navigate('AddPIMaterialList')}
        />
      </View>
    </View>
  );
}

export default CreatePIMaterial;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 12,
  },

  mainContainer: {
    padding: 5,
  },
  headerText: {
    fontSize: 18,
  },
  inputStyles: {
    marginVertical: 8,
  },

  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.1);',
  },

  headerContainer: {
    marginBottom: 10,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
});
