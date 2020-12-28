import * as types from './actionTypes';
import {useDispatch} from 'react-redux';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'utils/responseProcessor';
import useCustomerServices from 'services/customer';

export default function useCustomerActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {processError, processResponse} = useResProcessor();
  const {getCustomerDetails} = useCustomerServices();

  return {
    getCustomerDetails: (formData) =>
      dispatch({
        type: types.GET_CUSTOMER_DATA,
        payload: async () => {
          try {
            let response = processResponse(await getCustomerDetails(formData));
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            let errorMessage = processError(error);
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
