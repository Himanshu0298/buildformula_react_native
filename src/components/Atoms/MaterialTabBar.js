import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {TabBar} from 'react-native-tab-view';
import BaseText from './BaseText';

export default function MaterialTabBar(props) {
  const {colors} = useTheme();
  return (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: colors.primary,
      }}
      style={styles.container}
      renderLabel={({route, focused}) => (
        <BaseText
          style={[styles.label, focused ? {color: colors.primary} : {}]}>
          {route.title}
        </BaseText>
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
    margin: 8,
    fontSize: 15,
  },
});
