import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text, withTheme} from 'react-native-paper';

function ReviewPanel(props) {
  return (
    <View style={styles.container}>
      <Text>Review</Text>
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

export default withTheme(ReviewPanel);
