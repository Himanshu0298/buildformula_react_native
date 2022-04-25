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
      setState(() => ({...DEFAULT_STATE, ...params, open: true}));

      const {name, link: downloadLink, onSuccess} = params;

      const {dir} = await downloadFile(name, downloadLink);

      setState(v => ({
        ...v,
        message: 'Download Completed!',
        variant: 'success',
        action: {
          label: 'Open',
          onPress: () => {
            onSuccess(dir);
            handleClose();
          },
        },
      }));
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
