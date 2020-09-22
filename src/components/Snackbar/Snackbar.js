import React from 'react';
import {Snackbar, Colors} from 'react-native-paper';

const VariantProps = {
  success: {
    color: Colors.green700,
  },
  error: {
    color: Colors.red700,
  },
  warning: {
    color: Colors.orange400,
  },
};

function CustomSnackbar({
  open,
  message,
  variant,
  onClose,
  stayOpen,
  isKeyboardShown,
  autoHideDuration,
}) {
  return (
    <Snackbar
      visible={open}
      theme={{
        colors: {
          onSurface: VariantProps[variant].color,
          accent: '#fff',
        },
      }}
      duration={autoHideDuration}
      onDismiss={onClose}
      action={
        stayOpen && {
          label: 'OK',
          onPress: () => onClose(),
        }
      }>
      {message}
    </Snackbar>
  );
}

CustomSnackbar.defaultProps = {
  variant: 'success',
  autoHideDuration: 4000,
  message: 'This is a snackbar',
  open: false,
};

export default CustomSnackbar;
