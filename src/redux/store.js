import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
// import * as types from './actions/actionTypes';
import reducer from './reducers';

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

const Store = createStore(
    rootReducer,
    applyMiddleware(thunk, promise),
);

export default Store;
