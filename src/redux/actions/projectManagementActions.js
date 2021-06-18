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
    getPhases,
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
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
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
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
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
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
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
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
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
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
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
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
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
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getPhases: data =>
      dispatch({
        type: types.GET_PHASES,
        payload: async () => {
          try {
            const response = _res(await getPhases(data));
            return Promise.resolve(response.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
  };
}
