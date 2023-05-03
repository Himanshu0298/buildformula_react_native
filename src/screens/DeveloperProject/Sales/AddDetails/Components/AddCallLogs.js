import RenderSelect from 'components/Atoms/RenderSelect';
import React, {useMemo} from 'react';
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
  last_date: Yup.date('Invalid').required('Required'),
  last_time: Yup.date('Invalid').required('Required'),
  call_outcome: Yup.string('Invalid').required('Required'),
  remarks: Yup.string('Invalid').required('Required'),
});

function AddCallLogs(props) {
  const {route, navigation} = props;
  const {visitorId, customerId, salesPipelineOptions} = route.params || {};

  const followUpDateRef = React.useRef();
  const followUpTimeRef = React.useRef();
  const assignToRef = React.useRef();

  const {selectedProject, commonData} = useSelector(s => s.project);
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
      <Subheading style={styles.title}>Create call log</Subheading>

      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        validationSchema={schema}
        onSubmit={onSubmit}>
        {({setFieldValue, values, handleSubmit, errors}) => (
          <View style={styles.contentContainer}>
            <KeyboardAwareScrollView
              contentContainerStyle={styles.formContainer}
              keyboardShouldPersistTaps="handled">
              <View style={styles.inputsContainer}>
                <View style={styles.row}>
                  <View style={styles.flex}>
                    <RenderDatePicker
                      name="last_date"
                      label="Date"
                      ref={followUpDateRef}
                      containerStyles={styles.input}
                      value={values.last_date}
                      error={errors.last_date}
                      onChange={date => {
                        setFieldValue('last_date', date);
                        followUpTimeRef?.current?.focus?.();
                      }}
                    />
                  </View>
                  <View style={styles.flex}>
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
                <RenderSelect
                  name="sales_pipeline"
                  label="Sales Pipeline"
                  options={salesPipelineOptions}
                  containerStyles={styles.input}
                  value={values.inquiry_status_id}
                  placeholder="Select Sales pipeline"
                  onSelect={value => {
                    setFieldValue('inquiry_status_id', value);
                  }}
                />
                <RichTextEditor
                  style={styles.input}
                  name="remarks"
                  height={200}
                  placeholder="Response"
                  value={values.remarks}
                  onChangeText={value => {
                    setFieldValue('remarks', value);
                  }}
                  error={errors.remarks}
                />
              </View>
            </KeyboardAwareScrollView>

            <ActionButtons
              cancelLabel="Back"
              submitLabel="Save"
              onCancel={navigation.goBack}
              onSubmit={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

export default withTheme(AddCallLogs);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  callOutcomes: {
    marginTop: 15,
  },
  title: {
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
  inputsContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    flexGrow: 1,
  },
});
