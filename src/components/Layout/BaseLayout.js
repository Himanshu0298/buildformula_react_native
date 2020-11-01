import React from 'react';
import CustomTabBar from './CustomTabBar';

export default function BaseLayout({children}) {
  return (
    <>
      {children}
      <CustomTabBar />
    </>
  );
}
