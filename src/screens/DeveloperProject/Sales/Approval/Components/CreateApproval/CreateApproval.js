import * as React from 'react';
import {Formik} from 'formik';
import {Button, Subheading, withTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ActionButtons from 'components/Atoms/ActionButtons';
import {theme} from 'styles/theme';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';

const ApprovalOptions = ['hello', 'world'];

const schema = Yup.object().shape({
  title: Yup.string('Required').required('Required'),
});

function ApprovalRequestForm(props) {
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
    <>
      <View style={styles.formContainer}>
        <Subheading style={styles.subheading}>
          Create Approval Request
        </Subheading>
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.dialogContent}>
          <View>
            <RenderInput
              name="title"
              label="Title"
              numberOfLines={3}
              containerStyles={styles.input}
              value={values.title}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              error={errors.title}
            />

            <RenderTextBox
              name="description"
              numberOfLines={5}
              minHeight={120}
              label="Description"
              containerStyles={styles.input}
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              onSubmitEditing={handleSubmit}
              returnKeyType="done"
              error={errors.description}
            />

            <RenderDatePicker
              name="date"
              label="Due Date"
              //   ref={dateRef}
              containerStyles={styles.input}
              value={values.date}
              onChange={v => setFieldValue('date', v)}
              error={errors.date}
            />

            <RenderSelect
              name="approval"
              label="Approval"
              options={ApprovalOptions}
              containerStyles={styles.input}
              value={values.approval}
              error={errors.approval}
              onSelect={value => {
                setFieldValue('approval', value);
              }}
            />

            <Button style={styles.uploadButton} mode="outlined">
              Upload Image
            </Button>
          </View>

          <ActionButtons
            onSubmit={handleSubmit}
            submitLabel="Save"
            onCancel={() => navigation.goBack()}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const CreateApproval = props => {
  const handleSubmit = () => {
    console.log('-------->');
  };

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      validationSchema={schema}
      onSubmit={handleSubmit}>
      {formikProps => <ApprovalRequestForm {...{formikProps}} {...props} />}
    </Formik>
  );
};

const styles = StyleSheet.create({
  dialogContent: {
    paddingHorizontal: 15,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  formContainer: {
    marginTop: 5,
  },
  subheading: {
    padding: 10,
    color: theme.colors.primary,
  },
  input: {
    marginVertical: 10,
  },

  contentContainerStyle: {
    flexGrow: 1,
  },
  uploadButton: {
    marginTop: 15,
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
});

export default withTheme(CreateApproval);
