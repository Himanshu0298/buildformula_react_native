import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import ProjectDetails from './ProjectDetails';

export default props => {
  return (
    <ProjectLayout {...props} showLogo header>
      <ProjectDetails {...props} />
    </ProjectLayout>
  );
};
