import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import WorkingDrawingFiles from './WorkingDrawingFiles';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <WorkingDrawingFiles {...props} />
    </ProjectLayout>
  );
};
