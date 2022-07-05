import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import FollowUpTask from './FollowUpTask';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <FollowUpTask {...props} />
    </ProjectLayout>
  );
};
