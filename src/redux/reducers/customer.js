import _ from 'lodash';
import {GET_CUSTOMER_DATA, SET_INITIAL_STATE} from './../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  customerData: [],
};

export default (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case SET_INITIAL_STATE:
      //TODO:update loading only if true
      return {
        ...state,
        loading: false,
      };

    case `${GET_CUSTOMER_DATA}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_CUSTOMER_DATA}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        customerData: payload,
      };
    }
    case `${GET_CUSTOMER_DATA}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
