import {instance, useConfig} from './init';

export default function useCustomerServices() {
  const {config} = useConfig();
  return {
    getCustomerDetails: (data) => {
      return instance.post('/customers', data, config({multipart: false}));
    },
    getBookingDetails: (data) => {
      return instance.post(
        '/customers/booking_details',
        data,
        config({multipart: false}),
      );
    },
    addCustomer: (data) => {
      return instance.post('/customers/update', data, config());
    },
  };
}
