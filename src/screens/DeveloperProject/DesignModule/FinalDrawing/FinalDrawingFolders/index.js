import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import FinalDrawingFolders from './FinalDrawingFolders';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <FinalDrawingFolders {...props} />
    </ProjectLayout>
  );
};
