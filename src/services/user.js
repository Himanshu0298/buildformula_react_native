import {instance, config} from './init';

export default function useAuth() {
  return {
    login: data => {
      return instance.post(
        '/login',
        data,
        config({auth: false, multipart: false}),
      );
    },
    signUp: data => {
      return instance.post(
        '/register',
        data,
        config({auth: false, multipart: false}),
      );
    },
    sendOtpToEmail: data => {
      return instance.post(
        '/sendOtpToUserEmail',
        data,
        config({multipart: false}),
      );
    },
    sendOtpToPhone: data => {
      return instance.post(
        '/sendOtpToUserPhone',
        data,
        config({multipart: false}),
      );
    },
    otpCheck: data => {
      return instance.post('/otp_check', data, config({multipart: false}));
    },
    updateUser: (data, multipart) => {
      return instance.post('/update_profile', data, config({multipart}));
    },
    sendForgetPasswordOtp: data => {
      return instance.post(
        '/forgot_pwd',
        data,
        config({multipart: false, auth: false}),
      );
    },
    verifyForgotPasswordOtp: data => {
      return instance.post(
        '/forgot_pwd_otp_update',
        data,
        config({multipart: false, auth: false}),
      );
    },
    resetPassword: data => {
      return instance.post(
        '/forgot_update_new_pwd',
        data,
        config({multipart: false, auth: false}),
      );
    },
  };
}
