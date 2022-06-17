import * as React from 'react';
import {Formik} from 'formik';
import {Button, Subheading, withTheme} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {theme} from 'styles/theme';
import RenderSelect from 'components/Atoms/RenderSelect';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Options = ['hello', 'world'];

const schema = Yup.object().shape({
  documentName: Yup.string('Required').required('Required'),
});

function DocumentForm(props) {
  const {formikProps, navigation} = props;
  const {
    values,
    errors,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formikProps;

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.dialogContent}>
        <View>
          <RenderInput
            name="documentName"
            label="Document Name"
            numberOfLines={3}
            containerStyles={styles.input}
            value={values.documentName}
            onChangeText={handleChange('documentName')}
            onBlur={handleBlur('documentName')}
            error={errors.documentName}
          />

          <RenderSelect
            name="createFor"
            label="Create For"
            options={Options}
            containerStyles={styles.input}
            value={values.createFor}
            error={errors.createFor}
            onSelect={value => {
              setFieldValue('createFor', value);
            }}
          />
        </View>

        <View style={styles.taskButtonContainer}>
          <OpacityButton style={{flexGrow: 1}}>
            <Text>Cancel</Text>
          </OpacityButton>
          {/* <Button style={styles.taskButton} mode="outlined">
            Cancel
          </Button> */}
          <Button style={styles.taskButton} mode="contained">
            Download
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const DocumentDownload = props => {
  const {navigation} = props;

  const handleSubmit = () => {
    console.log('-------->');
  };

  return (
    <>
      <View style={styles.button}>
        <OpacityButton
          opacity={0.1}
          color={theme.colors.primary}
          style={styles.backButton}
          onPress={navigation.goBack}>
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={18}
            color="black"
          />
        </OpacityButton>
        <Subheading style={styles.subheading}>Document</Subheading>
      </View>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        validationSchema={schema}
        onSubmit={handleSubmit}>
        {formikProps => <DocumentForm {...{formikProps}} {...props} />}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  dialogContent: {
    paddingHorizontal: 15,
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  subheading: {
    padding: 10,
    color: theme.colors.primary,
    marginLeft: 5,
  },
  input: {
    marginVertical: 10,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  button: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  backButton: {
    borderRadius: 20,
    // marginRight: 5,
    height: 30,
  },
  taskButton: {
    borderColor: theme.colors.primary,
    flexGrow: 1,
    marginLeft: 15,
  },
  taskButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

export default withTheme(DocumentDownload);
