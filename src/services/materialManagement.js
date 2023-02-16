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
    getSupplier: data => {
      return instance.post('/getSupplier', data, params);
    },
    addSupplier: data => {
      return instance.post('/addSupplier', data, params);
    },

    deleteChallan: data => {
      return instance.post('/material/deleteChallan', data, params);
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
    getMaterialPR: data => {
      return instance.post('/material_purchase_request/list', data, params);
    },
    getMaterialPRDetails: data => {
      return instance.post('/material_purchase_request/detail', data, params);
    },

    getSelectMaterialChallan: data => {
      return instance.post('/getChallanMaterial', data, params);
    },
    getPRMaterialDetails: data => {
      return instance.post('/material_purchase_request/detail', data, params);
    },
    getVendorList: data => {
      return instance.post('/getVenderList', data, params);
    },
    getWorkSubWorkList: data => {
      return instance.post('/getWorkSubWorkList', data, params);
    },
    getPRMaterialCategories: data => {
      return instance.post('/get_material', data, params);
    },

    AddPR: data => {
      return instance.post('/material_purchase_request/add', data, params);
    },
    createMaterialPR: data => {
      return instance.post(
        '/material_purchase_request/material_add',
        data,
        params,
      );
    },
    updatePR: data => {
      return instance.post('material_purchase_request/edit', data, params);
    },
    updateMaterialPR: data => {
      return instance.post(
        'material_purchase_request/material_edit',
        data,
        params,
      );
    },
    deleteMaterialPR: data => {
      return instance.post('/material_purchase_request/delete', data, params);
    },
    deleteMaterialPRItem: data => {
      return instance.post(
        '/material_purchase_request/delete_pr_item',
        data,
        params,
      );
    },
    deleteMaterialPRCategory: data => {
      return instance.post(
        '/material_purchase_request/material_pr_category_delete',
        data,
        params,
      );
    },
    updatePRStatus: data => {
      return instance.post('/approve_reject_pr_category', data, params);
    },

    // Direct Material GRN

    getDirectMaterialGRNList: data => {
      return instance.post('/material/directgrnlist', data, params);
    },
    getDirectMaterialGRNItemList: data => {
      return instance.post('/material/directgrndetailspreview', data, params);
    },
    getDirectMaterialGRNDetails: data => {
      return instance.post('/material/directgrnpreview', data, params);
    },
    deleteDirectMaterialGRN: data => {
      return instance.post('/material/deletedirectgrn', data, params);
    },

    updateDirectGRNStatus: data => {
      return instance.post('/material/approverejectdirectgrn', data, params);
    },

    addDirectGRNFirst: data => {
      return instance.post('/material/directgrnadd_first', data, params);
    },
    addDirectGRNMaterialInfo: data => {
      return instance.post('/material/directgrnadd_second', data, params);
    },
    addDirectGRNVehicleInfo: data => {
      return instance.post('/material/directgrnaddedit_third', data, params);
    },

    // Material Indent

    getMaterialIndentList: data => {
      return instance.post('/material/indentlist', data, params);
    },
    getMaterialIndentCategoryList: data => {
      return instance.post('/get_material_by_wbs_works_id', data, params);
    },
    getIndentDetails: data => {
      return instance.post('/material/issuereuestdetails', data, params);
    },
    getMaterialIssueIndentList: data => {
      return instance.post('/material/issuereuest', data, params);
    },
    addIssueRequest: data => {
      return instance.post('/material/addissuereuest', data, params);
    },
    addMaterialIssueRequest: data => {
      return instance.post('/material/addmaterialissuereuest', data, params);
    },
    updateIssueQuantity: data => {
      return instance.post('/material/issueassignqtyupdate', data, params);
    },
    addReturnIndentMaterials: data => {
      return instance.post('/material/returnaddedit', data, params);
    },
    addReturnMaterial: data => {
      return instance.post('/material/returnmaterialaddedit', data, params);
    },
    addReturnAttachment: data => {
      return instance.post(
        '/material/returnimage',
        data,
        config({multipart: true}),
      );
    },
    deleteIssue: data => {
      return instance.post('/material/issuedelete', data, params);
    },
    deleteIndentItem: data => {
      return instance.post('/indent/materialdeleteitem', data, params);
    },
    // Material StoreKeeper

    getStoreKeeperList: data => {
      return instance.post('/material/storekeeperlist', data, params);
    },
    getStoreKeeperDetails: data => {
      return instance.post('/material/indent_details', data, params);
    },
    CreateStoreKeeperOrder: data => {
      return instance.post('/material/storekeeper_orderconfirm', data, params);
    },

    updateStoreKeeperStatus: data => {
      return instance.post(
        '/material/storekeeper_return_status_update',
        data,
        params,
      );
    },
  };
}
