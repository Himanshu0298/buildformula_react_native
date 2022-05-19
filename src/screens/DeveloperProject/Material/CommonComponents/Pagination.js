import * as React from 'react';
import {withTheme} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';

const Pagination = props => {
  const {title} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
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
