import ActionButtons from 'components/Atoms/ActionButtons';
import RenderInput from 'components/Atoms/RenderInput';
import RichTextEditor from 'components/Atoms/RichTextEditor';
import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Subheading} from 'react-native-paper';

function RenderForm(props) {
  const {navigation, formikProps} = props;
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
      <View style={styles.formSubContainer}>
        <RenderInput
          name="addressUrl"
          label="Project Address URL"
          containerStyles={styles.inputStyles}
          value={values.addressUrl}
          onChangeText={handleChange('addressUrl')}
          onBlur={handleBlur('addressUrl')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.addressUrl}
        />
        <RichTextEditor
          name="address"
          placeholder="Address"
          value={values.address}
          height={200}
          onChangeText={value => {
            setFieldValue('address', value);
          }}
        />
        <RichTextEditor
          name="remark"
          placeholder="Remark"
          style={styles.inputStyles}
          value={values.remark}
          height={200}
          onChangeText={value => {
            setFieldValue('remark', value);
          }}
        />
      </View>
      <ActionButtons
        cancelLabel="Cancel"
        submitLabel="Save"
        onCancel={navigation.goBack}
        onSubmit={handleSubmit}
      />
    </View>
  );
}

function LocationInfo(props) {
  const {navigation} = props;

  const onSubmit = values => {
    console.log(values);
  };

  const options = ['Science City Rd', 'Sola Rd', 'Bhadaj'];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={15}
          color="#4872f4"
          style={styles.backIcon}
          onPress={navigation.goBack}
        />
        <Subheading>Location Info</Subheading>
      </View>

      <View style={styles.formContainer}>
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{}}
          onSubmit={onSubmit}>
          {formikProps => (
            <RenderForm
              formikProps={formikProps}
              {...props}
              options={options}
            />
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
  mainContainer: {
    flex: 1,
    margin: 10,
  },
  inputStyles: {
    marginVertical: 8,
  },
  formContainer: {
    flexGrow: 1,
  },

  formSubContainer: {
    margin: 10,
    flexGrow: 1,
  },
});

export default LocationInfo;
