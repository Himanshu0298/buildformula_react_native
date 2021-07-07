import {instance, useConfig} from './init';

export default function useProject() {
  const {config} = useConfig();
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
    getDashboardData: data => {
      return instance.post(
        '/dashboard/charts',
        data,
        config({multipart: false}),
      );
    },
  };
}
