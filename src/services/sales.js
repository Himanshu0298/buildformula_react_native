import {instance, useConfig} from './init';

export default function useSalesServices() {
  const {config} = useConfig();
  return {
    getVisitorsList: data => {
      return instance.post(
        '/visitors/get_lists',
        data,
        config({multipart: false}),
      );
    },
    getVisitor: data => {
      return instance.post(
        '/visitors/details',
        data,
        config({multipart: false}),
      );
    },
    getBrokerDetails: data => {
      return instance.post('/broker_details', data, config({multipart: false}));
    },
    getFollowUpList: data => {
      return instance.post('/followup/get_lists', data, config());
    },
    getSalesData: data => {
      return instance.post(
        '/followup/other_info',
        data,
        config({multipart: false}),
      );
    },
    getPipelines: data => {
      return instance.post('/pipeline/get_lists', data, config());
    },
    addVisitor: data => {
      return instance.post('/visitors/add', data, config({multipart: false}));
    },
    addVisitorComment: data => {
      return instance.post(
        '/visitors/addcomment',
        data,
        config({multipart: false}),
      );
    },
    addVisitorCallLogs: data => {
      return instance.post(
        '/visitors/addcalllog',
        data,
        config({multipart: false}),
      );
    },
    addVisitorFollowUp: data => {
      return instance.post(
        '/visitors/addfollowup',
        data,
        config({multipart: false}),
      );
    },
    updateVisitor: data => {
      return instance.post(
        '/visitors/update',
        data,
        config({multipart: false}),
      );
    },
    addFollowUp: data => {
      return instance.post(
        '/visitors/addfollowup',
        data,
        config({multipart: false}),
      );
    },
    updateFollowUp: data => {
      return instance.post(
        'update/todaysfollowup',
        data,
        config({multipart: false}),
      );
    },
    addPipeline: data => {
      return instance.post('/pipeline/add', data, config());
    },
    moveVisitor: data => {
      return instance.post('/pipeline/movecontact', data, config());
    },
    deletePipeline: data => {
      return instance.post('inquiry_status/remove', data, config());
    },
    getUnitsBookingStatus: data => {
      return instance.post(
        '/get_locked_units',
        data,
        config({multipart: false}),
      );
    },
    lockUnit: data => {
      return instance.post(
        '/set_locked_units',
        data,
        config({multipart: false}),
      );
    },
    getHoldBookingDetails: data => {
      return instance.post(
        '/booking/get_booking_unhold_details',
        data,
        config({multipart: false}),
      );
    },
    unitHoldBooking: data => {
      return instance.post(
        '/booking/hold_booking',
        data,
        config({multipart: false}),
      );
    },
    unitUnHoldBooking: data => {
      return instance.post(
        '/booking/unhold_booking',
        data,
        config({multipart: false}),
      );
    },
    createBooking: data => {
      return instance.post(
        '/booking/save_booking',
        data,
        config({multipart: false}),
      );
    },
    getVisitorActivities: data => {
      return instance.post(
        '/visitors/listactivities',
        data,
        config({multipart: false}),
      );
    },
    getBrokersList: data => {
      return instance.post('/list_brokers', data, config({multipart: false}));
    },
    addBroker: data => {
      return instance.post('/add_broker', data, config({multipart: false}));
    },
    updateBroker: data => {
      return instance.post('/update_broker', data, config({multipart: false}));
    },
    deleteBroker: data => {
      return instance.post('/delete_broker', data, config({multipart: false}));
    },
    getPipelinesOrderList: data => {
      return instance.post(
        '/pipeline/listrearrangesalespipeline',
        data,
        config({multipart: false}),
      );
    },
    updatePipelineOrder: data => {
      return instance.post(
        'pipeline/updaterearrangesalespipeline',
        data,
        config({multipart: false}),
      );
    },
    getBankList: data => {
      return instance.get('get_banks', config());
    },
  };
}
