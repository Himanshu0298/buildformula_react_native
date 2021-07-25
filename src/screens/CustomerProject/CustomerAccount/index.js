import React from 'react';
import CustomerAccount from './CustomerAccount';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';

export default props => {
  return (
    <ProjectLayout {...props} >
      <CustomerAccount {...props} />
    </ProjectLayout>
  );
};
