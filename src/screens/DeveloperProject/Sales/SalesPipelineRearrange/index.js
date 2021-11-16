import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import SalesPipelineRearrange from './SalesPipelineRearrange';

export default props => {
  return (
    <ProjectLayout {...props}>
      <SalesPipelineRearrange {...props} />
    </ProjectLayout>
  );
};
