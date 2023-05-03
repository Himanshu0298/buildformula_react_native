import {instance, config} from './init';

export default function useProject() {
  return {
    getProjects: data => {
      return instance.get('/get_project', config());
    },
    getProject: id => {
      return instance.get(`/get_project/${id}`, config());
    },
    getProjectData: id => {
      return instance.get(`/get_project_structure/${id}`, config());
    },
    getProjectCommonData: data => {
      return instance.post(
        '/get_common_info',
        data,
        config({multipart: false}),
      );
    },
    getProjectPermissions: data => {
      return instance.post(
        '/get_user_permission',
        data,
        config({multipart: false}),
      );
    },
    getProjectModules: data => {
      return instance.post(
        '/project_type_modules',
        data,
        config({multipart: false}),
      );
    },
    getDashboardData: data => {
      return instance.post(
        '/dashboard/charts',
        data,
        config({multipart: false}),
      );
    },
    getPurchasedProjects: data => {
      return instance.post('/list_projects', {}, config({multipart: false}));
    },
    getPurchaseProjectDetails: data => {
      return instance.post('/detail_project', data, config({multipart: false}));
    },
    updateBilling: data => {
      return instance.post('/update_billing', data, config({multipart: false}));
    },
  };
}
