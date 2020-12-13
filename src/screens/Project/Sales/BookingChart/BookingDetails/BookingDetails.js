import BaseText from 'components/BaseText';
import Radio from 'components/Radio';
import RenderInput from 'components/RenderInput';
import {Formik} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Subheading,
  TextInput,
  withTheme,
  Text,
  Button,
} from 'react-native-paper';
import {secondaryTheme, theme} from 'styles/theme';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  first_name: Yup.string('Invalid').required('Required'),
  last_name: Yup.string('Invalid').required('Required'),
  email: Yup.string('Invalid').email('Invalid').required('Required'),
  phone: Yup.number('Invalid').required('Required'),
  broker_first_name: Yup.string('Invalid').when('broker', {
    is: 'yes',
    then: Yup.string('Invalid').required('Required'),
  }),
  broker_last_name: Yup.string('Invalid').when('broker', {
    is: 'yes',
    then: Yup.string('Invalid').required('Required'),
  }),
  broker_email: Yup.string('Invalid').when('broker', {
    is: 'yes',
    then: Yup.string('Invalid').email('Invalid').required('Required'),
  }),
  broker_phone: Yup.number('Invalid').when('broker', {
    is: 'yes',
    then: Yup.number('Invalid').required('Required'),
  }),
});

function FormContent(props) {
  const {formikProps, navigation} = props;
  const {t} = useTranslation();

  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    errors,
    handleSubmit,
  } = formikProps;

  const firstNameRef = React.useRef();
  const lastNameRef = React.useRef();
  const emailRef = React.useRef();
  const phoneRef = React.useRef();
  const brokerFirstNameRef = React.useRef();
  const brokerLastNameRef = React.useRef();
  const brokerEmailRef = React.useRef();
  const brokerPhoneRef = React.useRef();

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback
      style={{flexGrow: 1}}
      onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={30}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, paddingVertical: 10}}>
        <View style={styles.container}>
          <Subheading style={{color: theme.colors.primary}}>
            1. Booking Details
          </Subheading>
          <RenderInput
            name="first_name"
            label={t('label_first_name')}
            ref={firstNameRef}
            containerStyles={styles.input}
            value={values.first_name}
            onChangeText={handleChange('first_name')}
            onBlur={handleBlur('first_name')}
            placeholder={t('label_first_name')}
            onSubmitEditing={() => lastNameRef && lastNameRef.current.focus()}
            error={errors.first_name}
          />
          <RenderInput
            name="last_name"
            label={t('label_last_name')}
            ref={lastNameRef}
            containerStyles={styles.input}
            value={values.last_name}
            onChangeText={handleChange('last_name')}
            onBlur={handleBlur('last_name')}
            placeholder={t('label_last_name')}
            onSubmitEditing={() => emailRef && emailRef.current.focus()}
            error={errors.last_name}
          />
          <RenderInput
            name="email"
            label={t('label_email')}
            ref={emailRef}
            containerStyles={styles.input}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            placeholder={t('label_email')}
            onSubmitEditing={() => phoneRef && phoneRef.current.focus()}
            error={errors.email}
          />
          <RenderInput
            name="phone"
            label={t('label_phone')}
            ref={phoneRef}
            keyboardType="number-pad"
            maxLength={10}
            containerStyles={styles.input}
            value={values.phone}
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            placeholder={t('label_phone')}
            error={errors.phone}
            left={
              <TextInput.Affix
                text="+91"
                theme={{
                  colors: {
                    text: '#000',
                  },
                }}
              />
            }
          />
          <View style={styles.brokerContainer}>
            <Text theme={secondaryTheme}>Through broker?</Text>
            <View style={styles.radioContainer}>
              <Radio
                label={'Yes'}
                value="yes"
                checked={values.broker === 'yes'}
                onChange={(value) => setFieldValue('broker', value)}
              />
              <Radio
                label={'No'}
                value="no"
                checked={values.broker === 'no'}
                onChange={(value) => setFieldValue('broker', value)}
              />
            </View>
          </View>
          {values.broker === 'yes' ? (
            <>
              <Subheading style={{color: theme.colors.primary}}>
                Broker Details
              </Subheading>
              <RenderInput
                name="broker_first_name"
                label={t('label_first_name')}
                ref={brokerFirstNameRef}
                containerStyles={styles.input}
                value={values.broker_first_name}
                onChangeText={handleChange('broker_first_name')}
                onBlur={handleBlur('broker_first_name')}
                placeholder={t('label_first_name')}
                error={errors.broker_first_name}
                onSubmitEditing={() =>
                  brokerLastNameRef && brokerLastNameRef.current.focus()
                }
              />
              <RenderInput
                name="broker_last_name"
                label={t('label_last_name')}
                ref={brokerLastNameRef}
                containerStyles={styles.input}
                value={values.broker_last_name}
                onChangeText={handleChange('broker_last_name')}
                onBlur={handleBlur('broker_last_name')}
                placeholder={t('label_last_name')}
                onSubmitEditing={() =>
                  brokerEmailRef && brokerEmailRef.current.focus()
                }
                error={errors.broker_last_name}
              />
              <RenderInput
                name="broker_email"
                label={t('label_email')}
                ref={brokerEmailRef}
                containerStyles={styles.input}
                value={values.broker_email}
                onChangeText={handleChange('broker_email')}
                onBlur={handleBlur('broker_email')}
                placeholder={t('label_email')}
                onSubmitEditing={() =>
                  brokerPhoneRef && brokerPhoneRef.current.focus()
                }
                error={errors.broker_email}
              />
              <RenderInput
                name="broker_phone"
                label={t('label_phone')}
                ref={brokerPhoneRef}
                keyboardType="number-pad"
                maxLength={10}
                containerStyles={styles.input}
                value={values.broker_phone}
                onChangeText={handleChange('broker_phone')}
                onBlur={handleBlur('broker_phone')}
                placeholder={t('label_phone')}
                error={errors.broker_phone}
                left={
                  <TextInput.Affix
                    text="+91"
                    theme={{
                      colors: {
                        text: '#000',
                      },
                    }}
                  />
                }
              />
              <RenderInput
                name="remark"
                multiline
                blurOnSubmit={false}
                numberOfLines={Platform.OS === 'ios' ? null : 5}
                minHeight={Platform.OS === 'ios' && 4 ? 20 * 6 : null}
                label={t('label_remark')}
                containerStyles={styles.input}
                value={values.remark}
                onChangeText={handleChange('remark')}
                onBlur={handleBlur('remark')}
                onSubmitEditing={handleSubmit}
                placeholder={t('label_remark')}
                error={errors.remark}
              />
            </>
          ) : null}
        </View>
        <View style={styles.actionContainer}>
          <Button
            style={styles.button}
            contentStyle={{padding: 5}}
            theme={{roundness: 15}}
            onPress={handleCancel}>
            <BaseText style={styles.cancelText}>{'Back'}</BaseText>
          </Button>
          <Button
            style={{flex: 1}}
            mode="contained"
            contentStyle={{padding: 5}}
            theme={{roundness: 15}}
            onPress={handleSubmit}>
            <BaseText style={styles.buttonText}>{'Next'}</BaseText>
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

function BookingDetails(props) {
  const {navigation} = props;
  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{broker: 'no'}}
      validationSchema={schema}
      onSubmit={async (values) => {
        navigation.navigate('BC_Step_Five');
      }}>
      {(formikProps) => <FormContent {...props} formikProps={formikProps} />}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    marginTop: 5,
  },
  brokerContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    display: 'flex',
  },
  actionContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
  cancelText: {
    fontSize: 18,
    color: theme.colors.primary,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default withTheme(BookingDetails);
