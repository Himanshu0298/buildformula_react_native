import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import ProjectOwner from './ProjectOwner';

export default props => {
  return (
    <ProjectLayout {...props}>
      <ProjectOwner {...props} />
    </ProjectLayout>
  );
};
