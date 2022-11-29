import {StyleSheet, View} from 'react-native';
import React from 'react';

import {Formik} from 'formik';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import ActionButtons from 'components/Atoms/ActionButtons';

import {Subheading} from 'react-native-paper';

const onSubmit = () => {
  console.log('AddReturnMaterialList');
};

const options = ['A', 'B', 'C'];

function AddReturnMaterial(props) {
  const {navigation} = props;

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Subheading style={styles.headerText}>Add Material</Subheading>
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
                  name="fineQty"
                  label="Fine Quantity"
                  containerStyles={styles.inputStyles}
                  maxLength={10}
                  value={values.fineQty}
                  onChangeText={handleChange('fineQty')}
                  onBlur={handleBlur('fineQty')}
                  autoCapitalize="none"
                  returnKeyType="next"
                  error={errors.fineQty}
                />
                <RenderInput
                  name="damageQty"
                  label=" Damage Quantity"
                  containerStyles={styles.inputStyles}
                  maxLength={10}
                  value={values.damageQty}
                  onChangeText={handleChange('damageQty')}
                  onBlur={handleBlur('damageQty')}
                  autoCapitalize="none"
                  returnKeyType="next"
                  error={errors.damageQty}
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
          onSubmit={() => navigation.navigate('AddReturnMaterialList')}
        />
      </View>
    </View>
  );
}

export default AddReturnMaterial;

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

  headerContainer: {
    marginTop: 30,
    marginBottom: 10,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
});
