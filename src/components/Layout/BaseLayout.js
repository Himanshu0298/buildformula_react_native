import React from 'react';
import CustomTabBar from './CustomTabBar';
import {View} from 'react-native';
import {APP_BOTTOM_TAB_HEIGHT} from 'utils/constant';

export default function BaseLayout({children, tabBar = true}) {
  return (
    <>
      <View
        style={{flex: 1, paddingBottom: tabBar ? APP_BOTTOM_TAB_HEIGHT : null}}>
        {children}
      </View>
      {tabBar ? <CustomTabBar /> : null}
    </>
  );
}
