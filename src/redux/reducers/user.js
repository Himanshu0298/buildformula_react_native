import { SET_USER_DATA, SIGN_UP_INIT, SIGN_UP, LOGIN_INIT, LOGIN, SEND_OTP, VERIFY_OTP } from './../actions/actionTypes';

const initialState = {
  user: undefined,
  roles: [],
  token: undefined,
  loading: false,
  authenticated: false,
  confirmation: undefined,
};

export default (state = initialState, action = {}) => {
  console.log('-----> action.type', action.type);
  switch (action.type) {

    case 'persist/REHYDRATE':
      return {
        ...state,
        loading: false,
      };

    case `${SET_USER_DATA}_FULFILLED`:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
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
        user: action.payload.user,
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
      };
    case `${VERIFY_OTP}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${LOGIN}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${LOGIN}_FULFILLED`:
      console.log('----->  action.payload', action.payload)
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    case `${LOGIN}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
