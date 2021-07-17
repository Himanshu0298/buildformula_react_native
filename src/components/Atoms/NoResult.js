import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

function NoResult({title, style}) {
  return (
    <View style={[styles.container, style]}>
      <Text>{title || 'No data found'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NoResult;
