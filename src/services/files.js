import {instance, config} from './init';

export default function useFiles() {
  return {
    getFolders: data => {
      return instance.post(
        '/files/get_folders',
        data,
        config({multipart: false}),
      );
    },
    createFolder: data => {
      return instance.post(
        '/files/create_folder',
        data,
        config({multipart: false}),
      );
    },
    renameFolder: data => {
      return instance.post(
        '/files/rename_folder',
        data,
        config({multipart: false}),
      );
    },
    deleteFolder: data => {
      return instance.post(
        '/files/delete_folder',
        data,
        config({multipart: false}),
      );
    },
    getFiles: data => {
      return instance.post(
        '/files/get_files',
        data,
        config({multipart: false}),
      );
    },
    renameFile: data => {
      return instance.post(
        '/files/rename_file',
        data,
        config({multipart: false}),
      );
    },
    uploadFile: data => {
      return instance.post('/files/upload_file', data, config());
    },
    deleteFile: data => {
      return instance.post(
        '/files/remove_file',
        data,
        config({multipart: false}),
      );
    },
    getVersion: data => {
      return instance.post(
        '/files/version_info',
        data,
        config({multipart: false}),
      );
    },
    shareFolder: data => {
      return instance.post(
        '/files/share_folder',
        data,
        config({multipart: false}),
      );
    },
    shareFile: data => {
      return instance.post(
        '/files/share_files',
        data,
        config({multipart: false}),
      );
    },
    fileActivities: data => {
      return instance.post(
        '/files/activity_log',
        data,
        config({multipart: false}),
      );
    },
    addVersion: data => {
      return instance.post('/files/add_current_version', data, config());
    },
    deleteVersion: data => {
      return instance.post('/files/delete', data, config());
    },
  };
}
