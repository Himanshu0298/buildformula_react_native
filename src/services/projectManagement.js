import {instance, config} from './init';

export default function useProjectManagement() {
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
    updatePhaseOrder: data => {
      return instance.post('/projectplaning/phase/sorting', data, params);
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
    getGeneralPhaseActivities: data => {
      return instance.post('/generalactivity/lists', data, params);
    },
    addGeneralPhaseActivity: data => {
      return instance.post('/generalactivity/add', data, params);
    },
    updateGeneralActivity: data => {
      return instance.post('/generalactivity/update', data, params);
    },
    getWBSLevelWorks: data => {
      return instance.post('/wbs/getWBSLevelsWorks', data, params);
    },
    WBSExecutionDetails: data => {
      return instance.post('/wbs/getWBSExecutionDetails', data, params);
    },
    WBSExecutionList: data => {
      return instance.post('/wbs/getWBSExecutionList', data, params);
    },
    addProgressRecord: data => {
      return instance.post(
        '/wbs/execution_qty_save',
        data,
        config({multipart: true}),
      );
    },
  };
}
