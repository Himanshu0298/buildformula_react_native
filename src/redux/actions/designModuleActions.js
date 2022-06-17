import {useDispatch} from 'react-redux';
import {useResProcessor} from 'hooks/useResponseProcessor';
import {useSnackbar} from 'components/Atoms/Snackbar';
import useDesignModule from 'services/designModule';
import * as types from './actionTypes';

export default function useDesignModuleActions() {
  const dispatch = useDispatch();
  const {getRDFolders, getRDFiles} = useDesignModule();
  const {_err, _res} = useResProcessor();
  const snackbar = useSnackbar();

  return {
    getRDFolders: params =>
      dispatch({
        type: types.GET_RD_FOLDERS,
        payload: async () => {
          try {
            const res = _res(await getRDFolders(params));

            return Promise.resolve({data: res.data, index_of: params.index_of});
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    getRDFiles: params =>
      dispatch({
        type: types.GET_RD_FILES,
        payload: async () => {
          try {
            const res = _res(await getRDFiles(params));
            return Promise.resolve({
              data: res.data,
              folder_id: params.folder_id,
            });
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
  };
}
