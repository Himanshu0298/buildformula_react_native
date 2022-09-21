import {useDispatch} from 'react-redux';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'hooks/useResponseProcessor';
import useProjectManagement from 'services/projectManagement';
import * as types from './actionTypes';

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
    updatePhaseOrder,
    getGeneralPhaseActivities,
    addGeneralPhaseActivity,
    updateGeneralActivity,
    getWBSLevelWorks,
    WBSExecutionDetails,
    WBSExecutionList,
    addProgressRecord,
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
            snackbar.showMessage({message: response.msg});
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
    updatePhaseOrder: (data, refreshing) =>
      dispatch({
        type: types.UPDATE_PHASE_ORDER,
        payload: async () => {
          try {
            const response = _res(await updatePhaseOrder(data));
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

    getGeneralPhaseActivities: data =>
      dispatch({
        type: types.GET_PHASE_ACTIVITIES,
        payload: async () => {
          try {
            const res = _res(await getGeneralPhaseActivities(data));
            return Promise.resolve(res);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addGeneralPhaseActivity: data =>
      dispatch({
        type: types.ADD_PHASE_ACTIVITY,
        payload: async () => {
          try {
            const res = _res(await addGeneralPhaseActivity(data));
            return Promise.resolve(res);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateGeneralActivity: data =>
      dispatch({
        type: types.UPDATE_PHASE_ACTIVITY,
        payload: async () => {
          try {
            const res = _res(await updateGeneralActivity(data));
            return Promise.resolve(res);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getWBSLevelWorks: params =>
      dispatch({
        type: types.GET_WBS_LEVEL_WORKS,
        payload: async () => {
          try {
            const res = _res(await getWBSLevelWorks(params));
            return Promise.resolve({...res.data, id: params.parent_id});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    WBSExecutionDetails: params =>
      dispatch({
        type: types.WBS_EXECUTION_DETAILS,
        payload: async () => {
          try {
            const res = _res(await WBSExecutionDetails(params));
            return Promise.resolve(res.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    WBSExecutionList: params =>
      dispatch({
        type: types.WBS_EXECUTION_LIST,
        payload: async () => {
          try {
            const res = _res(await WBSExecutionList(params));
            return Promise.resolve(res.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addProgressRecord: data =>
      dispatch({
        type: types.ADD_PROGRESS_RECORD,
        payload: async () => {
          try {
            const res = _res(await addProgressRecord(data));
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
