import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {withTheme, Text, Button} from 'react-native-paper';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import {theme} from 'styles/theme';
import RichTextEditor from 'components/Atoms/RichTextEditor';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {RenderError} from 'components/Atoms/RenderInput';

const schema = Yup.object().shape({
  remark: Yup.string('Invalid').required('Required'),
});

function CompleteTask(props) {
  const {navigation, route} = props;
  const {date, time, visitorID} = route?.params || {};

  const {selectedProject} = useSelector(s => s.project);
  const project_id = selectedProject.id;

  const {updateCompleteTask, getFollowUpDetailsList} = useSalesActions();

  const loadData = () => {
    getFollowUpDetailsList({
      project_id,
      visitor_followup_id: visitorID,
      followup_date: date,
    });
  };

  const onSubmit = async values => {
    await updateCompleteTask({
      project_id,
      visitor_followup_id: visitorID,
      followuptask_remark: values.remark.toString(),
      next_followup_save: 'no',
      followup_date: date,
      followup_time: time,
    });
    loadData();
    navigation.goBack();
  };

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

              <View style={styles.actionContainer}>
                <Button
                  style={styles.button}
                  theme={{roundness: 15}}
                  onPress={navigation.goBack}>
                  Back
                </Button>
                <Button
                  style={styles.button}
                  mode="contained"
                  contentStyle={styles.contentStyle}
                  theme={{roundness: 15}}
                  onPress={handleSubmit}>
                  Save
                </Button>
              </View>
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  container: {
    padding: 20,
    marginTop: 10,
  },
  subheading: {
    color: theme.colors.primary,
    margin: 5,
    fontSize: 18,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  contentStyle: {
    padding: 3,
  },
  renderError: {
    marginTop: 5,
  },
});

export default withTheme(CompleteTask);
