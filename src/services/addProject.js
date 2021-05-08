import {instance, useConfig} from './init';

export default function useAddProject() {
  const {config} = useConfig();
  return {
    createProject: (data) => {
      return instance.post('/project/create', data, config());
    },
    updateStructureTypes: (data) => {
      return instance.post(
        '/project/update_types',
        data,
        config({multipart: false}),
      );
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
      return instance.post(
        '/project/update_project_payment',
        data,
        config({multipart: false}),
      );
    },
    updateAdmins: (data) => {
      return instance.post(
        '/project/update_project_admins',
        data,
        config({multipart: false}),
      );
    },
    getStates: () => {
      return instance.get('/getStates', config({multipart: false}));
    },
  };
}
