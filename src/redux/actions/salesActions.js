import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import {useSnackbar} from 'components/Snackbar';
import {useResProcessor} from 'utils/responseProcessor';
import useSales from '../../services/sales';

export default function useSalesActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {processError, processResponse} = useResProcessor();
  const {
    getVisitorsList,
    getFollowUpList,
    getSalesData,
    addVisitor,
    addFollowUp,
    getPipelines,
    deletePipeline,
  } = useSales();

  return {
    getSalesData: (projectId) =>
      dispatch({
        type: types.GET_SALES_DATA,
        payload: async () => {
          try {
            const formData = new FormData();
            formData.append('project_id', projectId);

            let response = processResponse(await getSalesData(formData));
            const {data} = response;

            return Promise.resolve(data);
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
    getVisitors: (projectId) =>
      dispatch({
        type: types.GET_VISITORS,
        payload: async () => {
          try {
            const formData = new FormData();
            formData.append('project_id', projectId);

            let response = processResponse(await getVisitorsList(formData));
            const {data} = response;

            return Promise.resolve(data);
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
    getFollowUps: (projectId) =>
      dispatch({
        type: types.GET_FOLLOWUP_LIST,
        payload: async () => {
          try {
            const formData = new FormData();
            formData.append('project_id', projectId);

            let response = processResponse(await getFollowUpList(formData));
            const {data, filter} = response;

            return Promise.resolve({
              followups: data.data,
              todayFollowups: filter.today_followups,
            });
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
    getPipelineData: (projectId) =>
      dispatch({
        type: types.GET_PIPELINES,
        payload: async () => {
          try {
            const formData = new FormData();
            formData.append('project_id', projectId);

            let response = processResponse(await getPipelines(formData));
            const {data, others} = response;

            return Promise.resolve({
              pipelines: data,
            });
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
    addVisitor: (formData) =>
      dispatch({
        type: types.ADD_VISITOR,
        payload: async () => {
          try {
            let response = processResponse(await addVisitor(formData));
            const {data} = response;

            return Promise.resolve(data.data);
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
    addFollowUp: (formData) =>
      dispatch({
        type: types.ADD_FOLLOW_UP,
        payload: async () => {
          try {
            let response = processResponse(await addFollowUp(formData));
            const {data} = response;

            return Promise.resolve(data.data);
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
    deletePipeline: (id, formData) =>
      dispatch({
        type: types.DELETE_PIPELINE,
        payload: async () => {
          try {
            let response = processResponse(await deletePipeline(formData));
            const {data} = response;

            return Promise.resolve(id);
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
  };
}
