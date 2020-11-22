import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import useAuth from '../../services/user';
import {useResProcessor} from 'utils/responseProcessor';
import {useSnackbar} from 'components/Snackbar';

export default function useUserActions() {
  const dispatch = useDispatch();
  const {login, signUp, updateUser} = useAuth();
  const {processError, processResponse} = useResProcessor();
  const snackbar = useSnackbar();

  return {
    signUp: (user) =>
      dispatch({
        type: types.SIGN_UP,
        payload: new Promise(async (resolve, reject) => {
          try {
            let response = processResponse(await signUp(user));
            const {data: userData} = response;
            console.log('----->signUp response', userData);

            return resolve({user: userData});
          } catch (error) {
            let errorMessage = processError(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return reject(errorMessage);
          }
        }),
      }),
    login: (data) =>
      dispatch({
        type: types.LOGIN,
        payload: new Promise(async (resolve, reject) => {
          try {
            let response = processResponse(await login(data));
            const {data: userData} = response;
            console.log('----->login response', userData);

            return resolve({user: userData});
          } catch (error) {
            const {data: userData = {}} = error?.response?.data;
            const {email} = userData;
            if (email) {
              return resolve({user: userData});
            } else {
              return reject('Invalid email or password');
            }
          }
        }),
      }),
    selectRole: (data) =>
      dispatch({
        type: types.SELECT_ROLE,
        payload: new Promise(async (resolve, reject) => {
          try {
            let response = processResponse(await updateUser(data));
            const {data: userData} = response;
            console.log('-----> response', userData);

            return resolve({user: userData});
          } catch (error) {
            let errorMessage = processError(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return reject(errorMessage);
          }
        }),
      }),
  };
}
