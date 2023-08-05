import {
  ADD_FD_FLOOR_FOLDER,
  ADD_FD_FLOOR_FOLDER_FILE,
  ADD_FD_PLOT_FILES,
  ADD_FD_TOWER_FILES,
  ADD_FD_TOWER_ROWS,
  ADD_RD_VERSION,
  CREATE_RD_FOLDER,
  DELETE_FD_BUNGALOWS_FILES,
  DELETE_FD_TOWER_FILE,
  DELETE_FD_TOWER_ROWS,
  DELETE_PARKING_FILE,
  DELETE_RD_FILES,
  DELETE_RD_FOLDER,
  DELETE_RD_VERSION,
  FD_TOWER_ACTIVITY_LOG,
  FD_TOWER_FLOOR_FILE,
  FD_TOWER_FLOOR_FOLDER,
  GET_BUNGALOW_UNIT_SHEET,
  GET_CATEGORY_BUNGALOW_SHEET,
  GET_CATEGORY_PLOT_SHEET,
  GET_CATEGORY_TOWER_SHEET,
  GET_FD_BUNGALOWS,
  GET_FD_BUNGALOWS_FILES,
  GET_FD_FLOOR_FILE_VERSION,
  GET_FD_FLOOR_FOLDER_FILE_ACTIVITY,
  GET_FD_PLOTS,
  GET_FD_TOWERS,
  GET_FD_TOWER_FLOORS,
  GET_PARKING_LIST,
  GET_PLOT,
  GET_PLOT_FILE,
  GET_PLOT_UNIT_SHEET,
  GET_PROJECT_AREA_SHEET,
  GET_RD_FILES,
  GET_RD_FOLDERS,
  GET_RD_FOLDER_ACTIVITIES,
  GET_RD_VERSION,
  GET_SELECTED_PROJECT,
  GET_UNIT_TOWER_SHEET,
  GET_WD_BUNGALOWS_LIST,
  GET_WD_FLOOR_FILE_VERSION,
  GET_WD_FLOOR_FOLDER,
  GET_WD_FLOOR_FOLDER_FILE,
  GET_WD_FLOOR_FOLDER_FILE_VERSION,
  GET_WD_FOLDER_FILE_ACTIVITY,
  GET_WD_PLOT,
  GET_WD_PLOTS,
  GET_WD_TOWER,
  GET_WD_TOWER_VERSION,
  GET_WD_VERSION,
  REARRANGE_FD_FLOOR_ROWS,
  RENAME_FD_BUNGALOWS_FILES,
  RENAME_FD_TOWER_FILE,
  RENAME_RD_FILES,
  RENAME_RD_FOLDER,
  UPDATE_AREA_SHEET,
  UPDATE_BUNGALOW_UNIT_SHEET,
  UPDATE_CATEGORY_BUNGALOW_SHEET,
  UPDATE_CATEGORY_PLOT_SHEET,
  UPDATE_CATEGORY_TOWER_SHEET,
  UPDATE_FD_TOWER_ROWS,
  UPDATE_PARKING_LIST,
  UPDATE_PLOT_UNIT_SHEET,
  UPDATE_TOWER_FILE_VERSION,
  UPDATE_UNIT_TOWER_SHEET,
  UPLOAD_BUNGALOWS_FILES,
  UPLOAD_FD_BUNGALOW_TOWER_FILE_VERSION,
  UPLOAD_PARKING_FILE,
  UPLOAD_RD_FILES,
  WD_FILE_ACTIVITY_LOG,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  folders: [],
  files: {},
  activities: [],
  projectAreaSheet: {},
  towerList: [],
  bungalowList: {},
  parkingList: {},
  plotList: [],
  unitTowerList: [],
  unitBungalowList: [],
  unitPlotList: [],
  versionData: [],
  fdTowers: {},
  fdTowerFloorsList: [],
  fdBungalowsList: [],
  fdBungalowsFilesList: [],
  fdPlots: {},
  wdPlotList: {},
  wdTower: {},
  towerFolderList: [],
  towerFileList: [],
  towerFileActivities: {},
  wdFileActivities: {},
  plots: {},
  wdBungalows: {},
  plotFiles: {},
  wdTowerFile: {},
  wdFolderList: [],
  wdFolderFilesList: [],
  wdFolderFileVersion: [],
  version: [],
  wdTowerVersion: [],
  fdVersionData: [],
  wdVersion: [],
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
    case `${GET_RD_VERSION}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_RD_VERSION}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        versionData: payload.data || {},
      };
    }
    case `${GET_RD_VERSION}_REJECTED`:
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

    case `${GET_FD_TOWERS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        fdTowers: payload,
      };
    }
    case `${GET_FD_TOWER_FLOORS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        fdTowerFloorsList: payload,
      };
    }
    case `${GET_FD_FLOOR_FILE_VERSION}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        fdVersionData: payload,
      };
    }
    case `${FD_TOWER_FLOOR_FOLDER}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        towerFolderList: payload,
      };
    }

    case `${FD_TOWER_FLOOR_FILE}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        towerFileList: payload,
      };
    }
    case `${GET_FD_BUNGALOWS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        fdBungalowsList: payload,
      };
    }
    case `${GET_FD_BUNGALOWS_FILES}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        fdBungalowsFilesList: payload,
      };
    }
    case `${GET_FD_PLOTS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        fdPlots: payload,
      };
    }
    case `${GET_WD_PLOTS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        wdPlotList: payload.data,
      };
    }
    case `${GET_WD_FLOOR_FOLDER_FILE_VERSION}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        wdFolderFileVersion: payload.data,
      };
    }
    case `${GET_WD_FLOOR_FILE_VERSION}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        version: payload.data,
      };
    }
    case `${GET_WD_FLOOR_FOLDER}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        wdFolderList: payload.data,
      };
    }
    case `${GET_WD_TOWER_VERSION}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        wdTowerVersion: payload.data,
      };
    }
    case `${GET_WD_TOWER}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        wdTowerFile: payload.data,
      };
    }
    case `${GET_WD_PLOT}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        wdTower: payload.data,
      };
    }
    case `${GET_PLOT_FILE}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        plotFiles: payload.data,
      };
    }
    case `${GET_PLOT}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        plots: payload.data,
      };
    }
    case `${GET_WD_BUNGALOWS_LIST}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        wdBungalows: payload.data,
      };
    }
    case `${GET_WD_VERSION}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        wdVersion: payload.data,
      };
    }

    case `${FD_TOWER_ACTIVITY_LOG}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        towerFileActivities: payload.data,
      };
    }
    case `${WD_FILE_ACTIVITY_LOG}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        wdFileActivities: payload.data,
      };
    }
    case `${GET_WD_FOLDER_FILE_ACTIVITY}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        wdFileActivities: payload.data,
      };
    }
    case `${GET_FD_FLOOR_FOLDER_FILE_ACTIVITY}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        wdFileActivities: payload.data,
      };
    }

    case `${GET_WD_FLOOR_FOLDER_FILE}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        wdFolderFilesList: payload.data,
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
        towerList: payload.data || [],
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
        plotList: payload.data || [],
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
        unitBungalowList: payload.data || [],
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

    case `${UPDATE_BUNGALOW_UNIT_SHEET}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${UPDATE_BUNGALOW_UNIT_SHEET}_FULFILLED`: {
      const {unitBungalowList} = state;
      const {unit_sheet_bungalow_data} = state.unitBungalowList || {};
      const index = unit_sheet_bungalow_data.findIndex(
        i => i.project_main_units_id === payload.project_main_units_id,
      );

      if (index > -1) {
        unitBungalowList.unit_sheet_bungalow_data[index] = payload;
      }

      return {
        ...state,
        loading: false,
        unitBungalowList: {...unitBungalowList},
      };
    }
    case `${UPDATE_BUNGALOW_UNIT_SHEET}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${UPDATE_UNIT_TOWER_SHEET}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${UPDATE_UNIT_TOWER_SHEET}_FULFILLED`: {
      const {unitTowerList} = state;

      const {unit_sheet_towers_data} = unitTowerList || {};

      const index = unit_sheet_towers_data.findIndex(
        i => i.project_main_units_id === payload.project_main_units_id,
      );

      if (index > -1) {
        unitTowerList.unit_sheet_towers_data[index] = payload;
      }

      return {
        ...state,
        loading: false,
        unitTowerList: {...unitTowerList},
      };
    }
    case `${UPDATE_UNIT_TOWER_SHEET}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${UPDATE_CATEGORY_PLOT_SHEET}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${UPDATE_CATEGORY_PLOT_SHEET}_FULFILLED`: {
      const {plotList} = state;

      plotList.category_sheet_plot_data = {...payload};

      return {
        ...state,
        loading: false,
        plotList: {...plotList},
      };
    }
    case `${UPDATE_CATEGORY_PLOT_SHEET}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${UPDATE_CATEGORY_BUNGALOW_SHEET}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${UPDATE_CATEGORY_BUNGALOW_SHEET}_FULFILLED`: {
      const {bungalowList} = state;
      bungalowList.category_sheet_bungalow_data = {...payload};

      return {
        ...state,
        loading: false,
        bungalowList: {...bungalowList},
      };
    }
    case `${UPDATE_CATEGORY_BUNGALOW_SHEET}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${UPDATE_CATEGORY_TOWER_SHEET}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${UPDATE_CATEGORY_TOWER_SHEET}_FULFILLED`: {
      const {towerList} = state;

      towerList.category_sheet_towers_data = {...payload};

      return {
        ...state,
        loading: false,
        towerList: {...towerList},
      };
    }
    case `${UPDATE_CATEGORY_TOWER_SHEET}_REJECTED`:
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
    case `${UPDATE_AREA_SHEET}_PENDING`:
    case `${UPLOAD_PARKING_FILE}_PENDING`:
    case `${DELETE_PARKING_FILE}_PENDING`:
    case `${UPDATE_PARKING_LIST}_PENDING`:
    case `${ADD_RD_VERSION}_PENDING`:
    case `${GET_FD_TOWERS}_PENDING`:
    case `${DELETE_RD_VERSION}_PENDING`:
    case `${ADD_FD_TOWER_FILES}_PENDING`:
    case `${GET_FD_TOWER_FLOORS}_PENDING`:
    case `${ADD_FD_TOWER_ROWS}_PENDING`:
    case `${UPDATE_FD_TOWER_ROWS}_PENDING`:
    case `${DELETE_FD_TOWER_ROWS}_PENDING`:
    case `${RENAME_FD_TOWER_FILE}_PENDING`:
    case `${DELETE_FD_TOWER_FILE}_PENDING`:
    case `${FD_TOWER_ACTIVITY_LOG}_PENDING`:
    case `${UPDATE_TOWER_FILE_VERSION}_PENDING`:
    case `${GET_FD_BUNGALOWS}_PENDING`:
    case `${GET_FD_BUNGALOWS_FILES}_PENDING`:
    case `${RENAME_FD_BUNGALOWS_FILES}_PENDING`:
    case `${DELETE_FD_BUNGALOWS_FILES}_PENDING`:
    case `${GET_FD_PLOTS}_PENDING`:
    case `${ADD_FD_PLOT_FILES}_PENDING`:
    case `${UPLOAD_FD_BUNGALOW_TOWER_FILE_VERSION}_PENDING`:
    case `${ADD_FD_FLOOR_FOLDER}_PENDING`:
    case `${ADD_FD_FLOOR_FOLDER_FILE}_PENDING`:
    case `${FD_TOWER_FLOOR_FOLDER}_PENDING`:
    case `${FD_TOWER_FLOOR_FILE}_PENDING`:
    case `${REARRANGE_FD_FLOOR_ROWS}_PENDING`:
    case `${GET_WD_PLOTS}_PENDING`:
    case `${GET_PLOT}_PENDING`:
    case `${GET_WD_PLOT}_PENDING`:
    case `${UPLOAD_BUNGALOWS_FILES}_PENDING`:
    case `${GET_WD_BUNGALOWS_LIST}_PENDING`:
    case `${WD_FILE_ACTIVITY_LOG}_PENDING`:
    case `${GET_WD_TOWER}_PENDING`:
    case `${GET_PLOT_FILE}_PENDING`:
    case `${GET_WD_FLOOR_FOLDER}_PENDING`:
    case `${GET_WD_FLOOR_FOLDER_FILE}_PENDING`:
    case `${GET_WD_FLOOR_FOLDER_FILE_VERSION}_PENDING`:
    case `${GET_WD_FLOOR_FILE_VERSION}_PENDING`:
    case `${GET_WD_TOWER_VERSION}_PENDING`:
    case `${GET_FD_FLOOR_FILE_VERSION}_PENDING`:
    case `${GET_WD_VERSION}_PENDING`:
    case `${GET_WD_FOLDER_FILE_ACTIVITY}_PENDING`:
    case `${GET_FD_FLOOR_FOLDER_FILE_ACTIVITY}_PENDING`:
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
    case `${UPLOAD_PARKING_FILE}_FULFILLED`:
    case `${DELETE_PARKING_FILE}_FULFILLED`:
    case `${UPDATE_PARKING_LIST}_FULFILLED`:
    case `${ADD_RD_VERSION}_FULFILLED`:
    case `${DELETE_RD_VERSION}_FULFILLED`:
    case `${ADD_FD_TOWER_FILES}_FULFILLED`:
    case `${ADD_FD_TOWER_ROWS}_FULFILLED`:
    case `${UPDATE_FD_TOWER_ROWS}_FULFILLED`:
    case `${DELETE_FD_TOWER_ROWS}_FULFILLED`:
    case `${RENAME_FD_TOWER_FILE}_FULFILLED`:
    case `${DELETE_FD_TOWER_FILE}_FULFILLED`:
    case `${UPDATE_TOWER_FILE_VERSION}_FULFILLED`:
    case `${RENAME_FD_BUNGALOWS_FILES}_FULFILLED`:
    case `${DELETE_FD_BUNGALOWS_FILES}_FULFILLED`:
    case `${ADD_FD_PLOT_FILES}_FULFILLED`:
    case `${UPLOAD_FD_BUNGALOW_TOWER_FILE_VERSION}_FULFILLED`:
    case `${ADD_FD_FLOOR_FOLDER}_FULFILLED`:
    case `${ADD_FD_FLOOR_FOLDER_FILE}_FULFILLED`:
    case `${REARRANGE_FD_FLOOR_ROWS}_FULFILLED`:
    case `${UPLOAD_BUNGALOWS_FILES}_FULFILLED`:
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
    case `${UPLOAD_PARKING_FILE}_REJECTED`:
    case `${DELETE_PARKING_FILE}_REJECTED`:
    case `${UPDATE_PARKING_LIST}_REJECTED`:
    case `${ADD_RD_VERSION}_REJECTED`:
    case `${GET_FD_TOWERS}_REJECTED`:
    case `${DELETE_RD_VERSION}_REJECTED`:
    case `${ADD_FD_TOWER_FILES}_REJECTED`:
    case `${GET_FD_TOWER_FLOORS}_REJECTED`:
    case `${ADD_FD_TOWER_ROWS}_REJECTED`:
    case `${UPDATE_FD_TOWER_ROWS}_REJECTED`:
    case `${DELETE_FD_TOWER_ROWS}_REJECTED`:
    case `${RENAME_FD_TOWER_FILE}_REJECTED`:
    case `${DELETE_FD_TOWER_FILE}_REJECTED`:
    case `${FD_TOWER_ACTIVITY_LOG}_REJECTED`:
    case `${UPDATE_TOWER_FILE_VERSION}_REJECTED`:
    case `${GET_FD_BUNGALOWS}_REJECTED`:
    case `${GET_FD_BUNGALOWS_FILES}_REJECTED`:
    case `${RENAME_FD_BUNGALOWS_FILES}_REJECTED`:
    case `${DELETE_FD_BUNGALOWS_FILES}_REJECTED`:
    case `${GET_FD_PLOTS}_REJECTED`:
    case `${ADD_FD_PLOT_FILES}_REJECTED`:
    case `${UPLOAD_FD_BUNGALOW_TOWER_FILE_VERSION}_REJECTED`:
    case `${ADD_FD_FLOOR_FOLDER}_REJECTED`:
    case `${ADD_FD_FLOOR_FOLDER_FILE}_REJECTED`:
    case `${FD_TOWER_FLOOR_FOLDER}_REJECTED`:
    case `${FD_TOWER_FLOOR_FILE}_REJECTED`:
    case `${REARRANGE_FD_FLOOR_ROWS}_REJECTED`:
    case `${GET_WD_PLOTS}_REJECTED`:
    case `${GET_WD_PLOT}_REJECTED`:
    case `${GET_PLOT}_REJECTED`:
    case `${UPLOAD_BUNGALOWS_FILES}_REJECTED`:
    case `${GET_WD_BUNGALOWS_LIST}_REJECTED`:
    case `${WD_FILE_ACTIVITY_LOG}_REJECTED`:
    case `${GET_WD_TOWER}_REJECTED`:
    case `${GET_PLOT_FILE}_REJECTED`:
    case `${GET_WD_FLOOR_FOLDER}_REJECTED`:
    case `${GET_WD_FLOOR_FOLDER_FILE}_REJECTED`:
    case `${GET_WD_FLOOR_FOLDER_FILE_VERSION}_REJECTED`:
    case `${GET_WD_FLOOR_FILE_VERSION}_REJECTED`:
    case `${GET_WD_TOWER_VERSION}_REJECTED`:
    case `${GET_FD_FLOOR_FILE_VERSION}_REJECTED`:
    case `${GET_WD_VERSION}_REJECTED`:
    case `${GET_WD_FOLDER_FILE_ACTIVITY}_REJECTED`:
    case `${GET_FD_FLOOR_FOLDER_FILE_ACTIVITY}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
