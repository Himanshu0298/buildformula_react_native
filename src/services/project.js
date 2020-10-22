import {instance, useConfig} from './init';

export default function useProject() {
  let {config} = useConfig();
  return {
    createProject: (data) => {
      return instance.post('/project/create', data, config());
    },
    updatePayment: (data) => {
      return instance.post('/project/update_project_payment', data, config());
    },
  };
}
