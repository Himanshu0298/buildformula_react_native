import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddModifyRequest from './AddModifyRequest';

export default props => {
  return (
    <ProjectLayout {...props}>
      <AddModifyRequest {...props} />
    </ProjectLayout>
  );
};
