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
    resetStructure: () =>
      dispatch({
        type: types.RESET_STRUCTURE,
      }),
    logout: () =>
      dispatch({
        type: types.LOGOUT,
      }),
  };
}
