import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import useProject from '../../services/project';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'utils/responseProcessor';

export default function useProjectActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {processError, processResponse} = useResProcessor();

  const {
    getProjects,
    getProjectData,
    createProject,
    updatePayment,
    updateAdmins,
  } = useProject();

  return {
    getProjectData: (projectId) =>
      dispatch({
        type: types.GET_SELECTED_PROJECT,
        payload: async () => {
          try {
            let response = processResponse(await getProjectData(projectId));
            const {data} = response;

            if (data?.projectData?.towerCount) {
              delete data.projectData.towerCount;
            }

            return Promise.resolve(data);
          } catch (error) {
            let errorMessage = processError(error);
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
            let response = processResponse(await getProjects(formData));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            let errorMessage = processError(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),

    createProject: (formData) =>
      dispatch({
        type: types.CREATE_PROJECT,
        payload: async () => {
          try {
            let response = processResponse(await createProject(formData));
            const {data} = response;
            console.log('-----> data', data);

            return Promise.resolve(data);
          } catch (error) {
            let errorMessage = processError(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),

    selectPlan: (formData) =>
      dispatch({
        type: types.UPDATE_PAYMENT,
        payload: async () => {
          try {
            let response = processResponse(await updatePayment(formData));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            let errorMessage = processError(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),

    updateAdmins: (formData) =>
      dispatch({
        type: types.UPDATE_ADMINS,
        payload: async () => {
          try {
            let response = processResponse(await updateAdmins(formData));
            const {data} = response;

            snackbar.showMessage({message: 'Updated Admins Successfully!'});

            return Promise.resolve(data);
          } catch (error) {
            let errorMessage = processError(error);
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
