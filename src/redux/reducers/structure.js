import {UPDATE_LOCAL_STRUCTURE, SAVE_STRUCTURE} from './../actions/actionTypes';
import _ from 'lodash';
import {DEFAULT_STRUCTURE} from '../../utils/constant';

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
  switch (action.type) {
    case UPDATE_LOCAL_STRUCTURE:
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
