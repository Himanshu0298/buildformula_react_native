/**
 * @format
 */
import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import debounce from 'lodash.debounce';

const INTERVAL = 500;

function SafeTouchable(props) {
  const {onPress, children, ...rest} = props;
  const handlePress = e => onPress?.(e);

  const debouncedClick = debounce(e => handlePress(e), INTERVAL, {
    leading: true,
    trailing: false,
    maxWait: INTERVAL,
  });

  const handleDebouncePress = e => debouncedClick(e);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...rest}
      onPress={handleDebouncePress}>
      {children}
    </TouchableOpacity>
  );
}

export {SafeTouchable};
