import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import FollowUpDetails from './FollowUpDetails';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <FollowUpDetails {...props} />
    </ProjectLayout>
  );
};
