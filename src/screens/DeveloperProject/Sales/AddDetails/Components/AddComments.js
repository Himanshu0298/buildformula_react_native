import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Title} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import {theme} from 'styles/theme';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import RichTextEditor from 'components/Atoms/RichTextEditor';

const schema = Yup.object().shape({
  remarks: Yup.string().required('Please enter a comment'),
});

function AddComments(props) {
  const {navigation, route} = props;
  const {visitorId} = route.params || {};

  const {addVisitorComment, getVisitorActivities} = useSalesActions();

  const {selectedProject} = useSelector(s => s.project);

  const onSubmit = async values => {
    await addVisitorComment({
      ...values,
      is_important: values.is_important ? 1 : 0,
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
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{is_important: false}}
      validationSchema={schema}
      onSubmit={onSubmit}>
      {({handleChange, setFieldValue, values, handleSubmit}) => (
        <View style={{flexGrow: 1, justifyContent: 'space-between'}}>
          <View>
            <Title style={{marginLeft: 10, marginTop: 20}}>Add comment</Title>

            <CustomCheckbox
              label="Mark as important"
              checked={values.is_important}
              onChange={() =>
                setFieldValue('is_important', !values.is_important)
              }
            />

            {/* <RenderTextBox
              name="remarks"
              numberOfLines={8}
              label={'Add Comment'}
              containerStyles={styles.input}
              value={values.remarks}
              onChangeText={handleChange('remarks')}
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
        </View>
      )}
    </Formik>
  );
}

export default AddComments;

const styles = StyleSheet.create({
  input: {
    paddingVertical: 7,
    padding: 10,
  },
  actionContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
