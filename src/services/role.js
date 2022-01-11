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
    addUsers: data => {
      return instance.post('/roles/new_member_add', data, params);
    },
    editUser: data => {
      return instance.post('/roles/member_edit', data, params);
    },
    deleteRole: data => {
      return instance.post('/roles/delete_role', data, params);
    },
    deleteMember: data => {
      return instance.post('/roles/member_delete', data, params);
    },
  };
}
