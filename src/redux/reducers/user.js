import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {
  SELECT_ROLE,
  SIGN_UP,
  LOGIN,
  VERIFY_OTP,
  SEND_FORGET_PASSWORD_OTP,
  UPDATE_USER,
} from './../actions/actionTypes';

const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
  blacklist: ['loading', 'errorMessage'],
};

const initialState = {
  user: undefined,
  token: undefined,
  loading: false,
  authenticated: false,
  selectedLanguage: 'en',
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  console.log('-----> type', type);

  switch (type) {
    case `${LOGIN}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${LOGIN}_FULFILLED`: {
      const {user, token} = payload?.data;
      const {otp_verified, email_verified, default_role_id} = user;
      let authenticated = true;

      if (
        otp_verified === 'N' ||
        email_verified === 'N' ||
        default_role_id === 0
      ) {
        authenticated = false;
      }

      return {
        ...state,
        loading: false,
        user,
        token,
        authenticated,
      };
    }
    case `${LOGIN}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${SIGN_UP}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${SIGN_UP}_FULFILLED`:
      return {
        ...state,
        loading: false,
        user: payload.user,
        token: payload.token,
      };
    case `${SIGN_UP}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${VERIFY_OTP}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${VERIFY_OTP}_FULFILLED`:
      return {
        ...state,
        loading: false,
        authenticated: true,
      };
    case `${VERIFY_OTP}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${SEND_FORGET_PASSWORD_OTP}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${SEND_FORGET_PASSWORD_OTP}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };
    case `${SEND_FORGET_PASSWORD_OTP}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${SELECT_ROLE}_PENDING`:
    case `${UPDATE_USER}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${SELECT_ROLE}_FULFILLED`:
    case `${UPDATE_USER}_FULFILLED`:
      return {
        ...state,
        loading: false,
        user: payload.data,
      };
    case `${SELECT_ROLE}_REJECTED`:
    case `${UPDATE_USER}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
