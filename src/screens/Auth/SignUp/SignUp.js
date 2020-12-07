/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  withTheme,
  Headline,
  Subheading,
  Button,
  TextInput,
  Text,
} from 'react-native-paper';
import {secondaryTheme, theme} from 'styles/theme';
import banner from 'assets/images/banner.png';
import image from 'assets/images/buildings.png';
import BaseText from 'components/BaseText';
import {Formik} from 'formik';
import CustomInput from './../Components/CustomInput';
import useUserActions from 'redux/actions/userActions';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';
import {useTranslation} from 'react-i18next';
import Layout from 'utils/Layout';
import BottomSheet from 'reanimated-bottom-sheet';
import {PHONE_REGEX} from 'utils/constant';
import useProjectActions from 'redux/actions/projectActions';
import useAppActions from 'redux/actions/appActions';

const BANNER_HEIGHT = Layout.window.width * 0.75 * (5 / 12);
const IMAGE_HEIGHT = Layout.window.width * 0.75 * (15 / 22);

const SNAP_POINTS = [
  Layout.window.height - BANNER_HEIGHT,
  Layout.window.height - (BANNER_HEIGHT + IMAGE_HEIGHT),
];

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
    bottomSheetRef,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    navigation,
    adminSignUp,
    adminId = 2,
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
      {!adminSignUp ? (
        <View style={styles.headlineContainer}>
          <Headline style={{fontWeight: 'bold'}}>
            {t('heading_signup')}
          </Headline>
          <Subheading>{t('subHeading_signUp')}</Subheading>
        </View>
      ) : (
        <Subheading>
          {t(adminId === 2 ? 'admin_title_2nd' : 'admin_title_3rd')}
        </Subheading>
      )}
      <View style={styles.inputMainContainer}>
        <CustomInput
          name="firstName"
          label={t('label_first_name')}
          containerStyles={styles.inputStyles}
          value={values.firstName}
          onChangeText={handleChange('firstName')}
          onBlur={handleBlur('firstName')}
          placeholder={t('label_first_name')}
          autoCapitalize="none"
          returnKeyType={'next'}
          onSubmitEditing={() => {
            lastRef && lastRef.current.focus();
            bottomSheetRef?.current?.snapTo(0);
          }}
          error={errors.firstName}
        />
        <CustomInput
          name="lastName"
          label={t('label_last_name')}
          containerStyles={styles.inputStyles}
          ref={lastRef}
          value={values.lastName}
          onChangeText={handleChange('lastName')}
          onBlur={handleBlur('lastName')}
          placeholder={t('label_last_name')}
          autoCapitalize="none"
          returnKeyType={'next'}
          onSubmitEditing={() => phoneRef && phoneRef.current.focus()}
          error={errors.lastName}
        />
        <CustomInput
          name="phone"
          label={t('label_phone')}
          containerStyles={styles.inputStyles}
          ref={phoneRef}
          maxLength={10}
          value={values.phone}
          keyboardType="number-pad"
          onChangeText={handleChange('phone')}
          onBlur={handleBlur('phone')}
          placeholder={t('label_phone')}
          autoCapitalize="none"
          returnKeyType={'next'}
          onSubmitEditing={() => emailRef && emailRef.current.focus()}
          left={<TextInput.Affix style={{marginRight: 2}} text="+91" />}
          error={errors.phone}
        />
        <CustomInput
          name="email"
          label={t('label_email')}
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
      <SignUpButton
        onPress={handleSubmit}
        label={t(
          !adminSignUp
            ? 'label_signup'
            : adminId === 2
            ? 'label_next'
            : 'label_save',
        )}
      />
      {!adminSignUp ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.registerContainer}>
          <BaseText>{t('loginLink')}</BaseText>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

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
    .matches(PHONE_REGEX, 'Phone number is not valid')
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
  const {navigation, route} = props;

  const {adminSignUp = false, adminId, adminData} = route?.params || {};

  const [validationError, setValidationError] = React.useState({});
  const {signUp} = useUserActions();
  const {updateAdmins} = useProjectActions();
  const {resetStructure} = useAppActions();

  const bottomSheetRef = React.createRef();

  const {t} = useTranslation();

  const {loading} = useSelector((state) => state.user);
  const {loading: updatingAdmin, project} = useSelector(
    (state) => state.project,
  );

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
      initialValues={{
        firstName: 'test',
        lastName: 'user',
        phone: '1234567894',
        email: 'testuser1@gmail.com',
        password: '123456',
        confirmPassword: '123456',
      }}
      validationSchema={schema}
      onSubmit={async (values) => {
        if (!adminSignUp) {
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
        } else if (adminId === 2) {
          navigation.navigate('AdminCreation', {
            adminSignUp: true,
            adminId: 3,
            adminData: values,
          });
        } else if (adminId === 3) {
          let formData = new FormData();

          formData.append('project_id', project.project_id);
          formData.append('first_name_1', adminData.firstName);
          formData.append('last_name_1', adminData.lastName);
          formData.append('email_1', adminData.email);
          formData.append('phone_1', adminData.phone);
          formData.append('password_1', adminData.password);
          formData.append('confirm_password_1', adminData.confirmPassword);
          formData.append('first_name_2', values.firstName);
          formData.append('last_name_2', values.lastName);
          formData.append('email_2', values.email);
          formData.append('phone_2', values.phone);
          formData.append('password_2', values.password);
          formData.append('confirm_password_2', values.confirmPassword);

          updateAdmins(formData).then(() => {
            resetStructure();
            navigation.reset({
              index: 0,
              routes: [{name: 'GeneralDashboard'}],
            });
          });
        }
      }}>
      {({handleChange, values, handleSubmit, handleBlur, isValid, errors}) => (
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          style={styles.container}>
          <View style={styles.container}>
            <Spinner visible={loading || updatingAdmin} textContent={''} />
            <View style={styles.topImageContainer}>
              <View style={styles.bannerContainer}>
                <Image source={banner} style={styles.banner} />
              </View>
              {!adminSignUp ? (
                <View style={styles.imageContainer}>
                  <Image source={image} style={styles.image} />
                </View>
              ) : (
                <View style={styles.noteContainer}>
                  <Text theme={secondaryTheme}>
                    <Text
                      theme={secondaryTheme}
                      style={{color: theme.colors.primary, fontWeight: 'bold'}}>
                      {'NOTE: '}
                    </Text>
                    Vshwan build Project or site have three main admins so if
                    anyone admin isn't available your team can be manged without
                    interruption.
                  </Text>
                </View>
              )}
            </View>
            <BottomSheet
              ref={bottomSheetRef}
              snapPoints={adminSignUp ? ['85%', '70%'] : SNAP_POINTS}
              initialSnap={1}
              renderHeader={renderHeader}
              renderContent={() => (
                <RenderContent
                  t={t}
                  bottomSheetRef={bottomSheetRef}
                  adminSignUp={adminSignUp}
                  adminId={adminId}
                  values={values}
                  handleSubmit={handleSubmit}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  errors={{...errors, ...validationError}}
                  navigation={navigation}
                />
              )}
            />
          </View>
        </TouchableWithoutFeedback>
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
    height: BANNER_HEIGHT,
  },
  imageContainer: {
    display: 'flex',
    marginBottom: -30,
    right: 10,
    alignItems: 'center',
  },
  image: {
    width: Layout.window.width * 0.75,
    height: IMAGE_HEIGHT,
  },
  noteContainer: {
    paddingHorizontal: 20,
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
    paddingBottom: 20,
    alignItems: 'center',
  },
  headlineContainer: {
    justifyContent: 'center',
    height: 70,
    alignItems: 'center',
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
