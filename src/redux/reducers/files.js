import {GET_FOLDERS, CREATE_FOLDER} from './../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  filesData: {},
};

export default (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
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
