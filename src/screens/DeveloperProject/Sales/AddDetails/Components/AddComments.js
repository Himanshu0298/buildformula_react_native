import RenderInput from 'components/Atoms/RenderInput';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Checkbox, Button, Title} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import CustomCheckbox from 'components/Atoms/CustomCheckbox';

const schema = Yup.object().shape({
  remarks: Yup.string().required('Please enter a comment'),
});

const AddComments = props => {
  const {navigation, route} = props;
  const {visitorId} = route.params || {};

  const {addVisitorComment, getVisitorActivities} = useSalesActions();

  const {selectedProject} = useSelector(state => state.project);

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

            <RenderInput
              name="remarks"
              multiline
              numberOfLines={8}
              label={'Add Comment'}
              containerStyles={styles.input}
              value={values.remarks}
              onChangeText={handleChange('remarks')}
              returnKeyType="done"
            />
          </View>
          <View style={styles.actionContainer}>
            <Button
              style={{flex: 1, marginHorizontal: 5}}
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
};

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
