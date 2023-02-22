import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import ProjectAmenities from './ProjectAmenities';

export default props => {
  return (
    <ProjectLayout {...props}>
      <ProjectAmenities {...props} />
    </ProjectLayout>
  );
};
