import {instance, useConfig} from './init';

export default function useProjectManagement() {
  const {config} = useConfig();

  const params = config({multipart: false});
  return {
    getLineupData: data => {
      return instance.post('/lineup/get_lists', data, params);
    },
    createLineupEntity: data => {
      return instance.post('/lineup/addnew', data, params);
    },
    updateLineupEntity: data => {
      return instance.post('/lineup/update', data, params);
    },
    deleteLineupEntity: data => {
      return instance.post('/lineup/delete', data, params);
    },
    updateMilestoneOrder: data => {
      return instance.post('/lineup/updatemilestoneorder', data, params);
    },
    getPhases: data => {
      return instance.post('/projectplaning/phase/lists', data, params);
    },
    addPhase: data => {
      return instance.post('/projectplaning/phase/add', data, params);
    },
    updatePhase: data => {
      return instance.post('/projectplaning/phase/update', data, params);
    },
    deletePhase: data => {
      return instance.post('/projectplaning/phase/delete', data, params);
    },
    getSubPhases: data => {
      return instance.post('/projectplaning/subphase/lists', data, params);
    },
    addSubPhase: data => {
      return instance.post('/projectplaning/subphase/add', data, params);
    },
    updateSubPhase: data => {
      return instance.post('/projectplaning/subphase/update', data, params);
    },
    deleteSubPhase: data => {
      return instance.post('/projectplaning/subphase/delete', data, params);
    },
  };
}
