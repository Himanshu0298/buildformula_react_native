import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function ProjectDashboard(props) {
  return (
    <View style={styles.container}>
      <Text>Project Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeff1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
