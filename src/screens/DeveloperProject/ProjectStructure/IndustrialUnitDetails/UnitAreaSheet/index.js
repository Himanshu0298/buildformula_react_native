import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import UnitAreaSheet from './UnitAreaSheet';

export default props => {
  return (
    <ProjectLayout {...props}>
      <UnitAreaSheet {...props} />
    </ProjectLayout>
  );
};
