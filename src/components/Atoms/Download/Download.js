import React from 'react';
import {Colors, Snackbar} from 'react-native-paper';

const VariantProps = {
  success: {color: Colors.green700},
  error: {color: Colors.red700},
  warning: {color: Colors.orange400},
};

function DownloadPrompt(props) {
  const {open, message, onClose, variant, action} = props;

  return (
    <Snackbar
      visible={open}
      theme={{colors: {onSurface: VariantProps[variant].color, accent: '#fff'}}}
      onDismiss={onClose}
      duration={100000}
      action={action}>
      {message}
    </Snackbar>
  );
}

DownloadPrompt.defaultProps = {
  message: 'This is a snackbar',
  open: false,
  variant: 'warning',
};

export default DownloadPrompt;
