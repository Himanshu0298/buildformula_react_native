import React, { useState } from 'react';
import { StyleSheet, StatusBar, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { withTheme } from 'react-native-paper';
import { theme } from '../../../styles/theme';
import banner from './../../../assets/images/banner.png';
import image from './../../../assets/images/layer_1.png';
import BaseText from '../../../components/BaseText';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Formik } from 'formik';
import CustomInput from '../Components/CustomInput';
import useAuthActions from '../../../redux/actions/authActions';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';
import { useTranslation } from 'react-i18next';

function LoginButton({ label, onPress }) {
  return (
    <TouchableOpacity
      style={styles.LoginButton}
      onPress={onPress}>
      <BaseText style={styles.buttonText}>
        {label}
      </BaseText>
    </TouchableOpacity>
  );
}

const schema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').label('email').required('Please enter a valid email'),
  password: Yup.string().label('Password').required().min(6, 'Password must have at least 6 characters '),
});

function Login(props) {

  const [loginError, setLoginError] = useState(null);
  const { login } = useAuthActions();
  const { t } = useTranslation();

  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const { loading } = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      <Spinner
        visible={loading}
        textContent={''}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
        <View style={styles.contentContainer}>
          <View style={styles.bannerContainer}>
            <Image source={banner} style={styles.banner} />
          </View>
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{
              email: 'tester@vshwan.com',
              password: 'Hpenvyx360',
            }}
            validationSchema={schema}
            onSubmit={async (values) => {
              let formData = new FormData();

              formData.append('email', values.email);
              formData.append('password', values.password);

              login(formData)
                .catch(() => {
                  setLoginError('Invalid email or password');
                });
            }}
          >
            {({ handleChange, values, handleSubmit, handleBlur, isValid, errors }) => (
              <View style={styles.inputMainContainer}>
                <View style={styles.heading}>
                  <BaseText style={[styles.headingText, { color: theme.colors.primary }]}>
                    {t('labelLogin')}
                  </BaseText>
                  <BaseText style={styles.headingText}>
                    {` ${t('accountText')}`}
                  </BaseText>
                </View>
                {loginError &&
                  <View>
                    <BaseText style={styles.loginError}>{loginError}</BaseText>
                  </View>
                }
                <View style={styles.inputsContainer}>
                  <CustomInput
                    name="email"
                    ref={emailRef}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder={t('msgBlankEmail')}
                    autoCapitalize="none"
                    returnKeyType={'next'}
                    onSubmitEditing={() => passwordRef && passwordRef.current.focus()}
                    icon={<FontistoIcon name="email" color={theme.colors.primary} size={23} />}
                    error={errors.email}
                  />
                  <CustomInput
                    name="password"
                    ref={passwordRef}
                    secureTextEntry
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholder={t('msgBlankPassword')}
                    autoCapitalize="none"
                    returnKeyType={'done'}
                    onSubmitEditing={handleSubmit}
                    icon={<MaterialIcons name="lock" color={theme.colors.primary} size={23} />}
                    error={errors.password}
                  />
                  <LoginButton
                    label={t('login')}
                    onPress={handleSubmit}
                  />
                  <TouchableOpacity>
                    <BaseText style={styles.forgotText}>{t('forgotPassword')}</BaseText>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
          <View style={styles.imageContainer}>
            <Image source={image} style={styles.image} />
          </View>
        </View>
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  contentContainer: {
    flex: 1,
    marginVertical: 40,
    marginHorizontal: 30,
    justifyContent: 'space-between',
    borderRadius: 50,
    backgroundColor: theme.colors.surface,
  },
  bannerContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  banner: {
    width: '75%',
    height: 100,
  },
  loginError: {
    color: 'red',
    textAlign: 'center',
  },
  inputMainContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
  },
  heading: {
    flexDirection: 'row',
  },
  headingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  forgotText: {
    color: theme.colors.primary,
    display: 'flex',
    alignItems: 'center',
    padding: 5,
  },
  imageContainer: {
    display: 'flex',
    marginBottom: -20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 190,
  },
});

export default withTheme(Login);
