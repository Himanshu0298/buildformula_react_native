import * as types from './actionTypes';
import { useDispatch } from 'react-redux';
import useAuth from '../../services/user';

export default function useAuthActions() {
  const dispatch = useDispatch();
  const { login, signUp } = useAuth();

  return ({
    // signUpInit: data => dispatch({
    //   type: types.SIGN_UP_INIT,
    //   payload: new Promise(async (resolve, reject) => {
    //     const { phone } = data;
    //     let existingUser;
    //     await userDbRef
    //       .orderByChild('phone')
    //       .equalTo(phone)
    //       .once('value', snap => { existingUser = snap.val(); });

    //     if (existingUser) {
    //       reject('User already registered, Would you like to login instead');
    //     }
    //     const confirmation = await auth().signInWithPhoneNumber(phone);
    //     resolve(confirmation);
    //   }),
    // }),
    signUp: user => dispatch({
      type: types.SIGN_UP,
      payload: new Promise(async (resolve, reject) => {
        try {
          let response = await signUp(user);
          const { data: userData } = response.data;
          console.log('-----> response', userData);

          return resolve({ user: userData });
        } catch (error) {
          const { msg } = error?.response?.data;
          return reject(msg);
        }
      }),
    }),
    login: data => dispatch({
      type: types.LOGIN,
      payload: new Promise(async (resolve, reject) => {
        try {
          let response = await login(data);
          const { data: userData } = response.data;
          console.log('-----> response', userData);

          return resolve({ user: userData });
        } catch (error) {
          const { data: userData = {} } = error?.response?.data;
          const { email } = userData;
          if (email) {
            return resolve({ user: userData });
          }
          else {
            return reject('Invalid email or password');
          }
        }
      }),
    }),
  });
}

