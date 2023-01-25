import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import PickUpListing from './PickUpListing';

export default props => {
  return (
    <ProjectLayout {...props}>
      <PickUpListing {...props} />
    </ProjectLayout>
  );
};
