import {
  ADD_PHASE,
  ADD_PHASE_ACTIVITY,
  ADD_PROGRESS_RECORD,
  ADD_SUB_PHASE,
  CREATE_LINEUP_ENTITY,
  DELETE_LINEUP_ENTITY,
  DELETE_PHASE,
  DELETE_SUB_PHASE,
  GET_MILESTONES,
  GET_PHASES,
  GET_PHASE_ACTIVITIES,
  GET_SELECTED_PROJECT,
  GET_SUB_PHASES,
  GET_WBS_LEVEL_WORKS,
  GET_WORKS,
  GET_WORK_CATEGORIES,
  REFRESH_PHASES,
  REFRESH_SUB_PHASES,
  UPDATE_LINEUP_ENTITY,
  UPDATE_MILESTONE_ORDER,
  UPDATE_PHASE,
  UPDATE_PHASE_ACTIVITY,
  UPDATE_PHASE_ORDER,
  UPDATE_SUB_PHASE,
  WBS_EXECUTION_DETAILS,
  WBS_EXECUTION_LIST,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  refreshing: false,
  errorMessage: undefined,
  milestones: [],
  workCategories: [],
  works: [],
  phases: [],
  subPhases: [],
  activities: [],
  WBSData: {},
  WBSDetails: {},
  WBSList: [],
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    // RESET data on project change
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

    case `${GET_SUB_PHASES}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_SUB_PHASES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        subPhases: payload,
      };
    case `${GET_SUB_PHASES}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${REFRESH_SUB_PHASES}_PENDING`:
      return {
        ...state,
        refreshing: true,
      };
    case `${REFRESH_SUB_PHASES}_FULFILLED`:
      return {
        ...state,
        refreshing: false,
        subPhases: payload,
      };
    case `${REFRESH_SUB_PHASES}_REJECTED`:
      return {
        ...state,
        refreshing: false,
      };

    case `${GET_PHASE_ACTIVITIES}_PENDING`:
      return {
        ...state,
        loading: true,
        activities: [],
      };
    case `${GET_PHASE_ACTIVITIES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        activities: payload.data,
      };
    case `${GET_PHASE_ACTIVITIES}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${GET_WBS_LEVEL_WORKS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_WBS_LEVEL_WORKS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        WBSData: {...state.WBSData, [payload.id]: payload},
      };
    case `${GET_WBS_LEVEL_WORKS}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${WBS_EXECUTION_DETAILS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${WBS_EXECUTION_DETAILS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        WBSDetails: payload,
      };
    case `${WBS_EXECUTION_DETAILS}_REJECTED`:
      return {
        ...state,
        loading: false,
      };
    case `${WBS_EXECUTION_LIST}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${WBS_EXECUTION_LIST}_FULFILLED`:
      return {
        ...state,
        loading: false,
        WBSList: payload,
      };
    case `${WBS_EXECUTION_LIST}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${CREATE_LINEUP_ENTITY}_PENDING`:
    case `${UPDATE_MILESTONE_ORDER}_PENDING`:
    case `${UPDATE_LINEUP_ENTITY}_PENDING`:
    case `${DELETE_LINEUP_ENTITY}_PENDING`:
    case `${ADD_PHASE}_PENDING`:
    case `${UPDATE_PHASE}_PENDING`:
    case `${DELETE_PHASE}_PENDING`:
    case `${ADD_SUB_PHASE}_PENDING`:
    case `${UPDATE_SUB_PHASE}_PENDING`:
    case `${DELETE_SUB_PHASE}_PENDING`:
    case `${UPDATE_PHASE_ORDER}_PENDING`:
    case `${ADD_PHASE_ACTIVITY}_PENDING`:
    case `${UPDATE_PHASE_ACTIVITY}_PENDING`:
    case `${ADD_PROGRESS_RECORD}_PENDING`:
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
    case `${ADD_SUB_PHASE}_FULFILLED`:
    case `${UPDATE_SUB_PHASE}_FULFILLED`:
    case `${DELETE_SUB_PHASE}_FULFILLED`:
    case `${UPDATE_PHASE_ORDER}_FULFILLED`:
    case `${ADD_PHASE_ACTIVITY}_FULFILLED`:
    case `${UPDATE_PHASE_ACTIVITY}_FULFILLED`:
    case `${ADD_PROGRESS_RECORD}_FULFILLED`:
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
    case `${ADD_SUB_PHASE}_REJECTED`:
    case `${UPDATE_SUB_PHASE}_REJECTED`:
    case `${DELETE_SUB_PHASE}_REJECTED`:
    case `${UPDATE_PHASE_ORDER}_REJECTED`:
    case `${ADD_PHASE_ACTIVITY}_REJECTED`:
    case `${UPDATE_PHASE_ACTIVITY}_REJECTED`:
    case `${ADD_PROGRESS_RECORD}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
