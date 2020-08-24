import {instance, useConfig} from './init';

export default function useAuth() {
  let {config} = useConfig();
  return {
    login: (data) => {
      return instance.post(
        '/login',
        data,
        config({multipart: true, auth: false}),
      );
    },
    signUp: (data) => {
      return instance.post(
        '/register',
        data,
        config({multipart: true, auth: false}),
      );
    },
    otpCheck: (data) => {
      return instance.post(
        '/otp_check',
        data,
        config({multipart: true, auth: false}),
      );
    },
    updateUser: (data) => {
      return instance.post(
        '/user_common',
        data,
        config({multipart: true, auth: false}),
      );
    },
  };
}
