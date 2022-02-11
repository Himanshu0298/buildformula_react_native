import React, {useCallback, useMemo, useState} from 'react';
import SnackbarContext from './SnackbarContext';
import DefaultSnackbar from './Snackbar';

function SnackbarProvider({children}) {
  const [state, setState] = useState({
    open: false,
    message: '',
    variant: 'success',
    autoHideDuration: 2500,
  });

  const showMessage = useCallback(
    params => setState(v => ({...v, ...params, open: true})),
    [],
  );

  const handleClose = () => {
    const {onClose} = state;
    setState(v => ({...v, open: false}));
    onClose?.();
  };

  const context = useMemo(() => ({showMessage}), [showMessage]);

  return (
    <>
      <SnackbarContext.Provider value={context}>
        {children}
      </SnackbarContext.Provider>
      <DefaultSnackbar
        open={state.open}
        message={state.message}
        variant={state.variant}
        onClose={handleClose}
        stayOpen={Boolean(state.onClose)}
        autoHideDuration={state.autoHideDuration}
      />
    </>
  );
}

export default SnackbarProvider;
