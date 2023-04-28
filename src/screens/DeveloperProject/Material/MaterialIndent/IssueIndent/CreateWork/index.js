import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import CreateWork from './createWork';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <CreateWork {...props} />
    </ProjectLayout>
  );
};
