import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import CreatePIMaterial from './AddPIMaterial';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <CreatePIMaterial {...props} />
    </ProjectLayout>
  );
};
