import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'utils/responseProcessor';
import useProjectManagement from 'services/projectManagement';

export default function useProjectManagementActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {_err, _res} = useResProcessor();
  const {
    createLineupEntity,
    getLineupData,
    updateLineupEntity,
    deleteLineupEntity,
    updateMilestoneOrder,
  } = useProjectManagement();

  return {
    getWorkCategories: data =>
      dispatch({
        type: types.GET_WORK_CATEGORIES,
        payload: async () => {
          try {
            const response = _res(await getLineupData(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const errorMessage = _err(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),
    getMilestones: data =>
      dispatch({
        type: types.GET_MILESTONES,
        payload: async () => {
          try {
            const response = _res(await getLineupData(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const errorMessage = _err(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),
    getWorks: data =>
      dispatch({
        type: types.GET_WORKS,
        payload: async () => {
          try {
            const response = _res(await getLineupData(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const errorMessage = _err(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),
    createLineupEntity: data =>
      dispatch({
        type: types.CREATE_LINEUP_ENTITY,
        payload: async () => {
          try {
            const response = _res(await createLineupEntity(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const errorMessage = _err(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),
    updateLineupEntity: data =>
      dispatch({
        type: types.UPDATE_LINEUP_ENTITY,
        payload: async () => {
          try {
            const response = _res(await updateLineupEntity(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const errorMessage = _err(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),
    deleteLineupEntity: data =>
      dispatch({
        type: types.DELETE_LINEUP_ENTITY,
        payload: async () => {
          try {
            const response = _res(await deleteLineupEntity(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const errorMessage = _err(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),
    updateMilestoneOrder: data =>
      dispatch({
        type: types.UPDATE_MILESTONE_ORDER,
        payload: async () => {
          try {
            const response = _res(await updateMilestoneOrder(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const errorMessage = _err(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),
  };
}
