import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import image from 'assets/images/otp.png';
import BaseText from 'components/Atoms/BaseText';
import {
  Button,
  Caption,
  Dialog,
  Portal,
  Text,
  TextInput,
  withTheme,
} from 'react-native-paper';
import Layout from 'utils/Layout';
import useAuth from 'services/user';
import Spinner from 'react-native-loading-spinner-overlay';
import {useAlert} from 'components/Atoms/Alert';
import {useSnackbar} from 'components/Atoms/Snackbar';
import OtpInput from 'components/Atoms/OtpInput';
import useUserActions from 'redux/actions/userActions';
import {Formik} from 'formik';
import {PHONE_REGEX} from 'utils/constant';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import {useTranslation} from 'react-i18next';
import useSalesActions from 'redux/actions/salesActions';

const schema = Yup.object().shape({
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
});

function UpdateDialog(props) {
  const {visible, user, toggleDialog, onSubmit} = props;

  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialog} style={styles.dialog}>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{phone: user?.phone, email: user?.email}}
          validationSchema={schema}
          onSubmit={onSubmit}>
          {({values, errors, handleChange, handleBlur, handleSubmit}) => {
            return (
              <View style={styles.dialogContentContainer}>
                <RenderInput
                  name="phone"
                  label={t('label_phone')}
                  containerStyles={styles.inputStyles}
                  maxLength={10}
                  value={values.phone}
                  keyboardType="number-pad"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  autoCapitalize="none"
                  returnKeyType="next"
                  left={
                    <TextInput.Affix style={styles.renderInput} text="+91" />
                  }
                  error={errors.phone}
                />
                <RenderInput
                  name="email"
                  label={t('label_email')}
                  containerStyles={styles.inputStyles}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder={t('msgBlankEmail')}
                  autoCapitalize="none"
                  returnKeyType="next"
                  error={errors.email}
                />
                <View style={styles.dialogActionContainer}>
                  <Button
                    style={styles.button}
                    mode="contained"
                    contentStyle={styles.updateButton}
                    theme={{roundness: 15}}
                    onPress={handleSubmit}>
                    Update
                  </Button>
                </View>
              </View>
            );
          }}
        </Formik>
      </Dialog>
    </Portal>
  );
}

