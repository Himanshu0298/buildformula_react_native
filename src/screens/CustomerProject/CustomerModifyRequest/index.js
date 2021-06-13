import React from 'react';
import CustomerModifyRequest from './CustomerModifyRequest';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';

export default props => {
  return (
    <ProjectLayout>
      <CustomerModifyRequest {...props} />
    </ProjectLayout>
  );
};
