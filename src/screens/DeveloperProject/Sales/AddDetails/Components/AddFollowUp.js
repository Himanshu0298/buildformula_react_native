import RenderInput from 'components/Atoms/RenderInput';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {withTheme, Subheading} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import RichTextEditor from 'components/Atoms/RichTextEditor';
import ActionButtons from 'components/Atoms/ActionButtons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const schema = Yup.object().shape({
  followup_date: Yup.date('Invalid').required('Required'),
  followup_time: Yup.date('Invalid').required('Required'),
  task_title: Yup.string('Invalid').required('Required'),
  remarks: Yup.string('Invalid').required('Required'),
});

function AddFollowUp(props) {
  const followUpDateRef = React.useRef();
  const followUpTimeRef = React.useRef();
  const assignToRef = React.useRef();

  const {route, navigation} = props;

  const {visitorId, customerId} = route.params || {};

  const {selectedProject} = useSelector(s => s.project);

  const {addVisitorFollowUp, getVisitorActivities} = useSalesActions();

  const onSubmit = async values => {
    await addVisitorFollowUp({
      ...values,
      followup_date: dayjs(values.followup_date).format('DD-MM-YYYY'),
      followup_time: dayjs(values.followup_time).format('hh:mm:ss'),
      visitor_id: visitorId || customerId,
      project_id: selectedProject.id,
    });
    getVisitorActivities({
      visitor_id: visitorId || customerId,
      project_id: selectedProject.id,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Subheading>Create Follow-up task</Subheading>
      </View>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        validationSchema={schema}
        onSubmit={onSubmit}>
        {({
          values,
          handleChange,
          setFieldValue,
          handleSubmit,
          handleBlur,
          errors,
        }) => (
          <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps="handled">
            <View style={styles.contentContainer}>
              <RenderInput
                name="task_title"
                numberOfLines={8}
                label="Task Title"
                containerStyles={styles.input}
                value={values.task_title}
                onChangeText={handleChange('task_title')}
                onBlur={handleBlur('task_title')}
                onSubmitEditing={handleSubmit}
                returnKeyType="done"
                error={errors.task_title}
              />

              <View style={styles.row}>
                <View style={styles.flex}>
                  <RenderDatePicker
                    name="followup_date"
                    label="Date"
                    ref={followUpDateRef}
                    containerStyles={styles.input}
                    value={values.followup_date}
                    error={errors.followup_date}
                    onChange={date => {
                      setFieldValue('followup_date', date);
                      followUpTimeRef?.current?.focus?.();
                    }}
                  />
                </View>
                <View style={styles.flex}>
                  <RenderDatePicker
                    mode="time"
                    label="Time"
                    ref={followUpTimeRef}
                    name="followup_time"
                    containerStyles={styles.input}
                    value={values.followup_time}
                    onChange={date => {
                      setFieldValue('followup_time', date);
                      assignToRef?.current?.focus?.();
                    }}
                  />
                </View>
              </View>
              <RichTextEditor
                style={styles.input}
                name="remarks"
                placeholder="Response"
                height={200}
                value={values.remarks}
                onChangeText={value => {
                  setFieldValue('remarks', value);
                }}
              />
            </View>
            <ActionButtons
              cancelLabel="Back"
              submitLabel="Save"
              onCancel={navigation.goBack}
              onSubmit={handleSubmit}
            />
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  );
}

export default withTheme(AddFollowUp);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  headingContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -10,
  },
  flex: {
    flex: 1,
    marginHorizontal: 10,
  },
  input: {
    marginVertical: 7,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
