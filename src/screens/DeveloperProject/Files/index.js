import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Files from './Files';
import React from 'react';

export default props => {
  return (
    <ProjectLayout>
      <Files {...props} />
    </ProjectLayout>
  );
};
