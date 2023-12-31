import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Search from './Search';

export default props => {
  return (
    <ProjectLayout {...props} showLogo tab={false}>
      <Search {...props} />
    </ProjectLayout>
  );
};
