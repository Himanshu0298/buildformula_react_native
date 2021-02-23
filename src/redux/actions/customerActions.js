import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'utils/responseProcessor';
import useCustomerServices from 'services/customer';

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
    removeBankFile,
  } = useCustomerServices();

  return {
    getCustomerDetails: (formData) =>
      dispatch({
        type: types.GET_CUSTOMER_DATA,
        payload: async () => {
          try {
            const response = _res(
              await getCustomerDetails(formData),
            );
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const errorMessage = _err(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),
    getBookingDetails: (params) =>
      dispatch({
        type: types.GET_BOOKING_DATA,
        payload: async () => {
          try {
            const response = _res(await getBookingDetails(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const errorMessage = _err(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),
    getBankDetails: (params) =>
      dispatch({
        type: types.GET_BANK_DETAILS,
        payload: async () => {
          try {
            const response = _res(await getBankDetails(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const errorMessage = _err(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),
    addCustomer: (formData) =>
      dispatch({
        type: types.ADD_CUSTOMER,
        payload: async () => {
          try {
            const response = _res(await addCustomer(formData));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const errorMessage = _err(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),
    updateBankDetails: (formData) =>
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
            const errorMessage = _err(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),
    updateBankFiles: (formData) =>
      dispatch({
        type: types.UPDATE_BANK_FILES,
        payload: async () => {
          try {
            const response = _res(await updateBankFiles(formData));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const errorMessage = _err(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),
    removeBankFile: (params) =>
      dispatch({
        type: types.UPDATE_BANK_FILES,
        payload: async () => {
          try {
            const response = _res(await removeBankFile(params));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            const errorMessage = _err(error);
            snackbar.showMessage({
              message: errorMessage,
              variant: 'error',
            });
            return Promise.reject(errorMessage);
          }
        },
      }),
  };
}
