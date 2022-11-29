import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import PRListing from './PRListing';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <PRListing {...props} />
    </ProjectLayout>
  );
};
