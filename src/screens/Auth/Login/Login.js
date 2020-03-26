import React, { useState } from 'react';
import { StyleSheet, StatusBar, View, ScrollView, Image, Alert, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
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
  const { loginInit } = useAuthActions();

  const emailRef = React.createRef();
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
              email: 'testing@vshwan.com',
              password: '123456',
            }}
            validationSchema={schema}
            validate={(values) => {
              // const errors = {};
              // if (!values.phone) {
              //   errors.phone = 'Phone number is not valid';
              // }
              // else if (!phoneRef.current.isValidNumber()) {
              //   errors.phone = 'Phone number is not valid';
              // }
              // return errors;
            }}
            onSubmit={async (values) => {
              // loginInit(values)
              //   .then(() => props.navigation.navigate('Otp', { user: values, isLogin: true }))
              //   .catch((error) => {
              //     //Two possible codes : 400|| 203 (check login init function of authActions)
              //     if (error.code === 400) {
              //       userNotExistAlert(error.message);
              //     }
              //     else if (error.code === 203) {
              //       setLoginError(error.message);
              //     }
              //   });
            }}
          >
            {({ handleChange, values, handleSubmit, handleBlur, isValid, errors }) => (
              <View style={styles.inputMainContainer}>
                <View style={styles.heading}>
                  <BaseText style={[styles.headingText, { color: theme.colors.primary }]}>
                    LOGIN
                </BaseText>
                  <BaseText style={styles.headingText}>
                    {' to your account'}
                  </BaseText>
                </View>
                <View style={styles.inputsContainer}>
                  <CustomInput
                    name="email"
                    ref={emailRef}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder="Enter your Email"
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
                    placeholder="Enter your Password"
                    autoCapitalize="none"
                    returnKeyType={'done'}
                    onSubmitEditing={handleSubmit}
                    icon={<MaterialIcons name="lock" color={theme.colors.primary} size={23} />}
                    error={errors.password}
                  />
                  <LoginButton
                    label="Login"
                    onPress={handleSubmit}
                  />
                  <TouchableOpacity>
                    <BaseText style={styles.forgotText}>Forgot Password?</BaseText>
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
    marginVertical: 10,
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
