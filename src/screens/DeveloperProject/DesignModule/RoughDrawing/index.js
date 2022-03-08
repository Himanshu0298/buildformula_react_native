import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import RoughDrawing from './RoughDrawing';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <RoughDrawing {...props} />
    </ProjectLayout>
  );
};
