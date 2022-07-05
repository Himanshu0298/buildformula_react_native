import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import CustomerInnerDetails from './CustomerInnerDetails';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <CustomerInnerDetails {...props} />
    </ProjectLayout>
  );
};
