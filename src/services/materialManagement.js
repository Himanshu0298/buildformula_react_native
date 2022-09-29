import {instance, config} from './init';

export default function useMaterialManagement() {
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
    getPRMaterialOrderList: data => {
      return instance.post('/material_purchase_request/list', data, params);
    },
    getPRMaterialDetails: data => {
      return instance.post('/material_purchase_request/detail', data, params);
    },
    getVendorOrContractorsDetails: data => {
      return instance.post('/getVenderList', data, params);
    },
    getWorkSubWorkList: data => {
      return instance.post('/getWorkSubWorkList', data, params);
    },
    getPRMaterialList: data => {
      return instance.post('/get_material', data, params);
    },

    addMaterialPR: data => {
      return instance.post(
        '/material_purchase_request/add',
        data,
        config({multipart: false}),
      );
    },
    createMaterialPR: data => {
      return instance.post(
        '/material_purchase_request/material_add',
        data,
        config({multipart: false}),
      );
    },
  };
}