function OtpScreen(props) {
  const {navigation, theme, route} = props;

  const {fromLogin, fromBooking, bookingID, userPhone, unit_id} =
    route?.params || {};

  const {selectedProject} = useSelector(s => s.project);
  const projectId = selectedProject.id;

  const alert = useAlert();
  const snackbar = useSnackbar();
  const {confirmBookingOTP, resendBookingOTP} = useSalesActions();

  const {sendOtpToPhone, sendOtpToEmail} = useAuth();
  const {verifyOtp, updateUser} = useUserActions();

  const {user, loading} = useSelector(s => s.user);

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (fromLogin) {
      sendOtpToPhone({user_id: user.id});
      sendOtpToEmail({user_id: user.id});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromLogin, user.id]);

  const toggleDialog = () => setVisible(v => !v);

  const submit = async () => {
    try {
      if (fromBooking) {
        await confirmBookingOTP({
          project_id: projectId,
          project_bookings_id: bookingID,
          booking_confirm_via_otp: phone,
        });
        navigation.popToTop();
      } else {
        await verifyOtp({
          mobile_otp: phone,
          user_id: user.id,
          email_otp: email,
        });
      }
    } catch (error) {
      console.log('-----> error', error);
      alert.show({
        title: 'Alert',
        message: error,
        dismissable: false,
        onConfirm: () => {
          if (error === 'Email OTP is invalid') {
            setEmail('');
          } else if (error === 'OTP not match') {
            setPhone('');
          } else {
            setEmail('');
            setPhone('');
          }
        },
      });
    }
  };

  const updateUserDetails = values => {
    toggleDialog();
    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    updateUser(formData);
  };

  const sendPhoneOtp = async () => {
    await sendOtpToPhone({user_id: user.id});
    snackbar.showMessage({message: 'Otp sent successfully! Check your phone'});
  };

  const sendBookingPhoneOtp = async () => {
    await resendBookingOTP({
      project_id: projectId,
      unit_id,
      phone: userPhone,
    });
    snackbar.showMessage({message: 'Otp sent successfully! Check your phone'});
  };

  const sendEmailOtp = async () => {
    await sendOtpToEmail({user_id: user.id});
    snackbar.showMessage({message: 'Otp sent successfully! Check your email'});
  };

  // TODO: Update translations

  // TODO: enable 30 sec wait before subsequent resend
  return (
    <View style={styles.container}>
      <UpdateDialog
        user={user}
        visible={visible}
        toggleDialog={toggleDialog}
        onSubmit={updateUserDetails}
      />
      <Spinner visible={loading} textContent="" />
      <View style={styles.root}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <BaseText style={styles.title}>Verification Code</BaseText>

        {fromBooking ? (
          <>
            <Text>
              Enter the OTP send to {`${userPhone}`}
              send to {`+91 ${user.phone}`}
            </Text>
            <OtpInput value={phone} setValue={setPhone} />
            {/* <View style={[styles.row, styles.confirmContainer]}>
              <Caption>Not your Phone? </Caption>
              <TouchableOpacity onPress={toggleDialog}>
                <Caption style={{color: theme.colors.primary}}>Update</Caption>
              </TouchableOpacity>
            </View> */}
            <View style={[styles.row, styles.formContainer]}>
              <Caption style={styles.subTitle}>Didn’t receive a code. </Caption>
              <TouchableOpacity onPress={sendBookingPhoneOtp}>
                <Caption style={{color: theme.colors.primary}}>Resend</Caption>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text>
              Enter the OTP send to {`+91 ${user.phone || '1111111111'}`}
            </Text>
            <OtpInput value={phone} setValue={setPhone} />
            <View style={[styles.row, styles.confirmContainer]}>
              <Caption>Not your phone number? </Caption>
              <TouchableOpacity onPress={toggleDialog}>
                <Caption style={{color: theme.colors.primary}}>Update</Caption>
              </TouchableOpacity>
            </View>
            <View style={[styles.row, styles.codeContainer]}>
              <Caption>Didn’t receive a code. </Caption>
              <TouchableOpacity onPress={sendPhoneOtp}>
                <Caption style={{color: theme.colors.primary}}>Resend</Caption>
              </TouchableOpacity>
            </View>

            <Text>
              Enter the OTP send to {`${user.email}`}
              {/* send to {`+91 ${user.phone}`} */}
            </Text>
            <OtpInput value={email} setValue={setEmail} />
            <View style={[styles.row, styles.notYourEmail]}>
              <Caption>Not your email? </Caption>
              <TouchableOpacity onPress={toggleDialog}>
                <Caption style={{color: theme.colors.primary}}>Update</Caption>
              </TouchableOpacity>
            </View>
            <View style={[styles.row, styles.codeContainerText]}>
              <Caption style={styles.subTitle}>Didn’t receive a code. </Caption>
              <TouchableOpacity onPress={sendEmailOtp}>
                <Caption style={{color: theme.colors.primary}}>Resend</Caption>
              </TouchableOpacity>
            </View>
          </>
        )}

        <Button
          onPress={submit}
          color={theme.colors.primary}
          mode="contained"
          style={styles.nextButton}
          contentStyle={styles.contentStyle}
          theme={{roundness: 18}}>
          CONFIRM
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  root: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: Layout.window.width * 0.3,
    height: Layout.window.width * 0.32,
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextButton: {
    marginTop: 20,
    width: '50%',
  },
  dialogContentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputStyles: {
    marginVertical: 4,
  },
  dialogActionContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentStyle: {
    paddingVertical: 10,
    borderRadius: 15,
  },
  confirmContainer: {
    marginTop: 10,
  },
  codeContainer: {
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 10,
    marginTop: 20,
  },
  renderInput: {
    marginRight: 2,
  },
  button: {
    width: '40%',
  },
  updateButton: {
    padding: 1,
  },
  dialog: {
    top: -100,
  },
  notYourEmail: {
    marginTop: 10,
  },
  codeContainerText: {
    marginBottom: 20,
  },
});

export default withTheme(OtpScreen);
