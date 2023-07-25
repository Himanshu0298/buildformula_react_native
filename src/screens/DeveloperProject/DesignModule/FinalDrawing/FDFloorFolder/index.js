import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import FloorFolders from './FDFloorFolder';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <FloorFolders {...props} />
    </ProjectLayout>
  );
};
