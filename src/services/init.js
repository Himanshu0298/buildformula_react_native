import { BASE_URL } from '../utils/constant';
import { useSelector } from 'react-redux';
const axios = require('axios');

export const instance = axios.create({ baseURL: BASE_URL });

export const useConfig = (multipart) => {
  let token = useSelector(({ user }) => user.token);

  return ({
    config: () => {
      let headers = {
        Authorization: 'bearer ' + token,
        'Content-Type': 'application/json',
      };
      if (multipart) { headers['Content-Type'] = 'multipart/form-data'; }
      return ({ headers });
    },
  });
};


