import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import React from 'react';
import Files from './Files';

export default props => {
  return (
    <ProjectLayout {...props}>
      <Files {...props} />
    </ProjectLayout>
  );
};
