import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import useProject from '../../services/project';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'utils/responseProcessor';

export default function useProjectActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {_err, _res} = useResProcessor();

  const {
    getProjects,
    getProjectData,
    getProjectCommonData,
    getDashboardData,
    getProjectPermissions,
  } = useProject();

  return {
    setSelectedUnit: unit =>
      dispatch({type: types.SET_SELECTED_UNIT, payload: unit}),

    getProjectData: projectId =>
      dispatch({
        type: types.GET_SELECTED_PROJECT,
        payload: async () => {
          try {
            const response = _res(await getProjectData(projectId));
            const {data} = response;

            if (data?.projectData?.towerCount) {
              delete data.projectData.towerCount;
            }

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getProjectCommonData: project_id =>
      dispatch({
        type: types.GET_PROJECT_COMMON_DATA,
        payload: async () => {
          try {
            const res = _res(await getProjectCommonData({project_id}));

            return Promise.resolve(res.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getProjects: formData =>
      dispatch({
        type: types.GET_PROJECTS,
        payload: async () => {
          try {
            const response = _res(await getProjects(formData));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getProjectPermissions: projectId =>
      dispatch({
        type: types.GET_PROJECT_PERMISSIONS,
        payload: async () => {
          try {
            const {data} = _res(
              await getProjectPermissions({project_id: projectId}),
            );
            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getDashboardData: projectId =>
      dispatch({
        type: types.GET_DASHBOARD_DATA,
        payload: async () => {
          try {
            const {data} = _res(
              await getDashboardData({project_id: projectId}),
            );
            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
  };
}
