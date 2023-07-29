import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import FloorDestinationFiles from './FloorDestinationFiles';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <FloorDestinationFiles {...props} />
    </ProjectLayout>
  );
};
