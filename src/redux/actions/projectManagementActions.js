import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'utils/responseProcessor';
import useProjectManagement from 'services/projectManagement';

export default function useProjectManagementActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {getWorks} = useProjectManagement();
  const {processError, processResponse} = useResProcessor();

  return {
    getWorks: (data) =>
      dispatch({
        type: types.GET_WORKS,
        payload: async () => {
          try {
            const response = processResponse(await getWorks(data));
            return Promise.resolve({response});
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
