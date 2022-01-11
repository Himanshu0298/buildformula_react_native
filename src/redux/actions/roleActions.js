import {useDispatch} from 'react-redux';
import {useResProcessor} from 'utils/responseProcessor';
import {useSnackbar} from 'components/Atoms/Snackbar';
import useRole from 'services/role';
import * as types from './actionTypes';

export default function useRoleActions() {
  const dispatch = useDispatch();
  const {getMembers, getRoles, addUsers, editUser, deleteRole, deleteMember} =
    useRole();
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
    addUsers: data =>
      dispatch({
        type: types.ADD_USERS,
        payload: async () => {
          try {
            const response = _res(await addUsers(data));
            return Promise.resolve(response);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteRole: data =>
      dispatch({
        type: types.DELETE_ROLE,
        payload: async () => {
          try {
            const response = _res(await deleteRole(data));
            return Promise.resolve(response);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteMember: data =>
      dispatch({
        type: types.DELETE_ROLE,
        payload: async () => {
          try {
            const response = _res(await deleteMember(data));
            return Promise.resolve(response);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    editUser: data =>
      dispatch({
        type: types.EDIT_USERS,
        payload: async () => {
          try {
            const response = _res(await editUser(data));
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
