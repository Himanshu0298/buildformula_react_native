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
    getPRMaterialOrderList,
    getPRMaterialDetails,
    getPRMaterialCategories,
    getVendorList,
    addMaterialPR,
    getWorkSubWorkList,
    createMaterialPR,
    updatePR,
    updateMaterialPR,
    deleteMaterialPR,
    deleteMaterialPRCategory,
    deleteMaterialPRItem,
    updatePRStatus,
    getDirectMaterialGRNList,
    getDirectMaterialGRNDetails,
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
        type: types.GET_WORK_SUBWORK_LIST,
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

    addMaterialPR: params =>
      dispatch({
        type: types.ADD_MATERIAL_PR,
        payload: async () => {
          try {
            const response = _res(await addMaterialPR(params));
            const {data} = response;

            return Promise.resolve(data);
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

    updatePR: params =>
      dispatch({
        type: types.EDIT_PR,
        payload: async () => {
          try {
            const {data, msg} = _res(await updatePR(params));
            snackbar.showMessage({message: msg});

            return Promise.resolve(data);
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

    updatePRStatus: params =>
      dispatch({
        type: types.UPDATE_MODIFY_REQUEST,
        payload: async () => {
          try {
            const response = _res(await updatePRStatus(params));
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
  };
}
