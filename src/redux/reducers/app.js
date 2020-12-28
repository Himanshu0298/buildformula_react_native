import {SET_LANGUAGE} from './../actions/actionTypes';

const initialState = {
  language: undefined,
};

export default (state = initialState, action = {}) => {
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
