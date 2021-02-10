import {instance, useConfig} from './init';

export default function useFiles() {
  const {config} = useConfig();
  return {
    createFolder: (data) => {
      return instance.post('/files/create_folder', data, config());
    },
    renameFolder: (data) => {
      return instance.post('/files/rename_folder', data, config());
    },
    getFolders: (data) => {
      return instance.post(
        '/files/get_folders',
        data,
        config({multipart: false}),
      );
    },
    uploadFile: (data) => {
      return instance.post('/files/upload_file', data, config());
    },
    getFiles: (data) => {
      return instance.post('/files/get_files', data, config());
    },
  };
}
