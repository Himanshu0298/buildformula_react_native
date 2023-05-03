import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Subheading} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import RichTextEditor from 'components/Atoms/RichTextEditor';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderSelect from 'components/Atoms/RenderSelect';

const schema = Yup.object().shape({
  remarks: Yup.string().required('Please enter a comment'),
});

function AddComments(props) {
  const {navigation, route} = props;
  const {visitorId, customerId, salesPipelineOptions} = route.params || {};

  const {addVisitorComment, getVisitorActivities} = useSalesActions();

  const {selectedProject} = useSelector(s => s.project);

  const onSubmit = async values => {
    await addVisitorComment({
      ...values,
      is_important: values.is_important ? 1 : 0,
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
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{is_important: false}}
      validationSchema={schema}
      onSubmit={onSubmit}>
      {({setFieldValue, values, handleSubmit, errors}) => (
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.headingContainer}>
              <Subheading>Add comment</Subheading>
            </View>

            <CustomCheckbox
              label="Mark as important"
              checked={values.is_important}
              onChange={() =>
                setFieldValue('is_important', !values.is_important)
              }
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
              name="remarks"
              placeholder="Response"
              value={values.remarks}
              height={200}
              error={errors.remarks}
              onChangeText={value => setFieldValue('remarks', value)}
            />
          </View>
          <ActionButtons
            cancelLabel="Back"
            submitLabel="Save"
            onCancel={navigation.goBack}
            onSubmit={handleSubmit}
            style={styles.button}
          />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flexGrow: 1,
  },
  headingContainer: {
    marginLeft: 10,
    marginTop: 20,
  },
  input: {
    marginVertical: 7,
  },
});

export default AddComments;
