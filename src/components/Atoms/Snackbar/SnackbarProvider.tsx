import React, {FC, useMemo, useState} from 'react';
import SnackbarContext from './SnackbarContext';
import DefaultSnackbar from './Snackbar';

export type VariantTypes = 'success' | 'warning' | 'error';

export type ShowMessageParams = {
  message: string;
  variant?: VariantTypes;
  autoHideDuration?: number;
  onClose?: () => void;
};

interface ProviderState extends ShowMessageParams {
  open: boolean;
}

export type SnackBarContextType = {
  showMessage: (params: ShowMessageParams) => void;
};

const SnackbarProvider: FC = ({children}) => {
  const [state, setState] = useState<ProviderState>({
    open: false,
    message: '',
    variant: 'success',
    autoHideDuration: 2500,
  });

  const showMessage = (params: ShowMessageParams) =>
    setState(v => ({...v, ...params, open: true}));

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
};

export default SnackbarProvider;
