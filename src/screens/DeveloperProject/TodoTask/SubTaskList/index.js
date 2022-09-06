import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import SubTaskList from './subTaskList';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <SubTaskList {...props} />
    </ProjectLayout>
  );
};
