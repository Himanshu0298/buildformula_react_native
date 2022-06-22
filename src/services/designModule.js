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
  };
}
