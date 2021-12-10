import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import EditProfile from './EditProfile';

export default props => {
  return (
    <ProjectLayout {...props} showLogo tab={false}>
      <EditProfile {...props} />
    </ProjectLayout>
  );
};
