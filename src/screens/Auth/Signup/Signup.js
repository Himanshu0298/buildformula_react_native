import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { withTheme, Headline, Subheading, Button } from 'react-native-paper';
import { theme } from '../../../styles/theme';
import banner from './../../../assets/images/banner.png';
import image from './../../../assets/images/buildings.png';
import BaseText from '../../../components/BaseText';
import { Formik } from 'formik';
import CustomInput from '../Components/CustomInput';
import useAuthActions from '../../../redux/actions/authActions';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';
import { useTranslation } from 'react-i18next';
import Layout from '../../../utils/Layout';
import { TextInput } from 'react-native-paper';

function LoginButton({ label, onPress }) {
  return (
    <Button
      style={{ width: '90%' }}
      color={theme.colors.accent}
      mode="contained"
      contentStyle={{ padding: 8 }}
      theme={{ roundness: 15 }}
      onPress={onPress}>
      <BaseText style={styles.buttonText}>
        {label}
      </BaseText>
    </Button >
  );
}

const schema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').label('email').required('Please enter a valid email'),
  password: Yup.string().label('Password').required('Please enter a valid password').min(6, 'Password must have at least 6 characters '),
});

function SignUp(props) {

  const [loginError, setLoginError] = useState(null);
  const [showCnfPass, toggleShowCnfPass] = useState(null);
  const [showPass, toggleShowPass] = useState(null);
  const { loginInit } = useAuthActions();
  const { t } = useTranslation();

  const lastRef = React.createRef();
  const phoneRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const cnfPassRef = React.createRef();

  const { loading } = useSelector(state => state.user);

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      validationSchema={schema}
      onSubmit={async (values) => {
        let formData = new FormData();

        formData.append('email', values.email);
        formData.append('password', values.password);

        loginInit(formData)
          .then((data) => {
            console.log('----->data ', data.action.payload);
            props.navigation.navigate('Otp');
          })
          .catch((error) => {
            console.log('----->login error ', error.response);
            setLoginError('Invalid email or password');
          });
      }}
    >
      {({ handleChange, values, handleSubmit, handleBlur, isValid, errors }) => (
        <View style={styles.container}>
          <Spinner
            visible={loading}
            textContent={''}
          />
          <>
            <View style={styles.bannerContainer}>
              <Image source={banner} style={styles.banner} />
            </View>
            <View style={styles.imageContainer}>
              <Image source={image} style={styles.image} />
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.headlineContainer}>
                <Headline style={{ fontWeight: 'bold' }}>{t('heading')}</Headline>
                <Subheading>{t('subHeading')}</Subheading>
              </View>
              <View style={styles.inputMainContainer}>
                <KeyboardAwareScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  keyboardDismissMode="on-drag"
                >
                  <View style={styles.inputsContainer}>
                    <CustomInput
                      name="firstName"
                      label={t('firstNameLabel')}
                      containerStyles={styles.inputStyles}
                      value={values.firstName}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      placeholder={t('firstNameLabel')}
                      autoCapitalize="none"
                      returnKeyType={'next'}
                      onSubmitEditing={() => lastRef && lastRef.current.focus()}
                      error={errors.firstName}
                    />
                    <CustomInput
                      name="lastName"
                      label={t('lastNameLabel')}
                      containerStyles={styles.inputStyles}
                      ref={lastRef}
                      value={values.lastName}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      placeholder={t('lastNameLabel')}
                      autoCapitalize="none"
                      returnKeyType={'next'}
                      onSubmitEditing={() => phoneRef && phoneRef.current.focus()}
                      error={errors.lastName}
                    />
                    <CustomInput
                      name="phone"
                      label={t('phoneLabel')}
                      containerStyles={styles.inputStyles}
                      ref={phoneRef}
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      placeholder={t('phoneLabel')}
                      autoCapitalize="none"
                      returnKeyType={'next'}
                      onSubmitEditing={() => emailRef && emailRef.current.focus()}
                      error={errors.phone}
                    />
                    <CustomInput
                      name="email"
                      label={t('emailLabel')}
                      containerStyles={styles.inputStyles}
                      ref={emailRef}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      placeholder={t('msgBlankEmail')}
                      autoCapitalize="none"
                      returnKeyType={'done'}
                      onSubmitEditing={() => passwordRef && passwordRef.current.focus()}
                      error={errors.email}
                    />
                    <CustomInput
                      name="password"
                      label={t('passwordLabel')}
                      containerStyles={styles.inputStyles}
                      ref={passwordRef}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      placeholder={t('msgBlankPassword')}
                      autoCapitalize="none"
                      returnKeyType={'next'}
                      secureTextEntry={!showPass}
                      onSubmitEditing={() => cnfPassRef && cnfPassRef.current.focus()}
                      error={errors.password}
                      right={
                        <TextInput.Icon
                          name={showPass ? 'eye-off' : 'eye'}
                          onPress={() => toggleShowPass(value => !value)}
                        />
                      }
                    />
                    <CustomInput
                      name="confirmPassword"
                      label={t('cnfPasswordLabel')}
                      containerStyles={styles.inputStyles}
                      ref={cnfPassRef}
                      value={values.confirmPassword}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      placeholder={t('msgBlankCnfPassword')}
                      autoCapitalize="none"
                      returnKeyType={'done'}
                      error={errors.confirmPassword}
                      secureTextEntry={!showCnfPass}
                      right={
                        <TextInput.Icon
                          name={showCnfPass ? 'eye-off' : 'eye'}
                          onPress={() => toggleShowCnfPass(value => !value)}
                        />
                      }
                    />
                    <LoginButton
                      label={t('signUp')}
                      onPress={handleSubmit} />
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.registerContainer}>
                      <BaseText>{t('loginLink')}</BaseText>
                    </TouchableOpacity>
                  </View>
                </KeyboardAwareScrollView>
              </View>
            </View>
          </>
        </View >
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  bannerContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  banner: {
    width: Layout.window.width * 0.75,
    height: (Layout.window.width * 0.75) * (5 / 12),
  },
  imageContainer: {
    display: 'flex',
    marginBottom: -30,
    right: 10,
    alignItems: 'center',
  },
  image: {
    width: Layout.window.width * 0.75,
    height: (Layout.window.width * 0.75) * (15 / 22),
  },
  contentContainer: {
    display: 'flex',
    backgroundColor: theme.colors.primary,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  headlineContainer: {
    display: 'flex',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginError: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputMainContainer: {
    width: '100%',
    display: 'flex',
    paddingBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputsContainer: {
    alignItems: 'center',
    display: 'flex',
    width: '90%',
  },
  inputStyles: {
    marginVertical: 20,
  },
  LoginButton: {
    width: '70%',
    padding: 10,
    elevation: 5,
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerContainer: {
    display: 'flex',
    padding: 3,
    width: '100%',
    alignItems: 'center',
  },
});

export default withTheme(SignUp);
