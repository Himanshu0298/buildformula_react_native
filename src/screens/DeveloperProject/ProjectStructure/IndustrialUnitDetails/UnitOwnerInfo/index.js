import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import ProjectUnitOwner from './UnitOwnerInfo';

export default props => {
  return (
    <ProjectLayout {...props}>
      <ProjectUnitOwner {...props} />
    </ProjectLayout>
  );
};
