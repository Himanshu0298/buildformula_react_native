import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddReturnMaterialList from './AddReturnMaterialList';

export default props => {
  <ProjectLayout {...props} header>
    <AddReturnMaterialList {...props} />
  </ProjectLayout>;
};