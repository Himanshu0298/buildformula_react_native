import {
  ADD_NEW_RD_VERSION,
  CREATE_RD_FOLDER,
  DELETE_PARKING_FILE,
  DELETE_RD_FILES,
  DELETE_RD_FOLDER,
  GET_BUNGALOW_UNIT_SHEET,
  GET_CATEGORY_BUNGALOW_SHEET,
  GET_CATEGORY_PLOT_SHEET,
  GET_CATEGORY_TOWER_SHEET,
  GET_PARKING_LIST,
  GET_PLOT_UNIT_SHEET,
  GET_PROJECT_AREA_SHEET,
  GET_RD_FILES,
  GET_RD_FOLDERS,
  GET_RD_FOLDER_ACTIVITIES,
  GET_SELECTED_PROJECT,
  GET_UNIT_TOWER_SHEET,
  RENAME_RD_FILES,
  RENAME_RD_FOLDER,
  UPDATE_AREA_SHEET,
  UPDATE_BUNGALOW_UNIT_SHEET,
  UPDATE_CATEGORY_BUNGALOW_SHEET,
  UPDATE_CATEGORY_PLOT_SHEET,
  UPDATE_CATEGORY_TOWER_SHEET,
  UPDATE_PLOT_UNIT_SHEET,
  UPDATE_UNIT_TOWER_SHEET,
  UPLOAD_PARKING_FILE,
  UPLOAD_RD_FILES,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  folders: [],
  files: {},
  activities: [],
  projectAreaSheet: {},
  towerList: {},
  bungalowList: {},
  parkingList: {},
  plotList: {},
  unitTowerList: {},
  unitBungalowList: {},
  unitPlotList: [],
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

    // To do

    case `${GET_PROJECT_AREA_SHEET}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_PROJECT_AREA_SHEET}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        projectAreaSheet: payload,
      };
    }
    case `${GET_PROJECT_AREA_SHEET}_REJECTED`:
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

    // Unit Sheet

    case `${GET_UNIT_TOWER_SHEET}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_UNIT_TOWER_SHEET}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        unitTowerList: payload.data || {},
      };
    }
    case `${GET_UNIT_TOWER_SHEET}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case `${GET_BUNGALOW_UNIT_SHEET}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_BUNGALOW_UNIT_SHEET}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        unitBungalowList: payload.data || {},
      };
    }
    case `${GET_BUNGALOW_UNIT_SHEET}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case `${GET_PLOT_UNIT_SHEET}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_PLOT_UNIT_SHEET}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        unitPlotList: payload,
      };
    }
    case `${GET_PLOT_UNIT_SHEET}_REJECTED`:
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

    case `${UPDATE_PLOT_UNIT_SHEET}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${UPDATE_PLOT_UNIT_SHEET}_FULFILLED`: {
      const {unitPlotList} = state;
      console.log('-------->unitPlotList', unitPlotList);
      const index = unitPlotList.findIndex(
        i => i.project_main_units_id === payload.project_main_units_id,
      );

      if (index > -1) {
        unitPlotList[index] = payload;
      }

      return {
        ...state,
        loading: false,
        unitPlotList: [...unitPlotList],
      };
    }
    case `${UPDATE_PLOT_UNIT_SHEET}_REJECTED`:
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
    case `${UPDATE_AREA_SHEET}_PENDING`:
    case `${UPDATE_CATEGORY_TOWER_SHEET}_PENDING`:
    case `${UPDATE_CATEGORY_BUNGALOW_SHEET}_PENDING`:
    case `${UPLOAD_PARKING_FILE}_PENDING`:
    case `${DELETE_PARKING_FILE}_PENDING`:
    case `${UPDATE_CATEGORY_PLOT_SHEET}_PENDING`:
    case `${UPDATE_BUNGALOW_UNIT_SHEET}_PENDING`:
    case `${UPDATE_UNIT_TOWER_SHEET}_PENDING`:
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
    case `${UPDATE_AREA_SHEET}_FULFILLED`:
    case `${ADD_NEW_RD_VERSION}_FULFILLED`:
    case `${UPDATE_CATEGORY_TOWER_SHEET}_FULFILLED`:
    case `${UPDATE_CATEGORY_BUNGALOW_SHEET}_FULFILLED`:
    case `${UPLOAD_PARKING_FILE}_FULFILLED`:
    case `${DELETE_PARKING_FILE}_FULFILLED`:
    case `${UPDATE_CATEGORY_PLOT_SHEET}_FULFILLED`:
    case `${UPDATE_BUNGALOW_UNIT_SHEET}_FULFILLED`:
    case `${UPDATE_UNIT_TOWER_SHEET}_FULFILLED`:
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
    case `${UPDATE_AREA_SHEET}_REJECTED`:
    case `${ADD_NEW_RD_VERSION}_REJECTED`:
    case `${UPDATE_CATEGORY_TOWER_SHEET}_REJECTED`:
    case `${UPDATE_CATEGORY_BUNGALOW_SHEET}_REJECTED`:
    case `${UPLOAD_PARKING_FILE}_REJECTED`:
    case `${DELETE_PARKING_FILE}_REJECTED`:
    case `${UPDATE_CATEGORY_PLOT_SHEET}_REJECTED`:
    case `${UPDATE_BUNGALOW_UNIT_SHEET}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
