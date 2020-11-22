import React from 'react';
import ProjectLayout from 'components/Layout/ProjectLayout';
import ProjectStructure from './ProjectStructure';

export default (props) => {
  return (
    <ProjectLayout>
      <ProjectStructure {...props} />
    </ProjectLayout>
  );
};
