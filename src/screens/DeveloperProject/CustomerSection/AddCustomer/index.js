import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddCustomer from './AddCustomer';

export default props => {
  return (
    <ProjectLayout {...props}>
      <AddCustomer {...props} />
    </ProjectLayout>
  );
};
