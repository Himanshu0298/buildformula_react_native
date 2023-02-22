import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import InfrastructureInfo from './InfrastructureInfo';

export default props => {
  return (
    <ProjectLayout {...props}>
      <InfrastructureInfo {...props} />
    </ProjectLayout>
  );
};
