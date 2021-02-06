import {SET_LANGUAGE} from './../actions/actionTypes';

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

export default reducer;
