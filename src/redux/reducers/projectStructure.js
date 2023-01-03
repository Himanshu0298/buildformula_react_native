import {
  GET_PROJECT_LIST,
  GET_SELECTED_PROJECT,
} from 'redux/actions/actionTypes';

const initialState = {
  loading: false,
  refreshing: false,
  errorMessage: undefined,
  projectList: [],
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case `${GET_SELECTED_PROJECT}_PENDING`:
      return {
        ...initialState,
      };
    case `${GET_PROJECT_LIST}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_PROJECT_LIST}_FULFILLED`: {
      return {
        ...state,
        projectList: payload,
        loading: false,
      };
    }
    case `${GET_PROJECT_LIST}_REJECTED`:
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
