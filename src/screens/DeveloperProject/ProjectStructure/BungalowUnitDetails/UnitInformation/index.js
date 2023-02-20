import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import ProjectStructureUnitDetails from './UnitInformation';

export default props => {
  return (
    <ProjectLayout {...props}>
      <ProjectStructureUnitDetails {...props} />
    </ProjectLayout>
  );
};
