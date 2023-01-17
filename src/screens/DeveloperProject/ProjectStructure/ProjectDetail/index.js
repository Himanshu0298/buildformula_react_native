import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import ProjectDetail from './ProjectDetail';

export default props => {
  return (
    <ProjectLayout {...props}>
      <ProjectDetail {...props} />
    </ProjectLayout>
  );
};
