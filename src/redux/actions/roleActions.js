import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import {useResProcessor} from 'utils/responseProcessor';
import {useSnackbar} from 'components/Atoms/Snackbar';
import useRole from 'services/role';

export default function useRoleActions() {
  const dispatch = useDispatch();
  const {getMembers, getRoles} = useRole();
  const {_err, _res} = useResProcessor();
  const snackbar = useSnackbar();

  return {
    getMembers: data =>
      dispatch({
        type: types.GET_MEMBERS,
        payload: async () => {
          try {
            const response = _res(await getMembers(data));
            return Promise.resolve(response);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getRoles: data =>
      dispatch({
        type: types.GET_ROLES,
        payload: async () => {
          try {
            const response = _res(await getRoles(data));
            return Promise.resolve(response);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
  };
}
