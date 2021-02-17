import {instance, useConfig} from './init';

export default function useProjectManagement() {
  const {config} = useConfig();
  return {
    getWorks: (data) => {
      return instance.post(
        '/lineup/get_lists',
        data,
        config({multipart: false}),
      );
    },
  };
}
