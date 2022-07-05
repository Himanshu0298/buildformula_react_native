import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import RoughDrawingFolders from './RoughDrawingFolders';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <RoughDrawingFolders {...props} />
    </ProjectLayout>
  );
};
