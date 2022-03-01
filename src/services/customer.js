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
    getAccountDetails: data => {
      return instance.post(
        '/customers/account_collection_listing',
        data,
        config({multipart: false}),
      );
    },
    getFile: data => {
      return instance.post(
        '/customers/list_files',
        data,
        config({multipart: false}),
      );
    },
    getFolder: data => {
      return instance.post(
        '/cs_list_folders',
        data,
        config({multipart: false}),
      );
    },

    addModifyRequest: data => {
      return instance.post('/modify/request/add', data, config());
    },
    addComment: data => {
      return instance.post('/modify_request_conversation_add', data, config());
    },
    getModifyRequest: data => {
      return instance.post(
        'details_modify_request',
        data,
        config({multipart: false}),
      );
    },
    updateBookingStatus: data => {
      return instance.post(
        'customers/bookingstatus',
        data,
        config({multipart: false}),
      );
    },
    updateModifiedRequestStatus: data => {
      return instance.post(
        'modify_request_status_change',
        data,
        config({multipart: false}),
      );
    },
    addCollection: data => {
      return instance.post(
        '/customers/account_collection_add',
        data,
        config({multipart: false}),
      );
    },
    updateCollection: data => {
      return instance.post(
        '/customers/account_collection_update',
        data,
        config({multipart: false}),
      );
    },
    deleteCollection: data => {
      return instance.post(
        '/customers/account_collection_delete',
        data,
        config({multipart: false}),
      );
    },
  };
}
