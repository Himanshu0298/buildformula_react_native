import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import * as types from './actions/actionTypes';
import reducer from './reducers';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from './../../ReactotronConfig';

const appReducer = combineReducers(reducer);

const allMiddleware = [thunk, promise];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  allMiddleware.push(createDebugger());
}

const middleware = applyMiddleware(...allMiddleware);

const rootReducer = (state, action) => {
  /**
   * Reset store state on logout action
   */
  if (action.type === `${types.LOG_OUT}_FULFILLED`) {
    state = {};
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  compose(middleware, Reactotron.createEnhancer()),
  // applyMiddleware(...allMiddleware),
);

let persistor = persistStore(store);

export {store, persistor};
