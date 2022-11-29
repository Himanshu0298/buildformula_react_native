import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import MaterialInventory from './MaterialInventoryList';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <MaterialInventory {...props} />
    </ProjectLayout>
  );
};
