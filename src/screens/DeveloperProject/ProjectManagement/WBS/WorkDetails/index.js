import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Execution from './WorkDetails';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <Execution {...props} />
    </ProjectLayout>
  );
};
