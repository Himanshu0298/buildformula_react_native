import * as types from './actionTypes';
import {useDispatch} from 'react-redux';

export default function useAppActions() {
  const dispatch = useDispatch();

  return {
    setAppLanguage: (language) =>
      dispatch({
        type: types.SET_LANGUAGE,
        payload: language,
      }),
    setInitialState: () =>
      dispatch({
        type: types.SET_INITIAL_STATE,
      }),
    navToHome: () =>
      dispatch({
        type: types.SET_AUTH,
      }),
    logout: () =>
      dispatch({
        type: types.LOGOUT,
      }),
  };
}
