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
  };
}
