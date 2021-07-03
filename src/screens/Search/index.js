import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Search from './Search';

export default props => {
  return (
    <ProjectLayout showLogo={true} tabBar={false}>
      <Search {...props} />
    </ProjectLayout>
  );
};
