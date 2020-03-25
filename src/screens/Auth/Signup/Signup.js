import React, { Fragment } from 'react';
import {
  StyleSheet, Text, View, StatusBar, Image, KeyboardAvoidingView, ScrollView, Alert,
  TouchableOpacity,
} from 'react-native';
import { withTheme } from 'react-native-paper';
import { theme } from '../../../styles/theme';
import logo from './../../../assets/images/logo.png';
import nameIcon from './../../../assets/images/name.png';
import emailIcon from './../../../assets/images/email.png';
import phoneIcon from './../../../assets/images/phone.png';
import passwordIcon from './../../../assets/images/password.png';
import Layout from '../../../util/Layout';
import { Formik } from 'formik';
import CustomInput from '../Components/CustomInput';
import * as Yup from 'yup';
import useAuthActions from '../../../redux/actions/authActions';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';
import PhoneInput from '../Components/PhoneInput';

const schema = Yup.object().shape({
  name: Yup.string().label('Name').required('Name is required'),
  email: Yup.string().label('Email').email('Enter a valid email').required('Please enter a registered email'),
  password: Yup.string().label('Password').required().min(6, 'Password must have at least 6 characters '),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Confirm Password is required'),
});

function Signup(props) {

  const { loading } = useSelector(state => state.user);
  const { signUpInit } = useAuthActions();

  const emailRef = React.createRef();
  const phoneRef = React.createRef();
  const passwordRef = React.createRef();
  const currentPasswordRef = React.createRef();

  const userExistAlert = (error) => {
    return (
      Alert.alert(
        'Alert',
        error,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => props.navigation.navigate('Login') },
        ],
        { cancelable: false },
      )
    );
  };

  return (
    <KeyboardAvoidingView behavior="height" styles={styles.container} enabled>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      <Spinner
        visible={loading}
        textContent={''}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        styles={styles.container}
      >
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
          </View>
          <View style={styles.headingContainer}>
            <Text style={styles.headline}>
              Welcome,
          </Text>
            <Text style={styles.caption}>Sign Up to continue</Text>
          </View>
          <View style={styles.inputContainer}>
            <Formik
              initialValues={{
                name: 'Ravi',
                email: 'ravi@gmail.com',
                phone: '+919687031045',
                password: '123456',
                confirmPassword: '123456',
              }}
              validate={(values) => {
                const errors = {};
                if (!values.phone) {
                  errors.phone = 'Phone number is not valid';
                }
                else if (!phoneRef.current.isValidNumber()) {
                  errors.phone = 'Phone number is not valid';
                }
                return errors;
              }}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={schema}
              onSubmit={values => {
                delete values.confirmPassword;
                signUpInit(values)
                  .then(() => props.navigation.navigate('Otp', { user: values, isLogin: false }))
                  .catch((error) => userExistAlert(error));
              }}
            >
              {({ handleChange, values, handleSubmit, handleBlur, isValid, errors }) => (
                <Fragment>
                  <CustomInput
                    name="name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    placeholder="Name"
                    autoCapitalize="none"
                    onBlur={handleBlur('name')}
                    onSubmitEditing={() => emailRef && emailRef.current.focus()}
                    image={nameIcon}
                    error={errors.name}
                  />
                  <CustomInput
                    name="email"
                    ref={emailRef}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="Email"
                    autoCapitalize="none"
                    onBlur={handleBlur('email')}
                    onSubmitEditing={() => phoneRef && phoneRef.current.focus()}
                    image={emailIcon}
                    error={errors.email}
                  />
                  <PhoneInput
                    name="phone"
                    ref={phoneRef}
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    onSubmitEditing={() => passwordRef && passwordRef.current.focus()}
                    placeholder="Mobile"
                    image={phoneIcon}
                    error={errors.phone}
                  />
                  <CustomInput
                    name="password"
                    ref={passwordRef}
                    secureTextEntry
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    onSubmitEditing={() => currentPasswordRef && currentPasswordRef.current.focus()}
                    placeholder="Password"
                    autoCapitalize="none"
                    image={passwordIcon}
                    error={errors.password}
                  />
                  <CustomInput
                    name="confirmPassword"
                    ref={currentPasswordRef}
                    secureTextEntry
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    onSubmitEditing={handleSubmit}
                    placeholder="Confirm Password"
                    autoCapitalize="none"
                    image={passwordIcon}
                    returnKeyType={'done'}
                    error={errors.confirmPassword}
                  />
                  <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={loading}
                    style={styles.buttonContainer}
                  >
                    <View style={styles.submitButton}>
                      <Text style={styles.signUpText}>Sign Up</Text>
                    </View>
                  </TouchableOpacity>
                </Fragment>
              )}
            </Formik>
            <View style={styles.footerContainer}>
              <Text style={styles.smallCaption}>By signing up you have agreed to our</Text>
              <Text style={styles.termsText}>Terms of Use & Privacy Policy</Text>
            </View>
          </View>
        </View>
      </ScrollView >
    </KeyboardAvoidingView >
  );
}

const commonStyles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: '#fff',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  contentContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: theme.colors.primary,
  },
  //Screen Header
  logoContainer: {
    paddingTop: 20,
    alignItems: 'center',
  },
  logo: {
    height: Layout.window.width * 0.44,
    width: Layout.window.width * 0.65,
  },
  //Screen Heading
  headingContainer: {
    paddingTop: 30,
  },
  headline: {
    ...commonStyles.text,
    fontSize: 25,
    fontWeight: 'bold',
  },
  caption: {
    ...commonStyles.text,
    fontSize: 12,
  },
  //User Inputs Container
  inputContainer: {
    paddingTop: 20,
  },
  //SignUp Button
  buttonContainer: {
    paddingTop: 20,
  },
  submitButton: {
    ...commonStyles.center,
    borderRadius: 5,
    height: 45,
    backgroundColor: '#000',
  },
  signUpText: {
    ...commonStyles.text,
  },
  //footer
  footerContainer: {
    paddingTop: 30,
    ...commonStyles.center,
  },
  smallCaption: {
    ...commonStyles.text,
    fontSize: 12,
  },
  termsText: {
    ...commonStyles.text,
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default withTheme(Signup);
