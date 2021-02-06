/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  withTheme,
  Text,
  Headline,
  Subheading,
  Button,
  TextInput,
} from 'react-native-paper';
import {secondaryTheme, theme} from 'styles/theme';
import banner from 'assets/images/banner.png';
import image from 'assets/images/buildings.png';
import {Formik} from 'formik';
import CustomInput from './../Components/CustomInput';
import useUserActions from 'redux/actions/userActions';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';
import {useTranslation} from 'react-i18next';
import Layout from 'utils/Layout';
import BottomSheet from 'reanimated-bottom-sheet';
import {useSnackbar} from 'components/Atoms/Snackbar';
import SheetHeader from 'components/Atoms/SheetHeader';

const BANNER_HEIGHT = Layout.window.width * 0.75 * (5 / 12);
const IMAGE_HEIGHT = Layout.window.width * 0.75 * (15 / 22);

const SNAP_POINTS = [
  Layout.window.height - BANNER_HEIGHT,
  Layout.window.height - (BANNER_HEIGHT + IMAGE_HEIGHT),
];

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
        {label}
      </Button>
    </View>
  );
}

function RenderContent(props) {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    navigation,
    bottomSheetRef,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const {t} = useTranslation();

  return (
    <View style={styles.contentContainer}>
      <View style={styles.headlineContainer}>
        <Headline theme={secondaryTheme} style={{fontWeight: 'bold'}}>
          {t('heading')}
        </Headline>
        <Subheading theme={secondaryTheme}>{t('subHeading')}</Subheading>
      </View>
      <View style={styles.inputMainContainer}>
        <View style={styles.inputsContainer}>
          <CustomInput
            name="email"
            label={t('label_email')}
            ref={emailRef}
            onFocus={() => bottomSheetRef?.current?.snapTo(0)}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            placeholder={t('msgBlankEmail')}
            autoCapitalize="none"
            returnKeyType={'next'}
            onSubmitEditing={() => passwordRef?.current?.focus()}
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
            right={
              <TextInput.Icon
                theme={secondaryTheme}
                name={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword((show) => !show)}
              />
            }
          />
          <TouchableOpacity style={styles.forgotContainer}>
            <Text theme={secondaryTheme}>{t('forgotPassword')}</Text>
          </TouchableOpacity>
        </View>
        <LoginButton label={t('log in')} onPress={handleSubmit} />
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={styles.registerContainer}>
          <Text theme={secondaryTheme}>{t('registerLink')}</Text>
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
  const snackbar = useSnackbar();

  const {loading} = useSelector((state) => state.user);
  const {project} = useSelector((state) => state.project);

  useEffect(() => {
    if (loginError) {
      snackbar.showMessage({
        message: loginError,
        variant: 'error',
      });
    }
  }, [loginError]);

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      validationSchema={schema}
      onSubmit={async (values) => {
        const formData = new FormData();
        Keyboard.dismiss();
        if (loginError) {
          setLoginError(null);
        }
        formData.append('email', values.email);
        formData.append('password', values.password);

        login(formData)
          .then(({value}) => {
            const {otp_verified, email_verified, default_role_id} = value.user;

            if (otp_verified === 'N' || email_verified === 'N') {
              navigation.navigate('Otp');
            } else if (default_role_id === 0) {
              navigation.navigate('RoleSelect');
            } else if (project.project_id) {
              navigation.navigate('ProjectStructureStepOne');
            }
          })
          .catch((error) => {
            setLoginError(error);
          });
      }}>
      {({handleChange, values, handleSubmit, handleBlur, isValid, errors}) => (
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          style={styles.container}>
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
              snapPoints={SNAP_POINTS}
              initialSnap={1}
              renderHeader={() => <SheetHeader />}
              renderContent={() => (
                <RenderContent
                  navigation={navigation}
                  bottomSheetRef={bottomSheetRef}
                  values={values}
                  errors={errors}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  handleBlur={handleBlur}
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
    flex: 1,
  },
  topImageContainer: {
    flexGrow: 1,
  },
  bannerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  banner: {
    width: Layout.window.width * 0.75,
    height: BANNER_HEIGHT,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: Layout.window.width * 0.75,
    height: IMAGE_HEIGHT,
  },
  contentContainer: {
    backgroundColor: theme.colors.primary,
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headlineContainer: {
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
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
  forgotContainer: {
    display: 'flex',
    width: '100%',
    padding: 2,
    alignItems: 'flex-end',
  },
  loginButton: {
    marginTop: 25,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
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
