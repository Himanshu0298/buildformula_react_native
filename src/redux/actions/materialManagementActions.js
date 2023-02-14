import {useDispatch} from 'react-redux';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'hooks/useResponseProcessor';
import useMaterialManagement from 'services/materialManagement';
import * as types from './actionTypes';

export default function useMaterialManagementActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {_err, _res} = useResProcessor();
  const {
    getMaterialOrderList,
    getMaterialChallanList,
    getMaterialChallanDetails,
    addMaterialChallan,
    getSelectMaterialChallan,
    getStoreKeeperList,
    getStoreKeeperDetails,
    CreateStoreKeeperOrder,
    getPRMaterialCategories,
    getVendorList,
    updatePR,
    updateMaterialPR,
    deleteMaterialPR,
    deleteMaterialPRCategory,
    deleteMaterialPRItem,
    updatePRStatus,
    getDirectMaterialGRNList,
    getDirectMaterialGRNDetails,
    deleteDirectMaterialGRN,
    updateDirectGRNStatus,
    getDirectMaterialGRNItemList,
    addDirectGRNMaterialInfo,
    getMaterialIndentList,
    createMaterialPR,
    getPRMaterialDetails,
    getWorkSubWorkList,
    getPRMaterialOrderList,
    updateStoreKeeperStatus,
    getIndentDetails,
    AddPR,
    addDirectGRNVehicleInfo,
    deleteChallan,
    deleteIssue,
    addIssueRequest,
    addMaterialIssueRequest,
    addReturnIndentMaterials,
    addReturnMaterial,
    addReturnAttachment,
    getSupplier,
    addSupplier,
    updateIssueQuantity,
    getMaterialIndentCategoryList,
  } = useMaterialManagement();

  return {
    getMaterialOrderList: data =>
      dispatch({
        type: types.GET_MATERIAL_ORDER_LIST,
        payload: async () => {
          try {
            const response = _res(await getMaterialOrderList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getSupplier: data =>
      dispatch({
        type: types.GET_SUPPLIERS_LIST,
        payload: async () => {
          try {
            const response = _res(await getSupplier(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addSupplier: data =>
      dispatch({
        type: types.ADD_SUPPLIER,
        payload: async () => {
          try {
            const response = _res(await addSupplier(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getMaterialChallanList: data =>
      dispatch({
        type: types.GET_MATERIAL_CHALLAN_LIST,
        payload: async () => {
          try {
            const response = _res(await getMaterialChallanList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getMaterialChallanDetails: data =>
      dispatch({
        type: types.GET_MATERIAL_CHALLAN_DETAILS,
        payload: async () => {
          try {
            const response = _res(await getMaterialChallanDetails(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addMaterialChallan: data =>
      dispatch({
        type: types.ADD_MATERIAL_CHALLAN,
        payload: async () => {
          try {
            const response = _res(await addMaterialChallan(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    deleteChallan: data =>
      dispatch({
        type: types.DELETE_CHALLAN,
        payload: async () => {
          try {
            const res = _res(await deleteChallan(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getSelectMaterialChallan: data =>
      dispatch({
        type: types.GET_SELECT_MATERIAL_CHALLAN,
        payload: async () => {
          try {
            const response = _res(await getSelectMaterialChallan(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    // Material PR

    getPRMaterialOrderList: data =>
      dispatch({
        type: types.GET_PR_MATERIAL_ORDER_LIST,
        payload: async () => {
          try {
            const response = _res(await getPRMaterialOrderList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getPRMaterialCategories: data =>
      dispatch({
        type: types.GET_MATERIAL_LIST,
        payload: async () => {
          try {
            const response = _res(await getPRMaterialCategories(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getPRMaterialDetails: data =>
      dispatch({
        type: types.GET_MATERIAL_PR_DETAILS,
        payload: async () => {
          try {
            const response = _res(await getPRMaterialDetails(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getVendorList: data =>
      dispatch({
        type: types.GET_VENDOR_OR_CONTRACTORS_DETAILS,
        payload: async () => {
          try {
            const response = _res(await getVendorList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getWorkSubWorkList: data =>
      dispatch({
        type: types.GET_WORK_SUB_WORK_LIST,
        payload: async () => {
          try {
            const response = _res(await getWorkSubWorkList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    createMaterialPR: params =>
      dispatch({
        type: types.CREATE_MATERIAL_PR,
        payload: async () => {
          try {
            const response = _res(await createMaterialPR(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    AddPR: data =>
      dispatch({
        type: types.ADD_MATERIAL_PR,
        payload: async () => {
          try {
            const response = _res(await AddPR(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updatePR: params =>
      dispatch({
        type: types.UPDATE_PR,
        payload: async () => {
          try {
            const response = _res(await updatePR(params));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateMaterialPR: params =>
      dispatch({
        type: types.EDIT_MATERIAL_PR,
        payload: async () => {
          try {
            const {data, msg} = _res(await updateMaterialPR(params));
            snackbar.showMessage({message: msg});

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteMaterialPR: data =>
      dispatch({
        type: types.DELETE_MATERIAL_PR_DETAILS,
        payload: async () => {
          try {
            const res = _res(await deleteMaterialPR(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteMaterialPRItem: data =>
      dispatch({
        type: types.DELETE_MATERIAL_PR_ITEM,
        payload: async () => {
          try {
            const res = _res(await deleteMaterialPRItem(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteMaterialPRCategory: data =>
      dispatch({
        type: types.DELETE_MATERIAL_PR_CATEGORY,
        payload: async () => {
          try {
            const res = _res(await deleteMaterialPRCategory(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updatePRStatus: formData =>
      dispatch({
        type: types.UPDATE_PR_STATUS,
        payload: async () => {
          try {
            const response = _res(await updatePRStatus(formData));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    // addProgressRecord: data =>
    //   dispatch({
    //     type: types.ADD_PROGRESS_RECORD,
    //     payload: async () => {
    //       try {
    //         const res = _res(await addProgressRecord(data));
    //         snackbar.showMessage({message: res.msg});
    //         return Promise.resolve(res.data.lists);
    //       } catch (error) {
    //         const message = _err(error);
    //         snackbar.showMessage({message, variant: 'error'});
    //         return Promise.reject(message);
    //       }
    //     },
    //   }),

    // Direct MaterialGRN

    getDirectMaterialGRNList: data =>
      dispatch({
        type: types.GET_DIRECT_GRN_LIST,
        payload: async () => {
          try {
            const response = _res(await getDirectMaterialGRNList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getDirectMaterialGRNDetails: data =>
      dispatch({
        type: types.GET_DIRECT_GRN_DETAILS,
        payload: async () => {
          try {
            const response = _res(await getDirectMaterialGRNDetails(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getDirectMaterialGRNItemList: data =>
      dispatch({
        type: types.GET_MATERIAL_GRN_DETAILS,
        payload: async () => {
          try {
            const response = _res(await getDirectMaterialGRNItemList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addDirectGRN: formData =>
      dispatch({
        type: types.UPDATE_STORE_KEEPER_STATUS,
        payload: async () => {
          try {
            const response = _res(await updateStoreKeeperStatus(formData));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updateDirectGRNStatus: params =>
      dispatch({
        type: types.UPDATE_DIRECT_GRN_STATUS,
        payload: async () => {
          try {
            const response = _res(await updateDirectGRNStatus(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    deleteDirectMaterialGRN: data =>
      dispatch({
        type: types.DELETE_MATERIAL_DIRECT_GRN,
        payload: async () => {
          try {
            const res = _res(await deleteDirectMaterialGRN(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data.lists);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    // Material StoreKeeper

    getStoreKeeperList: data =>
      dispatch({
        type: types.GET_STORE_KEEPER_LIST,
        payload: async () => {
          try {
            const response = _res(await getStoreKeeperList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getStoreKeeperDetails: data =>
      dispatch({
        type: types.GET_STORE_KEEPER_DETAILS,
        payload: async () => {
          try {
            const response = _res(await getStoreKeeperDetails(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    CreateStoreKeeperOrder: formData =>
      dispatch({
        type: types.CREATE_STOREKEEPER_ORDER,
        payload: async () => {
          try {
            const response = _res(await CreateStoreKeeperOrder(formData));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateStoreKeeperStatus: formData =>
      dispatch({
        type: types.UPDATE_STORE_KEEPER_STATUS,
        payload: async () => {
          try {
            const response = _res(await updateStoreKeeperStatus(formData));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    // Material Indent

    getMaterialIndentList: data =>
      dispatch({
        type: types.GET_MATERIAL_INDENT_LIST,
        payload: async () => {
          try {
            const response = _res(await getMaterialIndentList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getIndentDetails: data =>
      dispatch({
        type: types.GET_MATERIAL_INDENT_DETAILS,
        payload: async () => {
          try {
            const response = _res(await getIndentDetails(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getMaterialIndentCategoryList: data =>
      dispatch({
        type: types.GET_MATERIAL_CATEGORY_LIST,
        payload: async () => {
          try {
            const response = _res(await getMaterialIndentCategoryList(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    deleteIssue: data =>
      dispatch({
        type: types.DELETE_ISSUE,
        payload: async () => {
          try {
            const res = _res(await deleteIssue(data));
            snackbar.showMessage({message: res.msg});
            return Promise.resolve(res.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addIssueRequest: data =>
      dispatch({
        type: types.ADD_ISSUE_REQUEST,
        payload: async () => {
          try {
            const response = _res(await addIssueRequest(data));
            return Promise.resolve(response);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addMaterialIssueRequest: data =>
      dispatch({
        type: types.ADD_ISSUE_REQUEST,
        payload: async () => {
          try {
            console.log(' the api has been called ===========>');
            const response = _res(await addMaterialIssueRequest(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addReturnIndentMaterials: data =>
      dispatch({
        type: types.ADD_RETURN_REQUEST,
        payload: async () => {
          try {
            const response = _res(await addReturnIndentMaterials(data));
            return Promise.resolve(response);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addReturnMaterial: data =>
      dispatch({
        type: types.ADD_MATERIAL_ISSUE_REQUEST,
        payload: async () => {
          try {
            const response = _res(await addReturnMaterial(data));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addReturnAttachment: formData =>
      dispatch({
        type: types.UPDATE_PR_STATUS,
        payload: async () => {
          try {
            const response = _res(await addReturnAttachment(formData));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updateIssueQuantity: formData =>
      dispatch({
        type: types.UPDATE_ISSUE_ASSIGN_QUANTITY,
        payload: async () => {
          try {
            const response = _res(await updateIssueQuantity(formData));
            return Promise.resolve(response.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
  };
}
