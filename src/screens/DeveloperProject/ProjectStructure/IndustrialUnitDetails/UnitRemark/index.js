import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import UnitRemark from './UnitRemark';

export default props => {
  return (
    <ProjectLayout {...props}>
      <UnitRemark {...props} />
    </ProjectLayout>
  );
};
