import {
  SELECT_ROLE,
  SIGN_UP,
  LOGIN,
  VERIFY_OTP,
  SET_INITIAL_STATE,
} from './../actions/actionTypes';

const initialState = {
  user: undefined,
  token: undefined,
  loading: false,
  authenticated: false,
  selectedLanguage: 'en',
};

export default (state = initialState, action = {}) => {
  const {type, payload} = action;
  console.log('-----> type', type);

  switch (type) {
    case SET_INITIAL_STATE:
      return {
        ...state,
        loading: false,
      };

    case `${LOGIN}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${LOGIN}_FULFILLED`: {
      const {user} = payload;
      return {
        ...state,
        loading: false,
        user: user.user,
        token: user.token,
        authenticated: true,
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

    case `${SELECT_ROLE}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${SELECT_ROLE}_FULFILLED`:
      return {
        ...state,
        loading: false,
        // authenticated: true,
        //TODO: enable this once user data is returned in response
        // user: payload.user,
      };
    case `${SELECT_ROLE}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
