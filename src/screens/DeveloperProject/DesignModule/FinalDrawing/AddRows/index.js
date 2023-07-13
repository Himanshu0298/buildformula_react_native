import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddRows from './AddRows';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <AddRows {...props} />
    </ProjectLayout>
  );
};
