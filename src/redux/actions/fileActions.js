import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import {useResProcessor} from 'utils/responseProcessor';
import {useSnackbar} from 'components/Atoms/Snackbar';
import useFiles from 'services/files';

export default function useFileActions() {
  const dispatch = useDispatch();
  const {getFolders, createFolder} = useFiles();
  const {processError, processResponse} = useResProcessor();
  const snackbar = useSnackbar();

  return {
    getFolders: (formData) =>
      dispatch({
        type: types.GET_FOLDERS,
        payload: async () => {
          try {
            const {data: res} = processResponse(await getFolders(formData));

            return Promise.resolve(res.data);
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
    createFolder: (formData) =>
      dispatch({
        type: types.CREATE_FOLDER,
        payload: async () => {
          try {
            const {data: res} = processResponse(await createFolder(formData));

            return Promise.resolve(res.data);
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
