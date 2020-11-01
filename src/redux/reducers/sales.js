import {SET_INITIAL_STATE, GET_VISITORS} from './../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  visitors: [],
  followups: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_INITIAL_STATE:
      //TODO:update loading if true
      return {
        ...state,
        loading: false,
      };

    case `${GET_VISITORS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_VISITORS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        visitors: action.payload,
      };
    case `${GET_VISITORS}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
