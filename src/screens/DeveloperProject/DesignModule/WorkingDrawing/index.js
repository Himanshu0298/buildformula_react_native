import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import WorkingDrawing from './WorkingDrawing';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <WorkingDrawing {...props} />
    </ProjectLayout>
  );
};
