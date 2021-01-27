import {instance, useConfig} from './init';

export default function useProject() {
  const {config} = useConfig();
  return {
    getProjects: (data) => {
      return instance.get('/get_project_structure', config());
    },
    getProject: (id) => {
      return instance.get(`/get_project_structure/${id}`, config());
    },
    getProjectData: (id) => {
      return instance.get(`/get_project/${id}`, config());
    },
    createProject: (data) => {
      return instance.post('/project/create', data, config());
    },
    updatePayment: (data) => {
      return instance.post('/project/update_project_payment', data, config());
    },
    updateAdmins: (data) => {
      return instance.post('/project/update_project_admins', data, config());
    },
  };
}
