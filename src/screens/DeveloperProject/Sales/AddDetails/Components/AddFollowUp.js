import RenderInput from 'components/Atoms/RenderInput';
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {withTheme, Button, Title, Subheading} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
// import useSalesActions from 'redux/reducers/salesActions';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import {theme} from 'styles/theme';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import RichTextEditor from 'components/Atoms/RichTextEditor';

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

  const {visitorId} = route.params || {};

  const {selectedProject} = useSelector(s => s.project);

  const {addVisitorFollowUp, getVisitorActivities} = useSalesActions();

  const onSubmit = async values => {
    await addVisitorFollowUp({
      ...values,
      followup_date: dayjs(values.followup_date).format('DD-MM-YYYY'),
      followup_time: dayjs(values.followup_time).format('hh:mm:ss'),
      visitor_id: visitorId,
      project_id: selectedProject.id,
    });
    getVisitorActivities({
      visitor_id: visitorId,
      project_id: selectedProject.id,
    });
    navigation.goBack();
  };

  return (
    <View style={{flexGrow: 1}}>
      <Title style={{paddingHorizontal: 10, marginTop: 20}}>
        Create Follow-up task
      </Title>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        validationSchema={schema}
        onSubmit={onSubmit}>
        {({
          handleChange,
          setFieldValue,
          values,
          handleSubmit,
          handleBlur,
          errors,
        }) => (
          <ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps="handled">
            <View style={{padding: 10}}>
              <Subheading>Task Title</Subheading>

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

              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, marginRight: 10}}>
                  <RenderDatePicker
                    name="followup_date"
                    label="Date"
                    ref={followUpDateRef}
                    containerStyles={styles.input}
                    value={values.followup_date}
                    error={errors.followup_date}
                    min={new Date()}
                    onChange={date => {
                      setFieldValue('followup_date', date);
                      followUpTimeRef?.current?.focus?.();
                    }}
                  />
                </View>
                <View style={{flex: 1}}>
                  <RenderDatePicker
                    mode="time"
                    label="Time"
                    ref={followUpTimeRef}
                    name="followup_time"
                    containerStyles={styles.input}
                    value={values.followup_time}
                    // error={errors.followup_time}
                    onChange={date => {
                      setFieldValue('followup_time', date);
                      assignToRef?.current?.focus?.();
                    }}
                  />
                </View>
              </View>
              {/* <Subheading style={{marginTop: 20}}>Remark</Subheading> */}
              {/* <RenderTextBox
                name="remarks"
                numberOfLines={8}
                label="Response"
                containerStyles={styles.input}
                value={values.remarks}
                onChangeText={handleChange('remarks')}
                onBlur={handleBlur('remarks')}
                onSubmitEditing={handleSubmit}
                error={errors.remarks}
              /> */}
              <RichTextEditor
                name="remarks"
                placeholder="Response"
                value={values.remarks}
                onChangeText={value => {
                  setFieldValue('remarks', value);
                }}
              />
            </View>
            <View style={styles.actionContainer}>
              <Button
                style={{
                  flex: 1,
                  marginHorizontal: 5,
                  borderWidth: 1,
                  borderColor: theme.colors.primary,
                }}
                contentStyle={{padding: 3}}
                theme={{roundness: 15}}
                onPress={navigation.goBack}>
                Back
              </Button>
              <Button
                style={{flex: 1, marginHorizontal: 5}}
                mode="contained"
                contentStyle={{padding: 3}}
                theme={{roundness: 15}}
                onPress={handleSubmit}>
                Save
              </Button>
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}

export default withTheme(AddFollowUp);

const styles = StyleSheet.create({
  input: {
    paddingVertical: 7,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  actionContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
