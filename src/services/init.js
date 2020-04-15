import { BASE_URL } from '../utils/constant';
import { useSelector } from 'react-redux';
const axios = require('axios');

export const instance = axios.create({ baseURL: BASE_URL });

export const useConfig = () => {
  let token = useSelector(({ user }) => user.token);

  return ({
    config: ({ multipart = false, auth = true }) => {
      let headers = {
        'Content-Type': 'application/json',
      };
      if (multipart) { headers['Content-Type'] = 'multipart/form-data'; }
      if (auth) { headers.Authorization = 'bearer ' + token; }
      return ({ headers });
    },
  });
};

// instance.interceptors.request.use(request => {
//   console.log('-----> Request', request);
//   return request;
// });

// instance.interceptors.response.use(response => {
//   console.log('-----> response', response);
//   return response;
// });
