import {SET_LANGUAGE} from './../actions/actionTypes';

const initialState = {
  language: undefined,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case `${SET_LANGUAGE}`:
      return {
        ...state,
        language: action.payload,
      };

    default:
      return state;
  }
};
