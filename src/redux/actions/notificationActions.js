import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import useNotification from '../../services/notification.js';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'utils/responseProcessor';

export default function useNotificationActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {getAllNotifications, getProjectNotifications} = useNotification();
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
  };
}
