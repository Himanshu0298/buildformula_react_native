import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import WorkMaster from './WorkMaster';

export default props => {
  return (
    <ProjectLayout {...props} header={false}>
      <WorkMaster {...props} />
    </ProjectLayout>
  );
};
