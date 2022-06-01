import React, {useCallback, useMemo, useState} from 'react';
import {downloadFile} from 'utils/download';
import DownloadContext from './DownloadContext';
import DownloadPrompt from './Download';

const DEFAULT_STATE = {
  open: false,
  message: 'Preparing your download...',
  link: '',
  variant: 'warning',
  action: undefined,
};

function DownloadProvider({children}) {
  const [state, setState] = useState({...DEFAULT_STATE});

  const link = useCallback(
    async params => {
      const {
        name,
        base64,
        data,
        showAction,
        link: downloadLink,
        onFinish,
        onAction,
      } = params;

      try {
        setState(() => ({...DEFAULT_STATE, ...params, open: true}));

        const result = await downloadFile({name, downloadLink, base64, data});

        onFinish?.(result);

        let action;
        if (showAction) {
          action = {
            label: 'Open',
            onPress: () => {
              onAction?.(result);
              handleClose();
            },
          };

          setState(v => ({
            ...v,
            message: 'Download Completed!',
            variant: 'success',
            action,
            duration: showAction ? 4000 : undefined,
          }));
        } else {
          handleClose();
        }
      } catch (err) {
        console.log('-----> err', err);

        onFinish?.({});

        setState(v => ({
          ...v,
          message: 'Download Failed!',
          variant: 'error',
          duration: 3000,
        }));
      }
    },
    [handleClose],
  );

  const handleClose = useCallback(() => {
    const {onClose} = state;
    setState(() => ({...DEFAULT_STATE}));
    onClose?.();
  }, [state]);

  const context = useMemo(() => ({link}), [link]);

  return (
    <>
      <DownloadContext.Provider value={context}>
        {children}
      </DownloadContext.Provider>
      <DownloadPrompt {...state} onClose={handleClose} />
    </>
  );
}

export default DownloadProvider;