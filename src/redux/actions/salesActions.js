import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import {useSnackbar} from '../../components/Snackbar';
import {processError, processResponse} from '../../utils';
import useSales from '../../services/sales';

export default function useSalesActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {getVisitorsList, getFollowUpList, getSalesData} = useSales();

  return {
    getSalesData: (projectId) =>
      dispatch({
        type: types.GET_SALES_DATA,
        payload: new Promise(async (resolve, reject) => {
          try {
            const formData = new FormData();
            formData.append('project_id', projectId);

            let response = processResponse(await getSalesData(formData));
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
    getFollowUps: (projectId) =>
      dispatch({
        type: types.GET_FOLLOWUP_LIST,
        payload: new Promise(async (resolve, reject) => {
          try {
            const formData = new FormData();
            formData.append('project_id', projectId);

            let response = processResponse(await getFollowUpList(formData));
            const {data, filter} = response;

            return resolve({
              followups: data.data,
              todayFollowups: filter.today_followups,
            });
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
