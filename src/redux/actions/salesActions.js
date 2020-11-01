import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import {useSnackbar} from '../../components/Snackbar';
import {processError, processResponse} from '../../utils';
import useSales from '../../services/sales';

export default function useSalesActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {getVisitorsList} = useSales();

  return {
    getVisitors: (projectId) =>
      dispatch({
        type: types.GET_VISITORS,
        payload: new Promise(async (resolve, reject) => {
          try {
            const formData = new FormData();
            formData.append('project_id', projectId);

            let response = processResponse(await getVisitorsList(formData));
            const {data} = response;

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
