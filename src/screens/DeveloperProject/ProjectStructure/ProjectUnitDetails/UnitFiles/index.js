import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import UnitFiles from './UnitFiles';

export default props => {
  return (
    <ProjectLayout {...props}>
      <UnitFiles {...props} />
    </ProjectLayout>
  );
};
