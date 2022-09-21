import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Keyboard} from 'react-native';
import {
  withTheme,
  Text,
  Headline,
  Subheading,
  Button,
  TextInput,
} from 'react-native-paper';
import {secondaryTheme, theme} from 'styles/theme';

import {Formik} from 'formik';
import useUserActions from 'redux/actions/userActions';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {KEYBOARD_HIDE, KEYBOARD_SHOW} from 'utils/constant';
import Spinner from 'react-native-loading-spinner-overlay';
import CustomInput from '../Components/CustomInput';
import AuthLayout from '../Components/AuthLayout';

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
  const {values, handleChange, handleBlur, errors, handleSubmit, navigation} =
    props;

  const [showPassword, setShowPassword] = useState(false);

  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const {t} = useTranslation();

  return (
    <View style={styles.contentContainer}>
      <View style={styles.headlineContainer}>
        <Headline theme={secondaryTheme} style={{fontWeight: 'bold'}}>
          {t('title_login_heading')}
        </Headline>
        <Subheading theme={secondaryTheme}>
          {t('title_login_subHeading')}
        </Subheading>
      </View>
      <View style={styles.inputMainContainer}>
        <View style={styles.inputsContainer}>
          <CustomInput
            name="email"
            label={t('label_email')}
            ref={emailRef}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            placeholder={t('msgBlankEmail')}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef?.current?.focus()}
            error={errors.email}
          />
          <CustomInput
            name="password"
            label={t('passwordLabel')}
            ref={passwordRef}
            containerStyles={{marginTop: 20}}
            secureTextEntry={!showPassword}
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            placeholder={t('msgBlankPassword')}
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
            error={errors.password}
            right={
              <TextInput.Icon
                theme={secondaryTheme}
                name={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(show => !show)}
              />
            }
          />
          <View style={styles.forgotContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text theme={secondaryTheme}>{t('forgotPassword')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <LoginButton label={t('log in')} onPress={handleSubmit} />
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={styles.registerContainer}>
          <Text theme={secondaryTheme}>{t('registerLink')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .label('email')
    .required('Please enter a valid email'),
  password: Yup.string()
    .label('Password')
    .required('Please enter a valid password')
    .min(6, 'Password must have at least 6 characters '),
});

function Login(props) {
  const {navigation} = props;
  const [loginError, setLoginError] = useState(null);

  const {login} = useUserActions();

  const bottomSheetRef = React.createRef();
  const snackbar = useSnackbar();

  const {loading} = useSelector(s => s.user);
  const {project} = useSelector(s => s.addProject);

  React.useEffect(() => {
    const focusUnsubscribe = navigation.addListener('focus', () => {
      Keyboard.addListener(KEYBOARD_SHOW, _keyboardDidShow);
    });
    const blurUnsubscribe = navigation.addListener('blur', () => {
      Keyboard.removeListener(KEYBOARD_HIDE, _keyboardDidShow);
    });

    // cleanup function
    return () => {
      blurUnsubscribe();
      focusUnsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _keyboardDidShow = () => {
    bottomSheetRef?.current?.snapTo?.(0);
  };

  useEffect(() => {
    if (loginError) {
      snackbar.showMessage({message: loginError, variant: 'error'});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginError]);

  const onSubmit = async values => {
    try {
      Keyboard.dismiss();
      setLoginError();

      const data = {email: values.email, password: values.password};

      const {value} = await login(data);
      const {otp_verified, email_verified} = value?.data?.user || {};

      if (otp_verified === 'N' || email_verified === 'N') {
        navigation.navigate('Otp', {fromLogin: true});
      }
      // else if (project.id) {
      //   navigation.navigate('ProjectStructureStepOne');
      // }
    } catch (error) {
      setLoginError(error);
    }
  };

  return (
    <>
      <Spinner visible={loading} textContent="" />
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        validationSchema={schema}
        onSubmit={onSubmit}>
        {({handleChange, values, handleSubmit, handleBlur, errors}) => (
          <AuthLayout
            bottomSheetRef={bottomSheetRef}
            renderContent={() => {
              return (
                <RenderContent
                  navigation={navigation}
                  values={values}
                  errors={errors}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  handleBlur={handleBlur}
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
  inputsContainer: {
    width: '100%',
  },
  forgotContainer: {
    padding: 2,
    alignItems: 'flex-end',
  },
  loginButton: {
    marginTop: 25,
    width: '100%',
    alignItems: 'center',
  },
  registerContainer: {
    marginTop: 20,
    padding: 3,
    width: '100%',
    alignItems: 'center',
  },
});

export default withTheme(Login);
