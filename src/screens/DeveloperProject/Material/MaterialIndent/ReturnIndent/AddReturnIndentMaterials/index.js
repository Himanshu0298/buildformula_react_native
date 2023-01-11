import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddReturnIndentMaterials from './AddReturnIndentMaterials';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <AddReturnIndentMaterials {...props} />
    </ProjectLayout>
  );
};
