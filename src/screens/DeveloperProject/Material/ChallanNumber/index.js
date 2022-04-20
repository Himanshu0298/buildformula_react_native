import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import ChallanNumber from './ChallanNumber';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <ChallanNumber {...props} />
    </ProjectLayout>
  );
};
