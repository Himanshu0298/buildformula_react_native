import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import FinalDrawingFiles from './FinalDrawingFiles';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <FinalDrawingFiles {...props} />
    </ProjectLayout>
  );
};
