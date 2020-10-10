import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import useStructure from '../../services/structure';
import {processError} from '../../utils';
import {useSnackbar} from '../../components/Snackbar';

export default function useStructureActions() {
  const dispatch = useDispatch();
  const structure = useStructure();
  const snackbar = useSnackbar();

  const saveTowers = async ({typeId, structureTypeData, projectId, userId}) => {
    let formData = new FormData();
    formData.append('current_type_id', typeId);
    formData.append('tower', structureTypeData.towerCount);
    formData.append('user_id', userId);
    formData.append('project_id', projectId);

    await structure.saveTowers(formData);
  };

  const saveFloors = async ({
    typeId,
    projectId,
    towerId,
    userId,
    floorCount,
  }) => {
    let formData = new FormData();

    formData.append('current_type_id', typeId);
    formData.append('floor', floorCount);
    formData.append('user_id', userId);
    formData.append('current_tower_id', towerId);
    formData.append('project_id', projectId);

    await structure.saveFloors(formData);
  };

  const saveUnits = async ({
    typeId,
    projectId,
    towerId,
    userId,
    floorId,
    unitCount,
  }) => {
    let formData = new FormData();

    formData.append('current_type_id', typeId);
    formData.append('currnet_floor', floorId);
    formData.append('user_id', userId);
    formData.append('current_tower_id', towerId);
    formData.append('project_id', projectId);
    formData.append('units', unitCount);

    await structure.saveUnits(formData);
  };

  return {
    updateStructure: (data) =>
      dispatch({
        type: types.UPDATE_LOCAL_STRUCTURE,
        payload: data,
      }),
    updateStructureTypes: (formData) =>
      dispatch({
        type: types.SAVE_STRUCTURE,
        payload: new Promise(async (resolve, reject) => {
          try {
            let response = await structure.updateStructureTypes(formData);
            response = response.data;
            console.log('-----> response', response);
            snackbar.showMessage({
              message: 'Updated Project Structure!',
            });
            return resolve();
          } catch (error) {
            let errorMessage = processError(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return reject(errorMessage);
          }
        }),
      }),
    saveStructure: (data) =>
      dispatch({
        type: types.SAVE_STRUCTURE,
        payload: new Promise(async (resolve, reject) => {
          try {
            const {typeId, structureTypeData, projectId, userId} = data;
            const {towers} = structureTypeData;
            await saveTowers(data);
            await Promise.all(
              Object.keys(towers).map(async (towerId) => {
                const {floorCount, floors} = towers[towerId];
                await saveFloors({
                  typeId,
                  projectId,
                  towerId,
                  userId,
                  floorCount,
                });

                await Promise.all(
                  Object.keys(floors).map(async (floorId) => {
                    const {unitCount} = floors[floorId];
                    await saveUnits({
                      typeId,
                      projectId,
                      towerId,
                      userId,
                      floorId,
                      unitCount,
                    });
                  }),
                );
              }),
            );
            return resolve();
          } catch (error) {
            let errorMessage = processError(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return reject(errorMessage);
          }
        }),
      }),
  };
}
