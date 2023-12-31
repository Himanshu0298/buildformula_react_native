import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import React from 'react';
import AddRole from './AddRole';

export default props => {
  return (
    <ProjectLayout {...props} tab={false}>
      <AddRole {...props} />
    </ProjectLayout>
  );
};
