import {BASE_API_URL} from 'utils/constant';
import axios from 'axios';
import {logoutPayload} from 'redux/actions/appActions';
import {store} from '../redux/store';

export const instance = axios.create({baseURL: BASE_API_URL});

export const useConfig = () => {
  const {token} = store.getState()?.user || {};

  return {
    config: ({multipart = true, auth = true} = {}) => {
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      if (multipart) {
        headers['Content-Type'] = 'multipart/form-data';
      }
      if (auth) {
        headers.Authorization = `Bearer ${token}`;
      }

      return {headers};
    },
  };
};

// instance.interceptors.request.use((request) => {
//   console.log('-----> Request', request);
//   return request;
// });

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  error => {
    if (
      error?.response?.data?.message ===
      'Token has expired and can no longer be refreshed'
    ) {
      return store.dispatch(logoutPayload);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
