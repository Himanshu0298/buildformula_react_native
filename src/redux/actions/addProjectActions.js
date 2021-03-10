import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import useAddProject from '../../services/addProject';
import {useResProcessor} from 'utils/responseProcessor';
import {useSnackbar} from 'components/Atoms/Snackbar';

export default function useAddProjectActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {_err, _res} = useResProcessor();

  const {
    updateStructureTypes,
    saveTowers,
    createProject,
    updatePayment,
    updateAdmins,
  } = useAddProject();

  return {
    updateStructure: (data) =>
      dispatch({
        type: types.UPDATE_LOCAL_STRUCTURE,
        payload: data,
      }),

    resetStructure: () => dispatch({type: types.RESET_STRUCTURE}),

    createProject: (formData) =>
      dispatch({
        type: types.CREATE_PROJECT,
        payload: async () => {
          try {
            const response = _res(await createProject(formData));
            const {data} = response;
            console.log('-----> data', data);

            return Promise.resolve(data);
          } catch (error) {
            const errorMessage = _err(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),
    updateStructureTypes: (formData) =>
      dispatch({
        type: types.SAVE_STRUCTURE,
        payload: async () => {
          try {
            const response = _res(
              await updateStructureTypes(formData),
            );
            console.log('-----> response', response);
            snackbar.showMessage({
              message: 'Updated Project Structure!',
            });
            return Promise.resolve();
          } catch (error) {
            const errorMessage = _err(error);
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
                    await saveTowers(JSON.stringify(payload));
                  });
                } else {
                  const payload = {
                    typeId,
                    projectId,
                    userId,
                    towerId: 1,
                    towerData: structureData[typeId],
                  };
                  await saveTowers(JSON.stringify(payload));
                }
              }),
            );

            return Promise.resolve();
          } catch (error) {
            console.log('-----> error', error);
            const errorMessage = _err(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),

    selectPlan: (formData) =>
      dispatch({
        type: types.UPDATE_PAYMENT,
        payload: async () => {
          try {
            const response = _res(await updatePayment(formData));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const errorMessage = _err(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),

    updateAdmins: (formData) =>
      dispatch({
        type: types.UPDATE_ADMINS,
        payload: async () => {
          try {
            const response = _res(await updateAdmins(formData));
            const {data} = response;

            snackbar.showMessage({message: 'Updated Admins Successfully!'});

            return Promise.resolve(data);
          } catch (error) {
            const errorMessage = _err(error);
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
