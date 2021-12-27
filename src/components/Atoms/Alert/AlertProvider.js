import React, {useCallback, useMemo, useState} from 'react';
import DefaultAlert from './Alert';
import AlertContext from './AlertContext';

const AlertProvider = ({children}) => {
  const [state, setState] = useState({open: false});

  const show = useCallback(
    params => setState(v => ({...v, ...params, open: true})),
    [],
  );

  const handleClose = () => {
    const {onClose} = state;
    setState(v => ({...v, open: false}));
    onClose?.();
  };

  const handleConfirm = () => {
    const {onConfirm} = state;
    setState(v => ({...v, open: false}));
    onConfirm?.();
  };

  const context = useMemo(() => ({show}), [show]);

  return (
    <>
      <AlertContext.Provider value={context}>{children}</AlertContext.Provider>
      <DefaultAlert
        open={state.open}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </>
  );
};

export default AlertProvider;
