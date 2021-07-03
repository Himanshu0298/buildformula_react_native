import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddFollowUp from './AddFollowUp';

export default props => {
  return (
    <ProjectLayout header={false}>
      <AddFollowUp {...props} />
    </ProjectLayout>
  );
};
