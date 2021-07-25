import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import SubPhases from './SubPhases';

export default props => {
  return (
    <ProjectLayout {...props}>
      <SubPhases {...props} />
    </ProjectLayout>
  );
};
