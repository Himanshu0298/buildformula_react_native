import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Roles from './Roles';
import React from 'react';

export default props => {
  return (
    <ProjectLayout header={false}>
      <Roles {...props} />
    </ProjectLayout>
  );
};
