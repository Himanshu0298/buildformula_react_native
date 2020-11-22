import React from 'react';
import {StyleSheet, View} from 'react-native';
import BaseText from './BaseText';

export default function CustomBadge({color, style, label, labelStyles}) {
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: color,
        },
        style,
      ]}>
      {label ? (
        <BaseText style={[styles.badgeLabel, labelStyles]}>{label}</BaseText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLabel: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 10,
    borderRadius: 10,
  },
});
