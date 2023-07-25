import {instance, config} from './init';

export default function useDesignModule() {
  return {
    getRDFolders: data => {
      return instance.post(
        '/roughdrawing/list_folders',
        data,
        config({multipart: false}),
      );
    },
    getRDFiles: data => {
      return instance.post(
        '/roughdrawing/list_files',
        data,
        config({multipart: false}),
      );
    },
    createRDFolder: data => {
      return instance.post(
        '/roughdrawing/createFolder',
        data,
        config({multipart: false}),
      );
    },
    uploadRDFile: data => {
      return instance.post(
        '/roughdrawing/uploadFiles',
        data,
        config({multipart: true}),
      );
    },
    renameRDFolder: data => {
      return instance.post(
        '/roughdrawing/renameFolder',
        data,
        config({multipart: true}),
      );
    },
    deleteRDFolder: data => {
      return instance.post(
        '/roughdrawing/deleteFolder',
        data,
        config({multipart: false}),
      );
    },
    getRDActivities: data => {
      return instance.post(
        '/roughdrawing/activity_logs',
        data,
        config({multipart: false}),
      );
    },
    renameRDFile: data => {
      return instance.post(
        '/roughdrawing/renameFile',
        data,
        config({multipart: false}),
      );
    },
    deleteRDFile: data => {
      return instance.post(
        '/roughdrawing/deleteFile',
        data,
        config({multipart: false}),
      );
    },
    getRDVersion: data => {
      return instance.post(
        '/roughdrawing/files_version',
        data,
        config({multipart: false}),
      );
    },
    addRDVersion: data => {
      return instance.post(
        '/roughdrawing/upload_file_version',
        data,
        config({multipart: true}),
      );
    },

    deleteRDVersion: data => {
      return instance.post(
        '/roughdrawing/delete_file_version',
        data,
        config({multipart: false}),
      );
    },

    // Final Drawing

    getFDFolders: data => {
      return instance.post(
        '/finaldrawing/list_folders',
        data,
        config({multipart: false}),
      );
    },
    getFDFiles: data => {
      return instance.post(
        '/finaldrawing/list_files',
        data,
        config({multipart: false}),
      );
    },
    createFDFolder: data => {
      return instance.post(
        '/finaldrawing/createFolder',
        data,
        config({multipart: false}),
      );
    },
    renameFDFolder: data => {
      return instance.post(
        '/finaldrawing/renameFolder',
        data,
        config({multipart: false}),
      );
    },
    deleteFDFolder: data => {
      return instance.post(
        '/finaldrawing/deleteFolder',
        data,
        config({multipart: false}),
      );
    },
    getFDActivities: data => {
      return instance.post(
        '/finaldrawing/activity_logs',
        data,
        config({multipart: false}),
      );
    },

    uploadFDFile: data => {
      return instance.post(
        '/finaldrawing/uploadFiles',
        data,
        config({multipart: true}),
      );
    },
    renameFDFile: data => {
      return instance.post(
        '/finaldrawing/renameFile',
        data,
        config({multipart: false}),
      );
    },
    deleteFDFile: data => {
      return instance.post(
        '/finaldrawing/deleteFile',
        data,
        config({multipart: false}),
      );
    },
    addFDVersion: data => {
      return instance.post(
        '/finaldrawing/upload_file_version',
        data,
        config({multipart: true}),
      );
    },
    deleteFDVersion: data => {
      return instance.post(
        '/finaldrawing/delete_file_version',
        data,
        config({multipart: false}),
      );
    },
    getFDVersion: data => {
      return instance.post(
        '/finaldrawing/files_version',
        data,
        config({multipart: false}),
      );
    },

    getFDTowers: data => {
      return instance.post(
        '/finaldrawing/getalltowers',
        data,
        config({multipart: false}),
      );
    },

    addFDTowerFiles: data => {
      return instance.post(
        '/finaldrawing/towersFilesupload',
        data,
        config({multipart: false}),
      );
    },

    getFDTowerFloors: data => {
      return instance.post(
        '/finaldrawing/gettower',
        data,
        config({multipart: false}),
      );
    },
    addFDTowerFloorsRows: data => {
      return instance.post(
        '/finaldrawing/addfloorrows',
        data,
        config({multipart: false}),
      );
    },
    updateFDTowerFloorsRows: data => {
      return instance.post(
        '/finaldrawing/updatefloorrows',
        data,
        config({multipart: false}),
      );
    },
    deleteFDTowerFloorsRows: data => {
      return instance.post(
        '/finaldrawing/deletefloorrows',
        data,
        config({multipart: false}),
      );
    },
    renameFDTowerFile: data => {
      return instance.post(
        '/finaldrawing/renametowerfile',
        data,
        config({multipart: false}),
      );
    },
    deleteFDTowerFile: data => {
      return instance.post(
        '/finaldrawing/deletetowerfile',
        data,
        config({multipart: false}),
      );
    },
    getFDTowerFloorFolder: data => {
      return instance.post(
        '/finaldrawing/getfloorrowsfolder',
        data,
        config({multipart: false}),
      );
    },

    FDTowerFileActivityLogs: data => {
      return instance.post(
        '/finaldrawing/towerfilesactivitylogs',
        data,
        config({multipart: false}),
      );
    },
    uploadTowerFileVersion: data => {
      return instance.post(
        '/finaldrawing/uploadtowerfileversion',
        data,
        config({multipart: true}),
      );
    },
    getFDBungalows: data => {
      return instance.post(
        '/finaldrawing/getallbungalows',
        data,
        config({multipart: false}),
      );
    },
    uploadFDBungalowsFile: data => {
      return instance.post(
        '/finaldrawing/uploadbungalowsfiles',
        data,
        config({multipart: true}),
      );
    },
    renameFDBungalowsFile: data => {
      return instance.post(
        '/finaldrawing/renamebungalowsfile',
        data,
        config({multipart: false}),
      );
    },

    deleteFDBungalowsFile: data => {
      return instance.post(
        '/finaldrawing/deletebungalowsfile',
        data,
        config({multipart: false}),
      );
    },
    FDBungalowsFileActivityLog: data => {
      return instance.post(
        '/finaldrawing/bungalowsactivitylogs',
        data,
        config({multipart: false}),
      );
    },
    getFDPlots: data => {
      return instance.post(
        '/finaldrawing/getallplot',
        data,
        config({multipart: false}),
      );
    },
    uploadFDPlotFiles: data => {
      return instance.post(
        '/finaldrawing/uploadplotfiles',
        data,
        config({multipart: true}),
      );
    },
    uploadFDPlotBungalowFileVersion: data => {
      return instance.post(
        '/finaldrawing/uploadbunglowpoltfileversion',
        data,
        config({multipart: true}),
      );
    },

    addFloorFolder: data => {
      return instance.post(
        '/finaldrawing/addfloorfolder',
        data,
        config({multipart: true}),
      );
    },
    addFloorFolderFile: data => {
      return instance.post(
        '/finaldrawing/uploadfloorfolderfile',
        data,
        config({multipart: true}),
      );
    },
    getFloorFolderFile: data => {
      return instance.post(
        '/finaldrawing/getlistfloorfolderfile',
        data,
        config({multipart: false}),
      );
    },
    getTowerFolderFileVersion: data => {
      return instance.post(
        '/finaldrawing/gettowerversionfileslist',
        data,
        config({multipart: false}),
      );
    },
    rearrangeFloorRows: data => {
      return instance.post(
        '/finaldrawing/updateRearrangefloorrows',
        data,
        config({multipart: false}),
      );
    },

    // Working Drawing

    getWDFolders: data => {
      return instance.post(
        '/workingdrawing/list_folders',
        data,
        config({multipart: false}),
      );
    },
    getWDFiles: data => {
      return instance.post(
        '/workingdrawing/list_files',
        data,
        config({multipart: false}),
      );
    },
    createWDFolder: data => {
      return instance.post(
        '/workingdrawing/createFolder',
        data,
        config({multipart: false}),
      );
    },
    renameWDFolder: data => {
      return instance.post(
        '/workingdrawing/renameFolder',
        data,
        config({multipart: false}),
      );
    },
    deleteWDFolder: data => {
      return instance.post(
        '/workingdrawing/deleteFolder',
        data,
        config({multipart: false}),
      );
    },
    getWDVersion: data => {
      return instance.post(
        '/workingdrawing/files_version',
        data,
        config({multipart: false}),
      );
    },
    addWDVersion: data => {
      return instance.post(
        '/workingdrawing/upload_file_version',
        data,
        config({multipart: true}),
      );
    },
    deleteWDVersion: data => {
      return instance.post(
        '/workingdrawing/delete_file_version',
        data,
        config({multipart: false}),
      );
    },

    getWDActivities: data => {
      return instance.post(
        '/workingdrawing/activity_logs',
        data,
        config({multipart: false}),
      );
    },
    uploadWDFile: data => {
      return instance.post(
        '/workingdrawing/uploadFiles',
        data,
        config({multipart: true}),
      );
    },
    renameWDFile: data => {
      return instance.post(
        '/workingdrawing/renameFile',
        data,
        config({multipart: false}),
      );
    },
    deleteWDFile: data => {
      return instance.post(
        '/workingdrawing/deleteFile',
        data,
        config({multipart: false}),
      );
    },
    updateAreaSheet: data => {
      return instance.post(
        '/areaSheet/projectSheet',
        data,
        config({multipart: false}),
      );
    },
    getProjectSheetList: data => {
      return instance.post(
        '/areaSheet/get_list_projectSheet',
        data,
        config({multipart: false}),
      );
    },

    // CATEGORY SHEET

    getCategoryTowerSheet: data => {
      return instance.post(
        '/areaSheet/categorySheet_tower_list',
        data,
        config({multipart: false}),
      );
    },
    updateCategoryTowerSheet: data => {
      return instance.post(
        '/areaSheet/add_Update_categorySheet_tower',
        data,
        config({multipart: false}),
      );
    },
    getCategoryBungalowSheet: data => {
      return instance.post(
        '/areaSheet/categorySheet_bungalow_list',
        data,
        config({multipart: false}),
      );
    },
    updateCategoryBungalowSheet: data => {
      return instance.post(
        '/areaSheet/add_Update_categorySheet_bungalow',
        data,
        config({multipart: false}),
      );
    },

    getCategoryPlotSheet: data => {
      return instance.post(
        '/areaSheet/categorySheet_plot_list',
        data,
        config({multipart: false}),
      );
    },
    updateCategoryPlotSheet: data => {
      return instance.post(
        '/areaSheet/add_Update_categorySheet_plot',
        data,
        config({multipart: false}),
      );
    },

    // Unit Sheet

    getTowerUnitSheet: data => {
      return instance.post(
        '/areaSheet/unitSheet_tower_list',
        data,
        config({multipart: false}),
      );
    },
    updateTowerUnitSheet: data => {
      return instance.post(
        '/areaSheet/add_Update_unitSheet_tower',
        data,
        config({multipart: false}),
      );
    },
    getBungalowUnitSheet: data => {
      return instance.post(
        '/areaSheet/unitSheet_bungalow_list',
        data,
        config({multipart: false}),
      );
    },
    updateBungalowUnitSheet: data => {
      return instance.post(
        '/areaSheet/add_Update_unitSheet_bungalow',
        data,
        config({multipart: false}),
      );
    },
    getPlotUnitSheet: data => {
      return instance.post(
        '/areaSheet/unitSheet_plot_list',
        data,
        config({multipart: false}),
      );
    },
    updatePlotUnitSheet: data => {
      return instance.post(
        '/areaSheet/add_Update_unitSheet_plot',
        data,
        config({multipart: false}),
      );
    },

    // Parking

    getParkingList: data => {
      return instance.post(
        '/parking/list_parking_design',
        data,
        config({multipart: false}),
      );
    },

    uploadParkingFile: data => {
      return instance.post(
        '/parking/file_save',
        data,
        config({multipart: true}),
      );
    },
    deleteParkingFile: data => {
      return instance.post(
        '/parking/file_delete',
        data,
        config({multipart: false}),
      );
    },
    updateParkingList: data => {
      return instance.post(
        '/parking/update_parking_allotment',
        data,
        config({multipart: false}),
      );
    },
  };
}
