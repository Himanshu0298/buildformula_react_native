import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {withTheme, Button, Subheading, Title} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';

const schema = Yup.object().shape({
  follow_up_date: Yup.date('Invalid').required('Required'),
  follow_up_time: Yup.date('Invalid').required('Required'),
  assign_to: Yup.string('Invalid').required('Required'),
  response: Yup.string('Invalid').required('Required'),
});

const AddCallLogs = () => {
  const followUpDateRef = React.useRef();
  const followUpTimeRef = React.useRef();
  const assignToRef = React.useRef();

  const onSubmit = () => {
    console.log('----->call log form Submitted');
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
            <View style={styles.formContainer}>
              <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{paddingLeft: 10, paddingRight: 10}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, marginRight: 10}}>
                      <RenderDatePicker
                        name="date"
                        label="Date"
                        ref={followUpDateRef}
                        containerStyles={styles.input}
                        value={values.date}
                        error={errors.follow_up_date}
                        min={new Date()}
                        onChange={date => {
                          setFieldValue('date', date);
                          followUpTimeRef?.current?.focus?.();
                        }}
                      />
                    </View>
                    <View style={{flex: 1}}>
                      <RenderDatePicker
                        mode="time"
                        label="Time"
                        ref={followUpTimeRef}
                        name="time"
                        // label={t('label_follow_up_time')}
                        containerStyles={styles.input}
                        value={values.time}
                        error={errors.follow_up_time}
                        onChange={date => {
                          setFieldValue('time', date);
                          assignToRef?.current?.focus?.();
                        }}
                      />
                    </View>
                  </View>
                  <Subheading style={styles.callOutcomes}>
                    Call outcome
                  </Subheading>
                  <RenderSelect
                    name="assign_to"
                    ref={assignToRef}
                    label="Select Role"
                    containerStyles={styles.input}
                    value={values.assign_to}
                    error={errors.assign_to}
                    onSelect={value => {
                      setFieldValue('assign_to', value);
                    }}
                  />
                  <RenderInput
                    name="response"
                    multiline
                    numberOfLines={8}
                    label="Response"
                    containerStyles={styles.input}
                    value={values.response}
                    onChangeText={handleChange('response')}
                    onBlur={handleBlur('response')}
                    onSubmitEditing={handleSubmit}
                    returnKeyType="done"
                    error={errors.response}
                  />
                </View>
              </ScrollView>
            </View>

            <View style={styles.actionContainer}>
              <Button
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
});
