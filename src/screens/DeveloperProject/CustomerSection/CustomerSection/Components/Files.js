import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {FAB, Text} from 'react-native-paper';
import {theme} from 'styles/theme';

function Files() {
  return (
    <ScrollView>
      <View>
        <Text>Files!</Text>
        <FAB
          style={[styles.fab, {backgroundColor: theme.colors.primary}]}
          icon="plus"
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 10,
    bottom: 2,
    zIndex: 2,
  },
});

export default Files;
