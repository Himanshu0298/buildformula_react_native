import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Roles from './Roles';
import React from 'react';

export default props => {
  return (
    <ProjectLayout {...props} header={false}>
      <Roles {...props} />
    </ProjectLayout>
  );
};
