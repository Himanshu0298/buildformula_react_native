import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import UnitList from './UnitList';

export default props => {
  return (
    <ProjectLayout {...props}>
      <UnitList {...props} />
    </ProjectLayout>
  );
};
