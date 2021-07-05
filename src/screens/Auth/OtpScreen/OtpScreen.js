import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import image from 'assets/images/otp.png';
import BaseText from 'components/Atoms/BaseText';
import {Button, withTheme} from 'react-native-paper';
import Layout from 'utils/Layout';
import Spinner from 'react-native-loading-spinner-overlay';
import useOtpActions from 'redux/actions/otpActions';
import {useAlert} from 'components/Atoms/Alert';
import OtpInput from 'components/Atoms/OtpInput';

const OtpScreen = props => {
  const {navigation, theme} = props;

  const alert = useAlert();
  const {verifyOtp} = useOtpActions();

  const {user, loading} = useSelector(state => state.user);

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const submit = async () => {
    const formData = new FormData();
    //TODO: Update translations
    formData.append('mobile_otp', phone);
    formData.append('user_id', user.id);
    formData.append('email_otp', email);

    verifyOtp(formData)
      .then(data => {
        navigation.navigate('RoleSelect');
      })
      .catch(error => {
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
      });
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent={''} />
      <View style={styles.root}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <BaseText style={styles.title}>Verification Code</BaseText>
        <BaseText style={styles.subTitle}>
          Enter the OTP send to {`+91 ${user.phone || '1111111111'}`}
          {/* send to {`+91 ${user.phone}`} */}
        </BaseText>
        <OtpInput value={phone} setValue={setPhone} />

        <View style={styles.resendContainer}>
          <BaseText style={styles.subTitle}>Didn’t receive a code.</BaseText>
          <TouchableOpacity onPress={() => console.log('----->resend ')}>
            <BaseText style={[styles.resend, {color: theme.colors.primary}]}>
              Resend
            </BaseText>
          </TouchableOpacity>
        </View>

        <BaseText style={styles.subTitle}>
          Enter the OTP send to {`${user.email}`}
          {/* send to {`+91 ${user.phone}`} */}
        </BaseText>
        <OtpInput value={email} setValue={setEmail} />
        <View style={styles.resendContainer}>
          <BaseText style={styles.subTitle}>Didn’t receive a code.</BaseText>
          <TouchableOpacity onPress={() => console.log('----->resend ')}>
            <BaseText style={styles.resend}> Resend</BaseText>
          </TouchableOpacity>
        </View>
        <Button
          onPress={submit}
          color={theme.colors.primary}
          mode="contained"
          style={styles.nextButton}
          contentStyle={{paddingVertical: 10, borderRadius: 15}}
          theme={{roundness: 18}}>
          CONFIRM
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  root: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
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
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
  },
  subTitle: {
    paddingTop: 10,
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  resend: {
    paddingTop: 10,
    fontSize: 13,
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 20,
    width: '50%',
  },
});

export default withTheme(OtpScreen);
