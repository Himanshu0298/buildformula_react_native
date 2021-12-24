import {useDispatch} from 'react-redux';
import {useResProcessor} from 'utils/responseProcessor';
import {useSnackbar} from 'components/Atoms/Snackbar';
import useFiles from 'services/files';
import * as types from './actionTypes';

export default function useFileActions() {
  const dispatch = useDispatch();
  const {
    getFolders,
    createFolder,
    renameFolder,
    deleteFolder,
    getFiles,
    renameFile,
    uploadFile,
    deleteFile,
    shareFolder,
    shareFile,
    getVersion,
    fileActivities,
    addVersion,
    deleteVersion,
  } = useFiles();
  const {_err, _res} = useResProcessor();
  const snackbar = useSnackbar();

  return {
    getFolders: params =>
      dispatch({
        type: types.GET_FOLDERS,
        payload: async () => {
          try {
            const res = _res(await getFolders(params));

            return Promise.resolve({data: res.data, index_of: params.index_of});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getVersion: params =>
      dispatch({
        type: types.GET_VERSION,
        payload: async () => {
          try {
            const res = _res(await getVersion(params));
            console.log('--->version', res);
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
    getActivities: params =>
      dispatch({
        type: types.GET_FILE_ACTIVITIES,
        payload: async () => {
          try {
            const {data} = _res(await fileActivities(params));
            return Promise.resolve(data || []);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    createFolder: params =>
      dispatch({
        type: types.CREATE_FOLDER,
        payload: async () => {
          try {
            const res = _res(await createFolder(params));

            return Promise.resolve(res.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    renameFolder: params =>
      dispatch({
        type: types.RENAME_FOLDER,
        payload: async () => {
          try {
            const res = _res(await renameFolder(params));
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
    deleteFolder: params =>
      dispatch({
        type: types.DELETE_FOLDER,
        payload: async () => {
          try {
            const res = _res(await deleteFolder(params));
            console.log('--->delete', res);
            return Promise.resolve(res);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getFiles: params =>
      dispatch({
        type: types.GET_FILES,
        payload: async () => {
          try {
            const res = _res(await getFiles(params));
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
    renameFile: params =>
      dispatch({
        type: types.RENAME_FILE,
        payload: async () => {
          try {
            const res = _res(await renameFile(params));
            return Promise.resolve({
              data: res,
            });
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    uploadFile: params =>
      dispatch({
        type: types.UPLOAD_FILE,
        payload: async () => {
          try {
            const res = _res(await uploadFile(params));
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
    deleteFile: params =>
      dispatch({
        type: types.DELETE_FILE,
        payload: async () => {
          try {
            const {data} = _res(await deleteFile(params));
            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    shareFolder: params =>
      dispatch({
        type: types.SHARE_FOLDER_WITH_USERS,
        payload: async () => {
          try {
            const {data} = _res(await shareFolder(params));
            snackbar.showMessage({message: 'Folder Shared Successfully!'});
            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    shareFile: params =>
      dispatch({
        type: types.SHARE_FILE_WITH_USERS,
        payload: async () => {
          try {
            const {data} = _res(await shareFile(params));
            snackbar.showMessage({message: 'File Shared Successfully!'});

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addVersion: params =>
      dispatch({
        type: types.ADD_NEW_VERSION,
        payload: async () => {
          try {
            const {data} = _res(await addVersion(params));
            snackbar.showMessage({message: 'New Version Added Successfully!'});

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteVersion: params =>
      dispatch({
        type: types.DELETE_VERSION,
        payload: async () => {
          try {
            const {data} = _res(await deleteVersion(params));
            snackbar.showMessage({message: 'Version Deleted Successfully!'});

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
  };
}
