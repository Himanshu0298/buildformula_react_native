import {GET_FOLDERS, CREATE_FOLDER, GET_FILES} from './../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  folders: {},
  files: {},
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
        folders: {...state.folders, [payload.index_of]: payload.data},
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
      };
    }
    case `${CREATE_FOLDER}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case `${GET_FILES}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_FILES}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        files: {...state.files, [payload.folder_id]: payload.data},
      };
    }
    case `${GET_FILES}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
