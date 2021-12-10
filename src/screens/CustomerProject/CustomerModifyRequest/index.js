import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import CustomerModifyRequest from './CustomerModifyRequest';

export default props => {
  return (
    <ProjectLayout {...props}>
      <CustomerModifyRequest {...props} />
    </ProjectLayout>
  );
};
