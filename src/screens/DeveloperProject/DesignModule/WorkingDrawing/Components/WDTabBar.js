import BaseText from 'components/Atoms/BaseText';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {TabBar} from 'react-native-tab-view';

export default function WDTabBar(props) {
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
    backgroundColor: '#EFEFEF',
    elevation: 0,
  },
  label: {
    fontSize: 15,
  },
});
