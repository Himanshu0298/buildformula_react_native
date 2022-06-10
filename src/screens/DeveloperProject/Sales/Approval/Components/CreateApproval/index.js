import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import CreateApproval from './CreateApproval';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <CreateApproval {...props} />
    </ProjectLayout>
  );
};
