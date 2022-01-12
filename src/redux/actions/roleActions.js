import {useDispatch} from 'react-redux';
import {useResProcessor} from 'utils/responseProcessor';
import {useSnackbar} from 'components/Atoms/Snackbar';
import useRole from 'services/role';
import * as types from './actionTypes';

export default function useRoleActions() {
  const dispatch = useDispatch();
  const {
    getMembers,
    getRoles,
    addUsers,
    addRole,
    editUser,
    deleteRole,
    deleteMember,
  } = useRole();
  const {_err, _res} = useResProcessor();
  const snackbar = useSnackbar();

  return {
    getMembers: data =>
      dispatch({
        type: types.GET_MEMBERS,
        payload: async () => {
          try {
            const res = _res(await getMembers(data));
            return Promise.resolve(res);
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
            const res = _res(await getRoles(data));
            return Promise.resolve(res);
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
            const res = _res(await addUsers(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addRole: data =>
      dispatch({
        type: types.ADD_ROLE,
        payload: async () => {
          try {
            const res = _res(await addRole(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res);
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
            const res = _res(await deleteRole(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res);
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
            const res = _res(await deleteMember(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res);
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
            const res = _res(await editUser(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
  };
}
