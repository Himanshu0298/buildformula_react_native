import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import useStructure from '../../services/structure';

export default function useStructureActions() {
  const dispatch = useDispatch();
  const {saveTower} = useStructure();

  return {
    updateStructure: (data) =>
      dispatch({
        type: types.UPDATE_LOCAL_STRUCTURE,
        payload: new Promise(async (resolve, reject) => {
          return resolve(data);
        }),
      }),
    saveTowersCount: (formData) =>
      dispatch({
        type: types.SAVE_TOWERS,
        payload: new Promise(async (resolve, reject) => {
          try {
            let response = await saveTower(formData);
            const {data} = response.data;
            console.log('-----> response', data);

            return resolve(data);
          } catch (error) {
            const {msg} = error?.response?.data;
            return reject(msg);
          }
        }),
      }),
  };
}
