import {instance, config} from './init';

export default function useAddProject() {
  return {
    createProject: data => {
      return instance.post('/project/create', data, config());
    },
    updateStructureTypes: data => {
      return instance.post(
        '/project/update_types',
        data,
        config({multipart: false}),
      );
    },
    saveTowers: data => {
      return instance.post(
        'project/update_tower_data',
        data,
        config({multipart: false}),
      );
    },
    saveProjectStructure: data => {
      return instance.post(
        'project/toggle_project_structure',
        data,
        config({multipart: false}),
      );
    },
    updatePayment: data => {
      return instance.post(
        '/project/update_project_payment',
        data,
        config({multipart: false}),
      );
    },
    updateAdmins: data => {
      return instance.post(
        '/project/update_project_admins',
        data,
        config({multipart: false}),
      );
    },
    getStates: () => {
      return instance.get('/get_states', config({multipart: false}));
    },
    getCities: query => {
      return instance.post('/get_cities', query, config({multipart: false}));
    },
  };
}
