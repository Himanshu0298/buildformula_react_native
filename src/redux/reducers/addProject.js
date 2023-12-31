import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {DEFAULT_STRUCTURE} from 'utils/constant';
import {
  UPDATE_LOCAL_STRUCTURE,
  SAVE_STRUCTURE,
  RESET_STRUCTURE,
  CREATE_PROJECT,
  UPDATE_ADMINS,
  UPDATE_PAYMENT,
  SET_PROJECT_DATA,
  GET_STATES,
  GET_CITIES,
} from '../actions/actionTypes';

const persistConfig = {
  key: 'addProject',
  storage: AsyncStorage,
  blacklist: ['loading', 'errorMessage'],
};

const initialState = {
  loading: false,
  errorMessage: undefined,
  structureTypes: {
    2: false,
    3: false,
    1: false,
    4: false,
    5: false,
  },
  selectedStructureType: 2,
  structure: _.cloneDeep(DEFAULT_STRUCTURE),
  statesData: [],
  citiesData: [],
  project: {
    // project_id: 21,
    // enc_key:
    //   'eyJpdiI6ImJGVDNkZHgwZ09pR2ZoOTdCSk1JUkE9PSIsInZhbHVlIjoib2Z6c1VuUkNFXC92WERDMGdEZjNrN3c9PSIsIm1hYyI6ImZmY2JlMTVjMTY5YWNlZmJkOTc2ODZmMDU0ZTMzZDg2MWQxYzM3OGI0MzFiYjU3MjdlMjNjMzg5ZGFmZDlkYzgifQ==',
  },
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case RESET_STRUCTURE:
      return {
        ...initialState,
      };

    case SET_PROJECT_DATA:
      return {
        ...state,
        project: payload,
      };

    case UPDATE_LOCAL_STRUCTURE:
      return {
        ...state,
        ...payload,
      };

    case `${CREATE_PROJECT}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${CREATE_PROJECT}_FULFILLED`:
      return {
        ...state,
        loading: false,
        project: payload,
      };
    case `${CREATE_PROJECT}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    case `${GET_STATES}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_STATES}_FULFILLED`:
      return {
        ...state,
        statesData: payload,
        loading: false,
      };
    case `${GET_STATES}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    case `${GET_CITIES}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_CITIES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        citiesData: payload,
      };
    case `${GET_CITIES}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    case `${SAVE_STRUCTURE}_PENDING`:
    case `${UPDATE_ADMINS}_PENDING`:
    case `${UPDATE_PAYMENT}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${SAVE_STRUCTURE}_FULFILLED`:
    case `${UPDATE_ADMINS}_FULFILLED`:
    case `${UPDATE_PAYMENT}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };
    case `${SAVE_STRUCTURE}_REJECTED`:
    case `${UPDATE_ADMINS}_REJECTED`:
    case `${UPDATE_PAYMENT}_REJECTED`:
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
