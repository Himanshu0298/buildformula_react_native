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
    renameRDFile,
    deleteRDFile,
    addRDVersion,
    getFDFolders,
    getFDFiles,
    createFDFolder,
    renameFDFolder,
    deleteFDFolder,
    getFDActivities,
    uploadFDFile,
    renameFDFile,
    deleteFDFile,
    getWDFiles,
    getWDFolders,
    createWDFolder,
    renameWDFolder,
    deleteWDFolder,
    getWDActivities,
    uploadWDFile,
    renameWDFile,
    deleteWDFile,
    updateAreaSheet,
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

    renameRDFile: params =>
      dispatch({
        type: types.RENAME_RD_FILES,
        payload: async () => {
          try {
            const res = _res(await renameRDFile(params));
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

    deleteRDFile: params =>
      dispatch({
        type: types.DELETE_RD_FILES,
        payload: async () => {
          try {
            const {data, msg} = _res(await deleteRDFile(params));
            snackbar.showMessage({message: msg});

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addRDVersion: params =>
      dispatch({
        type: types.ADD_NEW_RD_VERSION,
        payload: async () => {
          try {
            const {data} = _res(await addRDVersion(params));
            snackbar.showMessage({message: 'New Version Added Successfully!'});

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    // Final Drawing

    getFDFolders: params =>
      dispatch({
        type: types.GET_RD_FOLDERS,
        payload: async () => {
          try {
            const res = _res(await getFDFolders(params));

            return Promise.resolve({data: res.data, index_of: params.index_of});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getFDFiles: params =>
      dispatch({
        type: types.GET_RD_FILES,
        payload: async () => {
          try {
            const res = _res(await getFDFiles(params));
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
    createFDFolder: params =>
      dispatch({
        type: types.CREATE_RD_FOLDER,
        payload: async () => {
          try {
            const res = _res(await createFDFolder(params));

            return Promise.resolve(res.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    renameFDFolder: params =>
      dispatch({
        type: types.RENAME_RD_FOLDER,
        payload: async () => {
          try {
            const res = _res(await renameFDFolder(params));
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
    deleteFDFolder: params =>
      dispatch({
        type: types.DELETE_RD_FOLDER,
        payload: async () => {
          try {
            const res = _res(await deleteFDFolder(params));
            console.log('--->delete', res);
            return Promise.resolve(res);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getFDActivities: params =>
      dispatch({
        type: types.GET_RD_FOLDER_ACTIVITIES,
        payload: async () => {
          try {
            const {data} = _res(await getFDActivities(params));
            return Promise.resolve(data || []);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    uploadFDFile: params =>
      dispatch({
        type: types.UPLOAD_RD_FILES,
        payload: async () => {
          try {
            const res = _res(await uploadFDFile(params));
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

    renameFDFile: params =>
      dispatch({
        type: types.RENAME_RD_FILES,
        payload: async () => {
          try {
            const res = _res(await renameFDFile(params));
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

    deleteFDFile: params =>
      dispatch({
        type: types.DELETE_RD_FILES,
        payload: async () => {
          try {
            const {data, msg} = _res(await deleteFDFile(params));
            snackbar.showMessage({message: msg});

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    // Working Drawing

    getWDFolders: params =>
      dispatch({
        type: types.GET_RD_FOLDERS,
        payload: async () => {
          try {
            const res = _res(await getWDFolders(params));

            return Promise.resolve({data: res.data, index_of: params.index_of});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getWDFiles: params =>
      dispatch({
        type: types.GET_RD_FILES,
        payload: async () => {
          try {
            const res = _res(await getWDFiles(params));
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

    createWDFolder: params =>
      dispatch({
        type: types.CREATE_RD_FOLDER,
        payload: async () => {
          try {
            const res = _res(await createWDFolder(params));

            return Promise.resolve(res.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    renameWDFolder: params =>
      dispatch({
        type: types.RENAME_RD_FOLDER,
        payload: async () => {
          try {
            const res = _res(await renameWDFolder(params));
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

    deleteWDFolder: params =>
      dispatch({
        type: types.DELETE_RD_FOLDER,
        payload: async () => {
          try {
            const res = _res(await deleteWDFolder(params));
            console.log('--->delete', res);
            return Promise.resolve(res);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getWDActivities: params =>
      dispatch({
        type: types.GET_RD_FOLDER_ACTIVITIES,
        payload: async () => {
          try {
            const {data} = _res(await getWDActivities(params));
            return Promise.resolve(data || []);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    uploadWDFile: params =>
      dispatch({
        type: types.UPLOAD_RD_FILES,
        payload: async () => {
          try {
            const res = _res(await uploadWDFile(params));
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

    renameWDFile: params =>
      dispatch({
        type: types.RENAME_RD_FILES,
        payload: async () => {
          try {
            const res = _res(await renameWDFile(params));
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

    deleteWDFile: params =>
      dispatch({
        type: types.DELETE_RD_FILES,
        payload: async () => {
          try {
            const {data, msg} = _res(await deleteWDFile(params));
            snackbar.showMessage({message: msg});

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    // Area sheet / Project Sheet

    updateAreaSheet: params =>
      dispatch({
        type: types.UPDATE_AREA_SHEET,
        payload: async () => {
          try {
            const {data, msg} = _res(await updateAreaSheet(params));
            snackbar.showMessage({message: msg});

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
