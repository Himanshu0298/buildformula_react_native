import React from 'react';
import {string} from 'prop-types';
import {Caption} from 'react-native-paper';
import {secondaryTheme} from 'styles/theme';
import {StyleSheet, View} from 'react-native';

function EmptyColumn({emptyText}) {
  return (
    <View style={styles.container}>
      <Caption>{emptyText}</Caption>
    </View>
  );
}

EmptyColumn.defaultProps = {
  emptyText: 'No items',
};

EmptyColumn.propTypes = {
  emptyText: string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
});

export default EmptyColumn;
