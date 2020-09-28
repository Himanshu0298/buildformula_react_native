import {UPDATE_LOCAL_STRUCTURE} from './../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  structureTypes: [],
  structure: {
    1: {
      towerCount: undefined,
      towers: {},
    },
    2: {
      towerCount: undefined,
      towers: {},
    },
    3: {
      towerCount: undefined,
      towers: {},
    },
    4: {
      towerCount: undefined,
      towers: {},
    },
    5: {
      towerCount: undefined,
      towers: {},
    },
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case `${UPDATE_LOCAL_STRUCTURE}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${UPDATE_LOCAL_STRUCTURE}_FULFILLED`:
      console.log('-----> action.payload', action.payload);
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case `${UPDATE_LOCAL_STRUCTURE}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
