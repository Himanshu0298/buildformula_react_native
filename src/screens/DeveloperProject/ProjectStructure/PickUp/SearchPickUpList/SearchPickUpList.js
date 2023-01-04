import ActionButtons from 'components/Atoms/ActionButtons';
import RenderSelect from 'components/Atoms/RenderSelect';
import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Subheading} from 'react-native-paper';

const RenderForm = props => {
  const {options, navigation, formikProps} = props;
  const {values, handleBlur, setFieldValue, handleSubmit} = formikProps;

  return (
    <View style={styles.formContainer}>
      <View style={styles.formSubContainer}>
        <RenderSelect
          name="module"
          label="Module"
          value={values.module}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('module')}
          onSelect={value => {
            setFieldValue('module', value);
          }}
        />
        <RenderSelect
          name="subModule"
          label="SubModule"
          value={values.subModule}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('subModule')}
          onSelect={value => {
            setFieldValue('subModule', value);
          }}
        />
        <RenderSelect
          name="selectField"
          label="Select Field "
          value={values.selectField}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('selectField')}
          onSelect={value => {
            setFieldValue('selectField', value);
          }}
        />
      </View>

      <ActionButtons
        cancelLabel="Cancel"
        submitLabel="Search"
        onSubmit={handleSubmit}
        onCancel={navigation.goBack}
      />
    </View>
  );
};

function SearchPickUpList(props) {
  const {navigation} = props;

  const options = [];
  const onSubmit = () => {
    navigation.navigate('PickUpListing');
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Subheading>PickUp List</Subheading>
      </View>

      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        onSubmit={onSubmit}>
        {formikProps => (
          <RenderForm formikProps={formikProps} {...props} options={options} />
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },

  inputStyles: {
    marginVertical: 8,
  },

  formContainer: {
    flexGrow: 1,
    margin: 5,
  },
  formSubContainer: {
    flexGrow: 1,
  },
});

export default SearchPickUpList;
