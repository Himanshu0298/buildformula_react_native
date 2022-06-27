import {
  ADD_NEW_RD_VERSION,
  CREATE_RD_FOLDER,
  DELETE_RD_FILES,
  DELETE_RD_FOLDER,
  GET_RD_FILES,
  GET_RD_FOLDERS,
  GET_RD_FOLDER_ACTIVITIES,
  GET_SELECTED_PROJECT,
  RENAME_RD_FILES,
  RENAME_RD_FOLDER,
  UPLOAD_RD_FILES,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  folders: [],
  files: {},
  activities: [],
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

    case `${GET_RD_FOLDER_ACTIVITIES}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_RD_FOLDER_ACTIVITIES}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        activities: Object.values(payload).flat(),
      };
    }
    case `${GET_RD_FOLDER_ACTIVITIES}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${CREATE_RD_FOLDER}_PENDING`:
    case `${UPLOAD_RD_FILES}_PENDING`:
    case `${RENAME_RD_FOLDER}_PENDING`:
    case `${DELETE_RD_FOLDER}_PENDING`:
    case `${RENAME_RD_FILES}_PENDING`:
    case `${DELETE_RD_FILES}_PENDING`:
    case `${ADD_NEW_RD_VERSION}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${CREATE_RD_FOLDER}_FULFILLED`:
    case `${UPLOAD_RD_FILES}_FULFILLED`:
    case `${RENAME_RD_FOLDER}_FULFILLED`:
    case `${DELETE_RD_FOLDER}_FULFILLED`:
    case `${RENAME_RD_FILES}_FULFILLED`:
    case `${DELETE_RD_FILES}_FULFILLED`:
    case `${ADD_NEW_RD_VERSION}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };

    case `${CREATE_RD_FOLDER}_REJECTED`:
    case `${UPLOAD_RD_FILES}_REJECTED`:
    case `${RENAME_RD_FOLDER}_REJECTED`:
    case `${DELETE_RD_FOLDER}_REJECTED`:
    case `${RENAME_RD_FILES}_REJECTED`:
    case `${DELETE_RD_FILES}_REJECTED`:
    case `${ADD_NEW_RD_VERSION}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
