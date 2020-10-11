import {instance, useConfig} from './init';

export default function useStructure() {
  let {config} = useConfig();
  return {
    updateStructureTypes: (data) => {
      return instance.post(
        '/project/update_types',
        data,
        config({multipart: true, auth: true}),
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
    saveUnits: (data) => {
      return instance.post(
        '/project/update_project_units',
        data,
        config({multipart: true, auth: false}),
      );
    },
  };
}
