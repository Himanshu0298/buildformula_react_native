import {
  SET_INITIAL_STATE,
  GET_VISITORS,
  GET_FOLLOWUP_LIST,
} from './../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  visitors: [],
  followups: [],
  bhkOptions: {},
  occupationOptions: [],
  inquiryOptions: [],
  assignOptions: [],
  visitorAnalytics: {},
  visitorSuggestions: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_INITIAL_STATE:
      //TODO:update loading only if true
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

    case `${GET_FOLLOWUP_LIST}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_FOLLOWUP_LIST}_FULFILLED`:
      return {
        ...state,
        loading: false,
        followups: action.payload.data,
      };
    case `${GET_FOLLOWUP_LIST}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
