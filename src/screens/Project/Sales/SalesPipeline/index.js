import React from 'react';
import ProjectLayout from 'components/Layout/ProjectLayout';
import SalesPipeline from './SalesPipeline';

export default (props) => {
  return (
    <ProjectLayout>
      <SalesPipeline {...props} />
    </ProjectLayout>
  );
};
