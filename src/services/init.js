import {BASE_API_URL} from '../utils/constant';
import {useSelector} from 'react-redux';
import {store} from '../redux/store';
const axios = require('axios');

export const instance = axios.create({baseURL: BASE_API_URL});

export const useConfig = () => {
  let token = store.getState().user.token;

  return {
    config: ({multipart = true, auth = true} = {}) => {
      let headers = {
        'Content-Type': 'application/json',
      };
      if (multipart) {
        headers['Content-Type'] = 'multipart/form-data';
      }
      if (auth) {
        headers.Authorization = 'Bearer ' + token;
      }
      return {headers};
    },
  };
};

// instance.interceptors.request.use(request => {
//   console.log('-----> Request', request);
//   return request;
// });

// instance.interceptors.response.use(response => {
//   console.log('-----> response', response);
//   return response;
// });
