import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import CustomerAccount from './CustomerAccount';

export default props => {
  return (
    <ProjectLayout {...props}>
      <CustomerAccount {...props} />
    </ProjectLayout>
  );
};
