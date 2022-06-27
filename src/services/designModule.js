import {instance, useConfig} from './init';

export default function useDesignModule() {
  const {config} = useConfig();
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
        config({multipart: true}),
      );
    },
    getRDActivities: data => {
      return instance.post(
        '/roughdrawing/activity_logs',
        data,
        config({multipart: true}),
      );
    },
    renameRDFile: data => {
      return instance.post(
        '/roughdrawing/renameFile',
        data,
        config({multipart: true}),
      );
    },
    deleteRDFile: data => {
      return instance.post(
        '/roughdrawing/deleteFile',
        data,
        config({multipart: true}),
      );
    },
    addRDVersion: data => {
      return instance.post('/roughdrawing/files_version', data, config());
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
        config({multipart: true}),
      );
    },
  };
}
