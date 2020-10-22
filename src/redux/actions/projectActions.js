import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import useProject from '../../services/project';
import {useSnackbar} from '../../components/Snackbar';
import {processError, processResponse} from '../../utils';

export default function useProjectActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {createProject, updatePayment} = useProject();

  return {
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
  };
}