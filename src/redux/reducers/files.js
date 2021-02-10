import {
  GET_FOLDERS,
  SET_INITIAL_STATE,
  CREATE_FOLDER,
} from './../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  filesData: {},
};

export default (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case SET_INITIAL_STATE:
      //TODO:update loading only if true
      return {
        ...state,
        loading: false,
      };

    case `${GET_FOLDERS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_FOLDERS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        filesData: payload,
      };
    }
    case `${GET_FOLDERS}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case `${CREATE_FOLDER}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${CREATE_FOLDER}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        filesData: payload,
      };
    }
    case `${CREATE_FOLDER}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
