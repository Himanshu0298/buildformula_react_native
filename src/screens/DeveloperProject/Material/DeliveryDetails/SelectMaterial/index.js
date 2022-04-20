import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import SelectMaterials from './SelectMaterials';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <SelectMaterials {...props} />
    </ProjectLayout>
  );
};
