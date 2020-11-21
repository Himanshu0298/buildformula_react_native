import React, {useEffect, useState} from 'react';
import {TabBar} from 'react-native-tab-view';
import {theme} from '../styles/theme';
import BaseText from './BaseText';

export default function MaterialTabBar(props) {
  return (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: theme.colors.primary}}
      style={{backgroundColor: '#fff', elevation: 0}}
      renderLabel={({route, focused, color}) => (
        <BaseText style={{color: '#000', margin: 8}}>{route.title}</BaseText>
      )}
    />
  );
}
