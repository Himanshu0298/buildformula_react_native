import {GET_WORKS} from './../actions/actionTypes';

const initialState = {
  works: [],
  milestones: [],
  workCategories: [],
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case `${GET_WORKS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_WORKS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        works: payload,
      };
    case `${GET_WORKS}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
