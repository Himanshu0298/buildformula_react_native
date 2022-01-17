import {BASE_API_URL} from 'utils/constant';
import axios from 'axios';
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

// instance.interceptors.response.use((response) => {
//   console.log('-----> response', response);
//   return response;
// });
