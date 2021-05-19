import {instance, useConfig} from './init';

export default function useProjectManagement() {
  const {config} = useConfig();
  return {
    getLineupData: data => {
      const params = config({multipart: false});
      return instance.post('/lineup/get_lists', data, params);
    },
    createLineupEntity: data => {
      const params = config({multipart: false});
      return instance.post('/lineup/addnew', data, params);
    },
    updateLineupEntity: data => {
      const params = config({multipart: false});
      return instance.post('/lineup/update', data, params);
    },
    deleteLineupEntity: data => {
      const params = config({multipart: false});
      return instance.post('/lineup/delete', data, params);
    },
    updateMilestoneOrder: data => {
      const params = config({multipart: false});
      return instance.post('/lineup/updatemilestoneorder', data, params);
    },
  };
}
