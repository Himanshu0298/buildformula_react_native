import * as React from 'react';
import {View} from 'react-native';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import {secondaryTheme, theme} from 'styles/theme';
import PropTypes from 'prop-types';

const CustomAlert = (props) => {
  const {
    open,
    handleClose,
    handleConfirm,
    title,
    content,
    message,
    cancelText,
    confirmText,
    cancelButtonColor,
    confirmButtonColor,
    showCancelButton,
    showConfirmButton,
    ...dialogProps
  } = props;
  return (
    <View>
      <Portal>
        <Dialog visible={open} onDismiss={handleClose} {...dialogProps}>
          {title ? <Dialog.Title>{title}</Dialog.Title> : null}
          <Dialog.Content>
            {content ? content : <Paragraph>{message}</Paragraph>}
          </Dialog.Content>
          <Dialog.Actions>
            {showCancelButton ? (
              <Button color={cancelButtonColor} onPress={handleClose}>
                {cancelText}
              </Button>
            ) : null}
            {showConfirmButton ? (
              <Button
                style={{minWidth: 80}}
                color={confirmButtonColor}
                onPress={handleConfirm}>
                {confirmText}
              </Button>
            ) : null}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

CustomAlert.propTypes = {
  open: PropTypes.bool,
  showProgress: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  message: PropTypes.string,
  dismissable: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  cancelButtonColor: PropTypes.string,
  confirmButtonColor: PropTypes.string,
  handleClose: PropTypes.func,
  handleConfirm: PropTypes.func,
};

CustomAlert.defaultProps = {
  open: false,
  showProgress: false,
  dismissable: false,
  showCancelButton: true,
  showConfirmButton: true,
  title: 'Alert',
  message: 'This is simple dialog',
  cancelText: 'Cancel',
  confirmText: 'Ok',
  cancelButtonColor: theme.colors.error,
  confirmButtonColor: theme.colors.primary,
};

export default CustomAlert;
