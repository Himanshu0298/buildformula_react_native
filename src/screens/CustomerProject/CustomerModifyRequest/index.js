import React from 'react';
import CustomerModifyRequest from './CustomerModifyRequest';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';

export default props => {
  return (
    <ProjectLayout {...props}>
      <CustomerModifyRequest {...props} />
    </ProjectLayout>
  );
};
