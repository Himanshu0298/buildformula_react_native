import {
  GET_RD_FILES,
  GET_RD_FOLDERS,
  GET_SELECTED_PROJECT,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  folders: [],
  files: {},
};

export default (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    // RESET data on project change
    case `${GET_SELECTED_PROJECT}_PENDING`:
      return {
        ...initialState,
      };

    case `${GET_RD_FOLDERS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_RD_FOLDERS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        folders: payload,
      };
    }
    case `${GET_RD_FOLDERS}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${GET_RD_FILES}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_RD_FILES}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        files: payload,
      };
    }
    case `${GET_RD_FILES}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
