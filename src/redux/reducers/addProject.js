import {
  UPDATE_LOCAL_STRUCTURE,
  SAVE_STRUCTURE,
  RESET_STRUCTURE,
  CREATE_PROJECT,
  UPDATE_ADMINS,
  UPDATE_PAYMENT,
} from '../actions/actionTypes';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
import {DEFAULT_STRUCTURE} from 'utils/constant';

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
      console.log('-----> payload', payload);
      return {
        ...state,
        project: payload,
        loading: false,
      };
    case `${CREATE_PROJECT}_REJECTED`:
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
