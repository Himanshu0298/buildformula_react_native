import {instance, useConfig} from './init';

export default function useStructure() {
  let {config} = useConfig();
  return {
    updateStructureTypes: (data) => {
      return instance.post(
        '/project/update_types',
        data,
        config({multipart: true, auth: false}),
      );
    },
    saveTowers: (data) => {
      return instance.post(
        '/project/update_project_towers',
        data,
        config({multipart: true, auth: false}),
      );
    },
    saveFloors: (data) => {
      return instance.post(
        '/project/update_project_floors',
        data,
        config({multipart: true, auth: false}),
      );
    },
  };
}
