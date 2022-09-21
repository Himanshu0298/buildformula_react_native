import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import TaskDetails from './TaskDetails';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <TaskDetails {...props} />
    </ProjectLayout>
  );
};
