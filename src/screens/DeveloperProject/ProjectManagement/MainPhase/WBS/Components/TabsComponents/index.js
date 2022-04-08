import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Execution from './Execution';

export default props => {
  return (
    <ProjectLayout {...props} header={false}>
      <Execution {...props} />
    </ProjectLayout>
  );
};
