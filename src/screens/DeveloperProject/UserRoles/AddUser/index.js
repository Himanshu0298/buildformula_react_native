import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddUser from './AddUser';
import React from 'react';

export default props => {
  return (
    <ProjectLayout {...props}>
      <AddUser {...props} />
    </ProjectLayout>
  );
};
