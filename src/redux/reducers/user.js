import { SET_USER_DATA, SIGN_UP_INIT, SIGN_UP, LOGIN_INIT, LOGIN } from './../actions/actionTypes';

const initialState = {
  user: undefined,
  roles: [],
  token: undefined,
  loading: false,
  authenticated: false,
  confirmation: undefined,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case `${SET_USER_DATA}_FULFILLED`:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };


    // case `${SIGN_UP_INIT}_PENDING`:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // case `${SIGN_UP_INIT}_FULFILLED`:
    //   return {
    //     ...state,
    //     loading: false,
    //     confirmation: action.payload,
    //   };
    // case `${SIGN_UP_INIT}_REJECTED`:
    //   return {
    //     ...state,
    //     loading: false,
    //   };

    // case `${SIGN_UP}_PENDING`:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // case `${SIGN_UP}_FULFILLED`:
    //   return {
    //     ...state,
    //     loading: false,
    //     user: action.payload,
    //     authenticated: true,
    //   };
    // case `${SIGN_UP}_REJECTED`:
    //   return {
    //     ...state,
    //     loading: false,
    //   };

    case `${LOGIN_INIT}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${LOGIN_INIT}_FULFILLED`:
      return {
        ...state,
        loading: false,
        confirmation: action.payload.confirmation,
        user: action.payload.user,
        roles: action.payload.roles,
        token: action.payload.token,
      };
    case `${LOGIN_INIT}_REJECTED`:
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
      return {
        ...state,
        loading: false,
        authenticated: true,
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
