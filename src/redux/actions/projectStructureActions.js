import {useDispatch} from 'react-redux';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'hooks/useResponseProcessor';
import useProjectStructure from 'services/projectStructure';
import * as types from './actionTypes';

export default function useProjectStructureActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {_err, _res} = useResProcessor();

  const {getProjectList} = useProjectStructure();

  return {
    setSelectedUnit: unit =>
      dispatch({type: types.SET_SELECTED_UNIT, payload: unit}),

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
  };
}
