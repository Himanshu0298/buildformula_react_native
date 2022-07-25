import {useDispatch} from 'react-redux';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'hooks/useResponseProcessor';
import useCustomerServices from 'services/customer';
import * as types from './actionTypes';

export default function useCustomerActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {_err, _res} = useResProcessor();
  const {
    getCustomerDetails,
    getBookingDetails,
    cancelBooking,
    deleteBooking,
    addCustomer,
    getBankDetails,
    updateBankDetails,
    updateBankFiles,
    updateModifiedRequestStatus,
    addComment,
    removeBankFile,
    getModifyRequests,
    addModifyRequest,
    getModifyRequest,
    getAccountDetails,
    updateBookingStatus,
    addCollection,
    updateCollection,
    deleteCollection,
    deleteFolder,
    deleteFile,
    getVisitorCustomerList,
    getVisitorCustomerListDetails,
    updateCustomerDetails,
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
    deleteBooking: formData =>
      dispatch({
        type: types.DELETE_BOOKING,
        payload: async () => {
          try {
            const response = _res(await deleteBooking(formData));
            const {data} = response;

            snackbar.showMessage({
              message: 'Delete Booking successfully',
              variant: 'success',
            });

            return Promise.resolve(data);
          } catch (error) {
            const errorMessage = _err(error);
            snackbar.showMessage({message: errorMessage, variant: 'error'});
            return Promise.reject(errorMessage);
          }
        },
      }),
    cancelBooking: formData =>
      dispatch({
        type: types.CANCEL_BOOKING,
        payload: async () => {
          try {
            const response = _res(await cancelBooking(formData));
            const {data} = response;

            snackbar.showMessage({
              message: 'Delete Booking successfully',
              variant: 'success',
            });

            return Promise.resolve(data);
          } catch (error) {
            const errorMessage = _err(error);
            snackbar.showMessage({message: errorMessage, variant: 'error'});
            return Promise.reject(errorMessage);
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
    addComment: params =>
      dispatch({
        type: types.ADD_MODIFY_REQUEST_COMMENT,
        payload: async () => {
          try {
            const {data} = _res(await addComment(params));

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
    deleteFile: params =>
      dispatch({
        type: types.CUSTOMER_DELETE_FILE,
        payload: async () => {
          try {
            const {data, msg} = _res(await deleteFile(params));
            snackbar.showMessage({message: msg});
            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
    deleteFolder: params =>
      dispatch({
        type: types.CUSTOMER_DELETE_FOLDER,
        payload: async () => {
          try {
            const {data, msg} = _res(await deleteFolder(params));
            snackbar.showMessage({message: msg});
            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    // Customer List

    getVisitorCustomerList: params =>
      dispatch({
        type: types.GET_CUSTOMER_LIST,
        payload: async () => {
          try {
            const {data, msg} = _res(await getVisitorCustomerList(params));
            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getVisitorCustomerListDetails: params =>
      dispatch({
        type: types.GET_CUSTOMER_LIST_DETAILS,
        payload: async () => {
          try {
            const {data, msg} = _res(
              await getVisitorCustomerListDetails(params),
            );
            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    updateCustomerDetails: params =>
      dispatch({
        type: types.UPDATE_CUSTOMER_DETAILS,
        payload: async () => {
          try {
            const {data, msg} = _res(await updateCustomerDetails(params));
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
