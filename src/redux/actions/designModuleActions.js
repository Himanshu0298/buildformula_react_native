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
    getRDVersion,
    getFDFolders,
    getFDFiles,
    createFDFolder,
    renameFDFolder,
    deleteFDFolder,
    getFDActivities,
    uploadFDFile,
    renameFDFile,
    deleteFDFile,
    getFDTowers,
    addFDTowerFiles,
    getFDTowerFloors,
    addFDTowerFloorsRows,
    updateFDTowerFloorsRows,
    deleteFDTowerFloorsRows,
    renameFDTowerFile,
    deleteFDTowerFile,
    FDTowerFileActivityLogs,
    uploadTowerFileVersion,
    getFDBungalows,
    uploadFDBungalowsFile,
    renameFDBungalowsFile,
    deleteFDBungalowsFile,
    FDBungalowsFileActivityLog,
    getFDPlots,
    uploadFDPlotFiles,
    uploadFDPlotBungalowFileVersion,
    addFloorFolder,
    addFloorFolderFile,
    getWDFiles,
    getWDFolders,
    getWDTowers,
    getWDTower,
    createWDFolder,
    renameWDFolder,
    deleteWDFolder,
    renameWDFloorFolder,
    getWDActivities,
    uploadWDFile,
    renameWDFile,
    deleteWDFile,
    getProjectSheetList,
    updateAreaSheet,
    getCategoryTowerSheet,
    updateCategoryTowerSheet,
    getCategoryBungalowSheet,
    updateCategoryBungalowSheet,
    getCategoryPlotSheet,
    updateCategoryPlotSheet,
    getTowerUnitSheet,
    updateTowerUnitSheet,
    getBungalowUnitSheet,
    updateBungalowUnitSheet,
    getPlotUnitSheet,
    updatePlotUnitSheet,
    getParkingList,
    uploadParkingFile,
    deleteParkingFile,
    updateParkingList,
    getWDVersion,
    addRDVersion,
    addFDVersion,
    addWDVersion,
    deleteRDVersion,
    getFDVersion,
    deleteFDVersion,
    deleteWDVersion,
    getFDTowerFloorFolder,
    getFloorFolderFile,
    rearrangeFloorRows,
    getTowerFolderFileVersion,
    deleteWDFloorFolder,
    deleteWDFloorFolderFile,
    uploadWDTFileVersion,
    uploadWDTowersFile,
    AddWDRow,
    updateWDRow,
    deleteWDRow,
    getWDplots,
    uploadWDPlotsFile,
    uploadFDPlotBungalowFile,
    getWDBungalowList,
    uploadWDBungalowsFile,
    renameWDCommonFile,
    deleteWDTowerFile,
    getWDCommonFileActivity,
    getWDPlot,
    deleteWDPlotBungalowFile,
    renameWDTowerFile,
    uploadWDTowerFileVersion,
    createWDFloorFolder,
    getWDFloorFolder,
    getWDFloorFolderFile,
    uploadWDFloorFolderFile,
    uploadWDFloorFolderFileVersion,
    deleteFloorFolderFileVersion,
    getFloorFolderFileVersion,
    getFDFolderFileVersion,
    getBungalowPlotFileVersion,
    uploadWDBungalowPlotFileVersion,
    getTowerFileVersion,
    uploadFDFloorFolderFileVersion,
    getFDFloorFolderFileVersion,
    deleteFDFloorFolderFileVersion,
    renameFDFloorFolder,
    WDTowerFileActivityLogs,
    uploadFloorFileVersion,
    getFDPlotFileVersion,
    deleteFDFloorFolder,
    deleteWDPlotBungalowFileVersion,
    getWDFloorFolderFileActivity,
    renameWDFloorFolderFile,
    getFDFloorFolderFileActivity,
    renameFDFloorFolderFile,
    deleteFDPlotBungalowFileVersion,
    deleteFDFloorFolderFile,
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

    getRDVersion: params =>
      dispatch({
        type: types.GET_RD_VERSION,
        payload: async () => {
          try {
            const {data} = _res(await getRDVersion(params));

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
        type: types.ADD_RD_VERSION,
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
    deleteRDVersion: params =>
      dispatch({
        type: types.DELETE_RD_VERSION,
        payload: async () => {
          try {
            const {data, msg} = _res(await deleteRDVersion(params));
            snackbar.showMessage({message: msg});

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

    getFDVersion: params =>
      dispatch({
        type: types.GET_RD_VERSION,
        payload: async () => {
          try {
            const {data} = _res(await getFDVersion(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getFDPlotFileVersion: params =>
      dispatch({
        type: types.GET_RD_VERSION,
        payload: async () => {
          try {
            const {data} = _res(await getFDPlotFileVersion(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addFDVersion: params =>
      dispatch({
        type: types.ADD_RD_VERSION,
        payload: async () => {
          try {
            const {data} = _res(await addFDVersion(params));
            snackbar.showMessage({message: 'New Version Added Successfully!'});

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteFDVersion: params =>
      dispatch({
        type: types.DELETE_RD_VERSION,
        payload: async () => {
          try {
            const {data, msg} = _res(await deleteFDVersion(params));
            snackbar.showMessage({message: msg});

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getFDTowers: params =>
      dispatch({
        type: types.GET_FD_TOWERS,
        payload: async () => {
          try {
            const {data} = _res(await getFDTowers(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addFDTowerFiles: params =>
      dispatch({
        type: types.ADD_FD_TOWER_FILES,
        payload: async () => {
          try {
            const {data} = _res(await addFDTowerFiles(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getFDTowerFloors: params =>
      dispatch({
        type: types.GET_FD_TOWER_FLOORS,
        payload: async () => {
          try {
            const {data} = _res(await getFDTowerFloors(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addFDTowerFloorsRows: params =>
      dispatch({
        type: types.ADD_FD_TOWER_ROWS,
        payload: async () => {
          try {
            const {data} = _res(await addFDTowerFloorsRows(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateFDTowerFloorsRows: params =>
      dispatch({
        type: types.UPDATE_FD_TOWER_ROWS,
        payload: async () => {
          try {
            const {data} = _res(await updateFDTowerFloorsRows(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteFDTowerFloorsRows: params =>
      dispatch({
        type: types.DELETE_FD_TOWER_ROWS,
        payload: async () => {
          try {
            const {data} = _res(await deleteFDTowerFloorsRows(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    renameFDTowerFile: params =>
      dispatch({
        type: types.RENAME_FD_TOWER_FILE,
        payload: async () => {
          try {
            const {data, msg} = _res(await renameFDTowerFile(params));
            snackbar.showMessage({message: msg});

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    deleteFDTowerFile: params =>
      dispatch({
        type: types.DELETE_FD_TOWER_FILE,
        payload: async () => {
          try {
            const {data, msg} = _res(await deleteFDTowerFile(params));
            snackbar.showMessage({message: msg});

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    FDTowerFileActivityLogs: params =>
      dispatch({
        type: types.FD_TOWER_ACTIVITY_LOG,
        payload: async () => {
          try {
            const {data} = _res(await FDTowerFileActivityLogs(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    WDTowerFileActivityLogs: params =>
      dispatch({
        type: types.FD_TOWER_ACTIVITY_LOG,
        payload: async () => {
          try {
            const {data} = _res(await WDTowerFileActivityLogs(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getFDTowerFloorFolder: params =>
      dispatch({
        type: types.FD_TOWER_FLOOR_FOLDER,
        payload: async () => {
          try {
            const {data} = _res(await getFDTowerFloorFolder(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getFloorFolderFile: params =>
      dispatch({
        type: types.FD_TOWER_FLOOR_FILE,
        payload: async () => {
          try {
            const {data} = _res(await getFloorFolderFile(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    rearrangeFloorRows: params =>
      dispatch({
        type: types.FD_TOWER_FLOOR_FILE,
        payload: async () => {
          try {
            const {data} = _res(await rearrangeFloorRows(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    uploadTowerFileVersion: params =>
      dispatch({
        type: types.UPDATE_TOWER_FILE_VERSION,
        payload: async () => {
          try {
            const {data, msg} = _res(await uploadTowerFileVersion(params));
            snackbar.showMessage({message: msg});

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getFDBungalows: params =>
      dispatch({
        type: types.GET_FD_BUNGALOWS,
        payload: async () => {
          try {
            const {data} = _res(await getFDBungalows(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    uploadFDBungalowsFile: params =>
      dispatch({
        type: types.UPLOAD_BUNGALOWS_FILES,
        payload: async () => {
          try {
            const {data, msg} = _res(await uploadFDBungalowsFile(params));
            snackbar.showMessage({message: msg});

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    renameFDBungalowsFile: params =>
      dispatch({
        type: types.RENAME_FD_BUNGALOWS_FILES,
        payload: async () => {
          try {
            const {data} = _res(await renameFDBungalowsFile(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteFDBungalowsFile: params =>
      dispatch({
        type: types.RENAME_FD_BUNGALOWS_FILES,
        payload: async () => {
          try {
            const {data} = _res(await deleteFDBungalowsFile(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    FDBungalowsFileActivityLog: params =>
      dispatch({
        type: types.FD_TOWER_ACTIVITY_LOG,
        payload: async () => {
          try {
            const {data} = _res(await FDBungalowsFileActivityLog(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getWDCommonFileActivity: params =>
      dispatch({
        type: types.WD_FILE_ACTIVITY_LOG,
        payload: async () => {
          try {
            const {data} = _res(await getWDCommonFileActivity(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getFDPlots: params =>
      dispatch({
        type: types.GET_FD_PLOTS,
        payload: async () => {
          try {
            const {data} = _res(await getFDPlots(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getWDPlot: params =>
      dispatch({
        type: types.GET_PLOT_FILE,
        payload: async () => {
          try {
            const {data} = _res(await getWDPlot(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    uploadFDPlotFiles: params =>
      dispatch({
        type: types.ADD_FD_PLOT_FILES,
        payload: async () => {
          try {
            const {data} = _res(await uploadFDPlotFiles(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    uploadFDPlotBungalowFileVersion: params =>
      dispatch({
        type: types.UPLOAD_FD_BUNGALOW_TOWER_FILE_VERSION,
        payload: async () => {
          try {
            const {data} = _res(await uploadFDPlotBungalowFileVersion(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addFloorFolder: params =>
      dispatch({
        type: types.ADD_FD_FLOOR_FOLDER,
        payload: async () => {
          try {
            const {data} = _res(await addFloorFolder(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getTowerFolderFileVersion: params =>
      dispatch({
        type: types.GET_WD_VERSION,
        payload: async () => {
          try {
            const {data} = _res(await getTowerFolderFileVersion(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addFloorFolderFile: params =>
      dispatch({
        type: types.UPLOAD_FD_BUNGALOW_TOWER_FILE_VERSION,
        payload: async () => {
          try {
            const {data} = _res(await addFloorFolderFile(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    deleteWDFloorFolder: params =>
      dispatch({
        type: types.DELETE_RD_FOLDER,
        payload: async () => {
          try {
            const {data} = _res(await deleteWDFloorFolder(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteWDFloorFolderFile: params =>
      dispatch({
        type: types.DELETE_RD_FOLDER,
        payload: async () => {
          try {
            const {data} = _res(await deleteWDFloorFolderFile(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteWDPlotBungalowFileVersion: params =>
      dispatch({
        type: types.DELETE_RD_FOLDER,
        payload: async () => {
          try {
            const {data} = _res(await deleteWDPlotBungalowFileVersion(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    renameWDFloorFolder: params =>
      dispatch({
        type: types.RENAME_RD_FOLDER,
        payload: async () => {
          try {
            const {data} = _res(await renameWDFloorFolder(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    renameWDFloorFolderFile: params =>
      dispatch({
        type: types.RENAME_RD_FOLDER,
        payload: async () => {
          try {
            const {data} = _res(await renameWDFloorFolderFile(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getWDFloorFolderFileActivity: params =>
      dispatch({
        type: types.GET_WD_FOLDER_FILE_ACTIVITY,
        payload: async () => {
          try {
            const {data} = _res(await getWDFloorFolderFileActivity(params));

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
    getWDTowers: params =>
      dispatch({
        type: types.GET_WD_PLOTS,
        payload: async () => {
          try {
            const res = _res(await getWDTowers(params));

            return Promise.resolve({data: res.data, index_of: params.index_of});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getWDTower: params =>
      dispatch({
        type: types.GET_WD_TOWER,
        payload: async () => {
          try {
            const res = _res(await getWDTower(params));

            return Promise.resolve({data: res.data, index_of: params.index_of});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    uploadWDTowersFile: params =>
      dispatch({
        type: types.ADD_FD_TOWER_FILES,
        payload: async () => {
          try {
            const res = _res(await uploadWDTowersFile(params));

            return Promise.resolve({data: res.data, index_of: params.index_of});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    uploadWDTFileVersion: params =>
      dispatch({
        type: types.ADD_FD_TOWER_FILES,
        payload: async () => {
          try {
            const res = _res(await uploadWDTFileVersion(params));

            return Promise.resolve({data: res.data, index_of: params.index_of});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    uploadFloorFileVersion: params =>
      dispatch({
        type: types.ADD_FD_TOWER_FILES,
        payload: async () => {
          try {
            const res = _res(await uploadFloorFileVersion(params));

            return Promise.resolve({data: res.data, index_of: params.index_of});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    AddWDRow: params =>
      dispatch({
        type: types.ADD_FD_TOWER_ROWS,
        payload: async () => {
          try {
            const res = _res(await AddWDRow(params));

            return Promise.resolve({data: res.data, index_of: params.index_of});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateWDRow: params =>
      dispatch({
        type: types.UPDATE_FD_TOWER_ROWS,
        payload: async () => {
          try {
            const res = _res(await updateWDRow(params));

            return Promise.resolve({data: res.data, index_of: params.index_of});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteWDRow: params =>
      dispatch({
        type: types.DELETE_FD_TOWER_ROWS,
        payload: async () => {
          try {
            const res = _res(await deleteWDRow(params));

            return Promise.resolve({data: res.data, index_of: params.index_of});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getWDplots: params =>
      dispatch({
        type: types.GET_PLOT,
        payload: async () => {
          try {
            const res = _res(await getWDplots(params));

            return Promise.resolve({data: res.data, index_of: params.index_of});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    uploadWDPlotsFile: params =>
      dispatch({
        type: types.UPLOAD_BUNGALOWS_FILES,
        payload: async () => {
          try {
            const res = _res(await uploadWDPlotsFile(params));

            return Promise.resolve({data: res.data, index_of: params.index_of});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    uploadFDPlotBungalowFile: params =>
      dispatch({
        type: types.UPLOAD_BUNGALOWS_FILES,
        payload: async () => {
          try {
            const res = _res(await uploadFDPlotBungalowFile(params));

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
    getWDBungalowList: params =>
      dispatch({
        type: types.GET_WD_BUNGALOWS_LIST,
        payload: async () => {
          try {
            const res = _res(await getWDBungalowList(params));
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
    uploadWDBungalowsFile: params =>
      dispatch({
        type: types.UPLOAD_BUNGALOWS_FILES,
        payload: async () => {
          try {
            const res = _res(await uploadWDBungalowsFile(params));
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
    uploadWDTowerFileVersion: params =>
      dispatch({
        type: types.UPLOAD_BUNGALOWS_FILES,
        payload: async () => {
          try {
            const res = _res(await uploadWDTowerFileVersion(params));
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
    createWDFloorFolder: params =>
      dispatch({
        type: types.UPLOAD_BUNGALOWS_FILES,
        payload: async () => {
          try {
            const res = _res(await createWDFloorFolder(params));
            return Promise.resolve({data: res.data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getWDFloorFolder: params =>
      dispatch({
        type: types.GET_WD_FLOOR_FOLDER,
        payload: async () => {
          try {
            const res = _res(await getWDFloorFolder(params));
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
    getWDFloorFolderFile: params =>
      dispatch({
        type: types.GET_WD_FLOOR_FOLDER_FILE,
        payload: async () => {
          try {
            const res = _res(await getWDFloorFolderFile(params));
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
    uploadWDFloorFolderFile: params =>
      dispatch({
        type: types.UPLOAD_BUNGALOWS_FILES,
        payload: async () => {
          try {
            const res = _res(await uploadWDFloorFolderFile(params));
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
    uploadWDFloorFolderFileVersion: params =>
      dispatch({
        type: types.UPLOAD_BUNGALOWS_FILES,
        payload: async () => {
          try {
            const res = _res(await uploadWDFloorFolderFileVersion(params));
            return Promise.resolve({data: res.data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    uploadWDBungalowPlotFileVersion: params =>
      dispatch({
        type: types.UPLOAD_BUNGALOWS_FILES,
        payload: async () => {
          try {
            const res = _res(await uploadWDBungalowPlotFileVersion(params));
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
    uploadFDFloorFolderFileVersion: params =>
      dispatch({
        type: types.UPLOAD_BUNGALOWS_FILES,
        payload: async () => {
          try {
            const res = _res(await uploadFDFloorFolderFileVersion(params));
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
    deleteFloorFolderFileVersion: params =>
      dispatch({
        type: types.DELETE_RD_FOLDER,
        payload: async () => {
          try {
            const res = _res(await deleteFloorFolderFileVersion(params));
            return Promise.resolve({
              data: res.data,
            });
          } catch (error) {
            const message = _err(error);
            return Promise.reject(message);
          }
        },
      }),
    deleteFDPlotBungalowFileVersion: params =>
      dispatch({
        type: types.DELETE_RD_FOLDER,
        payload: async () => {
          try {
            const res = _res(await deleteFDPlotBungalowFileVersion(params));
            return Promise.resolve({
              data: res.data,
            });
          } catch (error) {
            const message = _err(error);
            return Promise.reject(message);
          }
        },
      }),
    deleteFDFloorFolderFile: params =>
      dispatch({
        type: types.DELETE_RD_FOLDER,
        payload: async () => {
          try {
            const res = _res(await deleteFDFloorFolderFile(params));
            return Promise.resolve({
              data: res.data,
            });
          } catch (error) {
            const message = _err(error);
            return Promise.reject(message);
          }
        },
      }),
    renameFDFloorFolderFile: params =>
      dispatch({
        type: types.RENAME_RD_FILES,
        payload: async () => {
          try {
            const res = _res(await renameFDFloorFolderFile(params));
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
    deleteFDFloorFolderFileVersion: params =>
      dispatch({
        type: types.DELETE_RD_FOLDER,
        payload: async () => {
          try {
            const res = _res(await deleteFDFloorFolderFileVersion(params));
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
    getFDFloorFolderFileActivity: params =>
      dispatch({
        type: types.GET_FD_FLOOR_FOLDER_FILE_ACTIVITY,
        payload: async () => {
          try {
            const res = _res(await getFDFloorFolderFileActivity(params));
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
    getFloorFolderFileVersion: params =>
      dispatch({
        type: types.GET_WD_FLOOR_FOLDER_FILE_VERSION,
        payload: async () => {
          try {
            const res = _res(await getFloorFolderFileVersion(params));
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
    getFDFolderFileVersion: params =>
      dispatch({
        type: types.GET_WD_FLOOR_FOLDER_FILE_VERSION,
        payload: async () => {
          try {
            const res = _res(await getFDFolderFileVersion(params));
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

    getBungalowPlotFileVersion: params =>
      dispatch({
        type: types.GET_WD_FLOOR_FILE_VERSION,
        payload: async () => {
          try {
            const res = _res(await getBungalowPlotFileVersion(params));
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
    getTowerFileVersion: params =>
      dispatch({
        type: types.GET_WD_TOWER_VERSION,
        payload: async () => {
          try {
            const res = _res(await getTowerFileVersion(params));
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
    getFDFloorFolderFileVersion: params =>
      dispatch({
        type: types.GET_FD_FLOOR_FILE_VERSION,
        payload: async () => {
          try {
            const res = _res(await getFDFloorFolderFileVersion(params));
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
    renameWDCommonFile: params =>
      dispatch({
        type: types.RENAME_RD_FILES,
        payload: async () => {
          try {
            const res = _res(await renameWDCommonFile(params));
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
    renameWDTowerFile: params =>
      dispatch({
        type: types.RENAME_RD_FILES,
        payload: async () => {
          try {
            const res = _res(await renameWDTowerFile(params));
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
    renameFDFloorFolder: params =>
      dispatch({
        type: types.RENAME_RD_FILES,
        payload: async () => {
          try {
            const res = _res(await renameFDFloorFolder(params));
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
    deleteWDTowerFile: params =>
      dispatch({
        type: types.DELETE_RD_FOLDER,
        payload: async () => {
          try {
            const res = _res(await deleteWDTowerFile(params));
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
    deleteFDFloorFolder: params =>
      dispatch({
        type: types.DELETE_RD_FOLDER,
        payload: async () => {
          try {
            const res = _res(await deleteFDFloorFolder(params));
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
    deleteWDPlotBungalowFile: params =>
      dispatch({
        type: types.RENAME_RD_FILES,
        payload: async () => {
          try {
            const res = _res(await deleteWDPlotBungalowFile(params));
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
        type: types.DELETE_RD_FILES,
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

    getWDVersion: params =>
      dispatch({
        type: types.GET_RD_VERSION,
        payload: async () => {
          try {
            const {data, msg} = _res(await getWDVersion(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addWDVersion: params =>
      dispatch({
        type: types.ADD_RD_VERSION,
        payload: async () => {
          try {
            const {data} = _res(await addWDVersion(params));
            snackbar.showMessage({message: 'New Version Added Successfully!'});

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    deleteWDVersion: params =>
      dispatch({
        type: types.DELETE_RD_VERSION,
        payload: async () => {
          try {
            const {data} = _res(await deleteWDVersion(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    // Area sheet / Project Sheet

    getProjectSheetList: params =>
      dispatch({
        type: types.GET_PROJECT_AREA_SHEET,
        payload: async () => {
          try {
            const {data} = _res(await getProjectSheetList(params));

            return Promise.resolve(data[0]);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updateAreaSheet: params =>
      dispatch({
        type: types.UPDATE_AREA_SHEET,
        payload: async () => {
          try {
            const {data} = _res(await updateAreaSheet(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    // CategorySheet --TowerSheet

    getCategoryTowerSheet: params =>
      dispatch({
        type: types.GET_CATEGORY_TOWER_SHEET,
        payload: async () => {
          try {
            const {data, msg} = _res(await getCategoryTowerSheet(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updateCategoryTowerSheet: params =>
      dispatch({
        type: types.UPDATE_CATEGORY_TOWER_SHEET,
        payload: async () => {
          try {
            const {data: res} = await updateCategoryTowerSheet(params);
            return Promise.resolve(res.data || params);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    // CategorySheet --BungalowsSheet

    getCategoryBungalowSheet: params =>
      dispatch({
        type: types.GET_CATEGORY_BUNGALOW_SHEET,
        payload: async () => {
          try {
            const {data, msg} = _res(await getCategoryBungalowSheet(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updateCategoryBungalowSheet: params =>
      dispatch({
        type: types.UPDATE_CATEGORY_BUNGALOW_SHEET,
        payload: async () => {
          try {
            const {data: res} = await updateCategoryBungalowSheet(params);
            return Promise.resolve(res.data || params);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    // CategorySheet - PlotArea Sheet

    getCategoryPlotSheet: params =>
      dispatch({
        type: types.GET_CATEGORY_PLOT_SHEET,
        payload: async () => {
          try {
            const {data, msg} = _res(await getCategoryPlotSheet(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updateCategoryPlotSheet: params =>
      dispatch({
        type: types.UPDATE_CATEGORY_PLOT_SHEET,
        payload: async () => {
          try {
            const {data: res} = await updateCategoryPlotSheet(params);
            return Promise.resolve(res.data || params);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    // Unit sheet

    getTowerUnitSheet: params =>
      dispatch({
        type: types.GET_UNIT_TOWER_SHEET,
        payload: async () => {
          try {
            const {data} = _res(await getTowerUnitSheet(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updateTowerUnitSheet: params =>
      dispatch({
        type: types.UPDATE_UNIT_TOWER_SHEET,
        payload: async () => {
          try {
            const {data: res} = await updateTowerUnitSheet(params);
            return Promise.resolve(res.data || params);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getBungalowUnitSheet: params =>
      dispatch({
        type: types.GET_BUNGALOW_UNIT_SHEET,
        payload: async () => {
          try {
            const {data, msg} = _res(await getBungalowUnitSheet(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updateBungalowUnitSheet: params =>
      dispatch({
        type: types.UPDATE_BUNGALOW_UNIT_SHEET,
        payload: async () => {
          try {
            const {data: res} = await updateBungalowUnitSheet(params);
            return Promise.resolve(res.data || params);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getPlotUnitSheet: params =>
      dispatch({
        type: types.GET_PLOT_UNIT_SHEET,
        payload: async () => {
          try {
            const {data, msg} = _res(await getPlotUnitSheet(params));

            return Promise.resolve(data.unit_sheet_plot_data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updatePlotUnitSheet: params =>
      dispatch({
        type: types.UPDATE_PLOT_UNIT_SHEET,
        payload: async () => {
          try {
            const {data: res} = await updatePlotUnitSheet(params);
            return Promise.resolve(res.data || params);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    // Parking

    getParkingList: params =>
      dispatch({
        type: types.GET_PARKING_LIST,
        payload: async () => {
          try {
            const {data, msg} = _res(await getParkingList(params));

            return Promise.resolve({data});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    uploadParkingFile: params =>
      dispatch({
        type: types.UPLOAD_PARKING_FILE,
        payload: async () => {
          try {
            const res = _res(await uploadParkingFile(params));
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
    deleteParkingFile: params =>
      dispatch({
        type: types.DELETE_PARKING_FILE,
        payload: async () => {
          try {
            const res = _res(await deleteParkingFile(params));
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
    updateParkingList: params =>
      dispatch({
        type: types.UPDATE_PARKING_LIST,
        payload: async () => {
          try {
            const res = _res(await updateParkingList(params));
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
  };
}
