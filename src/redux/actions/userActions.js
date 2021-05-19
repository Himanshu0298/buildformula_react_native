import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import useAuth from '../../services/user';
import {useResProcessor} from 'utils/responseProcessor';
import {useSnackbar} from 'components/Atoms/Snackbar';

export default function useUserActions() {
  const dispatch = useDispatch();
  const {login, signUp, updateUser} = useAuth();
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
            const response = _res(await login(data));
            const {data: userData} = response;
            console.log('----->login response', userData);

            return Promise.resolve({user: userData});
          } catch (error) {
            const {data: userData = {}} = error?.response?.data || {};
            const {email} = userData;
            if (email) {
              return Promise.resolve({user: userData});
            } else {
              return Promise.reject('Invalid email or password');
            }
          }
        },
      }),
    selectRole: data =>
      dispatch({
        type: types.SELECT_ROLE,
        payload: async () => {
          try {
            const response = _res(await updateUser(data));
            const {data: userData} = response;
            console.log('-----> response', userData);

            return Promise.resolve({user: userData});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
  };
}
