import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import FromPRListing from './FromPRListing';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <FromPRListing {...props} />
    </ProjectLayout>
  );
};
