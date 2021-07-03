import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import EditProfile from './EditProfile';

export default props => {
  return (
    <ProjectLayout showLogo={true} tabBar={false}>
      <EditProfile {...props} />
    </ProjectLayout>
  );
};
