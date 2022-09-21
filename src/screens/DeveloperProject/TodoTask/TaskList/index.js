import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import TaskList from './TaskList';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <TaskList {...props} />
    </ProjectLayout>
  );
};
