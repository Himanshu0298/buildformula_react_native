import * as types from './actionTypes';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';

export default function useOtpActions() {
  const dispatch = useDispatch();

  return ({
    sentOtp: (phone) => dispatch({
      type: types.SEND_OTP,
      payload: new Promise(async (resolve, reject) => {
        const confirmation = await auth().signInWithPhoneNumber(`+91${phone}`);

        return resolve({ confirmation });

      }),
    }),
  });
}
