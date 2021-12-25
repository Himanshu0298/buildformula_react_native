import React, { useEffect, useState } from "react";
import { Snackbar, Colors } from "react-native-paper";
import { Keyboard, KeyboardEvent } from "react-native";
import { VariantTypes } from "./SnackbarProvider";

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

type IProps = {
  open: boolean;
  message: string;
  variant: VariantTypes;
  stayOpen: boolean;
  autoHideDuration: number;
  onClose: () => void;
};

function CustomSnackbar(props: IProps) {
  const { open, message, variant, onClose, stayOpen, autoHideDuration } = props;
  const [margin, setMargin] = useState(8);

  useEffect(() => {
    _componentDidMount();
    () => _componentWillUnmount();
  });

  const _componentDidMount = () => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
  };

  const _componentWillUnmount = () => {
    Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
  };

  const _keyboardDidShow = (e: KeyboardEvent) =>
    setMargin(e.endCoordinates.height + 30);

  const _keyboardDidHide = () => setMargin(8);

  return (
    <Snackbar
      visible={open}
      theme={{
        colors: {
          onSurface: VariantProps[variant].color,
          accent: "#fff",
        },
      }}
      style={{ marginBottom: margin }}
      duration={autoHideDuration}
      onDismiss={onClose}
      action={
        stayOpen
          ? {
              label: "OK",
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
  variant: "success",
  autoHideDuration: 4000,
  message: "This is a snackbar",
  open: false,
};

export default CustomSnackbar;
