import {useDispatch} from 'react-redux';
import {useResProcessor} from 'utils/responseProcessor';
import {useSnackbar} from 'components/Atoms/Snackbar';
import messaging from '@react-native-firebase/messaging';
import useAuth from '../../services/user';
import * as types from './actionTypes';

async function getFcmToken() {
  try {
    const authStatus = await messaging().requestPermission();
    const {AUTHORIZED, PROVISIONAL} = messaging.AuthorizationStatus;
    const enabled = [AUTHORIZED, PROVISIONAL].includes(authStatus);

    if (enabled) {
      return messaging().getToken();
    }
    return undefined;
  } catch (error) {
    console.log('-----> error', error);
    return undefined;
  }
}

export default function useUserActions() {
  const dispatch = useDispatch();
  const {
    login,
    signUp,
    updateUser,
    sendForgetPasswordOtp,
    verifyForgotPasswordOtp,
    resetPassword,
    otpCheck,
  } = useAuth();
  const {_err, _res} = useResProcessor();
  const snackbar = useSnackbar();

  return {
    signUp: params =>
      dispatch({
        type: types.SIGN_UP,
        payload: async () => {
          try {
            const response = _res(await signUp(params));
            const {data} = response;
            const {token, ...user} = data;

            return Promise.resolve({user, token});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    login: data =>
      dispatch({
        type: types.LOGIN,
        payload: async () => {
          try {
            const fcm_token = await getFcmToken();

            const response = _res(await login({...data, fcm_token}));
            const {data: userData} = response;

            return Promise.resolve({data: userData});
          } catch (error) {
            const {data: userData = {}} = error?.response?.data || {};
            const {email} = userData;
            if (email) {
              return Promise.resolve({data: userData});
            }
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject('Invalid email or password');
          }
        },
      }),
    updateUser: data =>
      dispatch({
        type: types.UPDATE_USER,
        payload: async () => {
          try {
            const response = _res(await updateUser(data));

            snackbar.showMessage({message: 'Updated user successfully!'});
            return Promise.resolve(response);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    selectRole: data =>
      dispatch({
        type: types.SELECT_ROLE,
        payload: async () => {
          try {
            const response = _res(await updateUser(data, true));
            return Promise.resolve(response);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    verifyOtp: data =>
      dispatch({
        type: types.VERIFY_OTP,
        payload: async () => {
          try {
            const response = _res(await otpCheck(data));
            return Promise.resolve({response});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    sendForgetPasswordOtp: data =>
      dispatch({
        type: types.SEND_FORGET_PASSWORD_OTP,
        payload: async () => {
          try {
            const response = _res(await sendForgetPasswordOtp(data));
            return Promise.resolve(response);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    verifyForgotPasswordOtp: data =>
      dispatch({
        type: types.SEND_FORGET_PASSWORD_OTP,
        payload: async () => {
          try {
            const response = _res(await verifyForgotPasswordOtp(data));
            return Promise.resolve(response);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    resetPassword: data =>
      dispatch({
        type: types.SEND_FORGET_PASSWORD_OTP,
        payload: async () => {
          try {
            const res = _res(await resetPassword(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
  };
}
