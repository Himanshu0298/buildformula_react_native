import {useDispatch} from 'react-redux';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'utils/responseProcessor';
import useCustomerServices from 'services/customer';
import * as types from './actionTypes';

export default function useCustomerActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {_err, _res} = useResProcessor();
  const {
    getCustomerDetails,
    getBookingDetails,
    addCustomer,
    getBankDetails,
    updateBankDetails,
    updateBankFiles,
    updateModifiedRequestStatus,
    removeBankFile,
    getModifyRequests,
    addModifyRequest,
    getModifyRequest,
    getAccountDetails,
    updateBookingStatus,
    addCollection,
    updateCollection,
    deleteCollection,
  } = useCustomerServices();

  return {
    getCustomerDetails: formData =>
      dispatch({
        type: types.GET_CUSTOMER_DATA,
        payload: async () => {
          try {
            const response = _res(await getCustomerDetails(formData));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getBookingDetails: params =>
      dispatch({
        type: types.GET_BOOKING_DATA,
        payload: async () => {
          try {
            const response = _res(await getBookingDetails(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getBankDetails: params =>
      dispatch({
        type: types.GET_BANK_DETAILS,
        payload: async () => {
          try {
            const response = _res(await getBankDetails(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addCustomer: formData =>
      dispatch({
        type: types.ADD_CUSTOMER,
        payload: async () => {
          try {
            const response = _res(await addCustomer(formData));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateBankDetails: formData =>
      dispatch({
        type: types.UPDATE_BANK_DETAILS,
        payload: async () => {
          try {
            const response = _res(await updateBankDetails(formData));
            const {data} = response;

            snackbar.showMessage({
              message: 'Bank details updated!',
              variant: 'success',
            });

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateBankFiles: formData =>
      dispatch({
        type: types.UPDATE_BANK_FILES,
        payload: async () => {
          try {
            const response = _res(await updateBankFiles(formData));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updateModifiedRequestStatus: formData =>
      dispatch({
        type: types.UPDATE_MODIFY_REQUEST,
        payload: async () => {
          try {
            const response = _res(await updateModifiedRequestStatus(formData));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    removeBankFile: params =>
      dispatch({
        type: types.UPDATE_BANK_FILES,
        payload: async () => {
          try {
            const response = _res(await removeBankFile(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getModifyRequests: params =>
      dispatch({
        type: types.GET_MODIFY_REQUESTS,
        payload: async () => {
          try {
            const {data} = _res(await getModifyRequests(params));

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    addModifyRequest: params =>
      dispatch({
        type: types.ADD_MODIFY_REQUEST,
        payload: async () => {
          try {
            const {data} = _res(await addModifyRequest(params));

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    getModifyRequestDetails: params =>
      dispatch({
        type: types.GET_MODIFY_REQUEST,
        payload: async () => {
          try {
            const {data} = _res(await getModifyRequest(params));

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getAccountDetails: params =>
      dispatch({
        type: types.GET_ACCOUNT_DETAILS,
        payload: async () => {
          try {
            const {data} = _res(await getAccountDetails(params));

            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updateBookingStatus: params =>
      dispatch({
        type: types.UPDATE_BOOKING_STATUS,
        payload: async () => {
          try {
            const {data, msg} = _res(await updateBookingStatus(params));
            snackbar.showMessage({message: msg});
            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    addCollection: params =>
      dispatch({
        type: types.ADD_COLLECTION,
        payload: async () => {
          try {
            const {data, msg} = _res(await addCollection(params));
            snackbar.showMessage({message: msg});
            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    updateCollection: params =>
      dispatch({
        type: types.UPDATE_COLLECTION,
        payload: async () => {
          try {
            const {data, msg} = _res(await updateCollection(params));
            snackbar.showMessage({message: msg});
            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteCollection: params =>
      dispatch({
        type: types.DELETE_COLLECTION,
        payload: async () => {
          try {
            const {data, msg} = _res(await deleteCollection(params));
            snackbar.showMessage({message: msg});
            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
  };
}
