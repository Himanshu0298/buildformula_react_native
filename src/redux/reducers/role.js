import {
  ADD_USERS,
  EDIT_USERS,
  GET_MEMBERS,
  GET_ROLES,
  GET_SELECTED_PROJECT,
} from './../actions/actionTypes';

const initialState = {
  loading: false,
  refreshing: false,
  errorMessage: undefined,
  members: [],
  roles: [],
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    //RESET data on project change
    case `${GET_SELECTED_PROJECT}_PENDING`:
      return {
        ...initialState,
      };

    case `${GET_MEMBERS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_MEMBERS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        members: payload?.data?.userRoleData,
      };
    case `${GET_MEMBERS}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${GET_ROLES}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_ROLES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        roles: payload?.data,
      };
    case `${GET_ROLES}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${ADD_USERS}_PENDING`:
    case `${EDIT_USERS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${ADD_USERS}_FULFILLED`:
    case `${EDIT_USERS}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };
    case `${ADD_USERS}_REJECTED`:
    case `${EDIT_USERS}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
