import useAppActions from '../redux/actions/appActions';

export function useResProcessor() {
  const {logout} = useAppActions();

  return {
    processError: (error) => {
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

    processResponse: (response) => {
      const {data} = response;

      if (data.status) {
        return data;
      } else {
        throw {response};
      }
    },
  };
}
