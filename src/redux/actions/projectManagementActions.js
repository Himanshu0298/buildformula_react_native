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
    addPhase,
    updatePhase,
    deletePhase,
    getSubPhases,
    addSubPhase,
    updateSubPhase,
    deleteSubPhase,
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

    getPhases: (data, refreshing) =>
      dispatch({
        type: refreshing ? types.REFRESH_PHASES : types.GET_PHASES,
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

    addPhase: data =>
      dispatch({
        type: types.ADD_PHASE,
        payload: async () => {
          try {
            const res = _res(await addPhase(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updatePhase: data =>
      dispatch({
        type: types.DELETE_PHASE,
        payload: async () => {
          try {
            const res = _res(await updatePhase(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    deletePhase: data =>
      dispatch({
        type: types.DELETE_PHASE,
        payload: async () => {
          try {
            const res = _res(await deletePhase(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getSubPhases: (data, refreshing) =>
      dispatch({
        type: refreshing ? types.REFRESH_SUB_PHASES : types.GET_SUB_PHASES,
        payload: async () => {
          try {
            const res = _res(await getSubPhases(data));
            return Promise.resolve(res.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addSubPhase: data =>
      dispatch({
        type: types.ADD_SUB_PHASE,
        payload: async () => {
          try {
            const res = _res(await addSubPhase(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updateSubPhase: data =>
      dispatch({
        type: types.UPDATE_SUB_PHASE,
        payload: async () => {
          try {
            const res = _res(await updateSubPhase(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    deleteSubPhase: data =>
      dispatch({
        type: types.DELETE_SUB_PHASE,
        payload: async () => {
          try {
            const res = _res(await deleteSubPhase(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
  };
}
