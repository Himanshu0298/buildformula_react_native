import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddMaterialInfo from './AddMaterialInfo';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <AddMaterialInfo {...props} />
    </ProjectLayout>
  );
};
