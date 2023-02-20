import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import LocationInfo from './LocationInfo';

export default props => {
  return (
    <ProjectLayout {...props}>
      <LocationInfo {...props} />
    </ProjectLayout>
  );
};
