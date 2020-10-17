import {instance, useConfig} from './init';

export default function useStructure() {
  let {config} = useConfig();
  return {
    updateStructureTypes: (data) => {
      return instance.post('/project/update_types', data, config());
    },
    saveTowers: (data) => {
      return instance.post(
        'project/update_tower_data',
        data,
        config({multipart: false}),
      );
    },
    saveFloors: (data) => {
      return instance.post('/project/update_project_floors', data, config());
    },
    saveUnits: (data) => {
      return instance.post('/project/update_project_units', data, config());
    },
  };
}
