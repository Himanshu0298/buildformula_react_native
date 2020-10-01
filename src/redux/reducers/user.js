import {
  SELECT_ROLE,
  SIGN_UP,
  LOGIN,
  VERIFY_OTP,
} from './../actions/actionTypes';

const initialState = {
  user: undefined,
  token: undefined,
  loading: false,
  authenticated: false,
};

export default (state = initialState, action = {}) => {
  console.log('-----> action.type', action.type);
  switch (action.type) {
    case 'persist/REHYDRATE':
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
      const {user} = action.payload;
      return {
        ...state,
        loading: false,
        user: user.user,
        token: user.token,
        // authenticated: user.default_role_id !== 0,
      };
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
        // user: action.payload.user,
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
