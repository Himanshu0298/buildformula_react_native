import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddTask from './AddTask';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <AddTask {...props} />
    </ProjectLayout>
  );
};
