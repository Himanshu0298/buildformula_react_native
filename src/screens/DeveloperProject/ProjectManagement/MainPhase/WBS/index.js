import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import WorkList from './WorkList';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <WorkList {...props} />
    </ProjectLayout>
  );
};
