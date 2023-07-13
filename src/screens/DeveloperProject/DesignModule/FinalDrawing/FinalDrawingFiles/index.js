import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import React from 'react';
import FinalDrawingFiles from './FinalDrawingFiles';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <FinalDrawingFiles {...props} />
    </ProjectLayout>
  );
};
