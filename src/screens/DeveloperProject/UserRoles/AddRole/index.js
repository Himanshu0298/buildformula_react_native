import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddRole from './AddRole';
import React from 'react';

export default props => {
  return (
    <ProjectLayout>
      <AddRole {...props} />
    </ProjectLayout>
  );
};
