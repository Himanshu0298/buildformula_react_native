import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import {SET_LANGUAGE} from './../actions/actionTypes';

const persistConfig = {
  key: 'app',
  storage: AsyncStorage,
};

const initialState = {
  language: undefined,
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case `${SET_LANGUAGE}`:
      return {
        ...state,
        language: payload,
      };

    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
