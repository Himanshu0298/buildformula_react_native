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
    createWDFolder,
    renameWDFolder,
    deleteWDFolder,
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
    downloadRDFile,
    getWDVersion,
    addRDVersion,
    addFDVersion,
    addWDVersion,
    deleteRDVersion,
    getFDVersion,
    deleteFDVersion,
    deleteWDVersion,
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
            const {data, msg} = _res(await getFDTowers(params));
            snackbar.showMessage({message: msg});

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
            const {data, msg} = _res(await addFDTowerFiles(params));
            snackbar.showMessage({message: msg});

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
            const {data, msg} = _res(await getFDTowerFloors(params));
            snackbar.showMessage({message: msg});

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
        type: types.GET_FD_TOWER_FLOORS,
        payload: async () => {
          try {
            const {data, msg} = _res(await getFDTowerFloors(params));
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
            const {data, msg} = _res(await deleteWDVersion(params));
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
