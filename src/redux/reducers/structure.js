import {
  UPDATE_LOCAL_STRUCTURE,
  SAVE_STRUCTURE,
  RESET_STRUCTURE,
  SET_INITIAL_STATE,
} from './../actions/actionTypes';
import _ from 'lodash';
import {DEFAULT_STRUCTURE} from 'utils/constant';

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
  structure: _.cloneDeep(DEFAULT_STRUCTURE),
};

export default (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case SET_INITIAL_STATE:
      return {
        ...state,
        loading: false,
      };
    case RESET_STRUCTURE:
      return {
        ...initialState,
      };

    case UPDATE_LOCAL_STRUCTURE:
      return {
        ...state,
        ...payload,
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
        errorMessage: payload,
      };

    default:
      return state;
  }
};
