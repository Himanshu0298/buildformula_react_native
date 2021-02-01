import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FAB, Subheading, withTheme} from 'react-native-paper';

function Milestone(props) {
  const {navigation, theme} = props;
  return (
    <View style={styles.container}>
      <FAB
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        icon="plus"
        onPress={() => console.log('-----> FAB')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 20,
  },
});

export default withTheme(Milestone);
