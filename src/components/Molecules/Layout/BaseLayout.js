import React from 'react';
import BottomAppBar from './BottomAppBar';
import {View} from 'react-native';

export default function BaseLayout({children, tabBar = true}) {
  return (
    <>
      <View style={{flexGrow: 1}}>{children}</View>
      {tabBar ? <BottomAppBar /> : null}
    </>
  );
}
