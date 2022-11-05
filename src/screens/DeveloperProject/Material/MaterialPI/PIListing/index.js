import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import PIListing from './PIListing';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <PIListing {...props} />
    </ProjectLayout>
  );
};
