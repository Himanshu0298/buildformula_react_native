import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddMaterialIndentList from './AddMaterialIndentList';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <AddMaterialIndentList {...props} />
    </ProjectLayout>
  );
};
