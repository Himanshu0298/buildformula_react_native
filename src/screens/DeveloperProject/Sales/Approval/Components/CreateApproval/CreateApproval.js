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
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import {useEffect, useMemo} from 'react';
import dayjs from 'dayjs';

const schema = Yup.object().shape({
  title: Yup.string('Required').required('Required'),
});

function ApprovalRequestForm(props) {
  const {formikProps, navigation, ApprovalOptions} = props;
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
        </View>
        <ActionButtons
          onSubmit={handleSubmit}
          submitLabel="Save"
          onCancel={() => navigation.goBack()}
        />
      </KeyboardAwareScrollView>
    </>
  );
}

const CreateApproval = props => {
  const {navigation} = props;
  const {createApproval, getApprovers} = useSalesActions();

  const {selectedProject} = useSelector(s => s.project);

  const {approversList} = useSelector(s => s.sales);
  const projectId = selectedProject.id;

  const filteredOptions = useMemo(() => {
    return approversList?.map(i => ({
      label: `${i.first_name} ${i.last_name}`,
      value: i.id,
    }));
  }, [approversList]);

  useEffect(() => {
    getApprovers({project_id: projectId});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const handleSubmit = async values => {
    const date = dayjs(values.date).format('DD-MM-YYYY');

    await createApproval({
      project_id: projectId,
      title: values.title,
      description: values.description,
      due_date: date,
      approver_id: values.approval,
    });
    navigation.goBack();
  };

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      validationSchema={schema}
      onSubmit={handleSubmit}>
      {formikProps => (
        <ApprovalRequestForm
          {...{formikProps}}
          {...props}
          ApprovalOptions={filteredOptions}
        />
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  dialogContent: {
    paddingHorizontal: 25,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  formContainer: {
    marginTop: 5,
    paddingHorizontal: 10,
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
    paddingHorizontal: 5,
  },
  uploadButton: {
    marginTop: 15,
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
});

export default withTheme(CreateApproval);
