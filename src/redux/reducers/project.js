import {
  CREATE_PROJECT,
  UPDATE_PAYMENT,
  UPDATE_ADMINS,
  SET_INITIAL_STATE,
  GET_PROJECTS,
  RESET_STRUCTURE,
  GET_SELECTED_PROJECT,
} from './../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  selectedProject: {},
  projects: [],
  project: {
    // project_id: 21,
    // enc_key:
    //   'eyJpdiI6ImJGVDNkZHgwZ09pR2ZoOTdCSk1JUkE9PSIsInZhbHVlIjoib2Z6c1VuUkNFXC92WERDMGdEZjNrN3c9PSIsIm1hYyI6ImZmY2JlMTVjMTY5YWNlZmJkOTc2ODZmMDU0ZTMzZDg2MWQxYzM3OGI0MzFiYjU3MjdlMjNjMzg5ZGFmZDlkYzgifQ==',
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_INITIAL_STATE:
      return {
        ...state,
        loading: false,
      };

    case RESET_STRUCTURE:
      return {
        ...state,
        project: {},
      };

    case `${GET_SELECTED_PROJECT}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_SELECTED_PROJECT}_FULFILLED`:
      return {
        ...state,
        selectedProject: action.payload,
        loading: false,
      };
    case `${GET_SELECTED_PROJECT}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${GET_PROJECTS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_PROJECTS}_FULFILLED`:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    case `${GET_PROJECTS}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${CREATE_PROJECT}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${CREATE_PROJECT}_FULFILLED`:
      console.log('-----> action.payload', action.payload);
      return {
        ...state,
        project: action.payload,
        loading: false,
      };
    case `${CREATE_PROJECT}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${UPDATE_PAYMENT}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${UPDATE_PAYMENT}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };
    case `${UPDATE_PAYMENT}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${UPDATE_ADMINS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${UPDATE_ADMINS}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };
    case `${UPDATE_ADMINS}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
