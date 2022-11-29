import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import MaterialSubList from './MaterialInventorySubList';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <MaterialSubList {...props} />
    </ProjectLayout>
  );
};
