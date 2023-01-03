import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import ProjectStructure from './ProjectStructure';

export default props => {
  return (
    <ProjectLayout {...props}>
      <ProjectStructure {...props} />
    </ProjectLayout>
  );
};
