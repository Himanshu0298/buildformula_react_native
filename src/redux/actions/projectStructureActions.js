import {useDispatch} from 'react-redux';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'hooks/useResponseProcessor';
import useProjectStructure from 'services/projectStructure';
import * as types from './actionTypes';

export default function useProjectStructureActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {_err, _res} = useResProcessor();

  const {
    getProjectList,
    getProjectCategory,
    getProjectDetails,
    getUnitList,
    deleteProject,
    addProject,
    updateProjectDetails,
    updateProjectHistory,
    updateProjectStructure,
    updateProjectBrief,
    updateProjectAmenities,
    addProjectOwner,
    updateProjectOwner,
    deleteProjectOwner,
    addProjectSecurity,
    updateProjectSecurity,
    deleteProjectSecurity,
    deleteProjectFile,
    addProjectFile,
    getTowerList,
    addTower,
    updateTower,
    deleteTower,
    getModuleList,
    getSubModuleList,
    getFieldList,
    getPickUpList,
    addPickUp,
    updatePickUp,
    deletePickUp,
    getProjectMasterList,
    getAreaList,
    addArea,
    updateArea,
    deleteArea,
    getFloorList,
    addFloor,
    updateFloor,
    deleteFloor,
    createProjectDuplicate,
    updateTowerOrder,
    updateFloorOrder,
    updatePickUpOrder,
    addUnit,
    addBungalow,
    updateUnit,
    updateBungalow,
    removeUnit,
    addUnitLocation,
  } = useProjectStructure();

  return {
    setSelectedUnit: unit =>
      dispatch({type: types.SET_SELECTED_UNIT, payload: unit}),

    updateProjectFilters: data => {
      dispatch({
        type: types.ADD_PROJECT_FILTERS,
        payload: data,
      });
    },

    getProjectList: data =>
      dispatch({
        type: types.GET_PROJECT_LIST,
        payload: async () => {
          try {
            const response = _res(await getProjectList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getProjectCategory: data =>
      dispatch({
        type: types.GET_PROJECT_CATEGORIES,
        payload: async () => {
          try {
            const response = _res(await getProjectCategory(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getProjectDetails: data =>
      dispatch({
        type: types.GET_PROJECT_DETAILS,
        payload: async () => {
          try {
            const response = _res(await getProjectDetails(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    createProjectDuplicate: data =>
      dispatch({
        type: types.CREATE_PROJECT_DUPLICATE,
        payload: async () => {
          try {
            const response = _res(await createProjectDuplicate(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    deleteProject: data =>
      dispatch({
        type: types.DELETE_PROJECT,
        payload: async () => {
          try {
            const res = _res(await deleteProject(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addProject: data =>
      dispatch({
        type: types.ADD_PROJECT,
        payload: async () => {
          try {
            const response = _res(await addProject(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateProjectDetails: params =>
      dispatch({
        type: types.UPDATE_PROJECT_DETAILS,
        payload: async () => {
          try {
            const response = _res(await updateProjectDetails(params));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateProjectHistory: params =>
      dispatch({
        type: types.UPDATE_PROJECT_HISTORY,
        payload: async () => {
          try {
            const response = _res(await updateProjectHistory(params));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateProjectStructure: params =>
      dispatch({
        type: types.UPDATE_PROJECT_STRUCTURE,
        payload: async () => {
          try {
            const response = _res(await updateProjectStructure(params));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateProjectBrief: params =>
      dispatch({
        type: types.UPDATE_PROJECT_BRIEF,
        payload: async () => {
          try {
            const response = _res(await updateProjectBrief(params));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateProjectAmenities: params =>
      dispatch({
        type: types.UPDATE_PROJECT_AMENITIES,
        payload: async () => {
          try {
            const response = _res(await updateProjectAmenities(params));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addProjectOwner: data =>
      dispatch({
        type: types.ADD_PROJECT_OWNER,
        payload: async () => {
          try {
            const response = _res(await addProjectOwner(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateProjectOwner: params =>
      dispatch({
        type: types.UPDATE_PROJECT_OWNER,
        payload: async () => {
          try {
            const response = _res(await updateProjectOwner(params));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteProjectOwner: data =>
      dispatch({
        type: types.DELETE_PROJECT_OWNER,
        payload: async () => {
          try {
            const res = _res(await deleteProjectOwner(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addProjectSecurity: data =>
      dispatch({
        type: types.ADD_PROJECT_SECURITY,
        payload: async () => {
          try {
            const response = _res(await addProjectSecurity(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateProjectSecurity: params =>
      dispatch({
        type: types.UPDATE_PROJECT_SECURITY,
        payload: async () => {
          try {
            const response = _res(await updateProjectSecurity(params));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteProjectSecurity: data =>
      dispatch({
        type: types.DELETE_PROJECT_SECURITY,
        payload: async () => {
          try {
            const res = _res(await deleteProjectSecurity(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addProjectFile: formData =>
      dispatch({
        type: types.ADD_PROJECT_FILE,
        payload: async () => {
          try {
            const response = _res(await addProjectFile(formData));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteProjectFile: data =>
      dispatch({
        type: types.DELETE_PROJECT_FILE,
        payload: async () => {
          try {
            const res = _res(await deleteProjectFile(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getTowerList: data =>
      dispatch({
        type: types.GET_TOWER_LIST,
        payload: async () => {
          try {
            const response = _res(await getTowerList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addTower: data =>
      dispatch({
        type: types.ADD_TOWER,
        payload: async () => {
          try {
            const response = _res(await addTower(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateTower: params =>
      dispatch({
        type: types.UPDATE_TOWER,
        payload: async () => {
          try {
            const response = _res(await updateTower(params));
            snackbar.showMessage({message: response.msg});
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteTower: data =>
      dispatch({
        type: types.DELETE_TOWER,
        payload: async () => {
          try {
            const res = _res(await deleteTower(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updateTowerOrder: data =>
      dispatch({
        type: types.PROJECT_TOWER_REARRANGE,
        payload: async () => {
          try {
            const response = _res(await updateTowerOrder(data));
            return Promise.resolve(response.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getModuleList: data =>
      dispatch({
        type: types.GET_MODULE_LIST,
        payload: async () => {
          try {
            const response = _res(await getModuleList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getSubModuleList: data =>
      dispatch({
        type: types.GET_SUB_MODULE_LIST,
        payload: async () => {
          try {
            const response = _res(await getSubModuleList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getFieldList: data =>
      dispatch({
        type: types.GET_FIELD_LIST,
        payload: async () => {
          try {
            const response = _res(await getFieldList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getPickUpList: data =>
      dispatch({
        type: types.GET_PICK_UP_LIST,
        payload: async () => {
          try {
            const response = _res(await getPickUpList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addPickUp: data =>
      dispatch({
        type: types.ADD_PICK_UP,
        payload: async () => {
          try {
            const response = _res(await addPickUp(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updatePickUp: params =>
      dispatch({
        type: types.UPDATE_PICK_UP,
        payload: async () => {
          try {
            const response = _res(await updatePickUp(params));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deletePickUp: data =>
      dispatch({
        type: types.DELETE_PICK_UP,
        payload: async () => {
          try {
            const res = _res(await deletePickUp(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updatePickUpOrder: data =>
      dispatch({
        type: types.PROJECT_FLOOR_REARRANGE,
        payload: async () => {
          try {
            const res = _res(await updatePickUpOrder(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getProjectMasterList: data =>
      dispatch({
        type: types.GET_PROJECT_MASTER_LIST,
        payload: async () => {
          try {
            const response = _res(await getProjectMasterList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getAreaList: data =>
      dispatch({
        type: types.GET_AREA_LIST,
        payload: async () => {
          try {
            const response = _res(await getAreaList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addArea: data =>
      dispatch({
        type: types.ADD_AREA,
        payload: async () => {
          try {
            const response = _res(await addArea(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateArea: params =>
      dispatch({
        type: types.UPDATE_AREA,
        payload: async () => {
          try {
            const response = _res(await updateArea(params));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteArea: data =>
      dispatch({
        type: types.DELETE_AREA,
        payload: async () => {
          try {
            const res = _res(await deleteArea(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getFloorList: data =>
      dispatch({
        type: types.GET_FLOOR_LIST,
        payload: async () => {
          try {
            const response = _res(await getFloorList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addFloor: data =>
      dispatch({
        type: types.ADD_FLOOR,
        payload: async () => {
          try {
            const response = _res(await addFloor(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateFloor: params =>
      dispatch({
        type: types.UPDATE_FLOOR,
        payload: async () => {
          try {
            const response = _res(await updateFloor(params));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteFloor: data =>
      dispatch({
        type: types.DELETE_FLOOR,
        payload: async () => {
          try {
            const res = _res(await deleteFloor(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateFloorOrder: data =>
      dispatch({
        type: types.PROJECT_FLOOR_REARRANGE,
        payload: async () => {
          try {
            const res = _res(await updateFloorOrder(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getUnitList: data =>
      dispatch({
        type: types.GET_UNIT_LIST,
        payload: async () => {
          try {
            const response = _res(await getUnitList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addUnit: data =>
      dispatch({
        type: types.ADD_UNIT,
        payload: async () => {
          try {
            const response = _res(await addUnit(data));
            snackbar.showMessage({message: response.msg});
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addBungalow: data =>
      dispatch({
        type: types.ADD_BUNGALOW,
        payload: async () => {
          try {
            const response = _res(await addBungalow(data));
            snackbar.showMessage({message: response.msg});
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateUnit: data =>
      dispatch({
        type: types.UPDATE_UNIT,
        payload: async () => {
          try {
            const response = _res(await updateUnit(data));
            snackbar.showMessage({message: response.msg});
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateBungalow: data =>
      dispatch({
        type: types.UPDATE_BUNGALOW,
        payload: async () => {
          try {
            const response = _res(await updateBungalow(data));
            snackbar.showMessage({message: response.msg});
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    removeUnit: data =>
      dispatch({
        type: types.DELETE_UNIT,
        payload: async () => {
          try {
            const response = _res(await removeUnit(data));
            snackbar.showMessage({message: response.msg});
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addUnitLocation: data =>
      dispatch({
        type: types.ADD_UNIT_LOCATION,
        payload: async () => {
          try {
            const response = _res(await addUnitLocation(data));
            snackbar.showMessage({message: response.msg});
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
  };
}
