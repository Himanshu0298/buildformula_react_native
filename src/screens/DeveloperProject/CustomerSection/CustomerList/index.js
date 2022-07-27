import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import CustomerList from './CustomerList';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <CustomerList {...props} />
    </ProjectLayout>
  );
};
