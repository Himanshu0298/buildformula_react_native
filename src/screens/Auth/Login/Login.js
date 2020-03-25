import React, { Fragment, useState } from 'react';
import { StyleSheet, Text, StatusBar, Alert, View, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { withTheme } from 'react-native-paper';
import { theme } from '../../../styles/theme';
import logo from './../../../assets/images/logo.png';
import phoneIcon from './../../../assets/images/phone.png';
import passwordIcon from './../../../assets/images/password.png';
import Layout from '../../../util/Layout';
import { Formik } from 'formik';
import CustomInput from '../Components/CustomInput';
import * as Yup from 'yup';
import PhoneInput from '../Components/PhoneInput';
import useAuthActions from '../../../redux/actions/authActions';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const schema = Yup.object().shape({
  password: Yup.string().label('Password').required().min(6, 'Password must have at least 6 characters '),
});

function Login(props) {
  const [loginError, setLoginError] = useState(null);
  const { loginInit } = useAuthActions();

  const phoneRef = React.createRef();
  const passwordRef = React.createRef();
  const { loading } = useSelector(state => state.user);

  const userNotExistAlert = (error) => {
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
          { text: 'OK', onPress: () => props.navigation.navigate('SignUp') },
        ],
        { cancelable: false },
      )
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      <Spinner
        visible={loading}
        textContent={''}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
          </View>
          <View style={styles.headingContainer}>
            <Text style={styles.headline}>
              Welcome,
            </Text>
            <Text style={styles.caption}>Login to continue</Text>
          </View>
          {
            loginError &&
            <View style={styles.errorContainer}>
              <Text style={styles.errorStyles}>{loginError}</Text>
            </View>
          }
          <View style={styles.inputContainer}>
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={{
                phone: '+919687031045',
                password: '123456',
              }}
              validationSchema={schema}
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
              onSubmit={async (values) => {
                loginInit(values)
                  .then(() => props.navigation.navigate('Otp', { user: values, isLogin: true }))
                  .catch((error) => {
                    //Two possible codes : 400|| 203 (check login init function of authActions)
                    if (error.code === 400) {
                      userNotExistAlert(error.message);
                    }
                    else if (error.code === 203) {
                      setLoginError(error.message);
                    }
                  });
              }}
            >
              {({ handleChange, values, handleSubmit, handleBlur, isValid, errors }) => (
                <Fragment>
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
                    placeholder="Password"
                    autoCapitalize="none"
                    returnKeyType={'done'}
                    onSubmitEditing={handleSubmit}
                    image={passwordIcon}
                    error={errors.password}
                  />
                  <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={loading}
                    style={styles.buttonContainer}
                  >
                    <View style={styles.submitButton}>
                      <Text style={styles.buttonText}>Sign In</Text>
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
      </ScrollView>
    </KeyboardAvoidingView>
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
    flex: 1,
    paddingVertical: 20,
    backgroundColor: theme.colors.primary,
  },
  //Screen Header
  logoContainer: {
    paddingTop: 40,
    alignItems: 'center',
  },
  logo: {
    height: Layout.window.width * 0.44,
    width: Layout.window.width * 0.65,
  },
  //Screen Heading
  headingContainer: {
    paddingTop: 50,
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
  //Errors
  errorContainer: {
    marginLeft: 15,
    marginTop: 10,
  },
  errorStyles: {
    color: '#fff',
    textAlign:'center',
    fontSize: 18,
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
  buttonText: {
    ...commonStyles.text,
  },
  //footer
  footerContainer: {
    paddingTop: 40,
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

export default withTheme(Login);
