import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'utils/responseProcessor';
import useSalesServices from '../../services/sales';

export default function useSalesActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {_err, _res} = useResProcessor();
  const {
    getVisitorsList,
    getSalesData,
    addVisitor,
    updateVisitor,
    addFollowUp,
    updateFollowUp,
    getPipelines,
    addPipeline,
    deletePipeline,
    moveVisitor,
    getUnitsBookingStatus,
    lockUnit,
    createBooking,
    getBankList,
    getVisitor,
    getVisitorActivities,
    addVisitorComment,
    addVisitorCallLogs,
    getPipelinesOrderList,
    addVisitorFollowUp,
    updatePipelineOrder,
  } = useSalesServices();

  return {
    toggleTimer: data =>
      dispatch({
        type: types.SET_TIMER,
        payload: data,
      }),

    setUpdatedPipelineOrderList: data =>
      dispatch({
        type: types.SET_UPDATED_PIPELINE_DATA,
        payload: data,
      }),

    getSalesData: params =>
      dispatch({
        type: types.GET_SALES_DATA,
        payload: async () => {
          try {
            const response = _res(await getSalesData(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getVisitors: params =>
      dispatch({
        type: types.GET_VISITORS,
        payload: async () => {
          try {
            const response = _res(await getVisitorsList(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getVisitor: params =>
      dispatch({
        type: types.GET_VISITOR,
        payload: async () => {
          try {
            const response = _res(await getVisitor(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getPipelineData: projectId =>
      dispatch({
        type: types.GET_PIPELINES,
        payload: async () => {
          try {
            const formData = new FormData();
            formData.append('project_id', projectId);

            const response = _res(await getPipelines(formData));
            const {data, others} = response;

            return Promise.resolve({
              pipelines: data,
              visitorSuggestions: others.visitors_autosuggestions || [],
            });
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addVisitor: formData =>
      dispatch({
        type: types.ADD_VISITOR,
        payload: async () => {
          try {
            const response = _res(await addVisitor(formData));
            const {data} = response;

            return Promise.resolve(data.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addVisitorComment: params =>
      dispatch({
        type: types.ADD_VISITOR_COMMENT,
        payload: async () => {
          try {
            const response = _res(await addVisitorComment(params));
            const {data} = response;

            return Promise.resolve(data.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addVisitorCallLogs: params =>
      dispatch({
        type: types.ADD_VISITOR_CALL_LOGS,
        payload: async () => {
          try {
            const response = _res(await addVisitorCallLogs(params));
            const {data} = response;

            return Promise.resolve(data.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addVisitorFollowUp: params =>
      dispatch({
        type: types.ADD_VISITOR_FOLLOW_UP,
        payload: async () => {
          try {
            const response = _res(await addVisitorFollowUp(params));
            const {data} = response;

            return Promise.resolve(data.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updateVisitor: formData =>
      dispatch({
        type: types.ADD_VISITOR,
        payload: async () => {
          try {
            const response = _res(await updateVisitor(formData));
            const {data} = response;

            return Promise.resolve(data.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addFollowUp: formData =>
      dispatch({
        type: types.ADD_FOLLOW_UP,
        payload: async () => {
          try {
            const {data} = _res(await addFollowUp(formData));
            return Promise.resolve(data.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updateFollowUp: params =>
      dispatch({
        type: types.UPDATE_FOLLOW_UP,
        payload: async () => {
          try {
            const {data} = _res(await updateFollowUp(params));
            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updatePipelineOrderList: list =>
      dispatch({
        type: types.UPDATE_PIPELINE_ORDER_LIST,
        payload: async () => {
          try {
            await Promise.all(
              list.map(async item => await updatePipelineOrder(item)),
            );
            console.log('----->Reducer called in pipelineorderLit');
            return Promise.resolve();
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addPipeline: formData =>
      dispatch({
        type: types.ADD_PIPELINE,
        payload: async () => {
          try {
            const response = _res(await addPipeline(formData));
            const {data} = response;

            return Promise.resolve(data.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    moveVisitor: data =>
      dispatch({
        type: types.MOVE_VISITOR,
        payload: async () => {
          try {
            const {visitorId, projectId, pipelineId} = data;
            const formData = new FormData();

            formData.append('visitor_id', visitorId);
            formData.append('project_id', projectId);
            formData.append('pureid', pipelineId);

            const response = _res(await moveVisitor(formData));

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    deletePipeline: (id, formData) =>
      dispatch({
        type: types.DELETE_PIPELINE,
        payload: async () => {
          try {
            const response = _res(await deletePipeline(formData));
            const {data} = response;

            return Promise.resolve(id);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getUnitsBookingStatus: params =>
      dispatch({
        type: types.GET_BOOKINGS_STATUS,
        payload: async () => {
          try {
            const response = _res(await getUnitsBookingStatus(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    lockUnit: formData =>
      dispatch({
        type: types.LOCK_UNIT,
        payload: async () => {
          try {
            const response = _res(await lockUnit(formData));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    createBooking: formData =>
      dispatch({
        type: types.CREATE_BOOKING,
        payload: async () => {
          try {
            const response = _res(await createBooking(formData));
            const {data} = response;

            snackbar.showMessage({
              message: 'Created Booking successfully',
              variant: 'success',
            });

            return Promise.resolve(data);
          } catch (error) {
            const errorMessage = _err(error);
            snackbar.showMessage({message: errorMessage, variant: 'error'});
            return Promise.reject(errorMessage);
          }
        },
      }),

    getBankList: () =>
      dispatch({
        type: types.GET_BANK_LIST,
        payload: async () => {
          try {
            const response = _res(await getBankList());
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getPipelinesOrderList: params =>
      dispatch({
        type: types.GET_PIPELINES_ORDER_LIST,
        payload: async () => {
          try {
            const response = _res(await getPipelinesOrderList(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getVisitorActivities: params =>
      dispatch({
        type: types.GET_VISITOR_ACTIVITIES,
        payload: async () => {
          try {
            const response = _res(await getVisitorActivities(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
  };
}
