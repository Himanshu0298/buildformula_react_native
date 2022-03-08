import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import FinalDrawing from './FinalDrawing';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <FinalDrawing {...props} />
    </ProjectLayout>
  );
};
