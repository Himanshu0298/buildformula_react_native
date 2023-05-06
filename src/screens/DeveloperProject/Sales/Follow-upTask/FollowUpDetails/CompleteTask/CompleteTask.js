import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {withTheme, Text} from 'react-native-paper';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import {theme} from 'styles/theme';
import RichTextEditor from 'components/Atoms/RichTextEditor';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {RenderError} from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import ActionButtons from 'components/Atoms/ActionButtons';

const schema = Yup.object().shape({
  remark: Yup.string('Invalid').required('Required'),
});

function CompleteTask(props) {
  const {navigation, route} = props;
  const {date, visitorID} = route?.params || {};

  const {selectedProject} = useSelector(s => s.project);
  const {pipelines = []} = useSelector(s => s.sales);

  const project_id = selectedProject.id;

  const followUpDateRef = React.useRef();
  const followUpTimeRef = React.useRef();
  const assignToRef = React.useRef();

  const {
    updateCompleteTask,
    getFollowUpDetailsList,
    getPipelineData,
    getFollowUpList,
  } = useSalesActions();

  const loadData = () => {
    getFollowUpDetailsList({
      project_id,
      visitor_followup_id: visitorID,
      followup_date: date,
    });
  };

  useEffect(() => {
    getPipelineData({project_id: selectedProject.id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = () => {
    getFollowUpList({project_id, given_date: date});
  };

  const onSubmit = async values => {
    await updateCompleteTask({
      project_id,
      visitor_followup_id: visitorID,
      followuptask_remark: values.remark.toString(),
      inquiry_status_id: values.inquiry_status_id,
      next_followup_save: values.next_followup_save,
      followup_date: values.followup_date,
      followup_time: values.followup_time,
    });
    loadData();
    getList();
    navigation.goBack();
  };

  const salesPipelineOptions = useMemo(() => {
    const options = pipelines
      ?.map(e => {
        return {label: e?.title, value: e?.id};
      })
      ?.filter(e => e.label !== 'Book(won)');
    return options;
  }, [pipelines]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subheading}>Remark</Text>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        validationSchema={schema}
        onSubmit={onSubmit}>
        {({values, errors, setFieldValue, handleSubmit}) => {
          return (
            <View style={styles.dialogContentContainer}>
              <RichTextEditor
                name="remark"
                placeholder="Remark"
                height={150}
                value={values.remark}
                error={errors.remark}
                onChangeText={value => {
                  setFieldValue('remark', value);
                }}
              />

              <RenderError error={errors.remark} style={styles.renderError} />

              <View style={styles.checkBox}>
                <CustomCheckbox
                  label="Create Next Followup"
                  checked={values.next_followup_save === 'yes'}
                  onChange={() => {
                    setFieldValue(
                      'next_followup_save',
                      values.next_followup_save === 'yes' ? 'no' : 'yes',
                    );
                  }}
                />
              </View>
              {values?.next_followup_save === 'yes' ? (
                <View style={{marginVertical: 10}}>
                  <Text style={{fontSize: 17}}> Next FollowUp Details</Text>

                  <View style={styles.row}>
                    <View style={styles.flex}>
                      <RenderDatePicker
                        name="followup_date"
                        label="Date"
                        ref={followUpDateRef}
                        containerStyles={styles.input}
                        value={values.followup_date}
                        error={errors.followup_date}
                        onChange={data => {
                          setFieldValue('followup_date', data);
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
                        error={errors.followup_time}
                        onChange={data => {
                          setFieldValue('followup_time', data);
                          assignToRef?.current?.focus?.();
                        }}
                      />
                    </View>
                  </View>
                </View>
              ) : null}
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

              <ActionButtons
                cancelLabel="Back"
                submitLabel="Save"
                onCancel={navigation.goBack}
                onSubmit={handleSubmit}
                style={styles.button}
              />
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 10,
  },
  subheading: {
    color: theme.colors.primary,
    margin: 5,
    fontSize: 18,
  },

  renderError: {
    marginTop: 5,
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
});

export default withTheme(CompleteTask);
