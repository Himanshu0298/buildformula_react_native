import {instance, useConfig} from './init';

export default function useMaterialManagement() {
  const {config} = useConfig();

  const params = config({multipart: false});
  return {
    getMaterialOrderList: data => {
      return instance.post('/material/utilityDelivered', data, params);
    },
    getMaterialChallanList: data => {
      return instance.post('/materialDelivery/details', data, params);
    },
  };
}
