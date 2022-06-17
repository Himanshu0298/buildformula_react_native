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
  };
}
