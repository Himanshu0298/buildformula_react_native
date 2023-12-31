import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text, withTheme} from 'react-native-paper';

function DependencyPanel(props) {
  return (
    <View style={styles.container}>
      <Text>Dependency</Text>
      <IconButton size={20} style={styles.plusButton} icon="plus" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F4F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  plusButton: {
    backgroundColor: '#fff',
  },
});

export default withTheme(DependencyPanel);
