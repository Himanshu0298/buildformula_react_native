import {useDispatch} from 'react-redux';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'hooks/useResponseProcessor';
import useMaterialManagement from 'services/materialManagement';
import * as types from './actionTypes';

export default function useMaterialManagementActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {_err, _res} = useResProcessor();
  const {getMaterialOrderList, getMaterialChallanList} =
    useMaterialManagement();

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
  };
}
