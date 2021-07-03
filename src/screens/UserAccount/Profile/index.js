import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Profile from './Profile';

export default props => {
  return (
    <ProjectLayout showLogo={true} tabBar={false}>
      <Profile {...props} />
    </ProjectLayout>
  );
};
