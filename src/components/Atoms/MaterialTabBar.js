import React from 'react';
import {StyleSheet} from 'react-native';
import {TabBar} from 'react-native-tab-view';
import {theme} from 'styles/theme';
import BaseText from './BaseText';

export default function MaterialTabBar(props) {
  return (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: theme.colors.primary}}
      style={styles.container}
      renderLabel={({route /* focused, color */}) => (
        <BaseText style={styles.label}>{route.title}</BaseText>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    elevation: 0,
  },
  label: {
    color: '#000',
    margin: 8,
  },
});
