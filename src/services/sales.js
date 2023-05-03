import {instance, config} from './init';

export default function useSalesServices() {
  const params = config({multipart: false});

  return {
    get_inquiry_form_fields: data => {
      return instance.post('/visitors/visitor_form_setting_list', data, params);
    },
    getVisitorsList: data => {
      return instance.post('/visitors/get_lists', data, params);
    },
    getVisitor: data => {
      return instance.post('/visitors/details', data, params);
    },
    getBrokerDetails: data => {
      return instance.post('/broker_details', data, params);
    },

    getSalesData: data => {
      return instance.post('/followup/other_info', data, params);
    },
    getPipelines: data => {
      return instance.post('/pipeline/get_lists', data, params);
    },
    addVisitor: data => {
      return instance.post('/visitors/add', data, params);
    },
    getVisitorInterestedProperty: data => {
      return instance.post('/visitors/getInterestedProperty', data, params);
    },
    getCountryCodes: data => {
      return instance.post('/countries/code', data, params);
    },
    getAssignToData: data => {
      return instance.post('/project/user/list', data, params);
    },
    addVisitorComment: data => {
      return instance.post('/visitors/addcomment', data, params);
    },
    addVisitorCallLogs: data => {
      return instance.post('/visitors/addcalllog', data, params);
    },
    addVisitorFollowUp: data => {
      return instance.post('/visitors/addfollowup', data, params);
    },
    updateVisitor: data => {
      return instance.post('/visitors/update', data, params);
    },
    addFollowUp: data => {
      return instance.post('/visitors/addfollowup', data, params);
    },
    updateFollowUp: data => {
      return instance.post('update/todaysfollowup', data, params);
    },
    addPipeline: data => {
      return instance.post('/pipeline/add', data, params);
    },
    moveVisitor: data => {
      return instance.post('/pipeline/movecontact', data, config());
    },
    deletePipeline: data => {
      return instance.post('inquiry_status/remove', data, params);
    },
    getUnitStatusListing: data => {
      return instance.post('/get_locked_units', data, params);
    },
    lockUnit: data => {
      return instance.post('/set_locked_units', data, params);
    },
    getHoldBookingDetails: data => {
      return instance.post('/booking/get_booking_unhold_details', data, params);
    },
    unitHoldBooking: data => {
      return instance.post('/booking/hold_booking', data, params);
    },
    unitUnHoldBooking: data => {
      return instance.post('/booking/unhold_booking', data, params);
    },
    createBooking: data => {
      return instance.post('/save_booking_new', data, params);
    },

    getVisitorActivities: data => {
      return instance.post('/visitors/listactivities', data, params);
    },
    getBrokersList: data => {
      return instance.post('/list_brokers', data, params);
    },
    addBroker: data => {
      return instance.post('/add_broker', data, params);
    },
    confirmBookingOTP: data => {
      return instance.post('/booking_confirm_via_otp', data, params);
    },
    resendBookingOTP: data => {
      return instance.post('/resend_booking_otp', data, params);
    },
    setBookingOTPStatus: data => {
      return instance.post(
        '/booking_form_settings/set_booking_otp_status',
        data,
        params,
      );
    },
    getBookingFormOTPStatus: data => {
      return instance.post(
        '/booking_form_settings/get_booking_otp_status',
        data,
        params,
      );
    },
    updateBroker: data => {
      return instance.post('/update_broker', data, params);
    },
    deleteBroker: data => {
      return instance.post('/delete_broker', data, params);
    },

    updateBrokerRemark: data => {
      return instance.post('/edit_broker_remark', data, params);
    },

    getPipelinesOrderList: data => {
      return instance.post(
        '/pipeline/listrearrangesalespipeline',
        data,
        params,
      );
    },
    updatePipelineOrder: data => {
      return instance.post(
        '/pipeline/updaterearrangesalespipeline',
        data,
        params,
      );
    },

    getBankList: data => {
      return instance.get('get_banks', data, config());
    },

    // Approvals

    getApprovals: data => {
      return instance.post('/bookingapproval/list_approvals', data, params);
    },
    getApprovers: data => {
      return instance.post('/bookingapproval/list_approvers', data, params);
    },
    createApproval: data => {
      return instance.post('/bookingapproval/add_approvals', data, params);
    },
    approvalDetails: data => {
      return instance.post('/bookingapproval/details', data, params);
    },

    // Follow_Up Task

    getFollowUpList: data => {
      return instance.post('/visitors/list_followups', data, params);
    },
    getFollowUpDetailsList: data => {
      return instance.post('/visitors/details_followups', data, params);
    },
    updateCompleteTask: data => {
      return instance.post(
        '/visitors/complete_followup_save_next',
        data,
        params,
      );
    },

    getBrokerageDealDetails: data => {
      return instance.post('/brokerage_deal_details', data, params);
    },
    addBrokeragePayment: data => {
      return instance.post('/add_brokerage_payment', data, params);
    },
    updateBrokeragePayment: data => {
      return instance.post('/update_brokerage_payment', data, params);
    },
    editBrokerage: data => {
      return instance.post('/edit_brokerage', data, params);
    },

    deleteBrokeragePayment: data => {
      return instance.post('/delete_info_broker_payment', data, params);
    },
  };
}
