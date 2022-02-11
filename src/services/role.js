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
    getRoleDetails: data => {
      return instance.post('/get_role_details', data, params);
    },
    addUsers: data => {
      return instance.post('/roles/new_member_add', data, params);
    },
    addRole: data => {
      return instance.post('/roles/add_new_role', data, params);
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
