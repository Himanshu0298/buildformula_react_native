import {instance, useConfig} from './init';

export default function useAddProject() {
  const {config} = useConfig();
  return {
    createProject: (data) => {
      return instance.post('/project/create', data, config());
    },
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
    updatePayment: (data) => {
      return instance.post('/project/update_project_payment', data, config());
    },
    updateAdmins: (data) => {
      return instance.post('/project/update_project_admins', data, config());
    },
  };
}
