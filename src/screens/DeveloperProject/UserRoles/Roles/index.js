import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import React from 'react';
import Roles from './Roles';

export default props => {
  return (
    <ProjectLayout {...props} header={false}>
      <Roles {...props} />
    </ProjectLayout>
  );
};
