import useAppActions from '../redux/actions/appActions';

export function useResProcessor() {
  const {logout} = useAppActions();

  return {
    _err: error => {
      console.log('-----> error', error);
      const {response} = error;
      let errorMessage;
      if (response) {
        errorMessage = response?.data?.msg;
      }

      errorMessage = errorMessage || error.message;

      if (typeof errorMessage !== 'string') {
        if (typeof errorMessage === 'object') {
          errorMessage = Object.values(errorMessage)[0];
        }
      }

      if (errorMessage === 'Token is Expired') {
        logout();
      }

      console.log('-----> errorMessage', errorMessage);
      return errorMessage;
    },

    _res: response => {
      const {data} = response;

      // TODO: revert this temp fix
      // if (data.status) {
      return data;
      // } else {
      //   throw {response};
      // }
    },
  };
}
