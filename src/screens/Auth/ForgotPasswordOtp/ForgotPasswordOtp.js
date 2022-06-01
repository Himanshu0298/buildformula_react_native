import React from 'react';
import {StyleSheet, View, Keyboard} from 'react-native';
import {withTheme, Headline, Subheading, Button} from 'react-native-paper';
import {secondaryTheme, theme} from 'styles/theme';
import {Formik} from 'formik';
import useUserActions from 'redux/actions/userActions';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import OtpInput from 'components/Atoms/OtpInput';
import {RenderError} from 'components/Atoms/RenderInput';
import Spinner from 'react-native-loading-spinner-overlay';
import AuthLayout from '../Components/AuthLayout';

const schema = Yup.object().shape({
  otp: Yup.number().min(100000).required('Please enter a valid otp'),
});

function LoginButton({label, onPress}) {
  return (
    <View style={styles.loginButton}>
      <Button
        color={theme.colors.accent}
        style={{width: '100%'}}
        mode="contained"
        contentStyle={{padding: 8}}
        theme={{roundness: 15}}
        onPress={onPress}>
        {label}
      </Button>
    </View>
  );
}

function RenderContent(props) {
  const {values, errors, bottomSheetRef, setFieldValue, handleSubmit} = props;

  const {t} = useTranslation();

  return (
    <View style={styles.contentContainer}>
      <View style={styles.headlineContainer}>
        <Headline theme={secondaryTheme} style={{fontWeight: 'bold'}}>
          {t('title_forgot_password_heading')}
        </Headline>
        <Subheading theme={secondaryTheme} style={{marginTop: 20}}>
          Enter the OTP sent to your email id
        </Subheading>
      </View>
      <View style={styles.inputMainContainer}>
        <View style={styles.otpInput}>
          <OtpInput
            value={values.otp}
            setValue={v => setFieldValue('otp', v)}
            onFocus={() => bottomSheetRef?.current?.snapTo(0)}
          />
        </View>
        {errors.otp ? <RenderError error={errors.otp} /> : null}
        <LoginButton label="Next" onPress={handleSubmit} />
      </View>
    </View>
  );
}

function ForgotPasswordOtp(props) {
  const {navigation, route} = props;
  const {user_id} = route?.params || {};

  const bottomSheetRef = React.createRef();
  const {verifyForgotPasswordOtp} = useUserActions();

  const {loading} = useSelector(s => s.user);

  return (
    <>
      <Spinner visible={loading} textContent="" />

      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        validationSchema={schema}
        onSubmit={async (values, {resetForm}) => {
          Keyboard.dismiss();
          verifyForgotPasswordOtp({...values, user_id})
            .then(() => navigation.navigate('ResetPassword', {user_id}))
            .catch(() => resetForm());
        }}>
        {formikProps => (
          <AuthLayout
            bottomSheetRef={bottomSheetRef}
            renderContent={() => {
              return (
                <RenderContent
                  navigation={navigation}
                  bottomSheetRef={bottomSheetRef}
                  {...formikProps}
                />
              );
            }}
          />
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: theme.colors.primary,
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headlineContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputMainContainer: {
    width: '100%',
    height: '80%',
    paddingBottom: 10,
    paddingHorizontal: 25,
  },
  otpInput: {
    marginBottom: 10,
  },
  loginButton: {
    marginTop: 25,
    width: '100%',

    alignItems: 'center',
  },
});

export default withTheme(ForgotPasswordOtp);
