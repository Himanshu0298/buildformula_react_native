import {
  GET_ALL_NOTIFICATIONS,
  GET_PROJECT_NOTIFICATIONS,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  allNotifications: [],
  projectNotifications: {},
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case `${GET_ALL_NOTIFICATIONS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_ALL_NOTIFICATIONS}_FULFILLED`:
      return {
        ...state,
        allNotifications: payload.data.allnotifications,
        loading: false,
      };
    case `${GET_ALL_NOTIFICATIONS}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    case `${GET_PROJECT_NOTIFICATIONS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_PROJECT_NOTIFICATIONS}_FULFILLED`:
      return {
        ...state,
        projectNotifications: payload.data.list,
        loading: false,
      };
    case `${GET_PROJECT_NOTIFICATIONS}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export default reducer;
