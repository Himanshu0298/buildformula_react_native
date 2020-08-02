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

function LoginButton({ label, onPress }) {
  return (
    <View style={styles.loginButton}>
      <Button
        color={theme.colors.accent}
        style={{ width: '100%' }}
        mode="contained"
        contentStyle={{ padding: 8 }}
        theme={{ roundness: 15 }}
        onPress={onPress}>
        <BaseText style={styles.buttonText}>
          {label}
        </BaseText>
      </Button >
    </View>

  );
}

const schema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').label('email').required('Please enter a valid email'),
  password: Yup.string().label('Password').required('Please enter a valid password').min(6, 'Password must have at least 6 characters '),
});

function Login(props) {
  const { navigation } = props;
  const [loginError, setLoginError] = useState(null);
  const { login } = useAuthActions();

  const { t } = useTranslation();

  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const { loading } = useSelector(state => state.user);

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{
        email: 'testuser1@gmail.com',
        password: '123456',
      }}
      validationSchema={schema}
      onSubmit={async (values) => {
        let formData = new FormData();

        formData.append('email', values.email);
        formData.append('password', values.password);

        login(formData)
          .then((data) => {
            console.log('-----> data', data.value)
            const { otp_verified, email_verified, email } = data.value.user;

            if (otp_verified === 'N' || email_verified === 'N') {
              navigation.navigate('Otp');
            }
            else {
              navigation.navigate('PackageSelect');
            }

          })
          .catch((error) => {
            setLoginError(error);
          });
      }}
    >
      {({ handleChange, values, handleSubmit, handleBlur, isValid, errors }) => (

        <View style={styles.container}>
          <Spinner
            visible={loading}
            textContent={''}
          />
          <View style={styles.topImageContainer}>
            <View style={styles.bannerContainer}>
              <Image source={banner} style={styles.banner} />
            </View>
            <View style={styles.imageContainer}>
              <Image source={image} style={styles.image} />
            </View>
          </View>
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
                  secureTextEntry={true}
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
                label={t('log in')}
                onPress={handleSubmit}
              />
              <TouchableOpacity
                onPress={() => props.navigation.navigate('SignUp')}
                style={styles.registerContainer}>
                <BaseText>{t('registerLink')}</BaseText>
              </TouchableOpacity>
            </View>
          </View>
        </View >
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  topImageContainer: {
    height: '40%',
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
    backgroundColor: theme.colors.primary,
    display: 'flex',
    height: '60%',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  headlineContainer: {
    height: '20%',
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
    height: '75%',
    paddingBottom: 10,
    paddingHorizontal: 25,
  },
  inputsContainer: {
    width: '100%',
  },
  loginButton: {
    marginTop: 40,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  forgotContainer: {
    display: 'flex',
    width: '100%',
    padding: 2,
    alignItems: 'flex-end',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerContainer: {
    display: 'flex',
    marginTop: 20,
    padding: 3,
    width: '100%',
    alignItems: 'center',
  },
});

export default withTheme(Login);
