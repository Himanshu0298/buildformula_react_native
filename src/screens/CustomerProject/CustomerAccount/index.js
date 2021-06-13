import React from 'react';
import CustomerAccount from './CustomerAccount';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';

export default props => {
  return (
    <ProjectLayout>
      <CustomerAccount {...props} />
    </ProjectLayout>
  );
};
