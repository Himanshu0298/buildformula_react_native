import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Phases from './Phases';

export default props => {
  return (
    <ProjectLayout {...props}>
      <Phases {...props} />
    </ProjectLayout>
  );
};
