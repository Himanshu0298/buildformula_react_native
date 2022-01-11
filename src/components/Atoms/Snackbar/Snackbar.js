import React, {useEffect, useState} from 'react';
import {Snackbar, Colors} from 'react-native-paper';
import {Keyboard} from 'react-native';

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

function CustomSnackbar(props) {
  const {open, message, variant, onClose, stayOpen, autoHideDuration} = props;
  const [margin, setMargin] = useState(8);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  });

  const _keyboardDidShow = e => setMargin(e.endCoordinates.height + 30);

  const _keyboardDidHide = () => setMargin(8);

  return (
    <Snackbar
      visible={open}
      theme={{
        colors: {
          onSurface: VariantProps[variant].color,
          accent: '#fff',
        },
      }}
      style={{marginBottom: margin}}
      duration={autoHideDuration}
      onDismiss={onClose}
      action={
        stayOpen
          ? {
              label: 'OK',
              onPress: () => onClose(),
            }
          : undefined
      }
    >
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
