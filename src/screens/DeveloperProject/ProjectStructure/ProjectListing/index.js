import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import ProjectListing from './ProjectListing';

export default props => {
  return (
    <ProjectLayout {...props}>
      <ProjectListing {...props} />
    </ProjectLayout>
  );
};
