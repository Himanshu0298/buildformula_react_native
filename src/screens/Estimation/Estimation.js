import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';

export default function Estimation(props) {

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#eaeff1" /> */}
      <Text>Estimation</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeff1',
  },
});
