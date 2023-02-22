import {StyleSheet, View} from 'react-native';
import React from 'react';
import {IconButton, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderInput from 'components/Atoms/RenderInput';

const schema = Yup.object().shape({
  filter: Yup.string().label('filter').required('Filter is Required'),
});

const RenderForm = props => {
  const {options, navigation, formikProps} = props;
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formikProps;
  return (
    <View style={styles.formContainer}>
      <RenderInput
        name="filter"
        label="Filter"
        containerStyles={styles.inputStyles}
        value={values.filter}
        onChangeText={handleChange('filter')}
        onBlur={handleBlur('filter')}
        autoCapitalize="none"
        returnKeyType="next"
        error={errors.filter}
      />
      <RenderSelect
        name="filterOption1"
        label="Filter Options"
        value={values.filterOption1}
        options={options}
        containerStyles={styles.inputStyles}
        onBlur={handleBlur('filterOption1')}
        onSelect={value => {
          setFieldValue('filterOption1', value);
        }}
      />
      <RenderSelect
        name="filterOption2"
        label="Filter Options"
        value={values.filterOption2}
        options={options}
        containerStyles={styles.inputStyles}
        onBlur={handleBlur('filterOption2')}
        onSelect={value => {
          setFieldValue('filterOption2', value);
        }}
      />
      <View style={styles.filterBTN}>
        <ActionButtons
          cancelLabel="Cancel"
          submitLabel="Apply"
          onCancel={navigation.goBack}
          onSubmit={handleSubmit}
        />
      </View>
    </View>
  );
};

const ProjectFilter = props => {
  const {navigation} = props;
  const options = ['1', '2', '3', '4', '5'];
  const onSubmit = values => {
    console.log(values);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Title>Filter</Title>
      </View>
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          filter: '',
          filterOption1: '',
          filterOption2: '',
        }}
        validationSchema={schema}
        onSubmit={onSubmit}>
        {formikProps => (
          <RenderForm formikProps={formikProps} {...props} options={options} />
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default ProjectFilter;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
  inputStyles: {
    marginVertical: 8,
  },
  formContainer: {
    flex: 1,
  },
  filterBTN: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
