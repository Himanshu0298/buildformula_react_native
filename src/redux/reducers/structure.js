import {UPDATE_LOCAL_STRUCTURE, SAVE_STRUCTURE} from './../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  structureTypes: {
    2: false,
    3: false,
    1: false,
    4: false,
    5: false,
  },
  selectedStructureType: 2,
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
      unitCount: undefined,
      units: {},
    },
    5: {
      unitCount: undefined,
      units: {},
    },
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_LOCAL_STRUCTURE:
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
      };

    case `${SAVE_STRUCTURE}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${SAVE_STRUCTURE}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };
    case `${SAVE_STRUCTURE}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
