import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import ApprovalListing from './ApprovalListing';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <ApprovalListing {...props} />
    </ProjectLayout>
  );
};
