import * as types from './actionTypes';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import useAuth from '../../services/auth';

export default function useOtpActions() {
  const dispatch = useDispatch();
  const { otpCheck } = useAuth();

  return ({
    sentOtp: (phone) => dispatch({
      type: types.SEND_OTP,
      payload: new Promise(async (resolve, reject) => {
        const confirmation = await auth().signInWithPhoneNumber(`+91${phone}`);

        return resolve({ confirmation });

      }),
    }),
    verifyOtp: (data) => dispatch({
      type: types.VERIFY_OTP,
      payload: new Promise(async (resolve, reject) => {
        try {
          let response = await otpCheck(data);
          return resolve({response})
        }
        catch (error) {
          const { data, msg } = error?.response?.data;
          return reject(msg);
        }
      }),
    }),
  });
}
