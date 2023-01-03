import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import ProjectFiles from './ProjectFiles';

export default props => {
  return (
    <ProjectLayout {...props}>
      <ProjectFiles {...props} />
    </ProjectLayout>
  );
};
