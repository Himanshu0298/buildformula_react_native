import RenderInput from 'components/Atoms/RenderInput';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Checkbox, Button, Title} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';

const schema = Yup.object().shape({
  remarks: Yup.string().required('Please enter a comment'),
});

const AddComments = props => {
  const {route} = props;
  const {visitorId} = route.params || {};

  const {addVisitorComment} = useSalesActions();

  const {selectedProject} = useSelector(state => state.project);

  const onSubmit = values => {
    addVisitorComment({
      ...values,
      visitor_id: visitorId,
      project_id: selectedProject.id,
    });
  };

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{is_important: false}}
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
        <View style={{flexGrow: 1, justifyContent: 'space-between'}}>
          <View>
            <Title style={{marginLeft: 10, marginTop: 20}}>Add comment</Title>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Checkbox
                status={values.is_important}
                onPress={() => {
                  setFieldValue('is_important', !values.is_important);
                }}
              />
              <Text>Mark as important</Text>
            </View>
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
});
