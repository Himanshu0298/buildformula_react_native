import {
  ADD_PHASE,
  CREATE_LINEUP_ENTITY,
  DELETE_LINEUP_ENTITY,
  DELETE_PHASE,
  GET_MILESTONES,
  GET_PHASES,
  GET_SELECTED_PROJECT,
  GET_WORKS,
  GET_WORK_CATEGORIES,
  REFRESH_PHASES,
  UPDATE_LINEUP_ENTITY,
  UPDATE_MILESTONE_ORDER,
  UPDATE_PHASE,
} from './../actions/actionTypes';

const initialState = {
  loading: false,
  refreshing: false,
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

    case `${REFRESH_PHASES}_PENDING`:
      return {
        ...state,
        refreshing: true,
      };
    case `${REFRESH_PHASES}_FULFILLED`:
      return {
        ...state,
        refreshing: false,
        phases: payload,
      };
    case `${REFRESH_PHASES}_REJECTED`:
      return {
        ...state,
        refreshing: false,
      };

    case `${CREATE_LINEUP_ENTITY}_PENDING`:
    case `${UPDATE_MILESTONE_ORDER}_PENDING`:
    case `${UPDATE_LINEUP_ENTITY}_PENDING`:
    case `${DELETE_LINEUP_ENTITY}_PENDING`:
    case `${ADD_PHASE}_PENDING`:
    case `${UPDATE_PHASE}_PENDING`:
    case `${DELETE_PHASE}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${CREATE_LINEUP_ENTITY}_FULFILLED`:
    case `${UPDATE_MILESTONE_ORDER}_FULFILLED`:
    case `${UPDATE_LINEUP_ENTITY}_FULFILLED`:
    case `${DELETE_LINEUP_ENTITY}_FULFILLED`:
    case `${ADD_PHASE}_FULFILLED`:
    case `${UPDATE_PHASE}_FULFILLED`:
    case `${DELETE_PHASE}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };
    case `${CREATE_LINEUP_ENTITY}_REJECTED`:
    case `${UPDATE_MILESTONE_ORDER}_REJECTED`:
    case `${UPDATE_LINEUP_ENTITY}_REJECTED`:
    case `${DELETE_LINEUP_ENTITY}_REJECTED`:
    case `${ADD_PHASE}_REJECTED`:
    case `${UPDATE_PHASE}_REJECTED`:
    case `${DELETE_PHASE}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
