import {StyleSheet, View, SafeAreaView} from 'react-native';
import React from 'react';

import {Formik} from 'formik';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import ActionButtons from 'components/Atoms/ActionButtons';
import {Title} from 'react-native-paper';
import RenderSelcetMultiple from 'components/Atoms/RenderSelectMultiple';

const onSubmit = () => {
  console.log('Create PR');
};

const options = ['A', 'B', 'C'];

const PIAddMaterial = props => {
  const {navigation} = props;

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <View style={styles.mainContainer}>
        <Title style={styles.headerText}>Add Material</Title>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{
            category: '',
            subCategory: '',
            requiredDate: '',
            qty: '',
            lom: '',
          }}
          onSubmit={onSubmit}>
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => {
            return (
              <View style={{flexGrow: 1}}>
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
                  name="requiredDate"
                  style={styles.inputStyles}
                  label="Required Date"
                  value={values.start_date}
                  error={errors.start_date}
                  onChange={() => console.log('date')}
                />
                <RenderInput
                  name="qty"
                  label="Quantity"
                  maxLength={10}
                  value={values.subject}
                  onChangeText={handleChange('qty')}
                  onBlur={handleBlur('qty')}
                  autoCapitalize="none"
                  returnKeyType="next"
                  error={errors.subject}
                  style={styles.inputStyles}
                />

                <RenderSelcetMultiple
                  name="lom"
                  label="List of Makes"
                  options={options}
                  value={values.interested_property}
                  containerStyles={styles.input}
                  error={errors.interested_property}
                  onSelect={v => {
                    setFieldValue('interested_property', v);
                  }}
                />
                <View style={styles.btnContainer}>
                  <ActionButtons
                    cancelLabel="Cancel"
                    submitLabel="Save"
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

export default PIAddMaterial;

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
    marginBottom: 20,
  },
});
