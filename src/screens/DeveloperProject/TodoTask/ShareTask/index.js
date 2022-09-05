import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import ShareTask from './ShareTask';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <ShareTask {...props} />
    </ProjectLayout>
  );
};
