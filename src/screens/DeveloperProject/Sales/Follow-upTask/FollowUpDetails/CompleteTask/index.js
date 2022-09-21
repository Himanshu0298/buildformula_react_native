import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import React from 'react';
import CompleteTask from './CompleteTask';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <CompleteTask {...props} />
    </ProjectLayout>
  );
};
