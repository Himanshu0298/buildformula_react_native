import {useDispatch} from 'react-redux';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'hooks/useResponseProcessor';
import * as types from './actionTypes';
import useSalesServices from '../../services/sales';

export default function useSalesActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {_err, _res} = useResProcessor();
  const {
    get_sales_dashboard_data,
    get_inquiry_form_fields,
    getAssignToData,
    getCountryCodes,
    getVisitorsList,
    getSalesData,
    addVisitor,
    updateVisitor,
    addFollowUp,
    updateFollowUp,
    getPipelines,
    addPipeline,
    deletePipeline,
    deleteBroker,
    updateBrokerRemark,
    moveVisitor,
    getUnitStatusListing,
    lockUnit,
    getHoldBookingDetails,
    unitHoldBooking,
    unitUnHoldBooking,
    createBooking,
    getBankList,
    getVisitor,
    getVisitorActivities,
    addVisitorComment,
    addVisitorCallLogs,
    getPipelinesOrderList,
    addVisitorFollowUp,
    updatePipelineOrder,
    getBrokersList,
    addBroker,
    updateBroker,
    getBrokerDetails,
    getVisitorInterestedProperty,
    confirmBookingOTP,
    resendBookingOTP,
    setBookingOTPStatus,
    getBookingFormOTPStatus,
    getApprovals,
    getApprovers,
    createApproval,
    approvalDetails,
    getFollowUpList,
    getFollowUpDetailsList,
    updateCompleteTask,
    getBrokerageDealDetails,
    addBrokeragePayment,
    updateBrokeragePayment,
    deleteBrokeragePayment,
    editBrokerage,
  } = useSalesServices();

  return {
    toggleTimer: data =>
      dispatch({
        type: types.SET_TIMER,
        payload: data,
      }),

    get_inquiry_form_fields: params =>
      dispatch({
        type: types.GET_INQUIRY_FORM_FIELDS,
        payload: async () => {
          try {
            const response = _res(await get_inquiry_form_fields(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    get_sales_dashboard_data: params =>
      dispatch({
        type: types.GET_SALES_DASHBOARD_DATA,
        payload: async () => {
          try {
            const response = _res(await get_sales_dashboard_data(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    setUpdatedPipelineOrderList: data =>
      dispatch({
        type: types.SET_UPDATED_PIPELINE_DATA,
        payload: data,
      }),

    getCountryCodes: params =>
      dispatch({
        type: types.GET_COUNTRY_CODES,
        payload: async () => {
          try {
            const response = _res(await getCountryCodes(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getAssignToData: params =>
      dispatch({
        type: types.GET_ASSIGNTO_DATA,
        payload: async () => {
          try {
            const response = _res(await getAssignToData(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
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
            const {data, page} = response;

            return Promise.resolve({data, page});
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

    updateVisitorsFilters: data => {
      dispatch({
        type: types.FILTER_VISITORS,
        payload: data,
      });
    },

    getPipelineData: params =>
      dispatch({
        type: types.GET_PIPELINES,
        payload: async () => {
          try {
            const response = _res(await getPipelines(params));
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
            const {data, msg} = response;
            snackbar.showMessage({message: msg});

            return Promise.resolve(data.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getVisitorInterestedProperty: params => {
      dispatch({
        type: types.GET_INTERESTED_PROPERTY,
        payload: async () => {
          try {
            const response = _res(await getVisitorInterestedProperty(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      });
    },
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

    updateBroker: params =>
      dispatch({
        type: types.UPDATE_BROKER,
        payload: async () => {
          try {
            const {data} = _res(await updateBroker(params));
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
            await Promise.all(list.map(item => updatePipelineOrder(item)));
            return Promise.resolve();
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addPipeline: params =>
      dispatch({
        type: types.ADD_PIPELINE,
        payload: async () => {
          try {
            const response = _res(await addPipeline(params));
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

    deletePipeline: params =>
      dispatch({
        type: types.DELETE_PIPELINE,
        payload: async () => {
          try {
            await deletePipeline(params);
            snackbar.showMessage({message: 'Deleted Pipeline successfully!'});

            return Promise.resolve(params.status_id);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getUnitStatusListing: params =>
      dispatch({
        type: types.GET_BOOKINGS_STATUS,
        payload: async () => {
          try {
            const response = _res(await getUnitStatusListing(params));
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

    getHoldBookingDetails: params =>
      dispatch({
        type: types.GET_HOLD_BOOKING_DETAILS,
        payload: async () => {
          try {
            const response = _res(await getHoldBookingDetails(params));
            const {data} = response;
            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    unitHoldBooking: params =>
      dispatch({
        type: types.HOLD_UNIT_BOOKING,
        payload: async () => {
          try {
            const response = _res(await unitHoldBooking(params));
            const {data, msg} = response;
            snackbar.showMessage({message: msg});

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    unitUnHoldBooking: params =>
      dispatch({
        type: types.UN_HOLD_UNIT_BOOKING,
        payload: async () => {
          try {
            const response = _res(await unitUnHoldBooking(params));
            const {data, msg} = response;
            snackbar.showMessage({message: msg});

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

    getBankList: params =>
      dispatch({
        type: types.GET_BANK_LIST,
        payload: async () => {
          try {
            const response = _res(await getBankList(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    confirmBookingOTP: params =>
      dispatch({
        type: types.CONFIRM_BOOKING_OTP,
        payload: async () => {
          try {
            const response = _res(await confirmBookingOTP(params));
            const {data, msg} = response;

            snackbar.showMessage({message: msg, variant: 'success'});

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    resendBookingOTP: params =>
      dispatch({
        type: types.RESEND_BOOKING_OTP,
        payload: async () => {
          try {
            const response = _res(await resendBookingOTP(params));
            const {data, msg} = response;

            // snackbar.showMessage({message: msg, variant: 'success'});

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    setBookingOTPStatus: () =>
      dispatch({
        type: types.SET_BOOKING_OTP_STATUS,
        payload: async () => {
          try {
            const response = _res(await setBookingOTPStatus());
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getBookingFormOTPStatus: params =>
      dispatch({
        type: types.GET_BOOKING_FORM_OTP_STATUS,
        payload: async () => {
          try {
            const response = _res(await getBookingFormOTPStatus(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getBrokersList: params =>
      dispatch({
        type: types.GET_BROKERS_LIST,
        payload: async () => {
          try {
            const response = _res(await getBrokersList(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addBroker: formData =>
      dispatch({
        type: types.ADD_BROKER,
        payload: async () => {
          try {
            const response = _res(await addBroker(formData));
            const {data} = response;
            snackbar.showMessage({message: 'Broker Added'});
            return Promise.resolve(data.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    deleteBroker: params =>
      dispatch({
        type: types.DELETE_BROKER,
        payload: async () => {
          try {
            const response = _res(await deleteBroker(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updateBrokerRemark: params =>
      dispatch({
        type: types.UPDATE_BROKER_REMARK,
        payload: async () => {
          try {
            const response = _res(await updateBrokerRemark(params));
            const {data, msg} = response;
            snackbar.showMessage({message: msg});

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getBrokerDetails: params =>
      dispatch({
        type: types.GET_BROKER_DETAILS,
        payload: async () => {
          try {
            const response = _res(await getBrokerDetails(params));
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

    // Approval Module

    getApprovals: params =>
      dispatch({
        type: types.GET_APPROVALS,
        payload: async () => {
          try {
            const response = _res(await getApprovals(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getApprovers: params =>
      dispatch({
        type: types.GET_APPROVERS,
        payload: async () => {
          try {
            const response = _res(await getApprovers(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    createApproval: params =>
      dispatch({
        type: types.CREATE_APPROVAL,
        payload: async () => {
          try {
            const response = _res(await createApproval(params));
            const {data, msg} = response;

            snackbar.showMessage({message: msg});
            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    approvalDetails: params =>
      dispatch({
        type: types.APPROVAL_DETAILS,
        payload: async () => {
          try {
            const response = _res(await approvalDetails(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getFollowUpList: params =>
      dispatch({
        type: types.GET_FOLLOWUP_LIST,
        payload: async () => {
          try {
            const response = _res(await getFollowUpList(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getFollowUpDetailsList: params =>
      dispatch({
        type: types.GET_FOLLOWUP_DETAILS_LIST,
        payload: async () => {
          try {
            const response = _res(await getFollowUpDetailsList(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updateCompleteTask: params =>
      dispatch({
        type: types.UPDATE_COMPLETE_TASK,
        payload: async () => {
          try {
            const response = _res(await updateCompleteTask(params));
            const {data, msg} = response;
            snackbar.showMessage({message: msg});

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getBrokerageDealDetails: params =>
      dispatch({
        type: types.GET_BROKERAGE_DEAL_DETAILS,
        payload: async () => {
          try {
            const response = _res(await getBrokerageDealDetails(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addBrokeragePayment: formData =>
      dispatch({
        type: types.ADD_BROKERAGE_PAYMENT,
        payload: async () => {
          try {
            const response = _res(await addBrokeragePayment(formData));
            const {data} = response;

            return Promise.resolve(data.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updateBrokeragePayment: params =>
      dispatch({
        type: types.UPDATE_BROKERAGE_PAYMENT,
        payload: async () => {
          try {
            const response = _res(await updateBrokeragePayment(params));
            const {data, msg} = response;
            snackbar.showMessage({message: msg});

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    editBrokerage: params =>
      dispatch({
        type: types.EDIT_BROKERAGE,
        payload: async () => {
          try {
            const response = _res(await editBrokerage(params));
            const {data, msg} = response;
            snackbar.showMessage({message: msg});

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    deleteBrokeragePayment: params =>
      dispatch({
        type: types.DELETE_BROKERAGE_PAYMENT,
        payload: async () => {
          try {
            const response = _res(await deleteBrokeragePayment(params));
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
