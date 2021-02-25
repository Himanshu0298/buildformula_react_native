import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import {useResProcessor} from 'utils/responseProcessor';
import {useSnackbar} from 'components/Atoms/Snackbar';
import useFiles from 'services/files';

export default function useFileActions() {
  const dispatch = useDispatch();
  const {getFolders, createFolder, getFiles, renameFolder} = useFiles();
  const {processError, processResponse} = useResProcessor();
  const snackbar = useSnackbar();

  return {
    getFolders: (params) =>
      dispatch({
        type: types.GET_FOLDERS,
        payload: async () => {
          try {
            const res = processResponse(await getFolders(params));

            return Promise.resolve({data: res.data, index_of: params.index_of});
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
    createFolder: (params) =>
      dispatch({
        type: types.CREATE_FOLDER,
        payload: async () => {
          try {
            const res = processResponse(await createFolder(params));

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
    getFiles: (params) =>
      dispatch({
        type: types.GET_FILES,
        payload: async () => {
          try {
            const res = processResponse(await getFiles(params));
            return Promise.resolve({
              data: res.data,
              folder_id: params.folder_id,
            });
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
    renameFolder: (params) =>
      dispatch({
        type: types.RENAME_FOLDER,
        payload: async () => {
          try {
            const res = processResponse(await renameFolder(params));
            return Promise.resolve({
              data: res.data,
            });
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
