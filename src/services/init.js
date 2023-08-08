import axios from 'axios';
import {BASE_API_URL} from 'utils/constant';
import {logoutPayload} from 'redux/actions/appActions';
import {REFRESH_TOKEN} from 'redux/actions/actionTypes';
import {store} from '../redux/store';

export const instance = axios.create({baseURL: BASE_API_URL});

export const config = ({multipart = true, auth = true} = {}) => {
  const {token} = store.getState()?.user || {};

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
};

const refreshAccessToken = () => {
  return async dispatch => {
    return dispatch({
      type: REFRESH_TOKEN,
      payload: async () => {
        try {
          const {data: response} = await instance.post(
            '/refreshToken',
            {},
            config({multipart: false}),
          );
          return Promise.resolve(response?.data?.token);
        } catch (error) {
          console.log('refreshAccessToken => FAILED', error);
          return Promise.reject(error);
        }
      },
    });
  };
};

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

function onAccessTokenFetched(accessToken) {
  subscribers = subscribers.filter(callback => callback(accessToken));
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async error => {
    const {message} = error?.response?.data || {};

    if (message?.includes('Token has expired and can no longer be refreshed')) {
      return store.dispatch(logoutPayload);
    }
    if (message?.includes('Unauthenticated')) {
      const originalRequest = error.config;

      try {
        const retryOriginalRequest = new Promise(resolve => {
          addSubscriber(accessToken => {
            if (originalRequest?.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            resolve(instance(originalRequest));
          });
        });

        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true;
          await store.dispatch(refreshAccessToken());

          const {token: newToken} = store.getState().user;
          isAlreadyFetchingAccessToken = false;
          onAccessTokenFetched(newToken || '');
        }

        return retryOriginalRequest;
      } catch (err) {
        return store.dispatch(logoutPayload);
      }
    }

    return Promise.reject(error);
  },
);
