import RenderTextBox from 'components/Atoms/RenderTextbox';
import {Formik} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {withTheme} from 'react-native-paper';

import * as Yup from 'yup';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import CustomDialog from 'components/Atoms/CustomDialog';

const schema = Yup.object().shape({
  date: Yup.string('Invalid').required('Required'),
  time: Yup.string('Invalid').required('Required'),
  remark: Yup.string('Invalid').required('Required'),
});

function RenderForm(props) {
  const {formikProps} = props;
  const {handleChange, values, errors, setFieldValue} = formikProps;

  const {t} = useTranslation();

  const dateRef = React.useRef();
  const remarkRef = React.useRef();

  return (
    <View style={styles.inputsContainer}>
      <RenderDatePicker
        name="date"
        label={t('label_date')}
        ref={dateRef}
        style={styles.input}
        value={values.date}
        onChange={v => setFieldValue('date', v)}
        min={new Date()}
        error={errors.date}
      />

      <RenderDatePicker
        name="time"
        label="Time"
        ref={dateRef}
        style={styles.input}
        value={values.time}
        onChange={v => setFieldValue('time', v)}
        error={errors.time}
        mode="time"
      />

      <RenderTextBox
        name="remark"
        label={t('label_remark')}
        ref={remarkRef}
        style={styles.input}
        value={values.remark}
        onChangeText={handleChange('remark')}
        error={errors.remark}
        numberOfLines={5}
      />
    </View>
  );
}

function BookingHoldForm(props) {
  const {handleSubmit} = props;

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      validationSchema={schema}
      onSubmit={handleSubmit}>
      {formikProps => (
        <CustomDialog
          {...props}
          title="Hold this Property"
          submitForm={formikProps.handleSubmit}>
          <RenderForm {...props} {...{formikProps}} />
        </CustomDialog>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  inputsContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  input: {
    marginVertical: 5,
  },
});

export default withTheme(BookingHoldForm);
