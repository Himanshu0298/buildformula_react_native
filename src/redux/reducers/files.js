import {
  GET_FOLDERS,
  CREATE_FOLDER,
  RENAME_FOLDER,
  DELETE_FOLDER,
  GET_FILES,
  UPLOAD_FILE,
  RENAME_FILE,
  DELETE_FILE,
  GET_VERSION,
  GET_SELECTED_PROJECT,
  SHARE_FOLDER_WITH_USERS,
  SHARE_FILE_WITH_USERS,
  GET_FILE_ACTIVITIES,
  ADD_NEW_VERSION,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  folders: {},
  files: {},
  versionData: [],
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

    case `${GET_VERSION}_PENDING`:
      return {
        ...state,
        loading: true,
        versionData: [],
      };
    case `${GET_VERSION}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        versionData: payload.data,
      };
    }
    case `${GET_VERSION}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${GET_FILE_ACTIVITIES}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_FILE_ACTIVITIES}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        activities: payload.data,
      };
    }
    case `${GET_FILE_ACTIVITIES}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${RENAME_FOLDER}_PENDING`:
    case `${CREATE_FOLDER}_PENDING`:
    case `${RENAME_FILE}_PENDING`:
    case `${UPLOAD_FILE}_PENDING`:
    case `${DELETE_FOLDER}_PENDING`:
    case `${DELETE_FILE}_PENDING`:
    case `${SHARE_FOLDER_WITH_USERS}_PENDING`:
    case `${SHARE_FILE_WITH_USERS}_PENDING`:
    case `${ADD_NEW_VERSION}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${CREATE_FOLDER}_FULFILLED`:
    case `${RENAME_FOLDER}_FULFILLED`:
    case `${RENAME_FILE}_FULFILLED`:
    case `${UPLOAD_FILE}_FULFILLED`:
    case `${DELETE_FOLDER}_FULFILLED`:
    case `${DELETE_FILE}_FULFILLED`:
    case `${SHARE_FOLDER_WITH_USERS}_FULFILLED`:
    case `${SHARE_FILE_WITH_USERS}_FULFILLED`:
    case `${ADD_NEW_VERSION}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };

    case `${CREATE_FOLDER}_REJECTED`:
    case `${RENAME_FOLDER}_REJECTED`:
    case `${RENAME_FILE}_REJECTED`:
    case `${UPLOAD_FILE}_REJECTED`:
    case `${DELETE_FILE}_REJECTED`:
    case `${DELETE_FOLDER}_REJECTED`:
    case `${SHARE_FOLDER_WITH_USERS}_REJECTED`:
    case `${SHARE_FILE_WITH_USERS}_REJECTED`:
    case `${ADD_NEW_VERSION}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
