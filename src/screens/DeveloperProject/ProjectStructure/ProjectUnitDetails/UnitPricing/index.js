import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import UnitPricing from './UnitPricing';

export default props => {
  return (
    <ProjectLayout {...props}>
      <UnitPricing {...props} />
    </ProjectLayout>
  );
};
