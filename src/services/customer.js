import {instance, useConfig} from './init';

export default function useCustomerServices() {
  let {config} = useConfig();
  return {
    getCustomerDetails: (data) => {
      return instance.post('/customers', data, config());
    },
  };
}
