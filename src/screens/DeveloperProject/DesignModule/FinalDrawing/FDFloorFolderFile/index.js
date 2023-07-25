import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import FDFloorFolderFile from './FDFloorFolderFile';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <FDFloorFolderFile {...props} />
    </ProjectLayout>
  );
};
