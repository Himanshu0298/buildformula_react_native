import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import useProject from '../../services/project';
import {useSnackbar} from 'components/Snackbar';
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
        payload: new Promise(async (resolve, reject) => {
          try {
            let response = processResponse(await getProjectData(projectId));
            const {data} = response;

            if (data?.projectData?.towerCount) {
              delete data.projectData.towerCount;
            }

            return resolve(data);
          } catch (error) {
            let errorMessage = processError(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return reject(errorMessage);
          }
        }),
      }),
    getProjects: (formData) =>
      dispatch({
        type: types.GET_PROJECTS,
        payload: new Promise(async (resolve, reject) => {
          try {
            let response = processResponse(await getProjects(formData));
            const {data} = response;

            return resolve(data);
          } catch (error) {
            let errorMessage = processError(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return reject(errorMessage);
          }
        }),
      }),

    createProject: (formData) =>
      dispatch({
        type: types.CREATE_PROJECT,
        payload: new Promise(async (resolve, reject) => {
          try {
            let response = processResponse(await createProject(formData));
            const {data} = response;
            console.log('-----> data', data);

            return resolve(data);
          } catch (error) {
            let errorMessage = processError(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return reject(errorMessage);
          }
        }),
      }),

    selectPlan: (formData) =>
      dispatch({
        type: types.UPDATE_PAYMENT,
        payload: new Promise(async (resolve, reject) => {
          try {
            let response = processResponse(await updatePayment(formData));
            const {data} = response;

            return resolve(data);
          } catch (error) {
            let errorMessage = processError(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return reject(errorMessage);
          }
        }),
      }),

    updateAdmins: (formData) =>
      dispatch({
        type: types.UPDATE_ADMINS,
        payload: new Promise(async (resolve, reject) => {
          try {
            let response = processResponse(await updateAdmins(formData));
            const {data} = response;

            snackbar.showMessage({message: 'Updated Admins Successfully!'});

            return resolve(data);
          } catch (error) {
            let errorMessage = processError(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return reject(errorMessage);
          }
        }),
      }),
  };
}
