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
    addPipeline,
    deletePipeline,
    moveVisitor,
    getUnitsBookingStatus,
    lockUnit,
    createBooking,
    getBankList,
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
              visitorSuggestions: others.visitors_autosuggestions || [],
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
    addPipeline: (formData) =>
      dispatch({
        type: types.ADD_PIPELINE,
        payload: async () => {
          try {
            let response = processResponse(await addPipeline(formData));
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
    moveVisitor: (data) =>
      dispatch({
        type: types.MOVE_VISITOR,
        payload: async () => {
          try {
            const {visitorId, projectId, pipelineId} = data;
            const formData = new FormData();

            formData.append('visitor_id', visitorId);
            formData.append('project_id', projectId);
            formData.append('pureid', pipelineId);

            let response = processResponse(await moveVisitor(formData));

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

    getUnitsBookingStatus: (formData) =>
      dispatch({
        type: types.GET_BOOKINGS_STATUS,
        payload: async () => {
          try {
            let response = processResponse(
              await getUnitsBookingStatus(formData),
            );
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

    lockUnit: (formData) =>
      dispatch({
        type: types.LOCK_UNIT,
        payload: async () => {
          try {
            let response = processResponse(await lockUnit(formData));
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
    createBooking: (formData) =>
      dispatch({
        type: types.CREATE_BOOKING,
        payload: async () => {
          try {
            let response = processResponse(await createBooking(formData));
            const {data} = response;

            snackbar.showMessage({
              message: 'Created Booking successfully',
              variant: 'success',
            });

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
    getBankList: () =>
      dispatch({
        type: types.GET_BANK_LIST,
        payload: async () => {
          try {
            let response = processResponse(await getBankList());
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
  };
}
