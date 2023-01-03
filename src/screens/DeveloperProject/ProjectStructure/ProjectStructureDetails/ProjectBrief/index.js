import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import ProjectBrief from './ProjectBrief';

export default props => {
  return (
    <ProjectLayout {...props}>
      <ProjectBrief {...props} />
    </ProjectLayout>
  );
};
