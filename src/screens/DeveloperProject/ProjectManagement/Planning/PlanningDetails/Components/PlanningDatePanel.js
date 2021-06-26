import CustomDialog from 'components/Atoms/CustomDialog';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text, withTheme} from 'react-native-paper';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  start_date: Yup.string().required('Start date required'),
  end_date: Yup.string().required('End date required'),
});

function AddDatesDialog(props) {
  const {handleSubmit} = props;

  const onSubmit = () => {
    handleSubmit();
  };

  return (
    <Formik
      initialValues={{}}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={schema}
      onSubmit={onSubmit}>
      {({values, errors, setFieldValue, handleSubmit: submitForm}) => (
        <CustomDialog {...props} title="Planning Date" submitForm={submitForm}>
          <View style={styles.contentContainer}>
            <RenderDatePicker
              name="start_date"
              label={'Start Date'}
              containerStyles={styles.input}
              value={values.start_date}
              onChange={v => setFieldValue('start_date', v)}
              error={errors.start_date}
            />
            <RenderDatePicker
              name="end_date"
              label={'End Date'}
              containerStyles={styles.input}
              value={values.end_date}
              onChange={v => setFieldValue('end_date', v)}
              error={errors.end_date}
            />
            <RenderDatePicker
              name="duration"
              label={'Duration'}
              containerStyles={styles.input}
              value={values.duration}
              onChange={v => setFieldValue('duration', v)}
              error={errors.duration}
            />
          </View>
        </CustomDialog>
      )}
    </Formik>
  );
}

function PlanningDatePanel(props) {
  const [dialog, setDialog] = useState(false);

  const toggleDialog = () => setDialog(v => !v);

  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      {dialog ? (
        <AddDatesDialog
          {...props}
          open={dialog}
          handleClose={toggleDialog}
          handleSubmit={handleSubmit}
        />
      ) : null}
      <Text>Planning date</Text>
      <IconButton
        size={20}
        style={styles.plusButton}
        icon="plus"
        onPress={toggleDialog}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F4F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  plusButton: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 10,
    flexGrow: 1,
  },
  input: {
    marginVertical: 10,
  },
});

export default withTheme(PlanningDatePanel);
