import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
import {
  GET_PROJECTS,
  GET_PROJECT_COMMON_DATA,
  GET_SELECTED_PROJECT,
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
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
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
    case `${GET_PROJECT_COMMON_DATA}_FULFILLED`:
      return {
        ...state,
        loading: false,
        commonData: payload,
      };
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
