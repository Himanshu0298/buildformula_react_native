import React from 'react';
import CustomTabBar from './CustomTabBar';
import ProjectHeader from './ProjectHeader';

export default function ProjectLayout({header = true, children}) {
  return (
    <>
      {header ? <ProjectHeader /> : null}
      {children}
      <CustomTabBar />
    </>
  );
}
