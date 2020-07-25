import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { withTheme, Headline, Subheading, Button, TextInput } from 'react-native-paper';
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
import useOtpActions from '../../../redux/actions/otpActions';

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

function Login(props) {

  const [loginError, setLoginError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { loginInit } = useAuthActions();
  const { sentOtp } = useOtpActions();

  const { t } = useTranslation();

  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const { loading } = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <Spinner
        visible={loading}
        textContent={''}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
        <View style={styles.bannerContainer}>
          <Image source={banner} style={styles.banner} />
        </View>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{
            email: 'nilesh@newtest.com',
            password: '123456',
          }}
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
                const { otp_verified, email, phone } = error.response.data.data;
                if (email) {
                  sentOtp(phone);
                  props.navigation.navigate('Otp');
                }
                else {
                  setLoginError('Invalid email or password');
                }
              });
          }}
        >
          {({ handleChange, values, handleSubmit, handleBlur, isValid, errors }) => (
            <View style={styles.contentContainer}>
              <View style={styles.headlineContainer}>
                <Headline style={{ fontWeight: 'bold' }}>{t('heading')}</Headline>
                <Subheading>{t('subHeading')}</Subheading>
              </View>
              <View style={styles.inputMainContainer}>
                {loginError &&
                  <View>
                    <BaseText style={styles.loginError}>{loginError}</BaseText>
                  </View>
                }
                <View style={styles.inputsContainer}>
                  <CustomInput
                    name="email"
                    label={t('emailLabel')}
                    ref={emailRef}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder={t('msgBlankEmail')}
                    autoCapitalize="none"
                    returnKeyType={'next'}
                    onSubmitEditing={() => passwordRef && passwordRef.current.focus()}
                    error={errors.email}
                  />
                  <CustomInput
                    name="password"
                    label={t('passwordLabel')}
                    ref={passwordRef}
                    containerStyles={{ marginTop: 20 }}
                    secureTextEntry={showPassword}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholder={t('msgBlankPassword')}
                    autoCapitalize="none"
                    returnKeyType={'done'}
                    onSubmitEditing={handleSubmit}
                    error={errors.password}
                  // right={
                  //   <TextInput.Icon
                  //     name={showPassword ? 'eye-off' : 'eye'}
                  //     onPress={() => setShowPassword(show => !show)}
                  //   />
                  // }
                  />
                  <TouchableOpacity style={styles.forgotContainer}>
                    <BaseText>{t('forgotPassword')}</BaseText>
                  </TouchableOpacity>
                </View>
                <LoginButton
                  label={t('login')}
                  onPress={handleSubmit} />
                <TouchableOpacity style={styles.registerContainer}>
                  <BaseText>{t('registerLink')}</BaseText>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View >
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
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  headlineContainer: {
    flex: 0.2,
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
    flex: 0.8,
    paddingBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputsContainer: {
    alignItems: 'center',
    width: '90%',
  },
  forgotContainer: {
    display: 'flex',
    width: '100%',
    padding: 2,
    alignItems: 'flex-end',
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

export default withTheme(Login);
