/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {
  withTheme,
  Headline,
  Subheading,
  Button,
  TextInput,
} from 'react-native-paper';
import {theme} from '../../../styles/theme';
import banner from './../../../assets/images/banner.png';
import image from './../../../assets/images/buildings.png';
import BaseText from '../../../components/BaseText';
import {Formik} from 'formik';
import CustomInput from '../Components/CustomInput';
import useUserActions from '../../../redux/actions/userActions';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';
import {useTranslation} from 'react-i18next';
import Layout from '../../../utils/Layout';
import BottomSheet from 'reanimated-bottom-sheet';

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
        <BaseText style={styles.buttonText}>{label}</BaseText>
      </Button>
    </View>
  );
}

function RenderContent(props) {
  const {
    loginError,
    values,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    navigation,
  } = props;

  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const {t} = useTranslation();

  return (
    <View style={styles.contentContainer}>
      <View style={styles.headlineContainer}>
        <Headline style={{fontWeight: 'bold'}}>{t('heading')}</Headline>
        <Subheading>{t('subHeading')}</Subheading>
      </View>
      <View style={styles.inputMainContainer}>
        {loginError && (
          <View>
            <BaseText style={styles.loginError}>{loginError}</BaseText>
          </View>
        )}
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
            containerStyles={{marginTop: 20}}
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
        <LoginButton label={t('log in')} onPress={handleSubmit} />
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={styles.registerContainer}>
          <BaseText>{t('registerLink')}</BaseText>
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

  const {loading} = useSelector((state) => state.user);

  React.useEffect(() => {
    const focusUnsubscribe = navigation.addListener('focus', () => {
      Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    });
    const blurUnsubscribe = navigation.addListener('blir', () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    });

    // cleanup function
    return () => {
      blurUnsubscribe();
      focusUnsubscribe();
    };
  }, []);

  const _keyboardDidShow = () => {
    if (bottomSheetRef) {
      bottomSheetRef?.current?.snapTo(0);
    }
  };

  const _keyboardDidHide = () => {
    if (bottomSheetRef) {
      bottomSheetRef?.current?.snapTo(1);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={
        {
          // email: 'testuser1@gmail.com',
          // password: '123456',
        }
      }
      validationSchema={schema}
      onSubmit={async (values) => {
        let formData = new FormData();

        formData.append('email', values.email);
        formData.append('password', values.password);

        login(formData)
          .then((data) => {
            const {
              otp_verified,
              email_verified,
              default_role_id,
            } = data.value.user;

            if (otp_verified === 'N' || email_verified === 'N') {
              navigation.navigate('Otp');
            } else if (default_role_id === 0) {
              navigation.navigate('RoleSelect');
            }
          })
          .catch((error) => {
            setLoginError(error);
          });
      }}>
      {({handleChange, values, handleSubmit, handleBlur, isValid, errors}) => (
        <View style={styles.container}>
          <Spinner visible={loading} textContent={''} />
          <View style={styles.topImageContainer}>
            <View style={styles.bannerContainer}>
              <Image source={banner} style={styles.banner} />
            </View>
            <View style={styles.imageContainer}>
              <Image source={image} style={styles.image} />
            </View>
          </View>
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={['85%', '60%']}
            initialSnap={1}
            renderHeader={renderHeader}
            renderContent={() => (
              <RenderContent
                loginError={loginError}
                handleChange={handleChange}
                values={values}
                handleSubmit={handleSubmit}
                handleBlur={handleBlur}
                errors={errors}
                navigation={navigation}
              />
            )}
          />
        </View>
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
    height: Layout.window.width * 0.75 * (5 / 12),
  },
  imageContainer: {
    display: 'flex',
    marginBottom: -30,
    right: 10,
    alignItems: 'center',
  },
  image: {
    width: Layout.window.width * 0.75,
    height: Layout.window.width * 0.75 * (15 / 22),
  },
  header: {
    backgroundColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    paddingTop: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  contentContainer: {
    backgroundColor: theme.colors.primary,
    display: 'flex',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headlineContainer: {
    height: '5%',
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
    height: '80%',
    paddingBottom: 10,
    paddingHorizontal: 25,
  },
  inputsContainer: {
    width: '100%',
  },
  loginButton: {
    marginTop: 25,
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
