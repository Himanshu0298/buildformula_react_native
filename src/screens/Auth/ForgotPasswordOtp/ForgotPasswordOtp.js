import React from 'react';
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
import useUserActions from 'redux/actions/userActions';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';
import {useTranslation} from 'react-i18next';
import Layout from 'utils/Layout';
import BottomSheet from 'reanimated-bottom-sheet';
import SheetHeader from 'components/Atoms/SheetHeader';
import OtpInput from 'components/Atoms/OtpInput';
import {RenderError} from 'components/Atoms/RenderInput';

const BANNER_HEIGHT = Layout.window.width * 0.75 * (5 / 12);
const IMAGE_HEIGHT = Layout.window.width * 0.75 * (15 / 22);

const SNAP_POINTS = [
  Layout.window.height - BANNER_HEIGHT,
  Layout.window.height - (BANNER_HEIGHT + IMAGE_HEIGHT),
];

const schema = Yup.object().shape({
  otp: Yup.number().min(100000).required('Please enter a valid otp'),
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
  const {values, errors, bottomSheetRef, setFieldValue, handleSubmit} = props;

  const {t} = useTranslation();

  return (
    <View style={styles.contentContainer}>
      <View style={styles.headlineContainer}>
        <Headline theme={secondaryTheme} style={{fontWeight: 'bold'}}>
          {t('title_forgot_password_heading')}
        </Headline>
        <Subheading theme={secondaryTheme} style={{marginTop: 20}}>
          Enter the OTP sent to your email id
        </Subheading>
      </View>
      <View style={styles.inputMainContainer}>
        <View style={styles.otpInput}>
          <OtpInput
            value={values.otp}
            setValue={v => setFieldValue('otp', v)}
            onFocus={() => bottomSheetRef?.current?.snapTo(0)}
          />
        </View>
        {errors.otp ? <RenderError error={errors.otp} /> : null}
        <LoginButton label="Next" onPress={handleSubmit} />
      </View>
    </View>
  );
}

function ForgotPasswordOtp(props) {
  const {navigation, route} = props;
  const {user_id} = route?.params || {};

  const bottomSheetRef = React.createRef();
  const {verifyForgotPasswordOtp} = useUserActions();

  const {loading} = useSelector(state => state.user);

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      validationSchema={schema}
      onSubmit={async (values, {resetForm}) => {
        Keyboard.dismiss();
        verifyForgotPasswordOtp({...values, user_id})
          .then(() => navigation.navigate('ResetPassword', {user_id}))
          .catch(() => resetForm());
      }}>
      {({values, handleSubmit, setFieldValue, isValid, errors}) => (
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          style={styles.container}>
          <View style={styles.container}>
            <Spinner visible={loading} textContent="" />
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
                  handleSubmit={handleSubmit}
                  setFieldValue={setFieldValue}
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
  otpInput: {
    marginBottom: 10,
  },
  loginButton: {
    marginTop: 25,
    width: '100%',

    alignItems: 'center',
  },
});

export default withTheme(ForgotPasswordOtp);
