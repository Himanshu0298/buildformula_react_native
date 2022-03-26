import {useDispatch} from 'react-redux';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'hooks/useResponseProcessor';
import useNotification from '../../services/notification.js';
import * as types from './actionTypes';

export default function useNotificationActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {
    getAllNotifications,
    getProjectNotifications,
    removeAllNotifications,
    removeNotification,
  } = useNotification();
  const {_err, _res} = useResProcessor();

  return {
    getAllNotifications: () =>
      dispatch({
        type: types.GET_ALL_NOTIFICATIONS,
        payload: async () => {
          try {
            const res = _res(await getAllNotifications());
            return Promise.resolve(res);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getProjectNotifications: data =>
      dispatch({
        type: types.GET_PROJECT_NOTIFICATIONS,
        payload: async () => {
          try {
            const response = _res(await getProjectNotifications(data));
            return Promise.resolve(response);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    removeAllNotifications: data =>
      dispatch({
        type: types.REMOVE_ALL_NOTIFICATIONS,
        payload: async () => {
          try {
            const response = _res(await removeAllNotifications(data));
            return Promise.resolve(response);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    removeNotification: (id, data) =>
      dispatch({
        type: types.REMOVE_NOTIFICATION,
        payload: async () => {
          try {
            const response = _res(await removeNotification(id, data));
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
