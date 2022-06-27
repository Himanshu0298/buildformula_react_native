import {useDispatch} from 'react-redux';
import {persistor} from 'redux/store';
import * as types from './actionTypes';

export const logoutPayload = {
  type: types.LOGOUT,
  payload: async () => {
    await persistor.purge();
    return Promise.resolve();
  },
};

export default function useAppActions() {
  const dispatch = useDispatch();

  return {
    setAppLanguage: language =>
      dispatch({type: types.SET_LANGUAGE, payload: language}),
    setDrawerType: payload => dispatch({type: types.SET_DRAWER_TYPE, payload}),
    logout: async () => dispatch(logoutPayload),
  };
}
