import {instance, useConfig} from './init';

export default function useSales() {
  let {config} = useConfig();
  return {
    getVisitorsList: (data) => {
      return instance.post('/visitors/get_lists', data, config());
    },
    getFollowUpList: (data) => {
      return instance.post('/followup/get_lists', data, config());
    },
    getSalesData: (data) => {
      return instance.post('/followup/other_info', data, config());
    },
    getPipelines: (data) => {
      return instance.post('/pipeline/get_lists', data, config());
    },
    addVisitor: (data) => {
      return instance.post('/visitors/add', data, config());
    },
    addFollowUp: (data) => {
      return instance.post('/visitors/addfollowup', data, config());
    },
    addPipeline: (data) => {
      return instance.post('/pipeline/add', data, config());
    },
    moveVisitor: (data) => {
      return instance.post('/pipeline/movecontact', data, config());
    },
    deletePipeline: (data) => {
      return instance.post('inquiry_status/remove', data, config());
    },
    getUnitsBookingStatus: (data) => {
      return instance.post('/get_locked_units', data, config());
    },
    lockUnit: (data) => {
      return instance.post('/set_locked_units', data, config());
    },
    createBooking: (data) => {
      return instance.post('/booking/form_save', data, config());
    },
    getBankList: (data) => {
      return instance.get('get_banks', config());
    },
  };
}
