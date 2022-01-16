import {
  ADD_USERS,
  EDIT_USERS,
  GET_MEMBERS,
  GET_ROLES,
  GET_ROLE_DETAILS,
  GET_SELECTED_PROJECT,
  DELETE_ROLE,
  DELETE_MEMBER,
  ADD_ROLE,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  refreshing: false,
  errorMessage: undefined,
  members: [],
  roles: [],
  roleDetails: undefined,
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    // RESET data on project change
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

    case `${GET_ROLE_DETAILS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_ROLE_DETAILS}_FULFILLED`: {
      const roleDetails = payload?.data;
      Object.keys(payload?.data).map(moduleId => {
        payload.data[moduleId] = Object.values(payload?.data[moduleId]);
        return moduleId;
      });

      return {
        ...state,
        loading: false,
        roleDetails,
      };
    }
    case `${GET_ROLE_DETAILS}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${ADD_USERS}_PENDING`:
    case `${ADD_ROLE}_PENDING`:
    case `${DELETE_ROLE}_PENDING`:
    case `${DELETE_MEMBER}_PENDING`:
    case `${EDIT_USERS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${ADD_USERS}_FULFILLED`:
    case `${ADD_ROLE}_FULFILLED`:
    case `${DELETE_ROLE}_FULFILLED`:
    case `${DELETE_MEMBER}_FULFILLED`:
    case `${EDIT_USERS}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };
    case `${ADD_USERS}_REJECTED`:
    case `${ADD_ROLE}_REJECTED`:
    case `${DELETE_ROLE}_REJECTED`:
    case `${DELETE_MEMBER}_REJECTED`:
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
