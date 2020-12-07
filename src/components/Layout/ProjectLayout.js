import React from 'react';
import {View} from 'react-native';
import CustomTabBar from './CustomTabBar';
import ProjectHeader from './ProjectHeader';

export default function ProjectLayout({header = true, tab = true, children}) {
  return (
    <View style={{flex: 1}}>
      {header ? <ProjectHeader /> : null}
      <View style={{flex: 1, flexGrow: 1}}>{children}</View>
      {tab ? <CustomTabBar /> : null}
    </View>
  );
}
