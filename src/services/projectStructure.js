import {instance, config} from './init';

export default function useProjectStructure() {
  const params = config({multipart: false});
  return {
    getProjectList: data => {
      return instance.post('projectstructure/project/list', data, params);
    },
  };
}
