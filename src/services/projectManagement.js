import {instance, useConfig} from './init';

export default function useProjectManagement() {
  const {config} = useConfig();

  const commonParams = config({multipart: false});
  return {
    getLineupData: data => {
      return instance.post('/lineup/get_lists', data, commonParams);
    },
    createLineupEntity: data => {
      return instance.post('/lineup/addnew', data, commonParams);
    },
    updateLineupEntity: data => {
      return instance.post('/lineup/update', data, commonParams);
    },
    deleteLineupEntity: data => {
      return instance.post('/lineup/delete', data, commonParams);
    },
    updateMilestoneOrder: data => {
      return instance.post('/lineup/updatemilestoneorder', data, commonParams);
    },
    getPhases: data => {
      return instance.post('/projectplaning/phase/lists', data, commonParams);
    },
    addPhase: data => {
      return instance.post('/projectplaning/phase/add', data, commonParams);
    },
    updatePhase: data => {
      return instance.post('/projectplaning/phase/update', data, commonParams);
    },
    deletePhase: data => {
      return instance.post('/projectplaning/phase/delete', data, commonParams);
    },
  };
}
