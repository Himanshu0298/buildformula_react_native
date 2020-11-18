import React from 'react';
import CustomTabBar from './CustomTabBar';

export default function BaseLayout({children, tabBar = true}) {
  return (
    <>
      {children}
      {tabBar ? <CustomTabBar /> : null}
    </>
  );
}
