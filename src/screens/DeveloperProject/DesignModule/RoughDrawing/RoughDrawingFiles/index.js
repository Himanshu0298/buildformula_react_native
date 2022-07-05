import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import RoughDrawingFiles from './RoughDrawingFiles';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <RoughDrawingFiles {...props} />
    </ProjectLayout>
  );
};
