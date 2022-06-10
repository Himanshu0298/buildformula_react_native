import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Approval from './Approval';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <Approval {...props} />
    </ProjectLayout>
  );
};
