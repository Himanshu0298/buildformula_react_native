import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import React from 'react';
import AddUser from './AddUser';

export default props => {
  return (
    <ProjectLayout {...props} tab={false}>
      <AddUser {...props} />
    </ProjectLayout>
  );
};
