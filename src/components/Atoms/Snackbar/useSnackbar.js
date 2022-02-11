import React from 'react';
import SnackbarContext from './SnackbarContext';

const useSnackbar = () => React.useContext(SnackbarContext);

export default useSnackbar;
