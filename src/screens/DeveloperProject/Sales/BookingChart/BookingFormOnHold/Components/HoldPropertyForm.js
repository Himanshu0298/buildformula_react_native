import Radio from 'components/Atoms/Radio';
import RenderInput from 'components/Atoms/RenderInput';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import {Formik} from 'formik';
import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Keyboard, ScrollView, StyleSheet, View, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {withTheme, Text, Button} from 'react-native-paper';

import * as Yup from 'yup';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';

const schema = Yup.object().shape({
  date: Yup.string('Invalid').required('Required'),
  time: Yup.string('Invalid').required('Required'),
  remark: Yup.string('Invalid').required('Required'),
});

function RenderForm(props) {
  const {formikProps, navigation} = props;
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    setFieldValue,
  } = formikProps;

  const {t} = useTranslation();

  const dateRef = React.useRef();

  const remarkRef = React.useRef();

  return (
    <>
      <View style={styles.inputsContainer}>
        <RenderDatePicker
          name="date"
          label={t('label_date')}
          ref={dateRef}
          containerStyles={styles.input}
          value={values.date}
          onChange={v => setFieldValue('date', v)}
          error={errors.date}
        />

        <RenderDatePicker
          name="time"
          label="Time"
          ref={dateRef}
          containerStyles={styles.input}
          value={values.time}
          onChange={v => setFieldValue('time', v)}
          error={errors.time}
          mode="time"
        />

        <RenderTextBox
          name="remark"
          label={t('label_remark')}
          ref={remarkRef}
          containerStyles={styles.input}
          value={values.remark}
          onChangeText={handleChange('remark')}
          error={errors.remark}
          numberOfLines={4}
        />
      </View>
      <View style={styles.actionContainer}>
        <Button
          style={{width: '40%'}}
          contentStyle={{padding: 1}}
          theme={{roundness: 15}}
          onPress={navigation.goBack}>
          Cancel
        </Button>
        <Button
          style={{width: '40%'}}
          mode="contained"
          contentStyle={{padding: 1}}
          theme={{roundness: 15}}
          onPress={handleSubmit}>
          Save
        </Button>
      </View>
    </>
  );
}

function HoldPropertyForm(props) {
  const {navigation, route} = props;
  const {params = {}} = route;

  function handleClick(id) {
    if (id === 'withRate') {
      console.log('----->handleclick called', id);
    } else {
      console.log('----->else called', id);
    }
  }

  const onSubmit = async values => {
    console.log('----->form submitted');
    navigation.navigate('BookingFormOnHold');
  };

  return (
    <View style={{padding: 15}}>
      <Text>Hold this property</Text>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        validationSchema={schema}
        onSubmit={onSubmit}>
        {formikProps => <RenderForm {...props} {...{formikProps}} />}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    marginTop: 25,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexGrow: 1,
  },
  inputsContainer: {
    flexGrow: 3,
  },
});

export default withTheme(HoldPropertyForm);
