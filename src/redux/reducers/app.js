import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import {SET_DRAWER_TYPE, SET_LANGUAGE} from '../actions/actionTypes';

const persistConfig = {
  key: 'app',
  storage: AsyncStorage,
  blacklist: ['drawerType'],
};

const initialState = {
  language: undefined,
  drawerType: 'general',
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case `${SET_LANGUAGE}`:
      return {
        ...state,
        language: payload,
      };
    case `${SET_DRAWER_TYPE}`:
      return {
        ...state,
        drawerType: payload,
      };

    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
