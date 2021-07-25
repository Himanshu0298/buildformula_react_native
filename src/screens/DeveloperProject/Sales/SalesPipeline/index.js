import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import SalesPipeline from './SalesPipeline';

export default props => {
  return (
    <ProjectLayout {...props}>
      <SalesPipeline {...props} />
    </ProjectLayout>
  );
};
