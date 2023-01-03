import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import React from 'react';
import AddProject from './AddProject';

export default props => {
  return (
    <ProjectLayout {...props}>
      <AddProject {...props} />
    </ProjectLayout>
  );
};
