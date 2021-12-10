import {useDispatch} from 'react-redux';
import {persistor} from 'redux/store';
import * as types from './actionTypes';

export default function useAppActions() {
  const dispatch = useDispatch();

  return {
    setAppLanguage: language =>
      dispatch({type: types.SET_LANGUAGE, payload: language}),
    logout: async () =>
      dispatch({
        type: types.LOGOUT,
        payload: async () => {
          await persistor.purge();
          return Promise.resolve();
        },
      }),
  };
}
