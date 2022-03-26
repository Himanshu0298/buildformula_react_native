import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {KEYBOARD_HIDE, KEYBOARD_SHOW} from 'utils/constant';

const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const show = Keyboard.addListener(KEYBOARD_SHOW, keyboardDidShow);
    const hide = Keyboard.addListener(KEYBOARD_HIDE, keyboardDidHide);

    // cleanup function
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const keyboardDidShow = frames => {
    setKeyboardHeight(frames.endCoordinates.height);
  };

  const keyboardDidHide = () => setKeyboardHeight(0);

  return keyboardHeight;
};

export default useKeyboardHeight;
