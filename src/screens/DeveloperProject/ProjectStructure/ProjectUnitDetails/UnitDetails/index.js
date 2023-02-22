import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import UnitDetails from './UnitDetails';

export default props => {
  return (
    <ProjectLayout {...props}>
      <UnitDetails {...props} />
    </ProjectLayout>
  );
};
