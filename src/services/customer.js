import {instance, useConfig} from './init';

export default function useCustomerServices() {
  const {config} = useConfig();
  return {
    getCustomerDetails: data => {
      return instance.post('/customers', data, config({multipart: false}));
    },
    getBookingDetails: data => {
      return instance.post(
        '/customers/booking_details',
        data,
        config({multipart: false}),
      );
    },
    getBankDetails: data => {
      return instance.post(
        '/customers/bank_details',
        data,
        config({multipart: false}),
      );
    },
    addCustomer: data => {
      return instance.post('/customers/update', data, config());
    },
    updateBankDetails: data => {
      return instance.post('/customers/update_bank_details', data, config());
    },
    updateBankFiles: data => {
      return instance.post('customers/update_bank_files', data, config());
    },
    removeBankFile: data => {
      return instance.post(
        'customers/delete_bank_files',
        data,
        config({multipart: false}),
      );
    },
    getModifyRequests: data => {
      return instance.post(
        '/modify/request/lists',
        data,
        config({multipart: false}),
      );
    },
    addModifyRequest: data => {
      return instance.post('/modify/request/add', data, config());
    },
  };
}
