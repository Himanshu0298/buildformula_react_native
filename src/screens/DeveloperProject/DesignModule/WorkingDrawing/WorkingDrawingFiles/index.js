import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import WorkingDrawingFiles from './FinalDrawingFiles';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <WorkingDrawingFiles {...props} />
    </ProjectLayout>
  );
};
