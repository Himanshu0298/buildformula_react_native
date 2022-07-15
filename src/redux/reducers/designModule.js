import {
  ADD_NEW_RD_VERSION,
  CREATE_RD_FOLDER,
  DELETE_PARKING_FILE,
  DELETE_RD_FILES,
  DELETE_RD_FOLDER,
  GET_CATEGORY_BUNGALOW_SHEET,
  GET_CATEGORY_PLOT_SHEET,
  GET_CATEGORY_TOWER_SHEET,
  GET_PARKING_LIST,
  GET_RD_FILES,
  GET_RD_FOLDERS,
  GET_RD_FOLDER_ACTIVITIES,
  GET_SELECTED_PROJECT,
  RENAME_RD_FILES,
  RENAME_RD_FOLDER,
  UPDATE_AREA_SHEET,
  UPDATE_CATEGORY_BUNGALOW_SHEET,
  UPDATE_CATEGORY_PLOT_SHEET,
  UPDATE_CATEGORY_TOWER_SHEET,
  UPLOAD_PARKING_FILE,
  UPLOAD_RD_FILES,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  folders: [],
  files: {},
  activities: [],
  areaSheet: {},
  towerList: {},
  bungalowList: {},
  parkingList: {},
  plotList: {},
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

    case `${UPDATE_AREA_SHEET}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${UPDATE_AREA_SHEET}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        areaSheet: payload,
      };
    }
    case `${UPDATE_AREA_SHEET}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case `${GET_CATEGORY_TOWER_SHEET}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_CATEGORY_TOWER_SHEET}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        towerList: payload.data || {},
      };
    }
    case `${GET_CATEGORY_TOWER_SHEET}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case `${GET_CATEGORY_BUNGALOW_SHEET}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_CATEGORY_BUNGALOW_SHEET}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        bungalowList: payload.data || {},
      };
    }
    case `${GET_CATEGORY_BUNGALOW_SHEET}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case `${GET_CATEGORY_PLOT_SHEET}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_CATEGORY_PLOT_SHEET}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        plotList: payload.data || {},
      };
    }
    case `${GET_CATEGORY_PLOT_SHEET}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${GET_PARKING_LIST}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_PARKING_LIST}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        parkingList: payload.data || {},
      };
    }
    case `${GET_PARKING_LIST}_REJECTED`:
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
    case `${UPDATE_CATEGORY_TOWER_SHEET}_PENDING`:
    case `${UPDATE_CATEGORY_BUNGALOW_SHEET}_PENDING`:
    case `${UPLOAD_PARKING_FILE}_PENDING`:
    case `${DELETE_PARKING_FILE}_PENDING`:
    case `${UPDATE_CATEGORY_PLOT_SHEET}_PENDING`:
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
    case `${UPDATE_CATEGORY_TOWER_SHEET}_FULFILLED`:
    case `${UPDATE_CATEGORY_BUNGALOW_SHEET}_FULFILLED`:
    case `${UPLOAD_PARKING_FILE}_FULFILLED`:
    case `${DELETE_PARKING_FILE}_FULFILLED`:
    case `${UPDATE_CATEGORY_PLOT_SHEET}_FULFILLED`:
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
    case `${UPDATE_CATEGORY_TOWER_SHEET}_REJECTED`:
    case `${UPDATE_CATEGORY_BUNGALOW_SHEET}_REJECTED`:
    case `${UPLOAD_PARKING_FILE}_REJECTED`:
    case `${DELETE_PARKING_FILE}_REJECTED`:
    case `${UPDATE_CATEGORY_PLOT_SHEET}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
