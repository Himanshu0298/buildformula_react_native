import * as React from 'react';
import {withTheme} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';

const Pagination = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Page 1 of 3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'blue',
  },
  text: {
    padding: 5,
    color: '#000',
  },
});

export default withTheme(Pagination);
