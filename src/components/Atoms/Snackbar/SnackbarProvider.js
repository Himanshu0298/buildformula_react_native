import React, {useCallback, useMemo, useState} from 'react';
import SnackbarContext from './SnackbarContext';
import DefaultSnackbar from './Snackbar';

const DEFAULT_STATE = {
  open: false,
  message: '',
  variant: 'success',
  autoHideDuration: 2500,
};

function SnackbarProvider({children}) {
  const [state, setState] = useState({...DEFAULT_STATE});

  const showMessage = useCallback(
    params => setState(v => ({...v, ...params, open: true})),
    [],
  );

  const handleClose = () => {
    const {onClose} = state;
    setState(() => ({...DEFAULT_STATE, open: false}));
    onClose?.();
  };

  const context = useMemo(() => ({showMessage}), [showMessage]);

  return (
    <>
      <SnackbarContext.Provider value={context}>
        {children}
      </SnackbarContext.Provider>
      <DefaultSnackbar
        {...state}
        onClose={handleClose}
        stayOpen={Boolean(state.onClose)}
      />
    </>
  );
}

export default SnackbarProvider;
