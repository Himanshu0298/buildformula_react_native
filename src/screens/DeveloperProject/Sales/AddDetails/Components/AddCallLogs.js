import RenderSelect from 'components/Atoms/RenderSelect';
import React, {useMemo} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {withTheme, Button, Subheading, Title, Text} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import {theme} from 'styles/theme';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import RichTextEditor from 'components/Atoms/RichTextEditor';

const schema = Yup.object().shape({
  last_date: Yup.date('Invalid').required('Required'),
  last_time: Yup.date('Invalid').required('Required'),
  call_outcome: Yup.string('Invalid').required('Required'),
  remarks: Yup.string('Invalid').required('Required'),
});

const AddCallLogs = props => {
  const {route, navigation} = props;
  const {visitorId} = route.params || {};

  const followUpDateRef = React.useRef();
  const followUpTimeRef = React.useRef();
  const assignToRef = React.useRef();

  const {selectedProject, commonData} = useSelector(state => state.project);
  const {callLog_call_outcome_values} = commonData;

  const {addVisitorCallLogs, getVisitorActivities} = useSalesActions();

  const outcomeOptions = useMemo(() => {
    return callLog_call_outcome_values.map(i => ({
      label: i.title,
      value: i.title,
    }));
  }, [callLog_call_outcome_values]);

  const onSubmit = async values => {
    await addVisitorCallLogs({
      ...values,
      // last_date:dayjsvalues.last_last_date,
      last_date: dayjs(values.last_date).format('DD-MM-YYYY'),
      last_time: dayjs(values.last_time).format('hh:mm:ss'),
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
      <Title style={styles.createCallLogs}>Create call log</Title>

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
          <View style={styles.contentContainer}>
            {console.log('----->values', values)}
            <ScrollView style={styles.formContainer}>
              <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{paddingLeft: 10, paddingRight: 10}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, marginRight: 10}}>
                      <RenderDatePicker
                        name="last_date"
                        label="Date"
                        ref={followUpDateRef}
                        containerStyles={styles.input}
                        value={values.last_date}
                        error={errors.last_date}
                        min={new Date()}
                        onChange={date => {
                          setFieldValue('last_date', date);
                          followUpTimeRef?.current?.focus?.();
                        }}
                      />
                    </View>
                    <View style={{flex: 1}}>
                      <RenderDatePicker
                        mode="time"
                        label="Time"
                        ref={followUpTimeRef}
                        name="last_time"
                        containerStyles={styles.input}
                        value={values.last_time}
                        error={errors.last_time}
                        onChange={time => {
                          setFieldValue('last_time', time);
                          assignToRef?.current?.focus?.();
                        }}
                      />
                    </View>
                  </View>
                  <Subheading style={styles.callOutcomes}>
                    Call outcome
                  </Subheading>
                  <RenderSelect
                    name="call_outcome"
                    ref={assignToRef}
                    label="Select Outcome"
                    options={outcomeOptions}
                    containerStyles={styles.input}
                    value={values.call_outcome}
                    error={errors.call_outcome}
                    onSelect={value => {
                      setFieldValue('call_outcome', value);
                    }}
                  />
                  {/* <RenderTextBox
                    name="remarks"
                    numberOfLines={8}
                    label="Response"
                    containerStyles={styles.input}
                    value={values.remarks}
                    onChangeText={handleChange('remarks')}
                    onBlur={handleBlur('remarks')}
                    error={errors.remarks}
                  /> */}
                  <RichTextEditor
                    name="remarks"
                    placeholder="Response"
                    value={values.remarks}
                    onChangeText={value => {
                      setFieldValue('remarks', value);
                    }}
                    error={errors.remarks}
                  />
                </View>
              </ScrollView>
            </ScrollView>

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
          </View>
        )}
      </Formik>
    </View>
  );
};

export default withTheme(AddCallLogs);

const styles = StyleSheet.create({
  input: {
    paddingVertical: 7,
  },
  callOutcomes: {
    marginTop: 15,
  },
  createCallLogs: {
    paddingLeft: 10,
    marginTop: 15,
    paddingRight: 10,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  formContainer: {
    flexGrow: 1,
  },
  actionContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
  },
});
