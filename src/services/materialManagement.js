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
    getMaterialChallanDetails: data => {
      return instance.post('/materialChallanDetails', data, params);
    },
    addMaterialChallan: data => {
      return instance.post(
        '/material/addEditChallan',
        data,
        config({multipart: true}),
      );
    },

    getSelectMaterialChallan: data => {
      return instance.post('/getChallanMaterial', data, params);
    },
  };
}