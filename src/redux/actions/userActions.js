import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import useAuth from '../../services/user';
import {useResProcessor} from 'utils/responseProcessor';
import {useSnackbar} from 'components/Atoms/Snackbar';
import messaging from '@react-native-firebase/messaging';

async function getFcmToken() {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      return messaging().getToken();
    }
  } catch (error) {
    console.log('-----> error', error);
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
    signUp: user =>
      dispatch({
        type: types.SIGN_UP,
        payload: async () => {
          try {
            const response = _res(await signUp(user));
            const {data: userData} = response;
            console.log('----->signUp response', userData);

            return Promise.resolve({user: userData});
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
            } else {
              return Promise.reject('Invalid email or password');
            }
          }
        },
      }),
    updateUser: data =>
      dispatch({
        type: types.UPDATE_USER,
        payload: async () => {
          try {
            const response = _res(await updateUser(data));
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
            const response = _res(await updateUser(data));
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
