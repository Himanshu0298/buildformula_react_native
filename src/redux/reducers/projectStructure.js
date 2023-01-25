import {
  ADD_AREA,
  ADD_FLOOR,
  ADD_PICK_UP,
  ADD_PROJECT,
  ADD_PROJECT_FILE,
  ADD_PROJECT_OWNER,
  ADD_PROJECT_SECURITY,
  ADD_TOWER,
  CREATE_PROJECT_DUPLICATE,
  DELETE_AREA,
  DELETE_FLOOR,
  DELETE_PICK_UP,
  DELETE_PROJECT,
  DELETE_PROJECT_FILE,
  DELETE_PROJECT_OWNER,
  DELETE_PROJECT_SECURITY,
  DELETE_TOWER,
  GET_AREA_LIST,
  GET_FIELD_LIST,
  GET_FLOOR_LIST,
  GET_MODULE_LIST,
  GET_PICK_UP_LIST,
  GET_PROJECT_DETAILS,
  GET_PROJECT_LIST,
  GET_PROJECT_MASTER_LIST,
  GET_SELECTED_PROJECT,
  GET_SUB_MODULE_LIST,
  GET_TOWER_LIST,
  UPDATE_AREA,
  UPDATE_FLOOR,
  UPDATE_PICK_UP,
  UPDATE_PROJECT_AMENITIES,
  UPDATE_PROJECT_BRIEF,
  UPDATE_PROJECT_DETAILS,
  UPDATE_PROJECT_HISTORY,
  UPDATE_PROJECT_OWNER,
  UPDATE_PROJECT_SECURITY,
  UPDATE_PROJECT_STRUCTURE,
  UPDATE_TOWER,
} from 'redux/actions/actionTypes';

