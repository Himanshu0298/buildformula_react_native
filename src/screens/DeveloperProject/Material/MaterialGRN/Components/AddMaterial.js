import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Title} from 'react-native-paper';
import * as Yup from 'yup';
import {Formik} from 'formik';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';

const schema = Yup.object().shape({
  category: Yup.string('Required').required('Required'),
});

const options = ['1', '2', '3'];

function MaterialForm(props) {
  const {formikProps, navigation} = props;
  const {values, errors, setFieldValue, handleBlur, handleSubmit} = formikProps;

  return (
    <View style={styles.formContainer}>
      <RenderSelect
        name="category"
        label="Category"
        containerStyles={styles.input}
        options={options}
        value={values.category}
        onSelect={value => {
          setFieldValue('category', value);
        }}
        error={errors.category}
      />
      <RenderSelect
        name="subcategory"
        label="Subcategory"
        containerStyles={styles.input}
        options={options}
        value={values.subcategory}
        onSelect={value => {
          setFieldValue('subcategory', value);
        }}
        error={errors.subcategory}
      />
      <RenderInput
        name="unit"
        label="Unit"
        containerStyles={styles.input}
        value="Bags"
        onBlur={handleBlur('unit')}
        error={errors.other_occupation}
        disabled
      />
      {/* Search Box input */}
      <RenderSelect
        name="lom"
        label="List of Makes"
        containerStyles={styles.input}
        options={options}
        value={values.lom}
        onSelect={value => {
          setFieldValue('lom', value);
        }}
        error={errors.lom}
      />
      <RenderInput
        name="fine_qty"
        label="Fine Qty"
        containerStyles={styles.input}
        value={values.fine_qty}
        onBlur={handleBlur('fine_qty')}
        error={errors.fine_qty}
      />
      <RenderInput
        name="damage_qty"
        label="Damage Qty"
        containerStyles={styles.input}
        value={values.damage_qty}
        onBlur={handleBlur('damage_qty')}
        error={errors.damage_qty}
      />
      <RenderInput
        name="missing_qty"
        label="Missing Qty"
        containerStyles={styles.input}
        value={values.missing_qty}
        onBlur={handleBlur('missing_qty')}
        error={errors.missing_qty}
      />
    </View>
  );
}

const AddMaterial = props => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Title>Add Material</Title>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{attachments: []}}
        validationSchema={schema}
        onSubmit={() => console.log('test')}>
        {formikProps => <MaterialForm {...{formikProps}} {...props} />}
      </Formik>
      <ActionButtons
        cancelLabel="Cancel"
        submitLabel="Save"
        onSubmit={() => {
          navigation.navigate('GRNMaterial');
        }}
        onCancel={navigation.goBack}
      />
    </SafeAreaView>
  );
};

export default AddMaterial;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexGrow: 1,

    paddingHorizontal: 10,
  },
  formContainer: {
    flex: 1,
    flexGrow: 1,
  },
  input: {
    paddingVertical: 7,
  },
});
