import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddMaterialList from './AddMaterialList';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <AddMaterialList {...props} />
    </ProjectLayout>
  );
};
