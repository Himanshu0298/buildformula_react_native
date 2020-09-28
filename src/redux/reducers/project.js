import {CREATE_PROJECT} from './../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  projects: [],
  project: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case `${CREATE_PROJECT}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${CREATE_PROJECT}_FULFILLED`:
      console.log('-----> action.payload', action.payload);
      return {
        ...state,
        project: action.payload,
        loading: false,
      };
    case `${CREATE_PROJECT}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
