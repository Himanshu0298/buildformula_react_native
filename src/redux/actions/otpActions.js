import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import useAuth from '../../services/user';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'utils/responseProcessor';

export default function useOtpActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {otpCheck} = useAuth();
  const {_err, _res} = useResProcessor();

  return {
    sentOtp: phone =>
      dispatch({
        type: types.SEND_OTP,
        payload: async () => {},
      }),
    verifyOtp: data =>
      dispatch({
        type: types.VERIFY_OTP,
        payload: async () => {
          try {
            const response = _res(await otpCheck(data));
            return Promise.resolve({response});
          } catch (error) {
            const errorMessage = _err(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),
  };
}
