import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import EditCustomerDetails from './EditCustomerDetails';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <EditCustomerDetails {...props} />
    </ProjectLayout>
  );
};
