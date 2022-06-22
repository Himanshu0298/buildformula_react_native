import {useDispatch} from 'react-redux';
import {useResProcessor} from 'hooks/useResponseProcessor';
import {useSnackbar} from 'components/Atoms/Snackbar';
import useDesignModule from 'services/designModule';
import * as types from './actionTypes';

export default function useDesignModuleActions() {
  const dispatch = useDispatch();
  const {
    getRDFolders,
    getRDFiles,
    createRDFolder,
    uploadRDFile,
    renameRDFolder,
    deleteRDFolder,
    getRDActivities,
  } = useDesignModule();
  const {_err, _res} = useResProcessor();
  const snackbar = useSnackbar();

  return {
    getRDFolders: params =>
      dispatch({
        type: types.GET_RD_FOLDERS,
        payload: async () => {
          try {
            const res = _res(await getRDFolders(params));

            return Promise.resolve({data: res.data, index_of: params.index_of});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getRDFiles: params =>
      dispatch({
        type: types.GET_RD_FILES,
        payload: async () => {
          try {
            const res = _res(await getRDFiles(params));
            return Promise.resolve({
              data: res.data,
              folder_id: params.folder_id,
            });
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    uploadRDFile: params =>
      dispatch({
        type: types.UPLOAD_RD_FILES,
        payload: async () => {
          try {
            const res = _res(await uploadRDFile(params));
            return Promise.resolve({
              data: res.data,
            });
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    renameRDFolder: params =>
      dispatch({
        type: types.RENAME_RD_FOLDER,
        payload: async () => {
          try {
            const res = _res(await renameRDFolder(params));
            return Promise.resolve({
              data: res.data,
            });
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    deleteRDFolder: params =>
      dispatch({
        type: types.DELETE_RD_FOLDER,
        payload: async () => {
          try {
            const res = _res(await deleteRDFolder(params));
            console.log('--->delete', res);
            return Promise.resolve(res);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getRDActivities: params =>
      dispatch({
        type: types.GET_RD_FOLDER_ACTIVITIES,
        payload: async () => {
          try {
            const {data} = _res(await getRDActivities(params));
            return Promise.resolve(data || []);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    createRDFolder: params =>
      dispatch({
        type: types.CREATE_RD_FOLDER,
        payload: async () => {
          try {
            const res = _res(await createRDFolder(params));

            return Promise.resolve(res.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
  };
}
