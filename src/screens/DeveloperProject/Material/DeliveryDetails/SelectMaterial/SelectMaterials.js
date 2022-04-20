import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {withTheme} from 'react-native-paper';

function SelectMaterials(props) {
  return (
    <View style={styles.actionContainer}>
      <Text>Select Materials</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    margin: 15,
  },
});

export default withTheme(SelectMaterials);
