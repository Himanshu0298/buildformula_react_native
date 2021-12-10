import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {persistStore} from 'redux-persist';
import * as types from './actions/actionTypes';
import reducer from './reducers';
import Reactotron from '../../ReactotronConfig';

const appReducer = combineReducers(reducer);

const allMiddleware = [thunk, promise];

const middleware = applyMiddleware(...allMiddleware);

const rootReducer = (state, action) => {
  /**
   * Reset store state on logout action
   */
  if (action.type === `${types.LOGOUT}_FULFILLED`) {
    state = {};
  }
  return appReducer(state, action);
};

const store = createStore(
  rootReducer,
  compose(middleware, Reactotron.createEnhancer()),
  // applyMiddleware(...allMiddleware),
);

const persistor = persistStore(store);

export {store, persistor};
