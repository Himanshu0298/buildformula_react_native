import {instance, config} from './init';

export default function useProjectStructure() {
  const params = config({multipart: false});
  return {
    // Project
    getProjectList: data => {
      return instance.post('/projectstructure/project/list', data, params);
    },
    getProjectDetails: data => {
      return instance.post(
        '/projectstructure/project/previewDetails',
        data,
        params,
      );
    },
    createProjectDuplicate: data => {
      return instance.post(
        '/projectstructure/project/projectDuplicate',
        data,
        params,
      );
    },
    deleteProject: data => {
      return instance.post(
        '/projectstructure/project/projectRemove',
        data,
        params,
      );
    },
    addProject: data => {
      return instance.post('/projectstructure/project/add', data, params);
    },
    updateProjectDetails: data => {
      return instance.post(
        '/projectstructure/project/updateDetails',
        data,
        params,
      );
    },
    updateProjectHistory: data => {
      return instance.post(
        '/projectstructure/project/updateHistory',
        data,
        params,
      );
    },
    updateProjectStructure: data => {
      return instance.post(
        '/projectstructure/project/updateStructure',
        data,
        params,
      );
    },
    updateProjectBrief: data => {
      return instance.post(
        '/projectstructure/project/updateBrief',
        data,
        params,
      );
    },
    updateProjectAmenities: data => {
      return instance.post(
        '/projectstructure/project/updateAmenities',
        data,
        params,
      );
    },
    addProjectOwner: data => {
      return instance.post(
        '/projectstructure/project/updateOwnerInfo',
        data,
        params,
      );
    },
    updateProjectOwner: data => {
      return instance.post(
        '/projectstructure/project/updateOwnerInfo',
        data,
        params,
      );
    },
    deleteProjectOwner: data => {
      return instance.post(
        '/projectstructure/project/updateOwnerInfoRemove',
        data,
        params,
      );
    },
    addProjectSecurity: data => {
      return instance.post(
        '/projectstructure/project/updateSecurityInfo',
        data,
        params,
      );
    },
    updateProjectSecurity: data => {
      return instance.post(
        '/projectstructure/project/updateSecurityInfo',
        data,
        params,
      );
    },
    deleteProjectSecurity: data => {
      return instance.post(
        '/projectstructure/project/updateSecurityInfoRemove',
        data,
        params,
      );
    },
    addProjectFile: data => {
      return instance.post(
        '/projectstructure/project/updateFilesAttachmentAdd',
        data,
        config({multipart: true}),
      );
    },
    deleteProjectFile: data => {
      return instance.post(
        '/projectstructure/project/updateFilesAttachmentRemove',
        data,
        params,
      );
    },

    // Tower
    getTowerList: data => {
      return instance.post(
        '/projectstructure/project/getTowerList',
        data,
        params,
      );
    },
    addTower: data => {
      return instance.post(
        '/projectstructure/project/towerDetailsAdd',
        data,
        params,
      );
    },
    updateTower: data => {
      return instance.post(
        '/projectstructure/project/towerDetailsUpdate',
        data,
        params,
      );
    },
    deleteTower: data => {
      return instance.post(
        '/projectstructure/project/projectTowerRemove',
        data,
        params,
      );
    },
    updateTowerOrder: data => {
      return instance.post(
        '/projectstructure/project/projectTowerRearrange',
        data,
        params,
      );
    },
    // PickUp

    getModuleList: data => {
      return instance.post('/projectstructure/pickuplist/module', data, params);
    },
    getSubModuleList: data => {
      return instance.post(
        '/projectstructure/pickuplist/submodule',
        data,
        params,
      );
    },
    getFieldList: data => {
      return instance.post('/projectstructure/pickuplist/field', data, params);
    },
    getPickUpList: data => {
      return instance.post('/projectstructure/pickuplist/list', data, params);
    },
    addPickUp: data => {
      return instance.post('/projectstructure/pickuplist/add', data, params);
    },
    updatePickUp: data => {
      return instance.post('/projectstructure/pickuplist/update', data, params);
    },
    deletePickUp: data => {
      return instance.post('/projectstructure/pickuplist/delete', data, params);
    },
    getProjectMasterList: data => {
      return instance.post(
        '/projectstructure/project/get/master',
        data,
        params,
      );
    },

    // Area
    getAreaList: data => {
      return instance.post('/projectstructure/area/list', data, params);
    },
    addArea: data => {
      return instance.post('/projectstructure/area/add', data, params);
    },
    updateArea: data => {
      return instance.post('/projectstructure/area/update', data, params);
    },
    deleteArea: data => {
      return instance.post('/projectstructure/area/delete', data, params);
    },

    // Floor

    getFloorList: data => {
      return instance.post(
        '/projectstructure/project/getFloorList',
        data,
        params,
      );
    },
    addFloor: data => {
      return instance.post(
        '/projectstructure/project/floorDetailsAdd',
        data,
        params,
      );
    },
    updateFloor: data => {
      return instance.post(
        '/projectstructure/project/floorDetailsUpdate',
        data,
        params,
      );
    },
    deleteFloor: data => {
      return instance.post(
        '/projectstructure/project/projectFloorRemove',
        data,
        params,
      );
    },
    updateFloorOrder: data => {
      return instance.post(
        '/projectstructure/project/updateFloorOrder',
        data,
        params,
      );
    },
  };
}
