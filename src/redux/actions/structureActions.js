import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import useStructure from '../../services/structure';
import {useResProcessor} from 'utils/responseProcessor';
import {useSnackbar} from 'components/Atoms/Snackbar';

export default function useStructureActions() {
  const dispatch = useDispatch();
  const structure = useStructure();
  const snackbar = useSnackbar();
  const {processError, processResponse} = useResProcessor();

  return {
    updateStructure: (data) =>
      dispatch({
        type: types.UPDATE_LOCAL_STRUCTURE,
        payload: data,
      }),
    updateStructureTypes: (formData) =>
      dispatch({
        type: types.SAVE_STRUCTURE,
        payload: async () => {
          try {
            let response = processResponse(
              await structure.updateStructureTypes(formData),
            );
            console.log('-----> response', response);
            snackbar.showMessage({
              message: 'Updated Project Structure!',
            });
            return Promise.resolve();
          } catch (error) {
            let errorMessage = processError(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),
    saveStructure: (data) =>
      dispatch({
        type: types.SAVE_STRUCTURE,
        payload: async () => {
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

            return Promise.resolve();
          } catch (error) {
            console.log('-----> error', error);
            let errorMessage = processError(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),
  };
}
