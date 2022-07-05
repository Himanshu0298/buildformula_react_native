import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import WorkingDrawingFolders from './WorkingDrawingFolders';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <WorkingDrawingFolders {...props} />
    </ProjectLayout>
  );
};
