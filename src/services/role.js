import {instance, useConfig} from './init';

export default function useRole() {
  const {config} = useConfig();

  const params = config({multipart: false});
  return {
    getMembers: data => {
      return instance.post('/roles/members_list', data, params);
    },
    getRoles: data => {
      return instance.post('/roles/get_roles', data, params);
    },
  };
}
