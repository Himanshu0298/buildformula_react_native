import auth from '@react-native-firebase/auth';
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
    // signup: user => dispatch({
    //   type: types.SIGN_UP,
    //   payload: new Promise(async (resolve, reject) => {
    //     const { email, password } = user;

    //     const emailCredentials = auth.EmailAuthProvider.credential(email, password);
    //     const userCredential = await auth().currentUser.linkWithCredential(emailCredentials);
    //     await writeUserData(userCredential.user.uid, {
    //       ...user,
    //       userId: userCredential.user.uid,
    //       created: new Date(),
    //     });

    //     resolve(userCredential.user);
    //   }),
    // }),
    loginInit: data => dispatch({
      type: types.LOGIN_INIT,
      payload: new Promise(async (resolve, reject) => {
        try {
          let response = await login(data);
          const { user, roles, token } = response.data.success;

          const confirmation = await auth().signInWithPhoneNumber('+919687031045');

          return resolve({ user, roles, token, confirmation });
        } catch (error) {
          console.log('-----> error', error.data);
          return reject(error);
        }
      }),
    }),
    login: authenticated => dispatch({
      type: types.LOGIN,
      payload: new Promise(async (resolve, reject) => {

        return resolve();
      }),
    }),
  });
}
