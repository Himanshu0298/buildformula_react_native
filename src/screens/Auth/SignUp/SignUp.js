/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
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
  Colors,
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function SignUpButton({label, onPress}) {
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
    t,
    values,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    navigation,
  } = props;

  const [showCnfPass, toggleShowCnfPass] = useState(null);
  const [showPass, toggleShowPass] = useState(null);

  const lastRef = React.useRef();
  const phoneRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const cnfPassRef = React.useRef();

  return (
    <View style={styles.contentContainer}>
      <View style={styles.headlineContainer}>
        <Headline style={{fontWeight: 'bold'}}>{t('heading_signup')}</Headline>
        <Subheading>{t('subHeading_signUp')}</Subheading>
      </View>
      <View style={styles.inputMainContainer}>
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
          keyboardType="number-pad"
          onChangeText={handleChange('phone')}
          onBlur={handleBlur('phone')}
          placeholder={t('phoneLabel')}
          autoCapitalize="none"
          returnKeyType={'next'}
          onSubmitEditing={() => emailRef && emailRef.current.focus()}
          left={<TextInput.Affix style={{marginRight: 2}} text="+91" />}
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
          returnKeyType={'next'}
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
              onPress={() => toggleShowPass((v) => !v)}
            />
          }
        />
        <CustomInput
          name="confirmPassword"
          label={t('cnfPasswordLabel')}
          containerStyles={styles.inputStyles}
          ref={cnfPassRef}
          value={values.confirmPassword}
          onChangeText={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          placeholder={t('msgBlankCnfPassword')}
          autoCapitalize="none"
          returnKeyType={'done'}
          error={errors.confirmPassword}
          secureTextEntry={!showCnfPass}
          right={
            <TextInput.Icon
              name={showCnfPass ? 'eye-off' : 'eye'}
              onPress={() => toggleShowCnfPass((v) => !v)}
            />
          }
        />
      </View>
      <SignUpButton label={t('SIGN UP')} onPress={handleSubmit} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.registerContainer}>
        <BaseText>{t('loginLink')}</BaseText>
      </TouchableOpacity>
    </View>
  );
}
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = Yup.object().shape({
  firstName: Yup.string()
    .label('firstName')
    .required('required')
    .min(3, 'to short'),
  lastName: Yup.string()
    .label('firstName')
    .required('required')
    .min(3, 'to short'),
  phone: Yup.string()
    .label('phone')
    .required('required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'to short')
    .max(10, 'to long'),
  email: Yup.string()
    .email('Please enter a valid email')
    .label('email')
    .required('invalid email'),
  password: Yup.string()
    .label('Password')
    .required('Please enter a valid password')
    .min(6, 'Password must have at least 6 characters '),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
});

function SignUp(props) {
  const {navigation} = props;

  const [validationError, setValidationError] = React.useState({});
  const {signUp} = useUserActions();

  const bottomSheetRef = React.createRef();

  const {t} = useTranslation();

  const {loading} = useSelector((state) => state.user);

  React.useEffect(() => {
    const focusUnsubscribe = navigation.addListener('focus', () => {
      Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    });
    const blurUnsubscribe = navigation.addListener('blur', () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
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
          // firstName: 'test',
          // lastName: 'user',
          // phone: '1234567894',
          // email: 'testuser1@gmail.com',
          // password: '123456',
          // confirmPassword: '123456',
        }
      }
      validationSchema={schema}
      onSubmit={async (values) => {
        let formData = new FormData();

        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('password', values.password);
        formData.append('first_name', values.firstName);
        formData.append('last_name', values.lastName);
        formData.append('confirm_password', values.confirmPassword);

        signUp(formData)
          .then((data) => {
            const {email} = data.value.user;
            if (email) {
              navigation.navigate('Otp');
            }
          })
          .catch((error) => {
            setValidationError(error);
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
                t={t}
                handleChange={handleChange}
                values={values}
                handleSubmit={handleSubmit}
                handleBlur={handleBlur}
                errors={{...errors, ...validationError}}
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
    paddingBottom: 20,
    alignItems: 'center',
  },
  headlineContainer: {
    justifyContent: 'center',
    height: 70,
    alignItems: 'center',
  },
  loginError: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputMainContainer: {
    width: '100%',
    paddingBottom: 10,
    paddingHorizontal: 25,
  },
  inputStyles: {
    marginVertical: 4,
  },
  loginButton: {
    marginTop: 25,
    paddingHorizontal: 20,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
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

export default withTheme(SignUp);
