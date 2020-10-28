import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import useStructure from '../../services/structure';
import {processError, processResponse} from '../../utils';
import {useSnackbar} from '../../components/Snackbar';

export default function useStructureActions() {
  const dispatch = useDispatch();
  const structure = useStructure();
  const snackbar = useSnackbar();

  // const saveTowers = async ({typeId, structureTypeData, projectId, userId}) => {
  //   let formData = new FormData();
  //   formData.append('current_type_id', typeId);
  //   formData.append('tower', structureTypeData.towerCount);
  //   formData.append('user_id', userId);
  //   formData.append('project_id', projectId);

  //   await structure.saveTowers(formData);
  // };

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
            let response = processResponse(
              await structure.updateStructureTypes(formData),
            );
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
            const {structureData, projectId, userId} = data;
            await Promise.all(
              Object.keys(structureData).map(async (typeId) => {
                const {towers} = structureData[typeId];

                if (towers) {
                  Object.keys(towers).map(async (towerId) => {
                    const payload = {
                      typeId,
                      projectId,
                      userId,
                      towerId,
                      towerData: towers[towerId],
                    };
                    await structure.saveTowers(JSON.stringify(payload));
                  });
                } else {
                  const payload = {
                    typeId,
                    projectId,
                    userId,
                    towerId: 1,
                    towerData: structureData[typeId],
                  };
                  await structure.saveTowers(JSON.stringify(payload));
                }
              }),
            );

            return resolve();
          } catch (error) {
            console.log('-----> error', error);
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
