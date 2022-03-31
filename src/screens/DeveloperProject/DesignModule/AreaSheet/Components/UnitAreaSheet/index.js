import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import UnitSheet from './UnitSheet';

export default props => {
  return (
    <ProjectLayout {...props} header={false}>
      <UnitSheet {...props} />
    </ProjectLayout>
  );
};
