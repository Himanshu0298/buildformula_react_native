/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {withTheme, Headline, Subheading, Button} from 'react-native-paper';
import {secondaryTheme, theme} from 'styles/theme';
import banner from 'assets/images/banner.png';
import image from 'assets/images/buildings.png';
import {Formik} from 'formik';
import CustomInput from '../Components/CustomInput';
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

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .label('email')
    .required('Please enter a valid email'),
});

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
    bottomSheetRef,
  } = props;

  const emailRef = React.useRef();

  const {t} = useTranslation();

  return (
    <View style={styles.contentContainer}>
      <View style={styles.headlineContainer}>
        <Headline theme={secondaryTheme} style={{fontWeight: 'bold'}}>
          {t('title_forgot_password_heading')}
        </Headline>
        <Subheading theme={secondaryTheme} style={{marginTop: 20}}>
          {t('title_forgot_password_subHeading')}
        </Subheading>
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
            onSubmitEditing={handleSubmit}
            error={errors.email}
          />
        </View>
        <LoginButton label={'Next'} onPress={handleSubmit} />
      </View>
    </View>
  );
}

function ForgotPassword(props) {
  const {navigation} = props;
  const [loginError, setLoginError] = useState(null);

  const {sendForgetPasswordOtp} = useUserActions();

  const bottomSheetRef = React.createRef();
  const snackbar = useSnackbar();

  const {loading} = useSelector(state => state.user);

  useEffect(() => {
    if (loginError) {
      snackbar.showMessage({
        message: loginError,
        variant: 'error',
        autoHideDuration: 4000,
      });
    }
  }, [loginError]);

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      validationSchema={schema}
      onSubmit={async values => {
        sendForgetPasswordOtp(values)
          .then(({value}) =>
            navigation.navigate('ForgotPasswordOtp', {user_id: value.data.id}),
          )
          .catch(err => {
            if (err) {
              setLoginError("User with this email doesn't exist");
            }
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
  loginButton: {
    marginTop: 25,
    width: '100%',

    alignItems: 'center',
  },
});

export default withTheme(ForgotPassword);
