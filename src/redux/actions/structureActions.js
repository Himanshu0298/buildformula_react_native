import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import useStructure from '../../services/structure';
import {processError} from '../../utils';
import {useSnackbar} from '../../components/Snackbar';

export default function useStructureActions() {
  const dispatch = useDispatch();
  const {saveTowers, saveFloors, updateStructureTypes} = useStructure();
  const snackbar = useSnackbar();

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
            let response = await updateStructureTypes(formData);
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
    saveTowersCount: (formData) =>
      dispatch({
        type: types.SAVE_STRUCTURE,
        payload: new Promise(async (resolve, reject) => {
          try {
            let response = await saveTowers(formData);
            const {data} = response.data;
            console.log('-----> response', data);

            return resolve(data);
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
    saveFloorsCount: (formData) =>
      dispatch({
        type: types.SAVE_STRUCTURE,
        payload: new Promise(async (resolve, reject) => {
          try {
            let response = await saveFloors(formData);
            const {data} = response.data;
            console.log('-----> response', data);

            return resolve(data);
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
