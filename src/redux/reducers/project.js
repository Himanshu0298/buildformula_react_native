import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {
  GET_PROJECTS,
  GET_PROJECT_COMMON_DATA,
  GET_SELECTED_PROJECT,
  SET_SELECTED_UNIT,
} from './../actions/actionTypes';

const persistConfig = {
  key: 'project',
  storage: AsyncStorage,
  blacklist: ['loading', 'errorMessage'],
};

const initialState = {
  loading: false,
  errorMessage: undefined,
  selectedProject: {},
  projects: [],
  commonData: {},
  visitors: [],
  unitOptions: [],
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case SET_SELECTED_UNIT:
      return {
        ...state,
        selectedUnit: payload,
      };

    case `${GET_SELECTED_PROJECT}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_SELECTED_PROJECT}_FULFILLED`:
      return {
        ...state,
        selectedProject: payload,
        loading: false,
      };
    case `${GET_SELECTED_PROJECT}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    case `${GET_PROJECTS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_PROJECTS}_FULFILLED`:
      return {
        ...state,
        projects: payload,
        loading: false,
      };
    case `${GET_PROJECTS}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    case `${GET_PROJECT_COMMON_DATA}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_PROJECT_COMMON_DATA}_FULFILLED`: {
      const {visitors_lists, units} = payload;
      return {
        ...state,
        loading: false,
        commonData: payload,
        visitors: visitors_lists,
        unitOptions: units.map(i => ({label: i.title, value: i.id})),
      };
    }
    case `${GET_PROJECT_COMMON_DATA}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
