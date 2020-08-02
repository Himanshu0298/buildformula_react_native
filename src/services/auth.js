import { instance, useConfig } from './init';

export default function useAuth() {
  let { config } = useConfig();
  return ({
    login: (data) => {
      return instance.post('/login', data, config({ multipart: true, auth: false }));
    },
    otpCheck: (data) => {
      return instance.post('/otp_check', data, config({ multipart: true, auth: false }));
    },
  });
}
