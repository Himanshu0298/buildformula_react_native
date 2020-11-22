import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import useAuth from '../../services/user';
import {useSnackbar} from 'components/Snackbar';
import {useResProcessor} from 'utils/responseProcessor';

export default function useOtpActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {otpCheck} = useAuth();
  const {processError, processResponse} = useResProcessor();

  return {
    sentOtp: (phone) =>
      dispatch({
        type: types.SEND_OTP,
        payload: async () => {},
      }),
    verifyOtp: (data) =>
      dispatch({
        type: types.VERIFY_OTP,
        payload: async () => {
          try {
            let response = processResponse(await otpCheck(data));
            return Promise.resolve({response});
          } catch (error) {
            let errorMessage = processError(error);
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
