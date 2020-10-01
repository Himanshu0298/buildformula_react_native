import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import useProject from '../../services/project';
import {useSnackbar} from '../../components/Snackbar';
import {processError} from '../../utils';

export default function useProjectActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {createProject} = useProject();

  return {
    createProject: (formData) =>
      dispatch({
        type: types.CREATE_PROJECT,
        payload: new Promise(async (resolve, reject) => {
          try {
            let response = await createProject(formData);
            const {data} = response.data;
            console.log('-----> response', data);

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
