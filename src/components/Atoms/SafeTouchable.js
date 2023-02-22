/**
 * @format
 */
import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import debounce from 'lodash.debounce';

const INTERVAL = 1000;

function SafeTouchable(props) {
  const {onPress, children, ...rest} = props;

  const rawClick = debounce(onPress, INTERVAL, {
    leading: true,
    trailing: false,
    maxWait: INTERVAL,
  });

  const debouncedClick = React.useCallback(rawClick, [rawClick]);

  return (
    <TouchableOpacity activeOpacity={0.8} {...rest} onPress={debouncedClick}>
      {children}
    </TouchableOpacity>
  );
}

export {SafeTouchable};
