import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
// import * as types from './actions/actionTypes';
import reducer from './reducers';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import createEncryptor from 'redux-persist-transform-encrypt';

const appReducer = combineReducers(reducer);

const rootReducer = (state, action) => {
  /**
   * Reset store state on logout action
   */
  // if (action.type === `${types.LOG_OUT}_FULFILLED`) {
  //     state = {};
  // }
  return appReducer(state, action);
};

const encrypted = createEncryptor({
  secretKey: 'my-super-secret-key',
  onError: function (error) {
    // Handle the error.
  },
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [encrypted],
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk, promise));

let persistor = persistStore(store);

export {store, persistor};
