import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import useProject from '../../services/project';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'utils/responseProcessor';

export default function useProjectActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {processError, processResponse} = useResProcessor();

  const {getProjects, getProjectData} = useProject();

  return {
    getProjectData: (projectId) =>
      dispatch({
        type: types.GET_SELECTED_PROJECT,
        payload: async () => {
          try {
            const response = processResponse(await getProjectData(projectId));
            const {data} = response;

            if (data?.projectData?.towerCount) {
              delete data.projectData.towerCount;
            }

            return Promise.resolve(data);
          } catch (error) {
            const errorMessage = processError(error);
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
            const response = processResponse(await getProjects(formData));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const errorMessage = processError(error);
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
