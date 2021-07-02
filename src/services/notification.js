import {instance, useConfig} from './init';

export default function useRole() {
  const {config} = useConfig();

  const params = config({multipart: false});
  return {
    getAllNotifications: () => {
      return instance.post('get_all_notifications', {}, params);
    },
    getProjectNotifications: data => {
      return instance.post('/get_notifications', data, params);
    },
  };
}
