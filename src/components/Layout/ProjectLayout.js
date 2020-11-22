import React from 'react';
import {View} from 'react-native';
import {APP_BOTTOM_TAB_HEIGHT} from 'utils/constant';
import CustomTabBar from './CustomTabBar';
import ProjectHeader from './ProjectHeader';

export default function ProjectLayout({header = true, tab = true, children}) {
  return (
    <>
      {header ? <ProjectHeader /> : null}
      <View
        style={{flex: 1, paddingBottom: tab ? APP_BOTTOM_TAB_HEIGHT : null}}>
        {children}
      </View>
      {tab ? <CustomTabBar /> : null}
    </>
  );
}
