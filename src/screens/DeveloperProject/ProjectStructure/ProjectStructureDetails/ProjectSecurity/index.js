import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import ProjectSecurity from './ProjectSecurity';

export default props => {
  return (
    <ProjectLayout {...props}>
      <ProjectSecurity {...props} />
    </ProjectLayout>
  );
};
