import React, {FC, useMemo, useState} from 'react';
import DefaultAlert from './Alert';
import AlertContext from './AlertContext';

export type ShowMessageParams = {
  onClose?: () => void;
  onConfirm?: () => void;
};

interface ProviderState extends ShowMessageParams {
  open: boolean;
}

export type AlertContextType = {
  show: (params: ShowMessageParams) => void;
};

const AlertProvider: FC = ({children}) => {
  const [state, setState] = useState<ProviderState>({
    open: false,
    onConfirm: () => {},
  });

  const show = (params: ShowMessageParams) =>
    setState(v => ({...v, ...params, open: true}));

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
