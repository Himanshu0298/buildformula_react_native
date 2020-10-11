import {CREATE_PROJECT} from './../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  projects: [],
  project: {
    // project_id: 18,
    // enc_key:
    //   'eyJpdiI6ImJGVDNkZHgwZ09pR2ZoOTdCSk1JUkE9PSIsInZhbHVlIjoib2Z6c1VuUkNFXC92WERDMGdEZjNrN3c9PSIsIm1hYyI6ImZmY2JlMTVjMTY5YWNlZmJkOTc2ODZmMDU0ZTMzZDg2MWQxYzM3OGI0MzFiYjU3MjdlMjNjMzg5ZGFmZDlkYzgifQ==',
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
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

    default:
      return state;
  }
};
