import * as types from './actionTypes';
import { useDispatch } from 'react-redux';
import useAuth from '../../services/auth';

export default function useAuthActions() {
  const dispatch = useDispatch();
  const { login } = useAuth();
  return ({
    // signUpInit: data => dispatch({
    //   type: types.SIGN_UP_INIT,
    //   payload: new Promise(async (resolve, reject) => {
    //     const { phone } = data;
    //     let existingUser;

    //     if (existingUser) {
    //       reject('User already registered, Would you like to login instead');
    //     }
    //     const confirmation = true;
    //     resolve(confirmation);
    //   }),
    // }),
    signUp: user => dispatch({
      type: types.SIGN_UP,
      payload: new Promise(async (resolve, reject) => {
        const { email, password } = user;


        resolve();
      }),
    }),
    // loginInit: data => dispatch({
    //   type: types.LOGIN_INIT,
    //   payload: new Promise(async (resolve, reject) => {

    //     let response = await login(data);

    //     console.log('----->response ', response)


    //   }),
    // }),
    login: data => dispatch({
      type: types.LOGIN,
      payload: new Promise(async (resolve, reject) => {
        try {
          let response = await login(data);
          const { user, roles, token } = response.data.success;

          return resolve({ user, roles, token });
        } catch (error) {
          return reject(error);
        }
      }),
    }),
  });
}
