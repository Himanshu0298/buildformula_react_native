import {
  GET_TODO_LIST,
  ADD_TODO_LIST,
  DELETE_TODO_LIST,
  GET_TODO_LIST_TASKS,
  ADD_TASK,
  MARK_TASK_COMPLETE,
  MARK_TASK_IMPORTANT,
  SHARE_TASKS_LIST,
  REARRANGE_TASKS,
  DELETE_TASK_FILE,
  DELETE_SUB_TASK,
  DELETE_TASK,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  TODO_LIST: [],
  TODO_COMPLETED_TASKS: [],
  TODO_TASKS: [],
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    case `${GET_TODO_LIST}_FULFILLED`:
      return {
        ...state,
        loading: false,
        TODO_LIST: payload,
      };

    case `${GET_TODO_LIST_TASKS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        TODO_COMPLETED_TASKS: payload?.completeTask,
        TODO_TASKS: payload?.taskList,
      };

    case `${ADD_TODO_LIST}_FULFILLED`:
    case `${DELETE_TODO_LIST}_FULFILLED`:
    case `${ADD_TASK}_FULFILLED`:
    case `${MARK_TASK_COMPLETE}_FULFILLED`:
    case `${MARK_TASK_IMPORTANT}_FULFILLED`:
    case `${SHARE_TASKS_LIST}_FULFILLED`:
    case `${REARRANGE_TASKS}_FULFILLED`:
    case `${DELETE_TASK_FILE}_FULFILLED`:
    case `${DELETE_SUB_TASK}_FULFILLED`:
    case `${DELETE_TASK}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };

    case `${GET_TODO_LIST}_PENDING`:
    case `${ADD_TODO_LIST}_PENDING`:
    case `${DELETE_TODO_LIST}_PENDING`:
    case `${GET_TODO_LIST_TASKS}_PENDING`:
    case `${ADD_TASK}_PENDING`:
    case `${MARK_TASK_COMPLETE}_PENDING`:
    case `${MARK_TASK_IMPORTANT}_PENDING`:
    case `${SHARE_TASKS_LIST}_PENDING`:
    case `${REARRANGE_TASKS}_PENDING`:
    case `${DELETE_TASK_FILE}_PENDING`:
    case `${DELETE_SUB_TASK}_PENDING`:
    case `${DELETE_TASK}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${GET_TODO_LIST}_REJECTED`:
    case `${ADD_TODO_LIST}_REJECTED`:
    case `${DELETE_TODO_LIST}_REJECTED`:
    case `${GET_TODO_LIST_TASKS}_REJECTED`:
    case `${ADD_TASK}_REJECTED`:
    case `${MARK_TASK_COMPLETE}_REJECTED`:
    case `${MARK_TASK_IMPORTANT}_REJECTED`:
    case `${SHARE_TASKS_LIST}_REJECTED`:
    case `${REARRANGE_TASKS}_REJECTED`:
    case `${DELETE_TASK_FILE}_REJECTED`:
    case `${DELETE_SUB_TASK}_REJECTED`:
    case `${DELETE_TASK}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export default reducer;
