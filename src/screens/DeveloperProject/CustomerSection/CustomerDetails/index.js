import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import CustomerDetails from './CustomerDetails';

export default props => {
  return (
    <ProjectLayout {...props} header={false}>
      <CustomerDetails {...props} />
    </ProjectLayout>
  );
};