const initialState = {
  loading: false,
  refreshing: false,
  errorMessage: undefined,
  projectList: [],
  projectDetails: {},
  towerList: [],
  moduleList: [],
  subModuleList: [],
  fieldList: [],
  pickUpList: [],
  masterList: [],
  areaList: [],
  floorList: [],
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case `${GET_SELECTED_PROJECT}_PENDING`:
      return {
        ...initialState,
      };

    case `${GET_PROJECT_LIST}_FULFILLED`: {
      return {
        ...state,
        projectList: payload.sort((a, b) => b.id - a.id),
        loading: false,
      };
    }
    case `${GET_PROJECT_DETAILS}_FULFILLED`: {
      return {
        ...state,
        projectDetails: payload,
        loading: false,
      };
    }
    case `${GET_TOWER_LIST}_FULFILLED`: {
      return {
        ...state,
        towerList: payload,
        loading: false,
      };
    }
    case `${GET_MODULE_LIST}_FULFILLED`: {
      return {
        ...state,
        moduleList: payload,
        loading: false,
      };
    }
    case `${GET_SUB_MODULE_LIST}_FULFILLED`: {
      return {
        ...state,
        subModuleList: payload,
        loading: false,
      };
    }
    case `${GET_FIELD_LIST}_FULFILLED`: {
      return {
        ...state,
        fieldList: payload,
        loading: false,
      };
    }
    case `${GET_PICK_UP_LIST}_FULFILLED`: {
      return {
        ...state,
        pickUpList: payload,
        loading: false,
      };
    }
    case `${GET_PROJECT_MASTER_LIST}_FULFILLED`: {
      return {
        ...state,
        masterList: payload,
        loading: false,
      };
    }
    case `${GET_AREA_LIST}_FULFILLED`: {
      return {
        ...state,
        areaList: payload.sort((a, b) => b.id - a.id),
        loading: false,
      };
    }
    case `${GET_FLOOR_LIST}_FULFILLED`: {
      return {
        ...state,
        floorList: payload,
        loading: false,
      };
    }

    case `${GET_PROJECT_LIST}_PENDING`:
    case `${DELETE_PROJECT}_PENDING`:
    case `${ADD_PROJECT}_PENDING`:
    case `${UPDATE_PROJECT_DETAILS}_PENDING`:
    case `${GET_PROJECT_DETAILS}_PENDING`:
    case `${UPDATE_PROJECT_STRUCTURE}_PENDING`:
    case `${UPDATE_PROJECT_HISTORY}_PENDING`:
    case `${UPDATE_PROJECT_BRIEF}_PENDING`:
    case `${UPDATE_PROJECT_AMENITIES}_PENDING`:
    case `${ADD_PROJECT_OWNER}_PENDING`:
    case `${UPDATE_PROJECT_OWNER}_PENDING`:
    case `${DELETE_PROJECT_OWNER}_PENDING`:
    case `${ADD_PROJECT_SECURITY}_PENDING`:
    case `${UPDATE_PROJECT_SECURITY}_PENDING`:
    case `${DELETE_PROJECT_SECURITY}_PENDING`:
    case `${ADD_PROJECT_FILE}_PENDING`:
    case `${DELETE_PROJECT_FILE}_PENDING`:
    case `${GET_TOWER_LIST}_PENDING`:
    case `${ADD_TOWER}_PENDING`:
    case `${UPDATE_TOWER}_PENDING`:
    case `${DELETE_TOWER}_PENDING`:
    case `${GET_MODULE_LIST}_PENDING`:
    case `${GET_SUB_MODULE_LIST}_PENDING`:
    case `${GET_FIELD_LIST}_PENDING`:
    case `${GET_PICK_UP_LIST}_PENDING`:
    case `${ADD_PICK_UP}_PENDING`:
    case `${UPDATE_PICK_UP}_PENDING`:
    case `${DELETE_PICK_UP}_PENDING`:
    case `${GET_PROJECT_MASTER_LIST}_PENDING`:
    case `${GET_AREA_LIST}_PENDING`:
    case `${ADD_AREA}_PENDING`:
    case `${UPDATE_AREA}_PENDING`:
    case `${DELETE_AREA}_PENDING`:
    case `${GET_FLOOR_LIST}_PENDING`:
    case `${ADD_FLOOR}_PENDING`:
    case `${UPDATE_FLOOR}_PENDING`:
    case `${DELETE_FLOOR}_PENDING`:
    case `${CREATE_PROJECT_DUPLICATE}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${DELETE_PROJECT}_FULFILLED`:
    case `${UPDATE_PROJECT_DETAILS}_FULFILLED`:
    case `${UPDATE_PROJECT_HISTORY}_FULFILLED`:
    case `${UPDATE_PROJECT_STRUCTURE}_FULFILLED`:
    case `${UPDATE_PROJECT_BRIEF}_FULFILLED`:
    case `${UPDATE_PROJECT_AMENITIES}_FULFILLED`:
    case `${ADD_PROJECT_OWNER}_FULFILLED`:
    case `${ADD_PROJECT}_FULFILLED`:
    case `${UPDATE_PROJECT_OWNER}_FULFILLED`:
    case `${DELETE_PROJECT_OWNER}_FULFILLED`:
    case `${ADD_PROJECT_SECURITY}_FULFILLED`:
    case `${UPDATE_PROJECT_SECURITY}_FULFILLED`:
    case `${DELETE_PROJECT_SECURITY}_FULFILLED`:
    case `${ADD_PROJECT_FILE}_FULFILLED`:
    case `${DELETE_PROJECT_FILE}_FULFILLED`:
    case `${ADD_TOWER}_FULFILLED`:
    case `${UPDATE_TOWER}_FULFILLED`:
    case `${DELETE_TOWER}_FULFILLED`:
    case `${ADD_PICK_UP}_FULFILLED`:
    case `${UPDATE_PICK_UP}_FULFILLED`:
    case `${DELETE_PICK_UP}_FULFILLED`:
    case `${ADD_AREA}_FULFILLED`:
    case `${UPDATE_AREA}_FULFILLED`:
    case `${DELETE_AREA}_FULFILLED`:
    case `${ADD_FLOOR}_FULFILLED`:
    case `${UPDATE_FLOOR}_FULFILLED`:
    case `${DELETE_FLOOR}_FULFILLED`:
    case `${CREATE_PROJECT_DUPLICATE}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };

    case `${GET_PROJECT_LIST}_REJECTED`:
    case `${DELETE_PROJECT}_REJECTED`:
    case `${ADD_PROJECT}_REJECTED`:
    case `${UPDATE_PROJECT_DETAILS}_REJECTED`:
    case `${UPDATE_PROJECT_HISTORY}_REJECTED`:
    case `${UPDATE_PROJECT_STRUCTURE}_REJECTED`:
    case `${GET_PROJECT_DETAILS}_REJECTED`:
    case `${UPDATE_PROJECT_BRIEF}_REJECTED`:
    case `${UPDATE_PROJECT_AMENITIES}_REJECTED`:
    case `${ADD_PROJECT_OWNER}_REJECTED`:
    case `${UPDATE_PROJECT_OWNER}_REJECTED`:
    case `${DELETE_PROJECT_OWNER}_REJECTED`:
    case `${ADD_PROJECT_SECURITY}_REJECTED`:
    case `${UPDATE_PROJECT_SECURITY}_REJECTED`:
    case `${DELETE_PROJECT_SECURITY}_REJECTED`:
    case `${ADD_PROJECT_FILE}_REJECTED`:
    case `${DELETE_PROJECT_FILE}_REJECTED`:
    case `${GET_TOWER_LIST}_REJECTED`:
    case `${ADD_TOWER}_REJECTED`:
    case `${UPDATE_TOWER}_REJECTED`:
    case `${DELETE_TOWER}_REJECTED`:
    case `${GET_MODULE_LIST}_REJECTED`:
    case `${GET_SUB_MODULE_LIST}_REJECTED`:
    case `${GET_FIELD_LIST}_REJECTED`:
    case `${GET_PICK_UP_LIST}_REJECTED`:
    case `${ADD_PICK_UP}_REJECTED`:
    case `${UPDATE_PICK_UP}_REJECTED`:
    case `${DELETE_PICK_UP}_REJECTED`:
    case `${GET_PROJECT_MASTER_LIST}_REJECTED`:
    case `${GET_AREA_LIST}_REJECTED`:
    case `${ADD_AREA}_REJECTED`:
    case `${UPDATE_AREA}_REJECTED`:
    case `${DELETE_AREA}_REJECTED`:
    case `${GET_FLOOR_LIST}_REJECTED`:
    case `${ADD_FLOOR}_REJECTED`:
    case `${UPDATE_FLOOR}_REJECTED`:
    case `${DELETE_FLOOR}_REJECTED`:
    case `${CREATE_PROJECT_DUPLICATE}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export default reducer;
