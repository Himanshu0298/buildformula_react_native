import * as types from './actionTypes';
import { useDispatch } from 'react-redux';

export default function useAuthActions() {
  const dispatch = useDispatch();
  return ({
    signUpInit: data => dispatch({
      type: types.SIGN_UP_INIT,
      payload: new Promise(async (resolve, reject) => {
        const { phone } = data;
        let existingUser;

        if (existingUser) {
          reject('User already registered, Would you like to login instead');
        }
        const confirmation = true;
        resolve(confirmation);
      }),
    }),
    signup: user => dispatch({
      type: types.SIGN_UP,
      payload: new Promise(async (resolve, reject) => {
        const { email, password } = user;


        resolve();
      }),
    }),
    loginInit: data => dispatch({
      type: types.LOGIN_INIT,
      payload: new Promise(async (resolve, reject) => {

        let existingUser;

        if (!existingUser) {
          reject({
            code: 400,
            message: "User doesn't exist, Would you like to register instead?",
          });
        }
        else {
          let userId = Object.keys(existingUser)[0];
          let userData = existingUser[userId];

          if (data.password !== userData.password) {
            reject({
              code: 203,
              message: 'Invalid Username/Password',
            });
          } else {

            resolve();
          }
        }
      }),
    }),
    login: data => dispatch({
      type: types.LOGIN,
      payload: new Promise(async (resolve, reject) => {
        const user = {};

        resolve(user);
      }),
    }),
  });
}
