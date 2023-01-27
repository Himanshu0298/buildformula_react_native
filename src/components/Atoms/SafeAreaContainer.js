/**
 * @format
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function SafeAreaContainer(props) {
  const {children, style, ...rest} = props;
  return (
    <SafeAreaView
      edges={['bottom']}
      {...rest}
      style={[styles.safeAreaView, style]}>
      {children}
    </SafeAreaView>
  );
}

SafeAreaContainer.defaultProps = {
  style: undefined,
};

const styles = StyleSheet.create({
  safeAreaView: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
});

export {SafeAreaContainer};
