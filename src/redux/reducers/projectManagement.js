import {
  CREATE_LINEUP_ENTITY,
  DELETE_LINEUP_ENTITY,
  GET_MILESTONES,
  GET_PHASES,
  GET_SELECTED_PROJECT,
  GET_WORKS,
  GET_WORK_CATEGORIES,
  UPDATE_LINEUP_ENTITY,
  UPDATE_MILESTONE_ORDER,
} from './../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  milestones: [],
  workCategories: [],
  works: [],
  phases: [],
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    //RESET data on project change
    case `${GET_SELECTED_PROJECT}_PENDING`:
      return {
        ...initialState,
      };

    case `${GET_WORK_CATEGORIES}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_WORK_CATEGORIES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        workCategories: payload,
      };
    case `${GET_WORK_CATEGORIES}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${GET_WORKS}_PENDING`:
      return {
        ...state,
        loading: true,
        works: [],
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

    case `${GET_MILESTONES}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_MILESTONES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        milestones: payload,
      };
    case `${GET_MILESTONES}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${GET_PHASES}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_PHASES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        phases: payload,
      };
    case `${GET_PHASES}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${CREATE_LINEUP_ENTITY}_PENDING`:
    case `${UPDATE_MILESTONE_ORDER}_PENDING`:
    case `${UPDATE_LINEUP_ENTITY}_PENDING`:
    case `${DELETE_LINEUP_ENTITY}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${CREATE_LINEUP_ENTITY}_FULFILLED`:
    case `${UPDATE_MILESTONE_ORDER}_FULFILLED`:
    case `${UPDATE_LINEUP_ENTITY}_FULFILLED`:
    case `${DELETE_LINEUP_ENTITY}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };
    case `${CREATE_LINEUP_ENTITY}_REJECTED`:
    case `${UPDATE_MILESTONE_ORDER}_REJECTED`:
    case `${UPDATE_LINEUP_ENTITY}_REJECTED`:
    case `${DELETE_LINEUP_ENTITY}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
