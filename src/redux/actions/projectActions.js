import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import useProject from '../../services/project';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'utils/responseProcessor';

export default function useProjectActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {_err, _res} = useResProcessor();

  const {getProjects, getProjectData, getProjectCommonData} = useProject();

  return {
    getProjectData: (projectId) =>
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
            const errorMessage = _err(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),
    getProjectCommonData: (project_id) =>
      dispatch({
        type: types.GET_PROJECT_COMMON_DATA,
        payload: async () => {
          try {
            const res = _res(await getProjectCommonData({project_id}));

            return Promise.resolve(res.data);
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
    getProjects: (formData) =>
      dispatch({
        type: types.GET_PROJECTS,
        payload: async () => {
          try {
            const response = _res(await getProjects(formData));
            const {data} = response;

            return Promise.resolve(data);
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
