import {
  UPDATE_LOCAL_STRUCTURE,
  SAVE_STRUCTURE,
  RESET_STRUCTURE,
} from './../actions/actionTypes';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
import {DEFAULT_STRUCTURE} from 'utils/constant';

const persistConfig = {
  key: 'structure',
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

    case `${SAVE_STRUCTURE}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${SAVE_STRUCTURE}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };
    case `${SAVE_STRUCTURE}_REJECTED`:
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
