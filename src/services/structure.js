import {instance, useConfig} from './init';

export default function useStructure() {
  let {config} = useConfig();
  return {
    saveTowers: (data) => {
      return instance.post(
        '/project/update_project_towers',
        data,
        config({multipart: true, auth: false}),
      );
    },
  };
}
